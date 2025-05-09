import { all, call, put, select } from "redux-saga/effects";
import { SkipChainJson, ChainsMap, SkipChain, ChainInfoOpts } from "../../../constants";
import { SkipClient } from "../../../utils";
import { chainActions } from "./slice";

function* handleQueryChains() {
  try {
    const skipClient = (yield select((state) => state.app.skipClient)) as SkipClient;
    const chainsResponse = (yield call([skipClient, skipClient.ChainsList], {
      include_evm: true,
    })) as SkipChainJson[];
    const chainsMap = chainsResponse.reduce((prev: ChainsMap, chain: SkipChainJson) => {
      const chainInfo = new SkipChain(chain as ChainInfoOpts);
      prev[chain.chain_id] = chainInfo;
      return prev;
    }, {});
    yield put(chainActions.setChainsMap(chainsMap));
  } catch (e) {
    console.error((e as Error).message);
    yield put(chainActions.setChainsMap({}));
  }
}

export default function* chainSaga() {
  yield all([
    call(handleQueryChains),
  ]);
}