import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChainsMap } from "../../../constants";

interface ChainState {
  chains: ChainsMap;
}

const initialState: ChainState = {
  chains: {},
};

const chainSlice = createSlice({
  name: "chain",
  initialState,
  reducers: {
    setChainsMap: (state, action: PayloadAction<ChainsMap>) => {
      state.chains = action.payload;
    },
  },
});

export const {
  actions: chainActions,
  reducer: chainReducer,
} = chainSlice;