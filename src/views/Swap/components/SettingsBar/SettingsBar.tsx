import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { MoonIcon, ReloadIcon, SunIcon, SettingsIcon } from "../../../../assets";
import { FormTaskNames, Theme } from "../../../../constants";
import { IconButton } from "../../../../components";
import { useSelect, useTaskSubscriber } from "../../../../hooks";
import { appActions } from "../../../../stores";

const SettingsBar: React.FC = () => {
  const dispatch = useDispatch();
  const quoteLoading = useTaskSubscriber(FormTaskNames.QueryQuote);
  const theme = useSelect((store) => store.app.theme);

  const handleChangeTheme = () => {
    const nextTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
    dispatch(appActions.setTheme(nextTheme));
  };

  return (
    <div className="flex justify-end items-center gap-x-3">
      <IconButton className="setting-icon-btn">
        <ReloadIcon className={clsx({ "animate-spin": quoteLoading })} />
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