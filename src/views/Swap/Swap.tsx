import clsx from "clsx";
import React from "react";
import { SkipConnectLogo } from "../../assets";
import { ButtonSize, Theme } from "../../constants";
import { Card, ContainedButton, OutlinedButton } from "../../components";
import { useAppContext } from "../../hooks";
import { SettingsBar } from "./components";

const Swap: React.FC = () => {
  const { theme } = useAppContext();

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="main-form-card w-full">
        <SettingsBar />

        {/* Main Form section */}
        <div className="mt-[0.875rem] w-full">
          {/* Connect sub-section */}
          <div className="flex justify-end">
            <OutlinedButton size={ButtonSize.SM}>
              Connect
            </OutlinedButton>
          </div>

          {/* Form Inputs */}
          <div className="mt-[0.375rem]">
            Form Inputs here
          </div>
        </div>


        {/* CTA Button */}
        <div className="mt-[0.625rem] w-full">
          <ContainedButton className="w-full" size={ButtonSize.LG}>
            Connect Wallet
          </ContainedButton>
        </div>

        {/* Powered by Logo */}
        <div className={clsx(
          "mt-[0.625rem] flex items-center gap-[0.1875rem] height-[11px] width-[72px]",
          theme === Theme.Dark ? "secondary-text--dark" : "secondary-text--light",
        )}>
          <div className="text-tooltip">Powered by</div>
          <SkipConnectLogo className={theme === Theme.Dark ? "svg-fill--dark" : "svg-fill--light"} />
        </div>
      </Card>
    </div>
  );
};

export default Swap;