export type WalletKeyType = {
  Coinbase: string;
  Metamask: string;
  Rabby: string;
  Rainbow: string;
  Trust: string;
  WalletConnect: string;
  Keplr: string;
  Leap: string;
};

export const WalletKey: WalletKeyType = {
  Coinbase: "coinbase",
  Metamask: "metamask",
  Rabby: "rabby",
  Rainbow: "rainbow",
  Trust: "trust",
  WalletConnect: "connect",
  Keplr: "keplr",
  Leap: "leap",
};

export type WalletKeyEnumType = typeof WalletKey[keyof typeof WalletKey];

export interface WalletItem {
  key: WalletKeyEnumType;
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