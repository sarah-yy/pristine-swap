import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetSrcTokenPayload, SwapFormState, TokenAndChain, defaultSwapFormState } from "../../../constants";

interface FormState {
  form: SwapFormState;
}

const initialState: FormState = {
  form: defaultSwapFormState,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setSrcToken: (state, action: PayloadAction<SetSrcTokenPayload>) => {
      state.form.srcToken = action.payload.token;
    },
    setDestToken: (state, action: PayloadAction<TokenAndChain>) => {
      state.form.destToken = action.payload;
    },
  },
});

export const {
  actions: formActions,
  reducer: formReducer,
} = formSlice;