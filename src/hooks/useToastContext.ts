import { useContext } from "react";
import { ToastContext } from "../provider";

export default () => {
  const ctxValue = useContext(ToastContext);
  if (ctxValue === undefined) {
    throw new Error("Expected an Context Provider somewhere in the react tree to set context value");
  };
  return ctxValue;
};