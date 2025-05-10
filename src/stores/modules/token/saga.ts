import { all, call, put, select } from "redux-saga/effects";
import { SkipTokenJson, SymbolToTokenInfoMap, TokenInfo, TokensMap, SkipToken, SimpleMap } from "../../../constants";
import { SkipClient } from "../../../utils";
import { tokenActions } from "./slice";

function* handleQueryTokensMap() {
  try {
    const skipClient = (yield select((state) => state.app.skipClient)) as SkipClient;
    const tokensResponse = (yield call([skipClient, skipClient.TokensList], {
      include_evm_assets: true,
    })) as SimpleMap<{ assets: SkipTokenJson[] }>;
    const tokensMap: TokensMap = {};
    const symbolToTokenMap: SymbolToTokenInfoMap = {};
    Object.entries(tokensResponse).forEach(([chain, tokens]: [string, { assets: SkipTokenJson[] }]) => {
      const tokensObj: SimpleMap<SkipToken> = {};
      tokens.assets.forEach((tokenJson: SkipTokenJson) => {
        const skipToken = new SkipToken(tokenJson);
        tokensObj[tokenJson.denom] = skipToken;

        const skipTokenInfo: TokenInfo = {
          denom: skipToken.denom,
          chainId: skipToken.chainId,
        };
        if (skipToken.symbol && symbolToTokenMap[skipToken.symbol]) {
          symbolToTokenMap[skipToken.symbol].push(skipTokenInfo);
        } else if (skipToken.symbol) {
          symbolToTokenMap[skipToken.symbol] = [skipTokenInfo];
        }
      });
      tokensMap[chain] = tokensObj;
    }, {});
    yield put(tokenActions.setTokensMap(tokensMap));
    yield put(tokenActions.setSymbolToTokenInfoMap(symbolToTokenMap));
  } catch (e) {
    console.error((e as Error).message);
    yield put(tokenActions.setTokensMap({}));
        yield put(tokenActions.setSymbolToTokenInfoMap({}));
  }
}

export default function* tokenSaga() {
  yield all([
    call(handleQueryTokensMap),
  ]);
}