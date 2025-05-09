import { all, call, put } from "redux-saga/effects";
import { SkipChainJson, ChainsMap, SkipChain, ChainInfoOpts } from "../../../constants";
import { appActions } from "./slice";

async function queryChainsInfo(): Promise<SkipChainJson[]> {
  const response = await fetch("https://api.skip.build/v2/info/chains?include_evm=true");
  const json = await response.json();
  return json.chains as SkipChainJson[];
}

function* handleQueryChains() {
  try {
    const chainsResponse = (yield call(queryChainsInfo)) as SkipChainJson[];
    const chainsMap = chainsResponse.reduce((prev: ChainsMap, chain: SkipChainJson) => {
      const chainInfo = new SkipChain(chain as ChainInfoOpts);
      prev[chain.chain_id] = chainInfo;
      return prev;
    }, {});
    yield put(appActions.setChainsMap(chainsMap));
  } catch (e) {
    console.error((e as Error).message);
    yield put(appActions.setChainsMap({}));
  }
}

export default function* appSaga() {
  yield all([
    call(handleQueryChains),
  ])
}