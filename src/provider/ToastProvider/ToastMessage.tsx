import clsx from "clsx";
import { ToastContentProps } from "react-toastify";
import { CloseIcon, ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../assets";
import { IconButton } from "../../components";
import { ToastData } from "../../constants";

const ToastMessage = (props: ToastContentProps<ToastData>) => {
  const { toastProps: { type = "info", theme }, data: { title, message }, closeToast } = props;

  const sizeClass = "w-6 h-6";
  let icon = <InfoIcon className={clsx("info-icon", sizeClass)} />;
  switch (type) {
    case "error": {
      icon = <ErrorIcon className={clsx("error-icon", sizeClass)} />;
      break;
    }
    case "success": {
      icon = <SuccessIcon className={clsx("success-icon", sizeClass)} />;
      break;
    }
    case "warning": {
      icon = <WarningIcon className={clsx("warning-icon", sizeClass)} />;
      break;
    }
    default: {
      icon = <InfoIcon className={clsx("info-icon", sizeClass)} />;
      break;
    }
  }

  return (
    <div className="grid grid-cols-[2rem_auto] w-full gap-2">
      <div>
        {icon}
      </div>

      <div className={clsx("flex", "flex-col", "gap-1", `primary-text--${theme}`)}>
        <div className={clsx("text-body3", "font-semibold", "text-start")}>{title}</div>
        <div className={clsx("text-body3", "text-start")}>{message}</div>
      </div>

      <IconButton className="absolute top-2 right-2" onClick={closeToast}>
        <CloseIcon className="w-3 h-3" />
      </IconButton>
    </div>
  );
};

export default ToastMessage;