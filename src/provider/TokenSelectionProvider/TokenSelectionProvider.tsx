import React from "react";

interface TokenSelectionContextProps {
  handleOpenTokenDialog: () => void;
  handleCloseTokenDialog: () => void;
  openTokenDialog: boolean;

  goToNextPage: () => void;
  goToPreviousPage: () => void;
  currentPage: SlideNum;

  handleSelectToken: (symbol: string) => void;
  selectedToken?: string;
}

type SlideNum = 0 | 1;

// eslint-disable-next-line react-refresh/only-export-components
export const TokenSelectionContext = React.createContext<TokenSelectionContextProps | undefined>(undefined);

export const TokenSelectionProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;

  const [openTokenDialog, setOpenTokenDialog] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<SlideNum>(0);
  const [selectedToken, setSelectedToken] = React.useState<string | undefined>(undefined);

  const handleOpenTokenDialog = () => setOpenTokenDialog(true);
  const handleCloseTokenDialog = () => setOpenTokenDialog(false);

  const goToNextPage = () => setCurrentPage(1);
  const goToPreviousPage = () => setCurrentPage(0);

  const handleSelectToken = (symbol: string) => setSelectedToken(symbol);

  return (
    <TokenSelectionContext.Provider value={{
      handleCloseTokenDialog,
      handleOpenTokenDialog,
      openTokenDialog,

      goToNextPage,
      goToPreviousPage,
      currentPage,

      handleSelectToken,
      selectedToken,
    }}>
      {children}
    </TokenSelectionContext.Provider>
  );
};