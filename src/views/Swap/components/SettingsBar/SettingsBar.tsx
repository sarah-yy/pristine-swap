import React from "react";
import { MoonIcon, ReloadIcon, SunIcon, SettingsIcon } from "../../../../assets";
import { Theme } from "../../../../constants";
import { IconButton } from "../../../../components";
import { useAppContext } from "../../../../hooks";

const SettingsBar: React.FC = () => {
  const { theme, handleChangeTheme } = useAppContext();

  return (
    <div className="flex justify-end items-center gap-x-3">
      <IconButton className="setting-icon-btn">
        <ReloadIcon />
      </IconButton>

      <IconButton className="setting-icon-btn" onClick={handleChangeTheme}>
        {theme === Theme.Dark ? <SunIcon /> : <MoonIcon />}
      </IconButton>

      <IconButton className="setting-icon-btn">
        <SettingsIcon />
      </IconButton>
    </div>
  );
};

export default SettingsBar;