import React from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import { ToastData } from "../../constants";
import { useSelect } from "../../hooks";
import ToastMessage from "./ToastMessage";

interface ToastContainerProps {
  error: (content: ToastData) => void; // eslint-disable-line no-unused-vars
}

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = React.createContext<ToastContainerProps | undefined>(undefined);

const ToastProvider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;
  const theme = useSelect((store) => store.app.theme);

  const errorToast = (content: ToastData) => {
    toast<ToastData>(ToastMessage, {
      type: "error",
      data: content,
    });
  };

  return (
    <ToastContext.Provider value={{
      error: errorToast,
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