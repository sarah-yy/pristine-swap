import { ConnectButton, WalletButton } from "@rainbow-me/rainbowkit";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDisconnect, useSwitchAccount } from "wagmi";
import { WalletKey, WalletKeyEnumType, WalletItem, evmWallets, keplrWallet, leapWallet } from "../../../../constants";
import { StandardDialog, WalletIcon } from "../../../../components";
import { useConnectStateContext, useSelect } from "../../../../hooks";

const ConnectWalletDialog: React.FC = () => {
  const { aggWalletDetails, handleDisconnectCosmosWallets, openConnectDialog, handleConnectKeplr, handleConnectLeap, handleCloseConnectDialog } = useConnectStateContext();
  const { disconnect } = useDisconnect();
  const { switchAccount } = useSwitchAccount();
  const srcToken = useSelect((store) => store.form.form.srcToken);
  const srcTokenDetails = useSelect((store) => store.token.tokens[srcToken.chainId]?.[srcToken.denom.toLowerCase()]);

  const [showKeplr, setShowKeplr] = React.useState<boolean>(false);
  const [showLeap, setShowLeap] = React.useState<boolean>(false);

  const isEvenItems = React.useMemo((): boolean => {
    let walletsCount = evmWallets.length + 1;
    if (showKeplr) walletsCount++;
    if (showLeap) walletsCount++;
    // If wallet is already connected, remove the current wallet from the count
    if (aggWalletDetails?.connectorId) walletsCount--;
    return walletsCount % 2 === 0;
  }, [showKeplr, showLeap, aggWalletDetails]);

  const onConnectKeplr = React.useCallback(async () => {
    if (!srcToken?.chainId) return;
    await handleConnectKeplr(srcToken.chainId);
  }, [srcToken.chainId, handleConnectKeplr]);

  const onConnectLeap = React.useCallback(async () => {
    if (!srcToken?.chainId) return;
    await handleConnectLeap(srcToken.chainId);
  }, [srcToken.chainId, handleConnectLeap]);

  useEffect(() => {
    const isCosmosToken = !srcTokenDetails?.isEVM && !srcTokenDetails?.isSVM;

    const keplrInstance = (window as any).keplr;
    setShowKeplr(!!keplrInstance && isCosmosToken);

    const leapInstance = (window as any).leap;
    setShowLeap(!!leapInstance && isCosmosToken);

    return () => {
      setShowKeplr(false);
      setShowLeap(false);
    };
  }, [openConnectDialog]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StandardDialog open={openConnectDialog} onClose={handleCloseConnectDialog} cardClass="connect-wallet-dialog">
      <div className="grid grid-cols-1 gap-4 md:gap-5">
        <h4 className="font-semibold text-start text-h5 md:text-h4">Connect Wallet</h4>

        <div className="grid grid-cols-2 gap-2">
          {showKeplr && aggWalletDetails?.connectorId !== WalletKey.Keplr && (
            <WalletConnectBtn
              walletKey={keplrWallet.key}
              ready
              label={keplrWallet.label}
              connectFunc={onConnectKeplr}
            />
          )}

          {showLeap && aggWalletDetails?.connectorId !== WalletKey.Leap && (
            <WalletConnectBtn
              walletKey={leapWallet.key}
              ready
              label={leapWallet.label}
              connectFunc={onConnectLeap}
            />
          )}

          {srcTokenDetails?.isEVM && (
            <React.Fragment>
              {evmWallets.map((wallet: WalletItem) => (
                <WalletButton.Custom wallet={wallet.key} key={wallet.key}>
                  {({ ready, connect, connected, connector }) => {
                    const handleConnect = () => {
                      handleDisconnectCosmosWallets();

                      if (connected && connector) {
                        switchAccount({ connector });
                        handleCloseConnectDialog();
                        return;
                      }

                      try {
                        connect();
                        handleCloseConnectDialog();
                      } catch (err) {
                        console.log(err);
                      }
                    };

                    if (aggWalletDetails?.connectorId === wallet.key) return null;

                    return (
                      <WalletConnectBtn
                        walletKey={wallet.key}
                        ready={ready}
                        connectFunc={handleConnect}
                        label={wallet.label}
                      />
                    );
                  }}
                </WalletButton.Custom>
              ))}

              {/* In case desired wallet is not found */}
              <ConnectButton.Custom>
                {({
                  account,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
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
                  };

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
  ready: boolean;
  walletKey: WalletKeyEnumType;
}

const WalletConnectBtn: React.FC<WalletConnectProps> = (props: WalletConnectProps) => {
  const { isWalletConnecting } = useConnectStateContext();
  const { className, connectFunc, label, ready, walletKey } = props;
  const theme = useSelect((store) => store.app.theme);
  return (
    <button
      type="button"
      className={clsx(
        `wallet-connect-btn wallet-connect-btn-${theme} text-body3 md:text-body2 px-3 py-1 md:px-4 md:py-3 rounded-lg font-semibold flex items-center gap-2 drop-shadow-md w-full h-[3rem] md:h-[3.25rem]`,
        className,
      )}
      disabled={!ready || isWalletConnecting}
      onClick={connectFunc}
    >
      <WalletIcon walletKey={walletKey} className="wallet-btn-icon" />
      <div className="mt-[0.125rem] lg:mt-1">{label}</div>
    </button>
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
        connectFunc={connectFunc}
        label="Others"
        ready={ready}
        walletKey={WalletKey.WalletConnect}
      />
    </div>
  );
};

export default ConnectWalletDialog;