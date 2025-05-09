import { all, fork } from "redux-saga/effects";
import { chainSaga } from "./modules";

export function* rootSaga() {
  yield all([fork(chainSaga)]);
}