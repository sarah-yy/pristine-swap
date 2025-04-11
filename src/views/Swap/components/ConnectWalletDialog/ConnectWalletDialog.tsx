import { WalletButton } from '@rainbow-me/rainbowkit';
import clsx from "clsx";
import React from "react";
import { WalletKey, WalletItem, wallets } from "../../../../constants";
import { StandardDialog, WalletIcon } from "../../../../components";
import { useAppContext } from "../../../../hooks";

const ConnectWalletDialog: React.FC = () => {
  const { openConnectDialog, handleCloseConnectDialog } = useAppContext();

  return (
    <StandardDialog open={openConnectDialog} onClose={handleCloseConnectDialog} cardClass="connect-wallet-dialog">
      <div className="grid grid-cols-1 gap-4 md:gap-5">
        <h4 className="font-semibold text-start text-h5 md:text-h4">Connect Wallet</h4>

        <div className="grid grid-cols-2 gap-2">
          {wallets.map((wallet: WalletItem) => (
            <WalletButton.Custom wallet={wallet.key}>
              {({ ready, connect }) => {
                return (
                  <WalletConnectBtn
                    key={wallet.key}
                    walletKey={wallet.key}
                    ready={ready}
                    connect={connect}
                    label={wallet.label}
                  />
                );
              }}
            </WalletButton.Custom>
          ))}
        </div>
      </div>
    </StandardDialog>
  );
};

interface WalletConnectProps {
  connect: () => void;
  label: string;
  ready: boolean;
  walletKey: WalletKey;
}

const WalletConnectBtn: React.FC<WalletConnectProps> = (props: WalletConnectProps) => {
  const { connect, label, ready, walletKey } = props;
  const { theme } = useAppContext();
  return (
    <button
      type="button"
      className={clsx(
        `wallet-connect-btn wallet-connect-btn-${theme} text-body3 md:text-body2 px-3 py-1 md:px-4 md:py-3 rounded-lg font-semibold flex items-center gap-2 drop-shadow-md w-full h-[3rem] md:h-[3.25rem]`
      )}
      disabled={!ready}
      onClick={connect}
    >
      <WalletIcon walletKey={walletKey} className="wallet-btn-icon" />
      {label}
    </button>
  );
};

export default ConnectWalletDialog;