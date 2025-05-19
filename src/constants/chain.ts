import { SimpleMap } from "./types";

interface FeeAssetGasPriceJson {
  low: string;
  average: string;
  high: string;
}

interface FeeAssetJson {
  denom: string;
  gas_price: FeeAssetGasPriceJson | null;
}

interface FeeAssetGasPriceObj {
  low: number;
  average: number;
  high: number;
}

interface FeeAssetObj {
  denom: string;
  gasPrice: FeeAssetGasPriceObj | null;
}

type FeeAssetsMap = SimpleMap<FeeAssetObj>;

export interface SkipChainJson {
  chain_name: string;
  chain_id: string;
  pfm_enabled: boolean;
  cosmos_module_support: {
    authz: boolean;
    feegrant: boolean;
  };
  supports_memo: boolean;
  logo_uri: string | null;
  bech32_prefix: string;
  fee_assets: FeeAssetJson[];
  chain_type: string;
  ibc_capabilities: {
    cosmos_pfm: boolean;
    cosmos_ibc_hooks: boolean;
    cosmos_memo: boolean;
    cosmos_autopilot: boolean;
  };
  is_testnet: boolean;
  pretty_name: string;
}

export type ChainInfoOpts = Omit<SkipChainJson, "cosmos_module_support" | "ibc_capabilities">;

export class SkipChain {
  readonly chainName: string;
  readonly chainId: string;
  readonly pfmEnabled: boolean;
  readonly supportsMemo: boolean;
  readonly feeAssets: FeeAssetsMap;
  readonly isEvmChain: boolean;
  readonly isCosmosChain: boolean;
  readonly isTestnet: boolean;
  readonly displayName: string;
  readonly logoUrl?: string;

  constructor(chainInfo: ChainInfoOpts) {
    const { chain_name, chain_id, pfm_enabled, supports_memo, fee_assets, logo_uri, chain_type, is_testnet, pretty_name } = chainInfo;
    this.chainName = chain_name;
    this.chainId = chain_id;
    this.pfmEnabled = pfm_enabled;
    this.supportsMemo = supports_memo;
    
    this.feeAssets = fee_assets.reduce((prev: FeeAssetsMap, feeAsset: FeeAssetJson) => {
      const { denom, gas_price } = feeAsset;
      const newFeeAsset: FeeAssetObj = {
        denom,
        gasPrice: gas_price ? {
          low: Number(gas_price.low),
          average: Number(gas_price.average),
          high: Number(gas_price.high),
        } : null,
      };
      prev[denom] = newFeeAsset;
      return prev;
    }, {});

    this.isEvmChain = chain_type === "evm";
    this.isCosmosChain = chain_type === "cosmos";
    this.isTestnet = is_testnet;
    this.displayName = pretty_name;
    this.logoUrl = logo_uri ?? undefined;
  }
}

export type ChainsMap = SimpleMap<SkipChain>;

export interface QueryChainsReq {
  include_evm?: boolean;
  include_svm?: boolean;
}

export const ChainTaskNames: SimpleMap<string> = {
  QueryChains: "runQueryChains",
};

export const keplrChainRegistryUrl = "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/blob/main/cosmos/:chainId.json";
export const chainRegistryUrl = "https://raw.githubusercontent.com/cosmos/chain-registry/:chainName/chain.json";

interface ChainRegistryEndpoint {
  address: string;
  provider?: string;
  archive?: boolean;
}

export interface RegistryChainJson {
  chain_name: string;
  chain_type: string;
  chain_id: string;
  apis: {
    rpc: ChainRegistryEndpoint[];
    rest: ChainRegistryEndpoint[];
  };
  bech32_config?: {
    bech32PrefixAccAddr: string;
    bech32PrefixAccPub: string;
    bech32PrefixValAddr: string;
    bech32PrefixValPub: string;
    bech32PrefixConsAddr: string;
    bech32PrefixConsPub: string;
  };
  slip44: number;
  alternative_slip44s?: number[];
  staking?: {
    staking_tokens: {
      denom: string;
    }[];
  };
  fees?: {
    fee_tokens: {
      denom: string;
      fixed_min_gas_price?: number;
      low_gas_price?: number;
      average_gas_price?: number;
      high_gas_price?: number;
      gas_costs?: {
        cosmos_send?: number;
        ibc_transfer?: number;
      };
    }[];
  };
  images?: {
    png?: string;
    svg?: string;
  }[];
}

export interface RegistryAssetJson {
  chain_name: string;
  assets: {
    denom_units: {
      denom: string;
      exponent: number;
      aliases?: string[];
    }[];
    base: string;
    symbol: string;
    coingecko_id?: string;
    logo_URIs?: {
      png?: string;
      svg?: string;
    };
  }[];
}