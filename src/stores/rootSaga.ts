import { all, fork } from "redux-saga/effects";
import { balanceSaga, chainSaga, tokenSaga } from "./modules";

export function* rootSaga() {
  yield all([
    balanceSaga,
    chainSaga,
    tokenSaga,
  ].map(fork));
}