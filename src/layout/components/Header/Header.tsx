import React from "react";
import { PristineSwapLogoDark, PristineSwapLogoLight } from "../../../assets";
import PristineSwapLogoMobileDark from "../../../assets/logos/PristineSwapLogoMobileDark.png";
import PristineSwapLogoMobileLight from "../../../assets/logos/PristineSwapLogoMobileLight.png";
import { ContainedButton } from "../../../components";
import { Theme } from "../../../constants";
import { useConnectStateContext, useSelect } from "../../../hooks";

import { WalletDropdown } from "./components";

const Header: React.FC = () => {
  const theme = useSelect((store) => store.app.theme);
  const { handleOpenConnectDialog, isWalletConnecting, isWalletConnected } = useConnectStateContext();

  return (
    <div className="w-full flex justify-between px-4 md:px-5 py-4 sticky top-0 header">
      <div className="hidden md:block">
        {theme === Theme.Dark ? <PristineSwapLogoDark className="header-icon" /> : <PristineSwapLogoLight className="header-icon" />}
      </div>

      <div className="block md:hidden">
        <img className="w-[2.25rem]" src={theme === Theme.Dark ? PristineSwapLogoMobileDark : PristineSwapLogoMobileLight} />
      </div>

      {!!isWalletConnected ? (
        <WalletDropdown />
      ) : (
        <ContainedButton className="header-connect-btn" disabled={isWalletConnecting} onClick={handleOpenConnectDialog} loading={isWalletConnecting}>
          Connect Wallet
        </ContainedButton>
      )}
    </div>
  );
};

export default Header;