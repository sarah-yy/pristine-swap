import BigNumber from "bignumber.js";
import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { ChevronIcon } from "../../../../assets";
import { ChainIcon, OutlinedButton, ThemedSvgIcon, TokenIcon, ValueFormatter } from "../../../../components";
import { BaseDivProps, ExchangeKeyType, ExchangeTx, Size, Theme, TokenAndChain } from "../../../../constants";
import { useDebounce, useSelect, useTokenSelectionContext } from "../../../../hooks";
import { formActions } from "../../../../stores";
import { bnOrZero } from "../../../../utils";

interface Props extends BaseDivProps {
  type?: ExchangeKeyType;
  formToken: TokenAndChain;
  formAmtBN: BigNumber;
  formAmtInput: string;
}

const FormInput: React.FC<Props> = (props: Props) => {
  const { className, formAmtBN, formAmtInput, formToken, type = ExchangeTx.Buy } = props;
  const isSellTx = type === ExchangeTx.Sell;
  const dispatch = useDispatch();

  const theme = useSelect((store) => store.app.theme);
  const { handleOpenTokenDialog } = useTokenSelectionContext();
  const isConnected = useSelect((store) => !!store.app.primaryWallet);

  const chainInfo = useSelect((store) => store.chain.chains[formToken?.chainId ?? ""]);
  const tokenInfo = useSelect((store) => store.token.tokens[formToken?.chainId ?? ""]?.[formToken?.denom.toLowerCase() ?? ""]);
  const tokenBalance = useSelect((store) => isSellTx ? store.balance.balances[formToken?.chainId ?? ""]?.[formToken?.denom ?? ""] : undefined);

  const handleClickMax = React.useCallback(() => {
    if (!isSellTx || !tokenBalance) return;
    const tokenBalanceBN = tokenBalance.formattedAmountBN;
    dispatch(formActions.setSrcAmountBN(tokenBalanceBN));
    dispatch(formActions.setSrcAmountInput(tokenBalanceBN.toString(10)));
  }, [isSellTx, tokenBalance]); // eslint-disable-line react-hooks/exhaustive-deps

  const debounceInputQuery = useDebounce((inputValue: BigNumber, isSell: boolean) => {
    const valueBN = inputValue.decimalPlaces(tokenInfo?.decimals ?? 0, BigNumber.ROUND_DOWN);
    if (isSell) {
      dispatch(formActions.setSrcAmountBN(valueBN));
      if (!valueBN.isZero()) dispatch(formActions.querySkipQuote({ amountIn: valueBN }));
    } else {
      dispatch(formActions.setDestAmountBN(valueBN));
      if (!valueBN.isZero()) dispatch(formActions.querySkipQuote({ amountOut: valueBN }));
    }
  }, 500);

  const handleOnChange = (isSellTx: boolean) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value;
      const inputBN = bnOrZero(inputValue);
      if (isSellTx) {
        dispatch(formActions.setSrcAmountInput(inputValue));
      } else {
        dispatch(formActions.setDestAmountInput(inputValue));
      }
      debounceInputQuery(inputBN, isSellTx);
    };
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const usdValue = React.useMemo(() => {
    return formAmtBN.times(bnOrZero(tokenBalance?.price));
  }, [tokenBalance?.price, formAmtBN]);

  return (
    <div
      className={clsx(
        `tertiary-bg--${theme}`,
        "form-input",
        "border-radius",
        "w-full",
        "grid",
        "gap-[1.125rem]",
        "grid-cols-[11rem_auto]",
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
      <div className="grid grid-cols-1 gap-y-[0.375rem] justify-end">
        <div className="flex justify-end items-center text-body3 font-semibold gap-[0.375rem]">
          {isConnected && tokenBalance ? (
            <React.Fragment>
              <div>
                Balance:&nbsp;
                <ValueFormatter value={bnOrZero(tokenBalance.formattedAmount)} />
              </div>

              <OutlinedButton size={Size.XS} onClick={handleClickMax}>
                Max
              </OutlinedButton>
            </React.Fragment>
          ) : (
            <React.Fragment>&nbsp;</React.Fragment>
          )}
        </div>

        <input
          type="number"
          className="blank-input text-h4 font-semibold text-right"
          value={formAmtInput}
          onChange={handleOnChange(isSellTx)}
          onKeyDown={handleOnKeyDown}
        />

        <div className="text-body3 secondary-text--light flex items-end justify-end">
          <ValueFormatter value={usdValue} prefix="$" />
        </div>
      </div>
    </div>
  );
};

export default FormInput;