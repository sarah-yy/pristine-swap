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
    queryBalances: (_state, _action: PayloadAction<QueryBalanceReq>) => {},
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