import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { appActions, appReducer, balanceReducer, chainReducer, loadingTaskReducer, formActions, formReducer, tokenReducer } from "./modules";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    balance: balanceReducer,
    chain: chainReducer,
    form: formReducer,
    loadingTask: loadingTaskReducer,
    token: tokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export { appActions, formActions };