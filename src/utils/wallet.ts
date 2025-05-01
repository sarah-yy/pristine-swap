import { WalletKey } from "../constants";

export const getWalletType = (connector: string | undefined): WalletKey | undefined => {
  const connectorLower = connector?.toLowerCase();
  return connectorLower ? connectorLower as WalletKey : undefined 
};