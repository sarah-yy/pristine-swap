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
  readonly price?: BigNumber;
  readonly decimals?: number;
  readonly usdValue?: BigNumber;

  constructor(balanceObj: SkipBalanceObj) {
    const { amount, decimals, formatted_amount, price, value_usd } = balanceObj;
    const decimalNum = decimals ?? 0;

    this.amount = amount;
    this.amountBN = new BigNumber(amount).dp(0, BigNumber.ROUND_DOWN);
    this.formattedAmount = formatted_amount;
    this.formattedAmountBN = new BigNumber(formatted_amount).dp(decimalNum, BigNumber.ROUND_DOWN);
    if (decimals) this.decimals = decimals;
    if (price) this.price = new BigNumber(price);
    if (value_usd) this.usdValue = new BigNumber(value_usd);
  }
}

export type TokenBalanceByChain = SimpleMap<TokenBalance>;

export type TokenBalanceMap = SimpleMap<TokenBalanceByChain>;