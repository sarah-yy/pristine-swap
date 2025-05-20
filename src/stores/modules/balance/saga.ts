import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { TokenBalanceMap, SetSrcTokenPayload, SkipBalanceObj, SkipBalancesByChain, BalanceTaskNames, QueryBalanceReq, SimpleMap, TokenBalance } from "../../../constants";
import { generateId, SkipClient } from "../../../utils";
import { balanceActions } from "./slice";
import { loadingTaskActions } from "../loadingTask";
import { formActions } from "../form";

function* handleQueryBalances(action: PayloadAction<QueryBalanceReq>) {
  const balanceUuid = generateId();
  const currentBalancesMap = (yield select((state) => state.balance.balances)) as TokenBalanceMap;

  yield put(loadingTaskActions.addBackgroundLoading({ name: BalanceTaskNames.QueryBalance, uuid: balanceUuid }));
  try {
    const newBalancesMap: TokenBalanceMap = {};
    const skipClient = (yield select((state) => state.app.skipClient)) as SkipClient;
    const balanceResponse = (yield call([skipClient, skipClient.Balances], action.payload)) as SimpleMap<SkipBalancesByChain>;
    Object.entries(balanceResponse).forEach(([chain, balanceObj]: [string, SkipBalancesByChain]) => {
      const currentBalanceObj = currentBalancesMap[chain] ? { ...currentBalancesMap[chain] } : {};
      Object.entries(balanceObj.denoms).forEach(([denom, balance]: [string, SkipBalanceObj]) => {
        currentBalanceObj[denom] = new TokenBalance(balance);
      });
      newBalancesMap[chain] = currentBalanceObj;
    });
    yield put(balanceActions.setBalances(newBalancesMap));
  } catch (e) {
    console.error((e as Error).message);
    yield put(balanceActions.setBalances({}));
  } finally {
    yield put(loadingTaskActions.removeBackgroundLoading(balanceUuid));
  }
}

function* handleGetBalanceParams(action: PayloadAction<SetSrcTokenPayload>) {
  if (!action.payload.address) return;
  const { token, address } = action.payload;
  const balanceReq: QueryBalanceReq = {
    [token.chainId]: {
      address,
      denoms: [token.denom],
    },
  };
  yield put(balanceActions.queryBalances(balanceReq));
}

export default function* balanceSaga() {
  yield all([
    takeLatest(balanceActions.queryBalances.type, handleQueryBalances),
    takeLatest(formActions.setSrcToken.type, handleGetBalanceParams),
  ]);
}