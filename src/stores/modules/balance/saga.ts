import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { BalanceTaskNames, QueryBalanceReq, SimpleMap, SkipBalanceObj, SkipBalancesByChain, TokenBalance, TokenBalanceMap, TokenAndChain } from "../../../constants";
import { generateId, SkipClient } from "../../../utils";
import { appActions } from "../app";
import { formActions } from "../form";
import { loadingTaskActions } from "../loadingTask";
import { balanceActions } from "./slice";

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
        const tokenBalanceObj = new TokenBalance(balance);
        currentBalanceObj[denom] = tokenBalanceObj;
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

function* handleGetBalanceParams() {
  const address = (yield select((state) => state.app.primaryWallet?.address)) as string | undefined;
  const srcToken = (yield select((state) => state.form.form.srcToken)) as TokenAndChain;
  if (!address) return;

  const balanceReq: QueryBalanceReq = {
    [srcToken.chainId]: {
      address,
      denoms: [srcToken.denom],
    },
  };
  yield put(balanceActions.queryBalances(balanceReq));
}

export default function* balanceSaga() {
  yield all([
    takeLatest(balanceActions.queryBalances.type, handleQueryBalances),
    takeLatest([
      formActions.setSrcToken.type,
      appActions.setPrimaryWallet.type,
    ], handleGetBalanceParams),
  ]);
}