import { all, call, put, select } from "redux-saga/effects";
import { CoingeckoMarketData, CoinMarketDataArr, SkipTokenJson, SymbolToTokenAndChainMap, TokenAndChain, TokensMap, TokenTaskNames, SkipToken, SimpleMap, CoinMarketData } from "../../../constants";
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

async function queryCoingeckoMarketData(): Promise<CoinMarketDataArr> {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
  const result = await response.json();
  return result as CoinMarketDataArr;
}

function* handleCoingeckoMarketData() {
  const coingeckoUuid = generateId();

  yield put(loadingTaskActions.addBackgroundLoading({ name: TokenTaskNames.QueryCoingeckoMap, uuid: coingeckoUuid }));
  try {
    const coingeckoResponse = (yield call(queryCoingeckoMarketData)) as CoinMarketDataArr;
    const coingeckoMap = coingeckoResponse.reduce((prev: SimpleMap<CoingeckoMarketData>, indiv: CoinMarketData) => {
      const coingeckoData = new CoingeckoMarketData(indiv);
      prev[indiv.id] = coingeckoData;
      return prev;
    }, {});
    yield put(tokenActions.setCoingeckoMarketDataMap(coingeckoMap));
  } catch (err) {
    console.error((err as Error).message);
    yield put(tokenActions.setCoingeckoMarketDataMap({}));
  } finally {
    yield put(loadingTaskActions.removeBackgroundLoading(coingeckoUuid));
  }
}

export default function* tokenSaga() {
  yield all([
    call(handleQueryTokensMap),
    call(handleCoingeckoMarketData),
  ]);
}