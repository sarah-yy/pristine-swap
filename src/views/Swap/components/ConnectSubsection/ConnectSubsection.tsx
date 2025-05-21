import React from "react";
import { OutlinedButton, WalletIcon } from "../../../../components";
import { Size } from "../../../../constants";
import { useConnectStateContext, useSelect } from "../../../../hooks";

const ConnectSubsection: React.FC = () => {
  const { isWalletConnected, isWalletConnecting, handleDisconnect, handleOpenConnectDialog } = useConnectStateContext();
  const primaryWallet = useSelect((store) => store.app.primaryWallet);

  return (
    <div className="flex justify-end">
      {isWalletConnected && !!primaryWallet?.shortAddress ? (
        <OutlinedButton className="flex items-center gap-[0.375rem] connect-subsection-wallet-btn" size={Size.SM} onClick={handleDisconnect}>
          {!!primaryWallet?.connectorId && <WalletIcon borderRadiusSize="md" className="w-[1rem] h-[1rem]" walletKey={primaryWallet.connectorId} />}
          <div className="mt-[1px] connect-subsection-wallet-label">
            <span>{primaryWallet.shortAddress ?? ""}</span>
          </div>
        </OutlinedButton>
      ) : (
        <OutlinedButton
          className="w-16"
          disabled={isWalletConnecting}
          size={Size.SM}
          onClick={() => handleOpenConnectDialog()}
          loading={isWalletConnecting}
        >
          Connect
        </OutlinedButton>
      )}
    </div>
  );
};

export default ConnectSubsection;