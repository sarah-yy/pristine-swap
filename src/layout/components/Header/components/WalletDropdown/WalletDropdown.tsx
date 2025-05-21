import React from "react";
import { CopyIcon, PowerIcon, SwitchIcon } from "../../../../../assets";
import { Dropdown, IconButton, MenuItem, MenuList } from "../../../../../components";
import { useConnectStateContext, useCopyText, useSelect } from "../../../../../hooks";
import ConnectedWalletBtn from "../ConnectedWalletBtn";

const WalletDropdown: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { handleDisconnect, handleOpenConnectDialog } = useConnectStateContext();
  const primaryWallet = useSelect((store) => store.app.primaryWallet);
  const copyText = useCopyText();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const walletItems = React.useMemo(() => {
    return [{
      icon: SwitchIcon,
      label: "Switch Wallet",
      onClick: () => handleOpenConnectDialog(),
    }, {
      icon: PowerIcon,
      label: "Disconnect",
      onClick: handleDisconnect,
    }] as [MenuItem, ...MenuItem[]];
  }, [handleDisconnect, handleOpenConnectDialog]);

  return (
    <Dropdown
      align="end"
      label={(
        <ConnectedWalletBtn
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
        />
      )}
      open={open}
      handleClose={handleClose}
    >
      <div className="px-2 py-[0.75rem] flex items-center text-body2 font-semibold gap-1">
        {primaryWallet?.shortAddress ?? ""}
        <IconButton
          className="wallet-dropdown-copy-icon"
          onClick={() => copyText(primaryWallet?.address, "address")}
        >
          <CopyIcon />
        </IconButton>
      </div>

      <MenuList items={walletItems} />
    </Dropdown>
  );
};

export default WalletDropdown;