import clsx from "clsx";
import React, { Suspense } from "react";
import { ExchangeIcon, SkipConnectLogo } from "../../assets";
import { ExchangeTx, Theme } from "../../constants";
import { Card, ThemedSvgIcon } from "../../components";
import { useSelect } from "../../hooks";
import { TokenSelectionProvider } from "../../provider";
import { FormInput, SettingsBar, SwapCTASection } from "./components";

const ConnectSubsection = React.lazy(() => import("./components/ConnectSubsection"));
const ConnectWalletDialog = React.lazy(() => import("./components/ConnectWalletDialog"));
const TokenSelectDialog = React.lazy(() => import("./components/TokenSelectDialog"));

const Swap: React.FC = () => {
  const theme = useSelect((store) => store.app.theme);
  const [rotate, setRotate] = React.useState<boolean>(false);

  const onClickSwapBtn = () => {
    setRotate((prev: boolean) => !prev);
  };

  return (
    <React.Fragment>
      <TokenSelectionProvider>
        <div className="w-full flex justify-center items-center">
          <Card className="main-form-card w-full">
            <SettingsBar />

            {/* Main Form section */}
            <div className="mt-[0.875rem] w-full">
              {/* Connect sub-section */}
              <Suspense>
                <ConnectSubsection />
              </Suspense>

              {/* Form Inputs */}
              <div className="mt-[0.375rem] grid grid-cols-1">
                {/* Sell Input */}
                <FormInput type={ExchangeTx.Sell} />

                <div className="flex justify-center h-[1.125rem] w-full z-50 items-center">
                  <button
                    className={clsx({
                      "swap-button-dark": theme === Theme.Dark,
                      "swap-button-light": theme === Theme.Light,
                      rotate,
                    }, "swap-button-base flex justify-center items-center drop-shadow-md")}
                    onClick={onClickSwapBtn}
                  >
                    <ExchangeIcon className="swap-icon" />
                  </button>
                </div>

                {/* Buy Input */}
                <FormInput />
              </div>
            </div>


            {/* CTA Button section */}
            <SwapCTASection />

            {/* Powered by Logo */}
            <div className={clsx(
              "mt-[0.625rem] flex items-center gap-[0.1875rem] height-[11px] width-[72px]",
              theme === Theme.Dark ? "secondary-text--dark" : "secondary-text--light",
            )}>
              <div className="text-tooltip">Powered by</div>
              <ThemedSvgIcon svgComponent={SkipConnectLogo} />
            </div>
          </Card>
        </div>

        <Suspense>
          <ConnectWalletDialog />
          <TokenSelectDialog />
        </Suspense>
      </TokenSelectionProvider>
    </React.Fragment>
  );
};

export default Swap;