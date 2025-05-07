import React from "react";
import { ContainedButton } from "../../../../components";
import { Size } from "../../../../constants";
import { useConnectStateContext } from "../../../../hooks";

const SwapCTASection: React.FC = () => {
  const { handleOpenConnectDialog, isWalletConnected, isWalletConnecting } = useConnectStateContext();

  return (
    <div className="mt-[0.625rem] w-full">
      {!isWalletConnected ? (
        <ContainedButton className="w-full" disabled={isWalletConnecting} size={Size.LG} onClick={handleOpenConnectDialog} loading={isWalletConnecting}>
          Connect Wallet
        </ContainedButton>
      ) : (
        <ContainedButton className="w-full" size={Size.LG}>
          Swap
        </ContainedButton>
      )}
    </div>
  );
};

export default SwapCTASection;