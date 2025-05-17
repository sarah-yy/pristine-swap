import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";
import React from "react";
import { ChevronIcon } from "../../../../../assets";
import { ChainIcon, ContainedButton, IconButton, TokenIcon } from "../../../../../components";
import { TokenAndChain } from "../../../../../constants";
import { useSelect, useTokenSelectionContext } from "../../../../../hooks";

const SelectChainPage: React.FC = () => {
  const { currentPage, goToPreviousPage, selectedToken } = useTokenSelectionContext();
  const theme = useSelect((store) => store.app.theme);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const selectedTokenChains = useSelect((store) => store.token.symbolToTokenAndChainMap[selectedToken ?? ""]);
  const firstChain = selectedTokenChains?.[0];
  const firstTokenInfo = useSelect((store) => store.token.tokens[firstChain?.chainId ?? ""]?.[firstChain?.denom.toLowerCase() ?? ""]);

  const virtualizer = useVirtualizer({
    count: selectedTokenChains?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    scrollToFn: () => null,
    gap: 6,
  });
  const items = virtualizer.getVirtualItems();

  if (!selectedToken || !selectedTokenChains?.length || !firstTokenInfo) return null;

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
        "gap-4",
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

      <div className="flex flex-col gap-2">
        <div className={clsx("text-body3", `secondary-text--${theme}`, "text-start")}>
          {selectedTokenChains.length} networks
        </div>

        <div
          className={clsx(
            "w-full",
            "overflow-auto",
            `div-scroll--${theme}`,
            "max-h-[18.625rem]",
            "min-h-[18.625rem]",
          )}
          ref={parentRef}
        >
          <div
            className="relative flex flex-col gap-1"
            style={{ height: virtualizer.getTotalSize() }}
          >
            {items.map((virtualRow: VirtualItem) => {
              const currentChain = selectedTokenChains[virtualRow.index];
              return (
                <ChainOption
                  currentChain={currentChain}
                  dataIndex={virtualRow.index}
                  key={virtualRow.key}
                  height={virtualRow.size}
                  startPos={virtualRow.start}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChainOptionProps {
  currentChain?: TokenAndChain;
  dataIndex: number;
  height: number;
  startPos: number;
}

const ChainOption: React.FC<ChainOptionProps> = (props: ChainOptionProps) => {
  const { handleSelectFormToken } = useTokenSelectionContext();
  const { currentChain, dataIndex, height, startPos } = props;
  const chainsMap = useSelect((store) => store.chain.chains);
  const chainInfo = chainsMap[currentChain?.chainId ?? ""];

  const handleOnClick = () => {
    if (!currentChain) return;
    handleSelectFormToken(currentChain);
  };

  if (!chainInfo) return null;

  return (
    <ContainedButton
      key={`${currentChain!.denom}-${currentChain!.chainId}`}
      className={clsx(
        "flex",
        "gap-3",
        "items-center",
        "absolute",
        "w-full",
      )}
      color="plain"
      data-index={dataIndex}
      style={{
        height: height,
        transform: `translateY(${startPos}px)`,
      }}
      onClick={handleOnClick}
    >
      <ChainIcon className="w-8 h-8" srcUrl={chainInfo.logoUrl} />
      <div className={clsx("text-body1", "font-semibold")}>{chainInfo.displayName}</div>
    </ContainedButton>
  );
};

export default SelectChainPage;