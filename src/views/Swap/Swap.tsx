import clsx from "clsx";
import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import { ExchangeIcon, SkipConnectLogo } from "../../assets";
import { ExchangeTx, SkipErrorState, Theme, TokenAndChain } from "../../constants";
import { Alert, Card, ThemedSvgIcon } from "../../components";
import { useSelect } from "../../hooks";
import { TokenSelectionProvider } from "../../provider";
import { formActions } from "../../stores";
import { FormInput, SettingsBar, SwapCTASection } from "./components";
import { capitalize } from "../../utils";

const ConnectSubsection = React.lazy(() => import("./components/ConnectSubsection"));
const ConnectWalletDialog = React.lazy(() => import("./components/ConnectWalletDialog"));
const TokenSelectDialog = React.lazy(() => import("./components/TokenSelectDialog"));

const Swap: React.FC = () => {
  const dispatch = useDispatch();

  const theme = useSelect((store) => store.app.theme);

  const srcToken = useSelect((store) => store.form.form.srcToken);
  const srcAmtInput = useSelect((store) => store.form.form.srcAmount);
  const srcAmtBN = useSelect((store) => store.form.form.srcAmountBN);

  const destAmtBN = useSelect((store) => store.form.form.destAmountBN);
  const destToken = useSelect((store) => store.form.form.destToken);
  const destAmtInput = useSelect((store) => store.form.form.destAmount);

  const quote = useSelect((store) => store.form.quote);
  console.log("quote", quote);

  const [rotate, setRotate] = React.useState<boolean>(false);

  const onClickSwapBtn = () => {
    const destTokenNew = { ...srcToken } as TokenAndChain;
    dispatch(formActions.setSrcToken({ ...destToken } as TokenAndChain));
    dispatch(formActions.setDestToken(destTokenNew));
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
                <FormInput
                  type={ExchangeTx.Sell}
                  formToken={srcToken}
                  formAmtInput={srcAmtInput}
                  formAmtBN={srcAmtBN}
                />

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
                <FormInput
                  formToken={destToken}
                  formAmtInput={destAmtInput}
                  formAmtBN={destAmtBN}
                />
              </div>
            </div>

            {quote?.status === "error" && (
              <Alert
                title="Quote Error"
                message={capitalize((quote as SkipErrorState).response)}
                status={quote.status}
                className="mt-[0.625rem]"
              />
            )}

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