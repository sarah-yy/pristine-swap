export enum WalletKey {
  Coinbase = "coinbase",
  Metamask = "metamask",
  Rabby = "rabby",
  Rainbow = "rainbow",
  Trust = "trust",
  WalletConnect = "connect",
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
}, {
  key: WalletKey.Coinbase,
  label: "Coinbase",
}];