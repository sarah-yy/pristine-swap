import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { FormTaskNames, GetQuotePartialPayload, QueryQuoteReq, QuoteResponse, SkipQuote, SkipQuoteErrorResponse, SkipQuoteSuccessResponse, SkipToken, TokenAndChain } from "../../../constants";
import { SkipClient, generateId } from "../../../utils";
import { formActions } from "./slice";
import { loadingTaskActions } from "../loadingTask";

function* handleGetSkipQuote(action: PayloadAction<GetQuotePartialPayload>) {
  if (!action.payload.amountIn && !action.payload.amountOut) return;

  const destToken = (yield select((state) => state.form.form.destToken)) as TokenAndChain;
  const srcToken = (yield select((state) => state.form.form.srcToken)) as TokenAndChain;
  const srcTokenInfo = (yield select((state) => state.token.tokens[srcToken.chainId]?.[srcToken.denom.toLowerCase()])) as SkipToken | undefined;
  const destTokenInfo = (yield select((state) => state.token.tokens[destToken.chainId]?.[destToken.denom.toLowerCase()])) as SkipToken | undefined;
  if (!srcTokenInfo || !destTokenInfo) return;

  const loadingUuid = generateId();
  yield put(loadingTaskActions.addBackgroundLoading({
    name: FormTaskNames.QueryQuote,
    uuid: loadingUuid,
  }));

  const { amountIn, amountOut } = action.payload;
  const isAmountIn = !!amountIn;

  const skipQuoteReq: QueryQuoteReq = {
    ...amountIn && ({ amount_in: amountIn.shiftedBy(srcTokenInfo.decimals ?? 0).toString(10) }),
    ...amountOut && ({ amount_out: amountOut.shiftedBy(destTokenInfo.decimals ?? 0).toString(10) }),

    source_asset_chain_id: srcToken.chainId,
    source_asset_denom: srcToken.denom,
    dest_asset_chain_id: destToken.chainId,
    dest_asset_denom: destToken.denom,

    cumulative_affiliate_fee_bps: "0",
    allow_multi_tx: true,
    allow_unsafe: false,
    allow_swaps: true,
  };

  let response: QuoteResponse | undefined; 
  try {
    const skipClient = (yield select((state) => state.app.skipClient)) as SkipClient;
    const quoteResponse = (yield call([skipClient, skipClient.Quote], skipQuoteReq)) as SkipQuoteErrorResponse | SkipQuoteSuccessResponse;
    if (Object.prototype.hasOwnProperty.call(quoteResponse, "code") && (quoteResponse as SkipQuoteErrorResponse).code !== 0) {
      throw new Error((quoteResponse as SkipQuoteErrorResponse).message);
    }

    const quote = new SkipQuote(quoteResponse as SkipQuoteSuccessResponse);
    response = { status: "success", response: quote };
    if (isAmountIn) {
      const destAmtBN = quote.amtOut.shiftedBy(-(destTokenInfo.decimals ?? 0));
      yield put(formActions.setDestAmountBN(destAmtBN));
      yield put(formActions.setDestAmountInput(destAmtBN.toString(10)));
    } else {
      const srcAmtBN = quote.amtIn.shiftedBy(-(srcTokenInfo.decimals ?? 0));
      yield put(formActions.setSrcAmountBN(srcAmtBN));
      yield put(formActions.setSrcAmountInput(srcAmtBN.toString(10)));
    }
  } catch (err) {
    response = { status: "error", response: (err as Error).message };
  } finally {
    yield put(loadingTaskActions.removeBackgroundLoading(loadingUuid));
    if (response) yield put(formActions.setQuote(response));
  }
}

export default function* formSaga() {
  yield all([
    takeLatest(formActions.querySkipQuote.type, handleGetSkipQuote),
  ]);
}