// https://api.skip.build/v2/fungible/assets?include_evm_assets=true
import { SimpleMap } from "./types";

export interface SkipTokenJson {
  chain_id: string;
  denom: string;
  description: string | null;
  coingecko_id: string | null;
  decimals: number | null;
  is_cw20: boolean;
  is_evm: boolean;
  is_svm: boolean;
  logo_uri: string | null;
  name: string | null;
  origin_chain_id: string;
  origin_denom: string;
  recommended_symbol: string | null;
  symbol: string | null;
  token_contract?: string | null;
  trace?: string;
}

export type SkipTokenOpts = SkipTokenJson;

export class SkipToken {
  readonly chainId: string;
  readonly denom: string;
  readonly description?: string;
  readonly symbol?: string;
  readonly coingeckoId?: string;
  readonly decimals?: number;
  readonly isCw20: boolean;
  readonly isEVM: boolean;
  readonly isSVM: boolean;
  readonly logoUri?: string;
  readonly displayName?: string;

  readonly tokenContract?: string; // only for EVM assets

  readonly originDenom?: string; // only for IBC assets
  readonly originChainId?: string;
  readonly trace?: string;

  constructor(token: SkipTokenOpts) {
    const {
      chain_id,
      denom,
      description,
      coingecko_id,
      decimals,
      is_cw20,
      is_evm,
      is_svm,
      logo_uri,
      name,
      origin_chain_id,
      origin_denom,
      recommended_symbol,
      symbol,
      token_contract,
      trace,
    } = token;
    this.chainId = chain_id;
    this.denom = denom;
    this.isCw20 = is_cw20;
    this.isEVM = is_evm;
    this.isSVM = is_svm;
  
    if (description) this.description = description;
    if (coingecko_id) this.coingeckoId = coingecko_id;
    if (decimals) this.decimals = decimals;
    if (logo_uri) this.logoUri = logo_uri;
    if (name) this.displayName = name;
    if (origin_chain_id) this.originChainId = origin_chain_id;
    if (origin_denom) this.originDenom = origin_denom;
    if (!!symbol || !!recommended_symbol) this.symbol = recommended_symbol ?? symbol ?? undefined;
    if (token_contract) this.tokenContract = token_contract;
    if (trace) this.trace = trace;
  }
}

export type TokensMap = SimpleMap<SimpleMap<SkipToken>>;

export interface TokenInfo {
  denom: string;
  chainId: string;
}

export type SymbolToTokenInfoMap = SimpleMap<TokenInfo[]>;

export interface QueryTokensReq {
  include_evm_assets?: boolean;
  include_svm_assets?: boolean;
}

export const TokenTaskNames: SimpleMap<string> = {
  QueryTokens: "runQueryTokensMap",
};