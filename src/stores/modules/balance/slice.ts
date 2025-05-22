import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryBalanceReq, TokenBalanceMap } from "../../../constants";

interface BalanceState {
  balances: TokenBalanceMap;
}

const initialState: BalanceState = {
  balances: {},
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryBalances: (_state, _action: PayloadAction<QueryBalanceReq>) => {}, // eslint-disable-line no-unused-vars
    setBalances: (state, action: PayloadAction<TokenBalanceMap>) => {
      state.balances = {
        ...state.balances,
        ...action.payload,
      };
    },
  },
});

export const {
  actions: balanceActions,
  reducer: balanceReducer,
} = balanceSlice;