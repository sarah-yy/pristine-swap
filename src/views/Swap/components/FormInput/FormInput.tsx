import clsx from "clsx";
import React from "react";
import { ChevronIcon } from "../../../../assets";
import { ChainIcon, ThemedSvgIcon, TokenIcon } from "../../../../components";
import { BaseDivProps, ExchangeKeyType, ExchangeTx, Theme } from "../../../../constants";
import { useSelect, useTokenSelectionContext } from "../../../../hooks";

interface Props extends BaseDivProps {
  type?: ExchangeKeyType;
}

const FormInput: React.FC<Props> = (props: Props) => {
  const { className, type = ExchangeTx.Buy } = props;
  const theme = useSelect((store) => store.app.theme);
  const { handleOpenTokenDialog } = useTokenSelectionContext();
  const formToken = useSelect((store) => store.form.form[type === ExchangeTx.Sell ? "srcToken" : "destToken"]);
  const chainInfo = useSelect((store) => store.chain.chains[formToken.chainId]);
  const tokenInfo = useSelect((store) => store.token.tokens[formToken.chainId]?.[formToken.denom.toLowerCase()]);
  return (
    <div
      className={clsx({
        "form-input-light": theme === Theme.Light,
        "form-input-dark": theme === Theme.Dark,
      },
      "form-input border-radius w-full grid gap-[1.125rem] grid-cols-[11rem_auto]",
      className,
      )}
    >
      {/* Left Section */}
      <div className="grid grid-cols-1 gap-y-[0.5rem] grid-rows-[1rem_3rem_auto]">
        <div className="text-body3 capitalize text-start">{type}</div>

        {/* Token Selection */}
        <button
          className={clsx({
            "token-select-btn-light": theme === Theme.Light,
            "token-select-btn-dark": theme === Theme.Dark,
          }, "flex gap-x-[0.75rem] items-center p-[0.25rem] token-select-btn rounded-lg relative overflow-hidden")}
          onClick={() => handleOpenTokenDialog(type)}
        >
          {/* Asset Icon */}
          <div className="flex items-center">
            <div className="w-10 h-10 relative">
              <TokenIcon className="w-9 h-9 absolute right-0 top-0" srcUrl={tokenInfo?.logoUri} />
              <ChainIcon className="w-4 h-4 absolute bottom-0 left-0" srcUrl={chainInfo?.logoUrl} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-[0.125rem] text-body2 text-ellipsis">
            <div className="flex justify-start items-center gap-[0.125rem]">
              <div className="font-semibold">{tokenInfo?.symbol}</div>
              <ThemedSvgIcon className="w-[0.875rem] h-[0.875rem]" svgComponent={ChevronIcon} />
            </div>

            <div
              className={clsx({
                "secondary-text--light": theme === Theme.Light,
                "secondary-text--dark": theme === Theme.Dark,
              },
              "text-body3 text-start text-ellipsis",
              )}
            >
              via {chainInfo?.displayName}
            </div>
          </div>
        </button>

        <div />
      </div>

      {/* Right Section */}
      <div className="grid grid-cols-1 gap-y-[0.25rem] justify-end">
        <div className="text-body3">&nbsp;</div>

        <input type="number" className="blank-input text-h4 font-semibold text-right" />

        <div className="text-body3 secondary-text--light flex items-end justify-end">$0</div>
      </div>
    </div>
  );
};

export default FormInput;