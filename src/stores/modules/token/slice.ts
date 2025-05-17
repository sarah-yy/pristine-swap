import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SymbolToTokenAndChainMap, TokensMap } from "../../../constants";

interface TokenState {
  tokens: TokensMap;
  symbolToTokenAndChainMap: SymbolToTokenAndChainMap;
}

const initialState: TokenState = {
  tokens: {},
  symbolToTokenAndChainMap: {},
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokensMap: (state, action: PayloadAction<TokensMap>) => {
      state.tokens = action.payload;
    },
    setSymbolToTokenAndChainMap: (state, action: PayloadAction<SymbolToTokenAndChainMap>) => {
      state.symbolToTokenAndChainMap = action.payload;
    },
  },
});

export const {
  actions: tokenActions,
  reducer: tokenReducer,
} = tokenSlice;