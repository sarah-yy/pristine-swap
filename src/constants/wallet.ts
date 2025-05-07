export enum WalletKey {
  Coinbase = "coinbase",
  Metamask = "metamask",
  Rabby = "rabby",
  Rainbow = "rainbow",
  Trust = "trust",
  WalletConnect = "connect",
  Keplr = "keplr",
  Leap = "leap",
}

export interface WalletItem {
  key: WalletKey;
  label: string;
}

export const keplrWallet: WalletItem = {
  key: WalletKey.Keplr,
  label: "Keplr",
};

export const leapWallet: WalletItem = {
  key: WalletKey.Leap,
  label: "Leap",
};

export const evmWallets: WalletItem[] = [{
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