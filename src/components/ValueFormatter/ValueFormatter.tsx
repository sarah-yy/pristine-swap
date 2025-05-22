import BigNumber from "bignumber.js";
import React from "react";

interface Props {
  value: BigNumber;
  nonSubscriptDecimals?: number
  subscriptDecimals?: number;
  prefix?: string;
}

const secondThreshold: number = 0.01;
const subscriptThreshold: number = 0.001;

const ValueFormatter: React.FC<Props> = (props: Props) => {
  const { nonSubscriptDecimals = 3, subscriptDecimals = 3, value, prefix = "" } = props;

  const { numZeroes, nonZeroesStr } = React.useMemo(() => {
    const decimalPart = value.toString(10).substring(2);

    let nonZeroesStr: string = "";
    let numZeroes: number = 0;
    let isFrontZeroes: boolean = true;
    for (let ii = 0; ii < decimalPart.length; ii++) {
      if (isFrontZeroes && parseInt(decimalPart[ii]) === 0) {
        numZeroes++;
        continue;
      } else if (parseInt(decimalPart[ii]) !== 0) {
        isFrontZeroes = false;
      }

      if (nonZeroesStr.length < subscriptDecimals) {
        nonZeroesStr = `${nonZeroesStr}${decimalPart[ii]}`;
      }
    }
    return {
      numZeroes,
      nonZeroesStr,
    };
  }, [value, subscriptDecimals]);

  // Handle zero value
  if (value.isZero()) {
    return `${prefix}0.00`;
  }

  // Non-subscript value handling (i.e. value >= 0.01)
  // Round to number of decimals, then return string
  if (value.gte(secondThreshold)) {
    return `${prefix}${value.decimalPlaces(nonSubscriptDecimals, BigNumber.ROUND_DOWN).toString(10)}`;
  }

  // Non-subscript, small value handling (i.e. 0.001 <= value < 0.01)
  if (value.gte(subscriptThreshold) && value.lt(secondThreshold)) {
    const zeroesStr = numZeroes === 2 ? "00" : "0";
    return `${prefix}0.${zeroesStr}${nonZeroesStr}`;
  }

  // Subscript value handling (i.e. < 0.001)
  return (
    <React.Fragment>
      <span>{prefix}0.0</span>
      <sub>{numZeroes}</sub>
      <span>{nonZeroesStr}</span>
    </React.Fragment>
  );
};

export default ValueFormatter;