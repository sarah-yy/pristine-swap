import clsx from "clsx";
import React from "react";
import { CoinbaseWalletIcon, KeplrWalletIcon, LeapWalletIcon, MetamaskIcon, RabbyIcon, RainbowWalletIcon, TrustWalletIcon, WalletConnectIcon } from "../../assets";
import { Size, WalletKey } from "../../constants";

const walletIcons: {
  [key in WalletKey]: SVGComponent;
} = {
  [WalletKey.Metamask]: MetamaskIcon,
  [WalletKey.Rabby]: RabbyIcon,
  [WalletKey.Rainbow]: RainbowWalletIcon,
  [WalletKey.Coinbase]: CoinbaseWalletIcon,
  [WalletKey.Trust]: TrustWalletIcon,
  [WalletKey.WalletConnect]: WalletConnectIcon,
  [WalletKey.Keplr]: KeplrWalletIcon,
  [WalletKey.Leap]: LeapWalletIcon,
};

interface Props extends PropsWithClassName {
  walletKey: WalletKey;
  borderRadiusSize?: typeof Size[keyof typeof Size];
}

const WalletIcon: React.FC<Props> = (props: Props) => {
  const { borderRadiusSize = Size.LG, className, walletKey } = props;
  const WalletSvg = walletIcons[walletKey];
  const addBorderRadius: boolean = walletKey !== WalletKey.Metamask;

  return (
    <WalletSvg
      className={clsx(
        {
          "rounded-lg": addBorderRadius && borderRadiusSize === Size.LG,
          "rounded-md": addBorderRadius && borderRadiusSize === Size.MD,
        },
        className,
      )}
    />
  );
};

export default WalletIcon;