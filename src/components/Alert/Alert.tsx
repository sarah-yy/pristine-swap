import clsx from "clsx";
import React from "react";
import { TypeOptions } from "react-toastify";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../assets";
import { ToastData } from "../../constants";
import { useSelect } from "../../hooks";

type BaseAlertProps = ToastData & PropsWithClassName;

interface Props extends BaseAlertProps {
  status: TypeOptions;
}

const Alert: React.FC<Props> = (props: Props) => {
  const { className, status, title, message } = props;
  const theme = useSelect((state) => state.app.theme);

  const icon = React.useMemo(() => {
    const sizeClass = "w-6 h-6";
    switch (status) {
      case "error": {
        return <ErrorIcon className={clsx("error-icon", sizeClass)} />;
      }
      case "success": {
        return <SuccessIcon className={clsx("success-icon", sizeClass)} />;
      }
      case "warning": {
        return <WarningIcon className={clsx("warning-icon", sizeClass)} />;
      }
      default: {
        return <InfoIcon className={clsx("info-icon", sizeClass)} />;
      }
    }
  }, [status]);

  return (
    <div
      className={clsx(
        "grid",
        "grid-cols-[2rem_auto]",
        "w-full",
        "gap-2",
        "drop-shadow-md",
        "px-[0.875rem]",
        "py-[0.875rem]",
        "relative",
        `tertiary-bg--${theme}`,
        "border-radius",
        className,
      )}
    >
      <div>
        {icon}
      </div>

      <div className={clsx("flex", "flex-col", "gap-1", `primary-text--${theme}`)}>
        <div className={clsx("text-body3", "font-semibold", "text-start")}>{title}</div>
        <div className={clsx("text-body3", "text-start")}>{message}</div>
      </div>
    </div>
  );
};

export default Alert;