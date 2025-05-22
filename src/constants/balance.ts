import BigNumber from "bignumber.js";
import { SimpleMap } from "./types";

export interface SkipBalanceObj {
  amount: string;
  decimals: number | null;
  formatted_amount: string;
  price: string | null;
  value_usd: string | null;
  error: {
    message: string;
  };
}

export type SkipBalanceDenoms = SimpleMap<SkipBalanceObj>;

export interface SkipBalancesByChain {
  address: string;
  denoms: SkipBalanceDenoms;
}

export interface SkipBalanceJson {
  chains: SimpleMap<SkipBalancesByChain>;
}

export type QueryBalanceReq = SimpleMap<{
  address: string;
  denoms: [string];
}>;

export const BalanceTaskNames: SimpleMap<string> = {
  QueryBalance: "runQueryBalance",
};

export class TokenBalance {
  readonly amount: string;
  readonly amountBN: BigNumber;
  readonly formattedAmount: string;
  readonly formattedAmountBN: BigNumber;
  readonly price?: string;
  readonly decimals?: number;
  readonly usdValue?: string;

  constructor(balanceObj: SkipBalanceObj) {
    const { amount, decimals, formatted_amount, price, value_usd } = balanceObj;
    this.amount = amount;
    this.amountBN = new BigNumber(amount);
    this.formattedAmount = formatted_amount;
    this.formattedAmountBN = new BigNumber(formatted_amount);
    if (decimals) this.decimals = decimals;
    if (price) this.price = price;
    if (value_usd) this.usdValue = value_usd;
  }
}

export type TokenBalanceByChain = SimpleMap<TokenBalance>;

export type TokenBalanceMap = SimpleMap<TokenBalanceByChain>;