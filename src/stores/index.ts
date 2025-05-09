import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { appActions, appReducer, chainActions, chainReducer } from "./modules";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    chain: chainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export { appActions, chainActions };