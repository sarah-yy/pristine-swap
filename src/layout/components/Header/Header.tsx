import React from "react";
import { PristineSwapLogoDark, PristineSwapLogoLight } from "../../../assets";
import PristineSwapLogoMobileDark from "../../../assets/logos/PristineSwapLogoMobileDark.png";
import PristineSwapLogoMobileLight from "../../../assets/logos/PristineSwapLogoMobileLight.png";
import { ContainedButton } from "../../../components";
import { Theme } from "../../../constants";
import { useAppContext } from "../../../hooks";

const Header: React.FC = () => {
  const { theme } = useAppContext();

  return (
    <div className="w-full flex justify-between px-4 md:px-5 py-4 sticky top-0">
      <div className="hidden md:block">
        {theme === Theme.Dark ? <PristineSwapLogoDark className="header-icon" /> : <PristineSwapLogoLight className="header-icon" />}
      </div>

      <div className="block md:hidden">
        <img className="w-[2.25rem]" src={theme === Theme.Dark ? PristineSwapLogoMobileDark : PristineSwapLogoMobileLight} />
      </div>

      <ContainedButton>Connect Wallet</ContainedButton>
    </div>
  );
};

export default Header;