import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme, ThemeValue, WalletKeyEnumType, localStorageKeys } from "../../../constants";
import { SkipClient } from "../../../utils";

interface AppState {
  theme: ThemeValue;

  skipClient: SkipClient;

  primaryWallet?: WalletDetails;
}

interface WalletDetails {
  address: string;
  connectorId?: WalletKeyEnumType;
  shortAddress: string;
  isEVM: boolean;
}

let defaultTheme: string = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light;
try {
  const localStoreMode = localStorage.getItem(localStorageKeys.theme);
  if (localStoreMode !== null) {
    defaultTheme = localStoreMode as ThemeValue;
  }
} catch {}; // eslint-disable-line no-empty

const initialState: AppState = {
  theme: defaultTheme,

  skipClient: new SkipClient(),
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSkipClient: (state, action: PayloadAction<SkipClient>) => {
      state.skipClient = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeValue>) => {
      localStorage.setItem(localStorageKeys.theme, action.payload);
      state.theme = action.payload;
    },
    setPrimaryWallet: (state, action: PayloadAction<WalletDetails>) => {
      state.primaryWallet = action.payload;
    },
    disconnectPrimaryWallet: (state) => {
      state.primaryWallet = undefined;
    },
  },
});

export const {
  actions: appActions,
  reducer: appReducer,
} = appSlice;