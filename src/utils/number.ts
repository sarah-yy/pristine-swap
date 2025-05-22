import BigNumber from "bignumber.js";

export const bnOrZero = (val?: number | string | null | BigNumber) => {
  const bnValue = new BigNumber(val ?? 0);
  return bnValue.isFinite() && !bnValue.isNaN() ? bnValue: new BigNumber(0);
};