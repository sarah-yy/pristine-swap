import { TokenAndChain, ethChainId, usdcETHTokenContract, optimismChainId, usdcOPTokenContract } from "./token";

export interface SwapFormState {
  srcToken: TokenAndChain;
  destToken: TokenAndChain;
}

export type SetSrcTokenPayload = TokenAndChain;

export const defaultSwapFormState: SwapFormState = {
  srcToken: {
    chainId: ethChainId.toString(10),
    denom: usdcETHTokenContract,
  },
  destToken: {
    chainId: optimismChainId.toString(10),
    denom: usdcOPTokenContract,
  },
};