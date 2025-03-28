import React from "react";
import { PristineSwapLogoDark, PristineSwapLogoLight } from "../../../assets";
import { ContainedButton } from "../../../components";
import { Theme, useAppContext } from "../../../provider";

const Header: React.FC = () => {
  const { theme } = useAppContext();

  return (
    <div className="w-full flex justify-between px-5 py-4 sticky top-0">
      {theme === Theme.Dark ? <PristineSwapLogoDark className="header-icon" /> : <PristineSwapLogoLight className="header-icon" />}
      <ContainedButton>Connect Wallet</ContainedButton>
    </div>
  );
};

export default Header;