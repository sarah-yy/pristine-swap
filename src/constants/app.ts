export type ThemeType = {
  Dark: string;
  Light: string;
};

export const Theme: ThemeType = {
  Dark: "dark",
  Light: "light",
};

export const fallbackTheme = Theme.Light;

export type ThemeValue = typeof Theme[keyof typeof Theme];

export const localStorageKeys: { [key: string]: string } = {
  theme: "@app/SET_THEME",
};