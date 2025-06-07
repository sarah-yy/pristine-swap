import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import { GetQuotePartialPayload, QuoteResponse, SetSrcTokenPayload, SwapFormState, TokenAndChain, defaultSwapFormState } from "../../../constants";

interface FormState {
  form: SwapFormState;
  
  quote?: QuoteResponse;
}

const initialState: FormState = {
  form: defaultSwapFormState,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    querySkipQuote: (_state, _action: PayloadAction<GetQuotePartialPayload>) => {}, // eslint-disable-line no-unused-vars
    setSrcToken: (state, action: PayloadAction<SetSrcTokenPayload>) => {
      state.form.srcToken = action.payload;
    },
    setDestToken: (state, action: PayloadAction<TokenAndChain>) => {
      state.form.destToken = action.payload;
    },
    setSrcAmountInput: (state, action: PayloadAction<string>) => {
      state.form.srcAmount = action.payload;
    },
    setDestAmountInput: (state, action: PayloadAction<string>) => {
      state.form.destAmount = action.payload;
    },
    setSrcAmountBN: (state, action: PayloadAction<BigNumber>) => {
      state.form.srcAmountBN = action.payload;
    },
    setDestAmountBN: (state, action: PayloadAction<BigNumber>) => {
      state.form.destAmountBN = action.payload;
    },
    setQuote: (state, action: PayloadAction<QuoteResponse>) => {
      state.quote = action.payload;
    },
  },
});

export const {
  actions: formActions,
  reducer: formReducer,
} = formSlice;