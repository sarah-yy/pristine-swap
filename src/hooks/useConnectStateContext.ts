import { useContext } from "react";
import { ConnectStateContext } from "../provider";

export default () => {
  const ctxValue = useContext(ConnectStateContext);
  if (ctxValue === undefined) {
    throw new Error("Expected an Context Provider somewhere in the react tree to set context value");
  };
  return ctxValue;
};