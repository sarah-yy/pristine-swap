import clsx from "clsx";
import React from "react";
import { ChevronIcon } from "../../../../../assets";
import { IconButton, TokenIcon } from "../../../../../components";
import { TokenInfo } from "../../../../../constants";
import { useSelect, useTokenSelectionContext } from "../../../../../hooks";

const SelectChainPage: React.FC = () => {
  const { currentPage, goToPreviousPage, selectedToken } = useTokenSelectionContext();
  const theme = useSelect((store) => store.app.theme);
  const selectedTokenChains = useSelect((store) => store.token.symbolToTokenInfoMap[selectedToken ?? ""]);
  const firstChain = selectedTokenChains?.[0];
  const firstTokenInfo = useSelect((store) => store.token.tokens[firstChain?.chainId ?? ""]?.[firstChain?.denom]);

  if (!selectedToken || !selectedTokenChains || !firstTokenInfo) return null;

  console.log("selectedTokenChains", selectedTokenChains);

  return (
    <div
      className={clsx(
        "select-chain-page",
        "z-20",
        "absolute",
        "top-0",
        "w-full",
        "h-full",
        `primary-bg--${theme}`,
        "flex",
        "flex-col",
        { active: currentPage === 1 },
      )}
    >
      <div className="flex items-center gap-3">
        <IconButton className="back-btn" onClick={goToPreviousPage}>
          <ChevronIcon className="chevron-back" />
        </IconButton>

        <div className="flex items-center gap-2">
          <TokenIcon className="w-8 h-8" srcUrl={firstTokenInfo.logoUri} />

          <div className="font-semibold text-body1 mt-[1px]">
            {selectedToken}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {selectedTokenChains.map((tokenChain: TokenInfo) => {
          console.log("tokenChain", tokenChain);
          return (
            <div
              key={`${tokenChain.denom}-${tokenChain.chainId}`}
              className={clsx("border-radius", `secondary-bg--${theme}`, "p-1")}
            >
              {tokenChain.chainId}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectChainPage;