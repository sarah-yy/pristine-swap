import clsx from "clsx";
import React from "react";
import { MetamaskIcon, RabbyIcon, RainbowWalletIcon } from "../../assets";
import { WalletKey } from "../../constants";

const walletIcons: {
  [key in WalletKey]: SVGComponent;
} = {
  [WalletKey.Metamask]: MetamaskIcon,
  [WalletKey.Rabby]: RabbyIcon,
  [WalletKey.Rainbow]: RainbowWalletIcon,
};

interface Props extends PropsWithClassName {
  walletKey: WalletKey;
}

const WalletIcon: React.FC<Props> = (props: Props) => {
  const { className, walletKey } = props;
  const WalletSvg = walletIcons[walletKey];

  return (
    <WalletSvg className={clsx("rounded-lg", className)} />
  );
};

export default WalletIcon;