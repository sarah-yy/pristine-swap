import clsx from "clsx";
import React from "react";
import { RectangleButtonProps, Size, Theme } from "../../constants";
import { useAppContext } from "../../hooks";
import CircularLoader from "../CircularLoader";

interface Props extends RectangleButtonProps { }

const OutlinedButton: React.FC<Props> = (props: Props) => {
  const { children, className, size, loading, ...rest } = props;
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
        "outlined-button-light": theme === Theme.Light,
        "outlined-button-dark": theme === Theme.Dark,

        "btn-size-sm": size === Size.SM,
        "btn-size-xs": size === Size.XS,
        "btn-size-md": size === Size.MD,
        "btn-size-lg": size === Size.LG,

        "text-body4": size === Size.SM || size === Size.XS,
        "text-body3": size === Size.MD,
        "text-h5": size === Size.LG,
      },
      "outlined-btn-base",
      "font-semibold",
      className,
    )}
      {...rest}
    >
      {loading ? (
        <CircularLoader color="default" size={loaderSize} />
      ) : children}
    </button>
  );
};

export default OutlinedButton;