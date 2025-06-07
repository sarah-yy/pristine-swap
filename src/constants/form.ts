import BigNumber from "bignumber.js";
import { TokenAndChain, ethChainId, usdcETHTokenContract, optimismChainId, usdcOPTokenContract } from "./token";
import { SimpleMap } from "./types";

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
  amountIn?: BigNumber;
  amountOut?: BigNumber;
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

export interface SkipQuoteSuccessResponse {
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

export interface SkipQuoteErrorResponse {
  code: number;
  details: {
    reason: string;
  }[];
  message: string;
}

export class SkipQuote {
  amtIn: BigNumber;
  amtOut: BigNumber;
  chainIds: string[];
  requiredChainAddresses: string[];

  sourceAsset: TokenAndChain;
  destAsset: TokenAndChain;

  usdAmtIn: BigNumber;
  usdAmtOut: BigNumber;

  constructor(skipQuote: SkipQuoteSuccessResponse) {
    const {
      amount_in,
      amount_out,
      chain_ids,
      required_chain_addresses,
      source_asset_denom,
      source_asset_chain_id,
      dest_asset_denom,
      dest_asset_chain_id,
      usd_amount_in,
      usd_amount_out,
    } = skipQuote;

    this.amtIn = new BigNumber(amount_in);
    this.amtOut = new BigNumber(amount_out);
    this.chainIds = chain_ids;
    this.requiredChainAddresses = required_chain_addresses;
    this.sourceAsset = {
      chainId: source_asset_chain_id,
      denom: source_asset_denom,
    };
    this.destAsset = {
      chainId: dest_asset_chain_id,
      denom: dest_asset_denom,
    };

    this.usdAmtIn = new BigNumber(usd_amount_in);
    this.usdAmtOut = new BigNumber(usd_amount_out);
  }
}

export interface SkipErrorState {
  status: "error";
  response: string;
}

export interface SkipSuccessState {
  status: "success";
  response: SkipQuote;
}

export type QuoteResponse = SkipErrorState | SkipSuccessState;

export const FormTaskNames: SimpleMap<string> = {
  QueryQuote: "form/queryQuote",
};