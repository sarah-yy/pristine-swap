import { SimpleMap } from "./types";

export type ThemeType = {
  Dark: string;
  Light: string;
};

export const Theme: ThemeType = {
  Dark: "dark",
  Light: "light",
};

export const fallbackTheme = Theme.Light;

export type ThemeValue = typeof Theme[keyof typeof Theme];

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

  constructor(chainInfo: ChainInfoOpts) {
    const { chain_name, chain_id, pfm_enabled, supports_memo, fee_assets, chain_type, is_testnet, pretty_name } = chainInfo;
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
  }
}

export type ChainsMap = SimpleMap<SkipChain>;

export const localStorageKeys: { [key: string]: string } = {
  theme: "@app/SET_THEME",
};