import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme, ThemeValue, localStorageKeys, ChainsMap } from "../../../constants";

interface AppState {
  theme: ThemeValue;

  chains: ChainsMap;
}

let defaultTheme: string = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light;
try {
  const localStoreMode = localStorage.getItem(localStorageKeys.theme);
  if (localStoreMode !== null) {
    defaultTheme = localStoreMode as ThemeValue;
  }
} catch {};

const initialState: AppState = {
  theme: defaultTheme,

  chains: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeValue>) => {
      localStorage.setItem(localStorageKeys.theme, action.payload);
      state.theme = action.payload;
    },
    setChainsMap: (state, action: PayloadAction<ChainsMap>) => {
      state.chains = action.payload;
    },
  },
});

export const {
  actions: appActions,
  reducer: appReducer,
} = appSlice;