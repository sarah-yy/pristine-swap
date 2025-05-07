import clsx from "clsx";
import React from "react";
import { RectangleButtonProps, Size, Theme } from "../../constants";
import { useAppContext } from "../../hooks";
import CircularLoader from "../CircularLoader";

interface ContainedButtonProps extends RectangleButtonProps { }

const ContainedButton: React.FC<ContainedButtonProps> = (props: ContainedButtonProps) => {
  const { children, className, loading, size = Size.MD, ...rest } = props;
  const { theme } = useAppContext();

  const loaderSize = React.useMemo(() => {
    switch (size) {
      case Size.LG:
        return 20;
      case Size.MD:
        return 13;
      default:
        return 11;
    }
  }, [size]);

  return (
    <button
      className={clsx({
        "contained-button-light": theme === Theme.Light,
        "contained-button-dark": theme === Theme.Dark,

        "btn-size-sm": size === Size.SM,
        "btn-size-xs": size === Size.XS,
        "btn-size-md": size === Size.MD,
        "btn-size-lg": size === Size.LG,

        "text-body4": size === Size.SM || size === Size.XS,
        "text-body3": size === Size.MD,
        "text-h5": size === Size.LG,
      },
      "contained-btn-base",
      "drop-shadow-md",
      "font-semibold",
      className,
    )}
      {...rest}
    >
      {loading ? (
        <CircularLoader color="white" size={loaderSize} />
      ) : children}
    </button>
  );
};

export default ContainedButton;