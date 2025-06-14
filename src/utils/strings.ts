export const truncateStr = (str: string, startLen: number = 4, endLen: number = 4): string => {
  if (str.length <= startLen + endLen) return str;
  return `${str.substr(0, startLen)}..${str.substr(-endLen)}`;
};

export const generateId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  );
};

export const capitalize = (str: string): string => {
  if (str.length <= 1) return str.toUpperCase();
  return `${str[0].toUpperCase()}${str.substring(1)}`;
};