import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";
import React, { ChangeEvent } from "react";
import { SearchIcon } from "../../../../../assets";
import { ContainedButton, ThemedSvgIcon, TokenIcon } from "../../../../../components";
import { PathColor, SkipToken, TokenAndChain } from "../../../../../constants";
import { useSelect, useTokenSelectionContext } from "../../../../../hooks";

const SelectTokenPage: React.FC = () => {
  const theme = useSelect((store) => store.app.theme);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const symbolToTokenAndChainMap = useSelect((store) => store.token.symbolToTokenAndChainMap);
  const [search, setSearch] = React.useState<string>("");

  const symbolTokenChainEntries = React.useMemo(() => {
    const searchLower = search.toLowerCase();
    return Object.entries(symbolToTokenAndChainMap).filter(([symbol, _]: [string, TokenAndChain[]]) => {
      return symbol.toLowerCase().includes(searchLower);
    });
  }, [symbolToTokenAndChainMap, search]);

  const virtualizer = useVirtualizer({
    count: symbolTokenChainEntries.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    scrollToFn: () => null,
    gap: 6,
  });
  const items = virtualizer.getVirtualItems();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <React.Fragment>
      <div
        className={clsx(
          `secondary-bg--${theme}`,
          "drop-shadow-lg",
          "px-3",
          "py-2",
          "border-radius",
          "flex",
          "items-center",
          "gap-3",
        )}
      >
        <ThemedSvgIcon className="w-5 h-5" fillType={PathColor.Fill} svgComponent={SearchIcon} />
        
        <input
          type="text"
          className={clsx("text-body3", `secondary-text--${theme}`, "blank-input", "w-full")}
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div
        className={clsx(
          "max-h-[20rem]",
          "min-h-[20rem]",
          "overflow-auto",
          `div-scroll--${theme}`,
          "mt-3",
        )}
        ref={parentRef}
      >
        <div
          className="relative flex flex-col gap-1"
          style={{ height: virtualizer.getTotalSize() }}
        >
          {items.map((virtualRow: VirtualItem) => {
            const [symbol, chains] = symbolTokenChainEntries[virtualRow.index];
            return (
              <TokenOption
                chains={chains}
                dataIndex={virtualRow.index}
                key={virtualRow.key}
                height={virtualRow.size}
                startPos={virtualRow.start}
                symbol={symbol}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

interface TokenOptionProps {
  chains: TokenAndChain[];
  dataIndex: number;
  height: number;
  startPos: number;
  symbol: string;
}

const TokenOption: React.FC<TokenOptionProps> = (props: TokenOptionProps) => {
  const { chains, dataIndex, height, startPos, symbol } = props;
  const theme = useSelect((store) => store.app.theme);
  const firstChain = chains[0];
  const firstTokenData: SkipToken | undefined = useSelect((store) => store.token.tokens[firstChain?.chainId ?? ""]?.[firstChain?.denom ?? ""]);
  const { goToNextPage, handleSelectToken } = useTokenSelectionContext();

  const handleClickToken = () => {
    handleSelectToken(symbol);
    goToNextPage();
  };

  return (
    <ContainedButton
      className={clsx(
        "flex",
        "gap-3",
        "items-center",
        "absolute",
        "top-0",
        "left-0",
        "w-full",
      )}
      data-index={dataIndex}
      style={{
        height: height,
        transform: `translateY(${startPos}px)`,
      }}
      color="plain"
      onClick={handleClickToken}
    >
      <TokenIcon className="w-8 h-8" srcUrl={firstTokenData?.logoUri} />

      <div className="font-semibold text-body1">
        {symbol}
      </div>

      <div className={clsx("text-body3", `secondary-text--${theme}`, "mt-[1px]")}>
        {chains.length} network{chains.length !== 1 && "s"}
      </div>
    </ContainedButton>
  );
};

export default SelectTokenPage;