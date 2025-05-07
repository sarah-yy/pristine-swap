import clsx from "clsx";
import React from "react";
import { ChevronIcon } from "../../../../../assets";
import { ThemedSvgIcon, WalletIcon } from "../../../../../components";
import { Theme } from "../../../../../constants";
import { useAppContext, useConnectStateContext } from "../../../../../hooks";

interface Props {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
}

const ConnectedWalletBtn: React.FC<Props> = (props: Props) => {
  const { handleClose, handleOpen, open } = props;
  const { theme } = useAppContext();
  const { aggWalletDetails } = useConnectStateContext();

  const handleToggleOpen = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return (
    <div
      className={clsx({
        "connected-wallet-btn-dark": theme === Theme.Dark,
        "connected-wallet-btn-light": theme === Theme.Light,
      },
      "connected-wallet-btn",
      "drop-shadow-md",
      "font-semibold",
      "text-body3",
      "btn-size-md",
      "border-radius",
      "flex",
      "items-center",
      "gap-2")}
      onClick={handleToggleOpen}
    >
      {!!aggWalletDetails?.connectorId && (
        <WalletIcon className="connected-wallet-btn-icon" walletKey={aggWalletDetails.connectorId} />
      )}
      {!!aggWalletDetails?.shortAddress && (
        <div className="mt-[0.25rem]">{aggWalletDetails.shortAddress}</div>
      )}
      <ThemedSvgIcon className="w-[1rem] h-[1rem] connected-wallet-dropdown-arrow" svgComponent={ChevronIcon} />
    </div>
  );
};

export default ConnectedWalletBtn;