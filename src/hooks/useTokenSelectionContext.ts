import { useContext } from "react";
import { TokenSelectionContext } from "../provider";

export default () => {
  const ctxValue = useContext(TokenSelectionContext);
  if (ctxValue === undefined) {
    throw new Error("Expected an Context Provider somewhere in the react tree to set context value");
  };
  return ctxValue;
};