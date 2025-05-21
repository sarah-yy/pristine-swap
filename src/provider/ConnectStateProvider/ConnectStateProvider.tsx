import React from "react";
import { useDispatch } from "react-redux";
import { useAccount, useDisconnect } from "wagmi";
import { WalletKey, WalletKeyEnumType } from "../../constants";
import { useSelect, useToastContext } from "../../hooks";
import { KeplrTypes, LeapTypes } from "../../types";
import { truncateStr } from "../../utils";
import { appActions } from "../../stores";

interface ConnectStateContextProps {
  // Wallet connection status
  isWalletConnecting: boolean;
  isWalletConnected: boolean;

  connectingId?: WalletKeyEnumType;
  setConnectingId: React.Dispatch<React.SetStateAction<WalletKeyEnumType | undefined>>;

  handleConnectKeplr: (tokenChain: string) => Promise<void>; // eslint-disable-line no-unused-vars
  handleConnectLeap: (tokenChain: string) => Promise<void>; // eslint-disable-line no-unused-vars

  handleDisconnect: () => void;
  handleDisconnectCosmosWallets: () => void;

  handleOpenConnectDialog: (isGetAddressMode?: boolean) => void;
  handleCloseConnectDialog: () => void;
  openConnectMode: OpenConnectMode;
}

type OpenConnectMode = false | "open_getAddress" | "open_setPrimary";

// eslint-disable-next-line react-refresh/only-export-components
export const ConnectStateContext = React.createContext<ConnectStateContextProps | undefined>(undefined);

const ConnectStateProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;

  const dispatch = useDispatch();
  const { isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const toast = useToastContext();
  const primaryWallet = useSelect((store) => store.app.primaryWallet);

  const [isCosmosWalletConnecting, setIsCosmosWalletConnecting] = React.useState<boolean>(false);
  const [connectingId, setConnectingId] = React.useState<WalletKeyEnumType | undefined>(undefined);
  const [openConnectMode, setOpenConnectMode] = React.useState<OpenConnectMode>(false);

  const isWalletConnected = React.useMemo(() => {
    if (!!primaryWallet) return true;
    return isConnected;
  }, [primaryWallet, isConnected]);

  const isWalletConnecting = React.useMemo(() => {
    if (isCosmosWalletConnecting) return true;
    if (isConnecting) return true;
    return false;
  }, [isCosmosWalletConnecting, isConnecting]);

  const handleDisconnectCosmosWallets = () => {
    dispatch(appActions.disconnectPrimaryWallet());
  };

  const handleDisconnect = React.useCallback(() => {
    if (isConnected) {
      disconnect();
    }
    dispatch(appActions.disconnectPrimaryWallet());
  }, [disconnect, isConnected]);

  const handleConnectKeplr = React.useCallback(async (chainId: string) => {
    if (!(window as any).keplr) throw new Error("Pls download Keplr extension.");
    const keplrInstance = (window as any).keplr as KeplrTypes.Keplr.Keplr;

    setIsCosmosWalletConnecting(true);
    setConnectingId(WalletKey.Keplr);

    // Disconnect all other wallets before reconnecting
    if (openConnectMode === "open_setPrimary") handleDisconnect();
  
    try {
      await keplrInstance.enable(chainId);
      const key = await keplrInstance.getKey(chainId);
      if (openConnectMode === "open_setPrimary") {
        dispatch(appActions.setPrimaryWallet({
          address: key.bech32Address,
          connectorId: WalletKey.Keplr,
          shortAddress: truncateStr(key.bech32Address, 5, 2),
          isEVM: false,
        }));
      }
      handleCloseConnectDialog();
    } catch (err) {
      const errMsg = (err as Error).message;
      console.error(errMsg);
      toast.error({
        title: "Keplr Error",
        message: errMsg,
      });
    } finally {
      setIsCosmosWalletConnecting(false);
      setConnectingId(undefined);
    }
  }, [handleDisconnect]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConnectLeap = React.useCallback(async (chainId: string) => {
    if (!(window as any).leap) throw new Error("Pls download Leap extension.");
    const leapInstance = (window as any).leap as LeapTypes.Leap.Leap;

    setIsCosmosWalletConnecting(true);
    setConnectingId(WalletKey.Leap);

    // Disconnect all other wallets before reconnecting
    handleDisconnect();

    try {
      await leapInstance.enable(chainId);
      const key = await leapInstance.getKey(chainId);
      if (openConnectMode === "open_setPrimary") {
        dispatch(appActions.setPrimaryWallet({
          address: key.bech32Address,
          connectorId: WalletKey.Leap,
          shortAddress: truncateStr(key.bech32Address, 5, 2),
          isEVM: false,
        }));
      }
      handleCloseConnectDialog();
    } catch (err) {
      const errMsg = (err as Error).message;
      console.error(errMsg);
      toast.error({
        title: "Leap Error",
        message: (err as Error).message,
      });
    } finally {
      setIsCosmosWalletConnecting(false);
      setConnectingId(undefined);
    }
  }, [handleDisconnect]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenConnectDialog = (isGetAddressMode?: boolean) => setOpenConnectMode(isGetAddressMode ? "open_getAddress" : "open_setPrimary");
  const handleCloseConnectDialog = () => setOpenConnectMode(false);

  return (
    <ConnectStateContext.Provider value={{
      isWalletConnecting,
      isWalletConnected,

      connectingId,
      setConnectingId,

      handleConnectKeplr,

      handleConnectLeap,

      handleDisconnect,
      handleDisconnectCosmosWallets,

      handleCloseConnectDialog,
      handleOpenConnectDialog,
      openConnectMode,
    }}>
      {children}
    </ConnectStateContext.Provider>
  );
};

export default ConnectStateProvider;