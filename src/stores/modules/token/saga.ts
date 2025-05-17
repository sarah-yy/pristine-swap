import { all, call, put, select } from "redux-saga/effects";
import { SkipTokenJson, SymbolToTokenAndChainMap, TokenAndChain, TokensMap, TokenTaskNames, SkipToken, SimpleMap } from "../../../constants";
import { SkipClient, generateId } from "../../../utils";
import { tokenActions } from "./slice";
import { loadingTaskActions } from "../loadingTask";

function* handleQueryTokensMap() {
  const tokenUuid = generateId();

  yield put(loadingTaskActions.addBackgroundLoading({ name: TokenTaskNames.QueryTokens, uuid: tokenUuid }));
  try {
    const skipClient = (yield select((state) => state.app.skipClient)) as SkipClient;
    const tokensResponse = (yield call([skipClient, skipClient.TokensList], {
      include_evm_assets: true,
    })) as SimpleMap<{ assets: SkipTokenJson[] }>;
    const tokensMap: TokensMap = {};
    const symbolToTokenMap: SymbolToTokenAndChainMap = {};
    Object.entries(tokensResponse).forEach(([chain, tokens]: [string, { assets: SkipTokenJson[] }]) => {
      const tokensObj: SimpleMap<SkipToken> = {};
      tokens.assets.forEach((tokenJson: SkipTokenJson) => {
        const skipToken = new SkipToken(tokenJson);
        tokensObj[tokenJson.denom.toLowerCase()] = skipToken;

        const skipTokenInfo: TokenAndChain = {
          denom: skipToken.denom.toLowerCase(),
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
    yield put(tokenActions.setSymbolToTokenAndChainMap(symbolToTokenMap));
  } catch (e) {
    console.error((e as Error).message);
    yield put(tokenActions.setTokensMap({}));
    yield put(tokenActions.setSymbolToTokenAndChainMap({}));
  } finally {
    yield put(loadingTaskActions.removeBackgroundLoading(tokenUuid));
  }
}

export default function* tokenSaga() {
  yield all([
    call(handleQueryTokensMap),
  ]);
}