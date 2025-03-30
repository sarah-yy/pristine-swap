import React, { useEffect } from "react";
import { fallbackTheme, Theme, localStorageKeys } from "../../constants";

export type ThemeValue = typeof Theme[keyof typeof Theme];

interface AppContextProps {
  handleChangeTheme: () => void;
  theme: ThemeValue;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = React.createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;
  const [theme, setTheme] = React.useState<ThemeValue>(fallbackTheme);

  useEffect(() => {
    let defaultTheme: string = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light;
    try {
      const localStoreMode = localStorage.getItem(localStorageKeys.theme);
      if (localStoreMode !== null) {
        defaultTheme = localStoreMode as ThemeValue;
      }
    } catch { }; // eslint-disable-line no-empty
    setTheme(defaultTheme);
  }, []);

  const handleChangeTheme = () => {
    const nextTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
    setTheme(nextTheme);
    localStorage.setItem(localStorageKeys.theme, nextTheme);
  };

  return (
    <AppContext.Provider value={{ handleChangeTheme, theme }}>
      {children}
    </AppContext.Provider>
  );
};