export enum Theme {
  Dark = "dark",
  Light = "light",
};

export const fallbackTheme = Theme.Light;

export const localStorageKeys: { [key: string]: string } = {
  theme: "@app/SET_THEME",
};