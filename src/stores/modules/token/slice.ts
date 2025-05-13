import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SymbolToTokenInfoMap, TokensMap } from "../../../constants";

interface TokenState {
  tokens: TokensMap;
  symbolToTokenInfoMap: SymbolToTokenInfoMap;
}

const initialState: TokenState = {
  tokens: {},
  symbolToTokenInfoMap: {},
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokensMap: (state, action: PayloadAction<TokensMap>) => {
      state.tokens = action.payload;
    },
    setSymbolToTokenInfoMap: (state, action: PayloadAction<SymbolToTokenInfoMap>) => {
      state.symbolToTokenInfoMap = action.payload;
    },
  },
});

export const {
  actions: tokenActions,
  reducer: tokenReducer,
} = tokenSlice;