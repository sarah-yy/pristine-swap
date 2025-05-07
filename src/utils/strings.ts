export const truncateStr = (str: string, startLen: number = 4, endLen: number = 4): string => {
  if (str.length <= startLen + endLen) return str;
  return `${str.substr(0, startLen)}..${str.substr(-endLen)}`;
};