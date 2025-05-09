import { all, fork } from "redux-saga/effects";
import { appSaga } from "./modules";

export function* rootSaga() {
  yield all([fork(appSaga)]);
}