import { Currency, AppCurrency, FeeCurrency, ERC20Currency } from "./currency";
import { EVMInfo } from "./ethereum";

export interface Bech32Config {
  readonly bech32PrefixAccAddr: string;
  readonly bech32PrefixAccPub: string;
  readonly bech32PrefixValAddr: string;
  readonly bech32PrefixValPub: string;
  readonly bech32PrefixConsAddr: string;
  readonly bech32PrefixConsPub: string;
}

export interface BIP44 {
  readonly coinType: number;
  readonly purpose?: number;
}

export interface ChainInfo {
  readonly rpc: string;
  readonly rest: string;
  readonly nodeProvider?: {
    readonly name: string;
    readonly email?: string;
    readonly discord?: string;
    readonly website?: string;
  };
  readonly chainId: string;
  readonly chainName: string;
  /**
   * This indicates the type of coin that can be used for stake.
   * You can get actual currency information from Currencies.
   */
  readonly stakeCurrency?: Currency;
  readonly walletUrl?: string;
  readonly walletUrlForStaking?: string;
  readonly bip44: BIP44;
  readonly alternativeBIP44s?: BIP44[];
  readonly bech32Config?: Bech32Config;

  readonly currencies: AppCurrency[];
  /**
   * This indicates which coin or token can be used for fee to send transaction.
   * You can get actual currency information from Currencies.
   */
  readonly feeCurrencies: FeeCurrency[];

  /**
   * Indicate the features supported by this chain. Ex) cosmwasm, secretwasm ...
   */
  readonly features?: string[];

  /**
   * Shows whether the blockchain is in production phase or beta phase.
   * Major features such as staking and sending are supported on staging blockchains, but without guarantee.
   * If the blockchain is in an early stage, please set it as beta.
   */
  readonly beta?: boolean;

  readonly chainSymbolImageUrl?: string;

  readonly hideInUI?: boolean;

  readonly evm?: EVMInfo;
}

export type ChainInfoWithoutEndpoints = Omit<
  ChainInfo,
  "rest" | "rpc" | "nodeProvider" | "evm"
> & {
  readonly rest: undefined;
  readonly rpc: undefined;
  readonly nodeProvider: undefined;
  readonly evm?: Omit<EVMInfo, "rpc"> & {
    readonly rpc: undefined;
  };
};