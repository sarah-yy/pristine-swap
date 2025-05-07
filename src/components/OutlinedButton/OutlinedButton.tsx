import clsx from "clsx";
import React from "react";
import { BaseButtonProps, Size, Theme } from "../../constants";
import { useAppContext } from "../../hooks";

interface Props extends BaseButtonProps {
  size?: typeof Size[keyof typeof Size];
}

const OutlinedButton: React.FC<Props> = (props: Props) => {
  const { children, className, size, ...rest } = props;
  const { theme } = useAppContext();

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
      {children}
    </button>
  );
};

export default OutlinedButton;