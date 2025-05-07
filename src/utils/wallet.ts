import { WalletKeyEnumType } from "../constants";

export const getWalletType = (connector: string | undefined): WalletKeyEnumType | undefined => {
  const connectorLower = connector?.toLowerCase();
  return connectorLower ? connectorLower as WalletKeyEnumType : undefined;
};