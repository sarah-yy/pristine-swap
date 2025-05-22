import { all, fork } from "redux-saga/effects";
import { balanceSaga, chainSaga, formSaga, tokenSaga } from "./modules";

export function* rootSaga() {
  yield all([
    balanceSaga,
    chainSaga,
    formSaga,
    tokenSaga,
  ].map(fork));
}