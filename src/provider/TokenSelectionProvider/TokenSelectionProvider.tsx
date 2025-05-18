import React from "react";
import { useDispatch } from "react-redux";
import { ExchangeKeyType, ExchangeTx, TokenAndChain } from "../../constants";
import { formActions } from "../../stores";

interface TokenSelectionContextProps {
  handleOpenTokenDialog: (inputType: ExchangeKeyType) => void; // eslint-disable-line no-unused-vars
  handleCloseTokenDialog: () => void;
  openTokenDialog: boolean;

  goToNextPage: () => void;
  goToPreviousPage: () => void;
  currentPage: SlideNum;

  handleSelectToken: (symbol: string) => void; // eslint-disable-line no-unused-vars
  resetSelectToken: () => void;
  selectedToken?: string;

  handleSelectFormToken: (formToken: TokenAndChain) => void; // eslint-disable-line no-unused-vars
}

type SlideNum = 0 | 1;

// eslint-disable-next-line react-refresh/only-export-components
export const TokenSelectionContext = React.createContext<TokenSelectionContextProps | undefined>(undefined);

export const TokenSelectionProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;
  const dispatch = useDispatch();

  const [openTokenDialog, setOpenTokenDialog] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<SlideNum>(0);
  const [selectedToken, setSelectedToken] = React.useState<string | undefined>(undefined);
  const [inputType, setInputType] = React.useState<ExchangeKeyType | undefined>(undefined);

  const handleSelectToken = (symbol: string) => setSelectedToken(symbol);
  const resetSelectToken = () => setSelectedToken(undefined);

  const handleOpenTokenDialog = (inputType: ExchangeKeyType) => {
    setInputType(inputType);
    setOpenTokenDialog(true);
  };

  const handleCloseTokenDialog = () => {
    setOpenTokenDialog(false);
    resetSelectToken();
    setInputType(undefined);
  };

  const goToNextPage = () => setCurrentPage(1);
  const goToPreviousPage = () => setCurrentPage(0);

  const handleSelectFormToken = (formToken: TokenAndChain) => {
    if (!inputType) return;

    dispatch(formActions.setFormToken({
      type: inputType === ExchangeTx.Sell ? "srcToken" : "destToken",
      token: formToken,
    }));
    handleCloseTokenDialog();
  };

  return (
    <TokenSelectionContext.Provider value={{
      handleCloseTokenDialog,
      handleOpenTokenDialog,
      openTokenDialog,

      goToNextPage,
      goToPreviousPage,
      currentPage,

      handleSelectToken,
      resetSelectToken,
      selectedToken,

      handleSelectFormToken,
    }}>
      {children}
    </TokenSelectionContext.Provider>
  );
};