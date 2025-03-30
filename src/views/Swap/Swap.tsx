import clsx from "clsx";
import React from "react";
import { SkipConnectLogo } from "../../assets";
import { Theme } from "../../constants";
import { Card } from "../../components";
import { useAppContext } from "../../hooks";
import { SettingsBar } from "./components";

const Swap: React.FC = () => {
  const { theme } = useAppContext();

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="main-form-card w-full">
        <SettingsBar />

        {/* Main Form section */}
        <div className="mt-2">
          <h4 className="text-h4 font-semibold">
            This is the main form section
          </h4>
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