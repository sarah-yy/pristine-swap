import React from "react";
import { OutlinedButton, WalletIcon } from "../../../../components";
import { Size } from "../../../../constants";
import { useConnectStateContext } from "../../../../hooks";

const ConnectSubsection: React.FC = () => {
  const { isWalletConnected, handleDisconnect, handleOpenConnectDialog, connectorId, shortAddr } = useConnectStateContext();

  return (
    <div className="flex justify-end">
      {isWalletConnected && !!shortAddr ? (
        <OutlinedButton className="flex items-center gap-[0.375rem] connect-subsection-wallet-btn" size={Size.SM} onClick={handleDisconnect}>
          {connectorId && <WalletIcon borderRadiusSize="md" className="w-[1rem] h-[1rem]" walletKey={connectorId} />}
          <div className="mt-[1px] connect-subsection-wallet-label">
            <span>{shortAddr}</span>
          </div>
        </OutlinedButton>
      ) : (
        <OutlinedButton size={Size.SM} onClick={handleOpenConnectDialog}>
          Connect
        </OutlinedButton>
      )}
    </div>
  );
};

export default ConnectSubsection;