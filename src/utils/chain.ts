import { SkipChain, chainRegistryUrl, keplrChainRegistryUrl } from "../constants";
import { KeplrTypes } from "../types";

const chainIdRegex = /^([a-z0-9_-]+)-([0-9]+)$/i;

export const getKeplrChainInfo = async (chainInfo: SkipChain): Promise<KeplrTypes.ChainInfo.ChainInfo> => {
  let keplrChainId = chainInfo.chainId;
  try {
    const regexArr = chainIdRegex.exec(chainInfo.chainId);
    if (!!regexArr?.length) {
      keplrChainId = regexArr[1] ?? chainInfo.chainId;
    }
  } catch {
    keplrChainId = chainInfo.chainId;
  }

  try {
    const response = await fetch(keplrChainRegistryUrl.replace(":chainId", keplrChainId));
    if (!response.ok) throw new Error("404: Keplr chain registry info not found");
    const data = await response.json();
    return data as KeplrTypes.ChainInfo.ChainInfo;
  } catch {

    const fallbackResponse = await fetch(chainRegistryUrl.replace(":chainName", chainInfo.chainName));
    if (!fallbackResponse.ok) throw new Error("404: Cosmos chain registry info not found");
    const fallbackData = await fallbackResponse.json();
    return fallbackData;
  }
}