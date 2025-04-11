export enum WalletKey {
  Metamask = "metamask",
  Rabby = "rabby",
  Rainbow = "rainbow",
}

export interface WalletItem {
  key: WalletKey;
  label: string;
}

export const wallets: WalletItem[] = [{
  key: WalletKey.Metamask,
  label: "Metamask",
}, {
  key: WalletKey.Rabby,
  label: "Rabby",
}, {
  key: WalletKey.Rainbow,
  label: "Rainbow",
}];