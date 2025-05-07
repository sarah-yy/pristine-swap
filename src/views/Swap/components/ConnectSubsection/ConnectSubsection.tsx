import React from "react";
import { OutlinedButton, WalletIcon } from "../../../../components";
import { Size } from "../../../../constants";
import { useConnectStateContext } from "../../../../hooks";

const ConnectSubsection: React.FC = () => {
  const { isWalletConnected, isWalletConnecting, handleDisconnect, handleOpenConnectDialog, aggWalletDetails } = useConnectStateContext();

  return (
    <div className="flex justify-end">
      {isWalletConnected && !!aggWalletDetails?.shortAddress ? (
        <OutlinedButton className="flex items-center gap-[0.375rem] connect-subsection-wallet-btn" size={Size.SM} onClick={handleDisconnect}>
          {!!aggWalletDetails?.connectorId && <WalletIcon borderRadiusSize="md" className="w-[1rem] h-[1rem]" walletKey={aggWalletDetails.connectorId} />}
          <div className="mt-[1px] connect-subsection-wallet-label">
            <span>{aggWalletDetails.shortAddress ?? ""}</span>
          </div>
        </OutlinedButton>
      ) : (
        <OutlinedButton className="w-16" disabled={isWalletConnecting} size={Size.SM} onClick={handleOpenConnectDialog} loading={isWalletConnecting}>
          Connect
        </OutlinedButton>
      )}
    </div>
  );
};

export default ConnectSubsection;