import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { WalletKey } from "../../constants";
import { getWalletType, truncateStr } from "../../utils";

interface ConnectStateContextProps {
  connectorId?: WalletKey;
  shortAddr?: string;

  handleDisconnect: () => void;

  handleOpenConnectDialog: () => void;
  handleCloseConnectDialog: () => void;
  openConnectDialog: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const ConnectStateContext = React.createContext<ConnectStateContextProps | undefined>(undefined);

export const ConnectStateProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;

  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();

    const [openConnectDialog, setOpenConnectDialog] = React.useState<boolean>(false);

  const connectorId = React.useMemo(() => getWalletType(connector?.id), [connector])
  const shortAddr = React.useMemo(() => address ? truncateStr(address, 5, 2) : undefined, [address]);

  const handleDisconnect = React.useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleOpenConnectDialog = () => setOpenConnectDialog(true);
  const handleCloseConnectDialog = () => setOpenConnectDialog(false);

  return (
    <ConnectStateContext.Provider value={{
      connectorId,
      shortAddr,

      handleDisconnect,

      handleCloseConnectDialog,
      handleOpenConnectDialog,
      openConnectDialog,
    }}>
      {children}
    </ConnectStateContext.Provider>
  );
};