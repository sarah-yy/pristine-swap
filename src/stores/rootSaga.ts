import { all, fork } from "redux-saga/effects";
import { chainSaga, tokenSaga } from "./modules";

export function* rootSaga() {
  yield all([
    chainSaga,
    tokenSaga,
  ].map(fork));
}