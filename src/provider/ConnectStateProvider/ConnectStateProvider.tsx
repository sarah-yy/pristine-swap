import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { WalletKey, WalletKeyEnumType } from "../../constants";
import { useToastContext } from "../../hooks";
import { KeplrTypes, LeapTypes } from "../../types";
import { getWalletType, truncateStr } from "../../utils";

interface ConnectStateContextProps {
  // Wallet connection status
  isWalletConnecting: boolean;
  isWalletConnected: boolean;

  aggWalletDetails?: WalletDetails;

  handleConnectKeplr: () => Promise<void>;
  handleConnectLeap: () => Promise<void>;

  handleDisconnect: () => void;
  handleDisconnectCosmosWallets: () => void;

  handleOpenConnectDialog: () => void;
  handleCloseConnectDialog: () => void;
  openConnectDialog: boolean;
}

interface WalletDetails {
  address?: string;
  connectorId?: WalletKeyEnumType;
  shortAddress?: string;
}

const tempCosmosChain: string = "cosmoshub-4";

// eslint-disable-next-line react-refresh/only-export-components
export const ConnectStateContext = React.createContext<ConnectStateContextProps | undefined>(undefined);

const ConnectStateProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;

  const { address: evmAddress, connector, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const toast = useToastContext();

  const [cosmosWalletDetails, setCosmosWalletDetails] = React.useState<WalletDetails | undefined>(undefined);
  const [isCosmosWalletConnecting, setIsCosmosWalletConnecting] = React.useState<boolean>(false);
  const [openConnectDialog, setOpenConnectDialog] = React.useState<boolean>(false);

  const aggWalletDetails = React.useMemo((): WalletDetails => {
    const address: string | undefined = cosmosWalletDetails?.address ?? evmAddress;
    return {
      address,
      connectorId: cosmosWalletDetails?.connectorId ?? getWalletType(connector?.id),
      shortAddress: cosmosWalletDetails?.shortAddress ?? (
        address ? truncateStr(address, 5, 2) : undefined
      ),
    };
  }, [cosmosWalletDetails, connector, evmAddress]);

  const isWalletConnected = React.useMemo(() => {
    if (cosmosWalletDetails) return true;
    return isConnected;
  }, [cosmosWalletDetails, isConnected]);

  const isWalletConnecting = React.useMemo(() => {
    if (isCosmosWalletConnecting) return true;
    if (isConnecting) return true;
    return false;
  }, [isCosmosWalletConnecting, isConnecting]);

  const handleDisconnectCosmosWallets = () => {
    setCosmosWalletDetails(undefined);
  };

  const handleDisconnect = React.useCallback(() => {
    handleDisconnectCosmosWallets();

    if (isConnected) {
      disconnect();
    }
  }, [disconnect, isConnected]);

  const handleConnectKeplr = React.useCallback(async () => {
    if (!(window as any).keplr) throw new Error("Pls download Keplr extension.");
    const keplrInstance = (window as any).keplr as KeplrTypes.Keplr.Keplr;

    setIsCosmosWalletConnecting(true);

    // Disconnect all other wallets before reconnecting
    handleDisconnect();
  
    try {
      await keplrInstance.enable(tempCosmosChain);
      const key = await keplrInstance.getKey(tempCosmosChain);
      setCosmosWalletDetails({
        address: key.bech32Address,
        connectorId: WalletKey.Keplr,
        shortAddress: truncateStr(key.bech32Address, 5, 2),
      });
    } catch (err) {
      const errMsg = (err as Error).message;
      console.error(errMsg);
      toast.error({
        title: "Keplr Error",
        message: errMsg,
      });
    } finally {
      setIsCosmosWalletConnecting(false);
    }
  }, [handleDisconnect]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConnectLeap = React.useCallback(async () => {
    if (!(window as any).leap) throw new Error("Pls download Leap extension.");
    const leapInstance = (window as any).leap as LeapTypes.Leap.Leap;

    setIsCosmosWalletConnecting(true);

    // Disconnect all other wallets before reconnecting
    handleDisconnect();

    try {
      await leapInstance.enable(tempCosmosChain);
      const key = await leapInstance.getKey(tempCosmosChain);
      setCosmosWalletDetails({
        address: key.bech32Address,
        connectorId: WalletKey.Leap,
        shortAddress: truncateStr(key.bech32Address, 5, 2),
      });
    } catch (err) {
      const errMsg = (err as Error).message;
      console.error(errMsg);
      toast.error({
        title: "Leap Error",
        message: (err as Error).message,
      });
    } finally {
      setIsCosmosWalletConnecting(false);
    }
  }, [handleDisconnect]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenConnectDialog = () => setOpenConnectDialog(true);
  const handleCloseConnectDialog = () => setOpenConnectDialog(false);

  return (
    <ConnectStateContext.Provider value={{
      isWalletConnecting,
      isWalletConnected,

      aggWalletDetails,

      handleConnectKeplr,

      handleConnectLeap,

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

export default ConnectStateProvider;