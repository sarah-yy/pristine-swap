import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoingeckoMarketDataMap, SymbolToTokenAndChainMap, TokensMap } from "../../../constants";

interface TokenState {
  tokens: TokensMap;
  symbolToTokenAndChainMap: SymbolToTokenAndChainMap;
  coingeckoMarketDataMap: CoingeckoMarketDataMap;
}

const initialState: TokenState = {
  tokens: {},
  symbolToTokenAndChainMap: {},
  coingeckoMarketDataMap: {},
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
    setCoingeckoMarketDataMap: (state, action: PayloadAction<CoingeckoMarketDataMap>) => {
      state.coingeckoMarketDataMap = action.payload;
    },
  },
});

export const {
  actions: tokenActions,
  reducer: tokenReducer,
} = tokenSlice;