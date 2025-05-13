import clsx from "clsx";
import React from "react";
import { PristineSwapLogoDark, PristineSwapLogoLight } from "../../assets";
import { ChainTaskNames, Theme, TokenTaskNames } from "../../constants";
import { useSelect, useTaskSubscriber } from "../../hooks";

const PreLoader: React.FC = () => {
  const loading = useTaskSubscriber(ChainTaskNames.QueryChains, TokenTaskNames.QueryTokens);
  const theme = useSelect((store) => store.app.theme);

  return (
    <div
      className={clsx(
        "fixed",
        "flex",
        "items-center",
        "justify-center",
        "w-full",
        "h-full",
        "pre-loader-div",
        theme,
        {
          "light-background-gradient": theme === Theme.Light,
          "dark-background-gradient": theme === Theme.Dark,
          loading,
        },
      )}
    >
      <div className="grid justify-items-center gap-5">
        <div className={clsx("loader-circle", theme)} />
        <div
          className={clsx("text-body2", `secondary-text--${theme}`)}
        >
          Polishing the Bezels
        </div>
      </div>

      <div className="fixed justify-items-center w-full bottom-0 py-6"> 
        {theme === Theme.Dark ? <PristineSwapLogoDark className="loader-icon" /> : <PristineSwapLogoLight className="loader-icon" />}
      </div>
    </div>
  );
};

export default PreLoader;