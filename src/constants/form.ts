import BigNumber from "bignumber.js";
import { TokenAndChain, ethChainId, usdcETHTokenContract, optimismChainId, usdcOPTokenContract } from "./token";

export interface SwapFormState {
  srcToken: TokenAndChain;
  destToken: TokenAndChain;

  srcAmount: string;
  srcAmountBN: BigNumber;

  destAmount: string;
  destAmountBN: BigNumber;
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

  srcAmount: "",
  srcAmountBN: new BigNumber(0),

  destAmount: "",
  destAmountBN: new BigNumber(0),
};

export interface GetQuotePartialPayload {
  // Include only 1 of the following
  amountIn?: string;
  amountOut?: string;
}

export interface QueryQuoteReq {
  amount_in?: string;
  amount_out?: string;

  source_asset_denom: string;
  source_asset_chain_id: string;

  dest_asset_denom: string;
  dest_asset_chain_id: string;

  cumulative_affiliate_fee_bps?: string | null;

  allow_multi_tx: boolean;
  allow_unsafe: boolean;
  allow_swaps: boolean;
}

export interface SkipQuoteResponse {
  amount_in: string;
  amount_out: string;
  chain_ids: string[];
  required_chain_addresses: string[];

  source_asset_denom: string;
  source_asset_chain_id: string;

  dest_asset_denom: string;
  dest_asset_chain_id: string;

  does_swap: boolean;
  estimated_amount_out: string;

  txs_required: number;

  usd_amount_in: string;
  usd_amount_out: string;

  swap_price_impact_percent: string | null;

  warning: {
    type: "LOW_INFO_WARNING" | "BAD_PRICE_WARNING";
    message: string;
  } | null;

  estimated_route_duration_seconds: number;
}