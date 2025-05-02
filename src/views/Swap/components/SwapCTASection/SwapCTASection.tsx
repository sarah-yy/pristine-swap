import React from "react";
import { ContainedButton } from "../../../../components";
import { ButtonSize } from "../../../../constants";
import { useConnectStateContext } from "../../../../hooks";

const SwapCTASection: React.FC = () => {
  const { handleOpenConnectDialog, shortAddr } = useConnectStateContext();

  return (
    <div className="mt-[0.625rem] w-full">
      {!shortAddr ? (
        <ContainedButton className="w-full" size={ButtonSize.LG} onClick={handleOpenConnectDialog}>
          Connect Wallet
        </ContainedButton>
      ) : (
        <ContainedButton className="w-full" size={ButtonSize.LG}>
          Swap
        </ContainedButton>
      )}
    </div>
  );
};

export default SwapCTASection;