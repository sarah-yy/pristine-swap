import React from "react";
import { ContainedButton } from "../../../../components";
import { Size } from "../../../../constants";
import { useConnectStateContext, useSelect } from "../../../../hooks";

const SwapCTASection: React.FC = () => {
  const { handleOpenConnectDialog, isWalletConnected, isWalletConnecting } = useConnectStateContext();
  const primaryWallet = useSelect((store) => store.app.primaryWallet);

  return (
    <div className="mt-[0.625rem] w-full">
      {!!isWalletConnected && !!primaryWallet?.shortAddress ? (
        <ContainedButton className="w-full" size={Size.LG}>
          Swap
        </ContainedButton>
      ) : (
        <ContainedButton
          className="w-full"
          disabled={isWalletConnecting}
          size={Size.LG}
          onClick={() => handleOpenConnectDialog()}
          loading={isWalletConnecting}
        >
          Connect Wallet
        </ContainedButton>
      )}
    </div>
  );
};

export default SwapCTASection;