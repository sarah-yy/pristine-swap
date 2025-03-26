import React from "react";
import { PristineSwapLogoDark, PristineSwapLogoLight } from "../../../assets";
import { ContainedButton } from "../../../components";
import { Theme, useAppContext } from "../../../provider";

const Header: React.FC = () => {
  const { theme } = useAppContext();

  return (
    <div className="full-width flex justify-between px-6 py-5">
      {theme === Theme.Dark ? <PristineSwapLogoDark className="header-icon" /> : <PristineSwapLogoLight className="header-icon" />}
      <ContainedButton>Connect Wallet</ContainedButton>
    </div>
  );
};

export default Header;