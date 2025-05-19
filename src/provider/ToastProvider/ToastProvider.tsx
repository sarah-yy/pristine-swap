import React from "react";
import { Slide, ToastContainer, TypeOptions, toast } from "react-toastify";
import { ToastData } from "../../constants";
import { useSelect } from "../../hooks";
import ToastMessage from "./ToastMessage";

interface ToastContainerProps {
  info: (content: ToastData) => void; // eslint-disable-line no-unused-vars
  error: (content: ToastData) => void; // eslint-disable-line no-unused-vars
  success: (content: ToastData) => void; // eslint-disable-line no-unused-vars
  warning: (content: ToastData) => void; // eslint-disable-line no-unused-vars
}

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = React.createContext<ToastContainerProps | undefined>(undefined);

const ToastProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;
  const theme = useSelect((store) => store.app.theme);

  const baseToast = (content: ToastData, status: TypeOptions = "info") => {
    toast<ToastData>(ToastMessage, {
      type: status,
      data: content,
    });
  };

  const successToast = (content: ToastData) => baseToast(content, "success");
  const errorToast = (content: ToastData) => baseToast(content, "error");
  const warningToast = (content: ToastData) => baseToast(content, "warning");
  const infoToast = (content: ToastData) => baseToast(content, "info");

  return (
    <ToastContext.Provider value={{
      info: infoToast,
      error: errorToast,
      success: successToast,
      warning: warningToast,
    }}>
      {children}

      <ToastContainer
        autoClose={10000}
        theme={theme}
        transition={Slide}
        icon={false}
        closeButton={false}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;