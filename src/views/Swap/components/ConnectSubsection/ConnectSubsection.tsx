import React from "react";
import { OutlinedButton, WalletIcon } from "../../../../components";
import { ButtonSize } from "../../../../constants";
import { useConnectStateContext } from "../../../../hooks";

const ConnectSubsection: React.FC = () => {
  const { handleDisconnect, handleOpenConnectDialog, connectorId, shortAddr } = useConnectStateContext();

  return (
    <div className="flex justify-end">
      {!shortAddr ? (
        <OutlinedButton size={ButtonSize.SM} onClick={handleOpenConnectDialog}>
          Connect
        </OutlinedButton>
      ) : (
        <OutlinedButton className="flex items-center gap-[0.375rem] connect-subsection-wallet-btn" size={ButtonSize.SM} onClick={handleDisconnect}>
          {connectorId && <WalletIcon className="w-[1rem] h-[1rem]" walletKey={connectorId} />}
          <div className="mt-[1px] connect-subsection-wallet-label">
            <span>{shortAddr}</span>
          </div>
        </OutlinedButton>
      )}
    </div>
  );
};

export default ConnectSubsection;