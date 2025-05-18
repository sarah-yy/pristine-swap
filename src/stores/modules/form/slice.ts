import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SwapFormState, TokenAndChain, defaultSwapFormState } from "../../../constants";

interface FormState {
  form: SwapFormState;
}

const initialState: FormState = {
  form: defaultSwapFormState,
};

interface SetFormTokenPayload {
  type: "srcToken" | "destToken";
  token: TokenAndChain;
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormToken: (state, action: PayloadAction<SetFormTokenPayload>) => {
      state.form[action.payload.type] = action.payload.token;
    },
  },
});

export const {
  actions: formActions,
  reducer: formReducer,
} = formSlice;