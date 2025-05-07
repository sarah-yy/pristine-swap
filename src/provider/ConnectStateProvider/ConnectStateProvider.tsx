import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { WalletKey } from "../../constants";
import { KeplrTypes, LeapTypes } from "../../types";
import { getWalletType, truncateStr } from "../../utils";

interface ConnectStateContextProps {
  connectorId?: WalletKey;
  shortAddr?: string;
  isWalletConnected: boolean;

  handleConnectKeplr: () => Promise<void>;
  keplrInstance?: KeplrTypes.Keplr.Keplr;
  setKeplrInstance: React.Dispatch<React.SetStateAction<KeplrTypes.Keplr.Keplr | undefined>>;

  handleConnectLeap: () => Promise<void>;
  leapInstance?: LeapTypes.Leap.Leap;
  setLeapInstance: React.Dispatch<React.SetStateAction<LeapTypes.Leap.Leap | undefined>>;

  handleDisconnect: () => void;
  handleDisconnectCosmosWallets: () => void;

  handleOpenConnectDialog: () => void;
  handleCloseConnectDialog: () => void;
  openConnectDialog: boolean
}

interface WalletDetails {
  address?: string;
  connectorId?: WalletKey;
}

const tempCosmosChain: string = "cosmoshub-4";

// eslint-disable-next-line react-refresh/only-export-components
export const ConnectStateContext = React.createContext<ConnectStateContextProps | undefined>(undefined);

export const ConnectStateProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;

  const { address: evmAddress, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [keplrInstance, setKeplrInstance] = React.useState<KeplrTypes.Keplr.Keplr | undefined>(undefined);
  const [leapInstance, setLeapInstance] = React.useState<LeapTypes.Leap.Leap | undefined>(undefined);
  const [cosmosWalletDetails, setCosmosWalletDetails] = React.useState<WalletDetails | undefined>(undefined);
  // const [isCosmosWalletConnecting, setIsCosmosWalletConnecting] = React.useState<boolean>(false);
  const [openConnectDialog, setOpenConnectDialog] = React.useState<boolean>(false);

  const connectorId = React.useMemo(() => cosmosWalletDetails?.connectorId ?? getWalletType(connector?.id), [cosmosWalletDetails, connector]);
  const shortAddr = React.useMemo(() => {
    const address: string | undefined = cosmosWalletDetails?.address ?? evmAddress;
    return address ? truncateStr(address, 5, 2) : undefined;
  }, [evmAddress, cosmosWalletDetails]);
  const isWalletConnected = React.useMemo(() => {
    if (cosmosWalletDetails) return true
    return isConnected
  }, [cosmosWalletDetails, isConnected])

  const handleDisconnectCosmosWallets = () => {
    setCosmosWalletDetails(undefined);
  };

  const handleDisconnect = React.useCallback(() => {
    handleDisconnectCosmosWallets();

    if (isConnected) {
      disconnect()
    }
  }, [disconnect, isConnected]);

  const handleConnectKeplr = React.useCallback(async () => {
    if (!keplrInstance) throw new Error("Pls download Keplr extension.");

    // Disconnect all other wallets before reconnecting
    handleDisconnect();
  
    await keplrInstance.enable(tempCosmosChain);
    const key = await keplrInstance.getKey(tempCosmosChain);
    setCosmosWalletDetails({
      address: key.bech32Address,
      connectorId: WalletKey.Keplr,
    });
  }, [keplrInstance, handleDisconnect]);

  const handleConnectLeap = React.useCallback(async () => {
    if (!leapInstance) throw new Error("Pls download Leap extension.");

    // Disconnect all other wallets before reconnecting
    handleDisconnect();

    await leapInstance.enable(tempCosmosChain);
    const key = await leapInstance.getKey(tempCosmosChain);
    setCosmosWalletDetails({
      address: key.bech32Address,
      connectorId: WalletKey.Leap,
    });
  }, [leapInstance]);

  const handleOpenConnectDialog = () => setOpenConnectDialog(true);
  const handleCloseConnectDialog = () => setOpenConnectDialog(false);

  return (
    <ConnectStateContext.Provider value={{
      connectorId,
      shortAddr,
      isWalletConnected,

      handleConnectKeplr,
      keplrInstance,
      setKeplrInstance,

      handleConnectLeap,
      leapInstance,
      setLeapInstance,

      handleDisconnect,
      handleDisconnectCosmosWallets,

      handleCloseConnectDialog,
      handleOpenConnectDialog,
      openConnectDialog,
    }}>
      {children}
    </ConnectStateContext.Provider>
  );
};