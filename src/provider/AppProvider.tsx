import React, { useEffect } from 'react'

export enum Theme {
  Dark = "dark",
  Light = "light",
}

interface AppContextProps {
  handleChangeTheme: () => void;
  theme: Theme;
}

const fallbackTheme = Theme.Light;

const localThemeKey = "@app/SET_THEME";

const AppContext = React.createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const appCtx = React.useContext(AppContext);
  if (appCtx === undefined) {
    throw new Error("Expected an Context Provider somewhere in the react tree to set context value");
  }
  return appCtx;
}

export const AppProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;
  const [theme, setTheme] = React.useState<Theme>(fallbackTheme);

  useEffect(() => {
    let defaultTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.Dark : Theme.Light;
    try {
      const localStoreMode = localStorage.getItem(localThemeKey);
      if (localStoreMode !== null) {
        defaultTheme = localStoreMode as Theme;
      }
    } catch {};
    setTheme(defaultTheme);
  }, []);

  const handleChangeTheme = () => {
    const nextTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
    setTheme(nextTheme);
    localStorage.setItem(localThemeKey, nextTheme);
  };

  return (
    <AppContext.Provider value={{ handleChangeTheme, theme }}>
      {children}
    </AppContext.Provider>
  )
};