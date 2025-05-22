import { PayloadAction } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { GetQuotePartialPayload, QueryQuoteReq, SkipQuoteResponse, TokenAndChain } from "../../../constants";
import { SkipClient } from "../../../utils";
import { formActions } from "./slice";

function* handleGetSkipQuote(action: PayloadAction<GetQuotePartialPayload>) {
  if (!action.payload.amountIn && !action.payload.amountOut) return;

  const destToken = (yield select((state) => state.form.form.destToken)) as TokenAndChain;
  const srcToken = (yield select((state) => state.form.form.srcToken)) as TokenAndChain;

  const { amountIn, amountOut } = action.payload;
  // const isAmountIn = !!action.payload.amountIn;

  const skipQuoteReq: QueryQuoteReq = {
    ...amountIn && ({ amount_in: amountIn }),
    ...amountOut && ({ amount_out: amountOut }),

    source_asset_chain_id: srcToken.chainId,
    source_asset_denom: srcToken.denom,
    dest_asset_chain_id: destToken.chainId,
    dest_asset_denom: destToken.denom,

    cumulative_affiliate_fee_bps: "0",
    allow_multi_tx: true,
    allow_unsafe: false,
    allow_swaps: true,
  };
  const skipClient = (yield select((state) => state.app.skipClient)) as SkipClient;
  const quoteResponse = (yield call([skipClient, skipClient.Quote], skipQuoteReq)) as SkipQuoteResponse;
  console.log("quoteResponse", quoteResponse);
}

function* handleGetQuoteSrc(action: PayloadAction<BigNumber>) {
  if (action.payload.isZero()) return;

  const getQuotePayload: GetQuotePartialPayload = {
    amountIn: action.payload.toString(10),
  };
  yield put(formActions.querySkipQuote(getQuotePayload));
}

function* handleGetQuoteDest(action: PayloadAction<BigNumber>) {
  if (action.payload.isZero()) return;

  const getQuotePayload: GetQuotePartialPayload = {
    amountOut: action.payload.toString(10),
  };
  yield put(formActions.querySkipQuote(getQuotePayload));
}

export default function* formSaga() {
  yield all([
    takeLatest(formActions.setDestAmountBN.type, handleGetQuoteDest),
    takeLatest(formActions.setSrcAmountBN.type, handleGetQuoteSrc),
    takeLatest(formActions.querySkipQuote.type, handleGetSkipQuote),
  ]);
}