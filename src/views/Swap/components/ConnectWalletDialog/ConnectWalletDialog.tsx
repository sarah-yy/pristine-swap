import { ConnectButton } from "@rainbow-me/rainbowkit";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Connector, CreateConnectorFn, useAccount, useConnect, useDisconnect } from "wagmi";
import { WalletKey, WalletKeyEnumType, WalletItem, evmWallets, keplrWallet, leapWallet, overrideWalletKeys } from "../../../../constants";
import { ContainedButton, StandardDialog, WalletIcon } from "../../../../components";
import { useConnectStateContext, useSelect, useToastContext } from "../../../../hooks";
import { appActions } from "../../../../stores";
import { capitalize, truncateStr } from "../../../../utils";

const ConnectWalletDialog: React.FC = () => {
  const { handleDisconnectCosmosWallets, openConnectMode, handleConnectKeplr, handleConnectLeap, handleCloseConnectDialog, connectingId, setConnectingId } = useConnectStateContext();
  const toast = useToastContext();

  const { connector, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();
  const srcToken = useSelect((store) => store.form.form.srcToken);
  const srcTokenDetails = useSelect((store) => store.token.tokens[srcToken.chainId]?.[srcToken.denom.toLowerCase()]);
  const primaryWallet = useSelect((store) => store.app.primaryWallet);

  const [showKeplr, setShowKeplr] = React.useState<boolean>(false);
  const [showLeap, setShowLeap] = React.useState<boolean>(false);
  const [connectRainbowkit, setConnectRainbowkit] = React.useState<boolean>(false);

  const isEvenItems = React.useMemo((): boolean => {
    let walletsCount = evmWallets.length + 1;
    if (showKeplr) walletsCount++;
    if (showLeap) walletsCount++;
    // If wallet is already connected, remove the current wallet from the count
    if (primaryWallet?.connectorId) walletsCount--;
    return walletsCount % 2 === 0;
  }, [showKeplr, showLeap, primaryWallet]);

  const onConnectKeplr = React.useCallback(async () => {
    if (!srcToken?.chainId) return;
    await handleConnectKeplr(srcToken.chainId);
  }, [srcToken.chainId, handleConnectKeplr]);

  const handleConnect = (connector?: Connector<CreateConnectorFn>) => {
    if (!connector) return;

    handleDisconnectCosmosWallets();
    setConnectingId(connector.id.toLowerCase());

    if (isConnected && connector) {
      disconnect();
      connect({ connector }, {
        onSuccess: (data) => {
          if (openConnectMode === "open_setPrimary") {
            const address = data.accounts[0];
            dispatch(appActions.setPrimaryWallet({
              address,
              connectorId: connector.id.toLowerCase(),
              shortAddress: truncateStr(address, 5, 2),
              isEVM: true,
            }));
          }
          handleCloseConnectDialog();
          setConnectingId(undefined);
        },
        onError: (error) => {
          console.error(error.message);
          toast.error({
            title: `${capitalize(connector.name)} Error`,
            message: error.message,
          });
          setConnectingId(undefined);
        },
      });
      return;
    }

    connect({ connector }, {
      onSuccess: (data) => {
        if (openConnectMode === "open_setPrimary") {
          const address = data.accounts[0];
          dispatch(appActions.setPrimaryWallet({
            address,
            connectorId: connector.id.toLowerCase(),
            shortAddress: truncateStr(address, 5, 2),
            isEVM: true,
          }));
        }
        handleCloseConnectDialog();
        setConnectingId(undefined);
      },
      onError: (error) => {
        console.error(error.message);
        toast.error({
          title: `${capitalize(connector.name)} Error`,
          message: error.message,
        });
        setConnectingId(undefined);
      },
    });
  };

  const onConnectLeap = React.useCallback(async () => {
    if (!srcToken?.chainId) return;
    await handleConnectLeap(srcToken.chainId);
  }, [srcToken.chainId, handleConnectLeap]);

  useEffect(() => {
    if (openConnectMode) {
      const isCosmosToken = !srcTokenDetails?.isEVM && !srcTokenDetails?.isSVM;

      const keplrInstance = (window as any).keplr;
      setShowKeplr(!!keplrInstance && isCosmosToken);

      const leapInstance = (window as any).leap;
      setShowLeap(!!leapInstance && isCosmosToken);
    }
    return () => {
      setShowKeplr(false);
      setShowLeap(false);
    };
  }, [openConnectMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StandardDialog open={!!openConnectMode} onClose={handleCloseConnectDialog} cardClass="connect-wallet-dialog">
      <div className="grid grid-cols-1 gap-4 md:gap-5">
        <h4 className="font-semibold text-start text-h5 md:text-h4">Connect Wallet</h4>

        <div className="grid grid-cols-2 gap-2">
          {showKeplr && primaryWallet?.connectorId !== WalletKey.Keplr && (
            <WalletConnectBtn
              walletKey={keplrWallet.key}
              label={keplrWallet.label}
              connectFunc={onConnectKeplr}
              loading={connectingId === WalletKey.Keplr}
            />
          )}

          {showLeap && primaryWallet?.connectorId !== WalletKey.Leap && (
            <WalletConnectBtn
              walletKey={leapWallet.key}
              label={leapWallet.label}
              connectFunc={onConnectLeap}
              loading={connectingId === WalletKey.Leap}
            />
          )}

          {srcTokenDetails?.isEVM && (
            <React.Fragment>
              {evmWallets.map((wallet: WalletItem) => {
                const connector = connectors.find((connector) => {
                  return wallet.key === connector.id.toLowerCase();
                });
                const walletKey = (connector?.id.toLowerCase() as WalletKeyEnumType) ?? wallet.key;

                if (primaryWallet?.connectorId === walletKey) return null;

                return (
                  <WalletConnectBtn
                    walletKey={walletKey}
                    connectFunc={() => handleConnect(connector)}
                    label={wallet.label}
                    key={walletKey}
                    loading={connectingId === walletKey}
                  />
                );
              })}

              {/* In case desired wallet is not found */}
              <ConnectButton.Custom>
                {({
                  account,
                  openConnectModal,
                  mounted,
                  authenticationStatus,
                }) => {
                  // Note: If your app doesn't use authentication, you
                  // can remove all 'authenticationStatus' checks
                  const ready = mounted && authenticationStatus !== "loading";

                  const handleConnectSwitch = () => {
                    handleDisconnectCosmosWallets();

                    if (!!account) {
                      disconnect();
                    }
                    openConnectModal();
                    setConnectRainbowkit(true);
                  };

                  useEffect(() => { // eslint-disable-line react-hooks/rules-of-hooks
                    if (connectRainbowkit && account?.address) {
                      if (openConnectMode === "open_setPrimary") {
                        dispatch(appActions.setPrimaryWallet({
                          address: account.address,
                          connectorId: overrideWalletKeys[connector?.id.toLowerCase() ?? ""] ?? connector?.id.toLowerCase(),
                          shortAddress: truncateStr(account.address, 5, 2),
                          isEVM: true,
                        }));
                      }
                      handleCloseConnectDialog();
                      setConnectRainbowkit(false);
                    }
                  }, [connectRainbowkit, account?.address]); // eslint-disable-line react-hooks/exhaustive-deps

                  return (
                    <OthersConnectBtn
                      connectFunc={handleConnectSwitch}
                      isEvenItems={isEvenItems}
                      ready={ready}
                    />
                  );
                }}
              </ConnectButton.Custom>
            </React.Fragment>
          )}
        </div>
      </div>
    </StandardDialog>
  );
};

interface WalletConnectProps {
  className?: string;
  connectFunc: () => void;
  label: string;
  walletKey: WalletKeyEnumType;
  loading?: boolean;
}

const WalletConnectBtn: React.FC<WalletConnectProps> = (props: WalletConnectProps) => {
  const { isWalletConnecting } = useConnectStateContext();
  const { className, connectFunc, label, walletKey, loading } = props;
  return (
    <ContainedButton
      className={clsx(
        "flex",
        "items-center",
        { "justify-center": loading },
        "gap-2",
        "h-[3.25rem]",
        className,
      )}
      disabled={isWalletConnecting}
      onClick={connectFunc}
      color="plain"
      loading={loading}
      customLoaderSize={20}
    >
      <WalletIcon walletKey={walletKey} className="wallet-btn-icon" />
      <div className="mt-[0.125rem] lg:mt-1 text-body2">{label}</div>
    </ContainedButton>
  );
};

interface OthersConnectProps {
  connectFunc: () => void;
  isEvenItems: boolean;
  ready: boolean;
}

const OthersConnectBtn: React.FC<OthersConnectProps> = (props: OthersConnectProps) => {
  const { connectFunc, isEvenItems, ready } = props;

  return (
    <div
      {...(!ready && {
        "aria-hidden": true,
        "style": {
          opacity: 0,
          pointerEvents: "none",
          userSelect: "none",
        },
      })}
      className={!isEvenItems ? "col-span-2" : ""}
    >
      <WalletConnectBtn
        className="w-full"
        connectFunc={connectFunc}
        label="Others"
        walletKey={WalletKey.WalletConnect}
      />
    </div>
  );
};

export default ConnectWalletDialog;