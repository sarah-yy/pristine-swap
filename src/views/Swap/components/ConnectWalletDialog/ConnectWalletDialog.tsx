import { ConnectButton, WalletButton } from '@rainbow-me/rainbowkit';
import clsx from "clsx";
import React from "react";
import { useSwitchAccount } from 'wagmi';
import { WalletKey, WalletItem, wallets } from "../../../../constants";
import { StandardDialog, WalletIcon } from "../../../../components";
import { useAppContext, useConnectStateContext } from "../../../../hooks";

const ConnectWalletDialog: React.FC = () => {
  const { connectorId, openConnectDialog, handleCloseConnectDialog } = useConnectStateContext();
  const { switchAccount } = useSwitchAccount();
  const isEvenItems = (wallets.length + 1) % 2 === 0;

  return (
    <StandardDialog open={openConnectDialog} onClose={handleCloseConnectDialog} cardClass="connect-wallet-dialog">
      <div className="grid grid-cols-1 gap-4 md:gap-5">
        <h4 className="font-semibold text-start text-h5 md:text-h4">Connect Wallet</h4>

        <div className="grid grid-cols-2 gap-2">
          {wallets.map((wallet: WalletItem) => (
            <WalletButton.Custom wallet={wallet.key} key={wallet.key}>
              {({ ready, connect, connector }) => {
                const handleConnect = () => {
                  if (connectorId) {
                    switchAccount({ connector });
                    return;
                  }
                  connect();
                };

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
          {!connectorId && (
            <ConnectButton.Custom>
              {({
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';

                return (
                  <OthersConnectBtn
                    connectFunc={openConnectModal}
                    isEvenItems={isEvenItems}
                    ready={ready}
                  />
                );
              }}
            </ConnectButton.Custom>
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
  walletKey: WalletKey;
}

const WalletConnectBtn: React.FC<WalletConnectProps> = (props: WalletConnectProps) => {
  const { className, connectFunc, label, ready, walletKey } = props;
  const { theme } = useAppContext();
  return (
    <button
      type="button"
      className={clsx(
        `wallet-connect-btn wallet-connect-btn-${theme} text-body3 md:text-body2 px-3 py-1 md:px-4 md:py-3 rounded-lg font-semibold flex items-center gap-2 drop-shadow-md w-full h-[3rem] md:h-[3.25rem]`,
        className,
      )}
      disabled={!ready}
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
        'aria-hidden': true,
        'style': {
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none',
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