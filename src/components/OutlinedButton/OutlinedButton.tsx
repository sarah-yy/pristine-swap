import clsx from "clsx";
import React from "react";
import { BaseButtonProps, ButtonSize, Theme } from "../../constants";
import { useAppContext } from "../../hooks";

interface Props extends BaseButtonProps {
  size?: typeof ButtonSize[keyof typeof ButtonSize];
}

const OutlinedButton: React.FC<Props> = (props: Props) => {
  const { children, className, size, ...rest } = props;
  const { theme } = useAppContext();

  return (
    <button
      className={clsx({
        "outlined-button-light": theme === Theme.Light,
        "outlined-button-dark": theme === Theme.Dark,

        "btn-size-sm": size === ButtonSize.SM,
        "btn-size-xs": size === ButtonSize.XS,
        "btn-size-md": size === ButtonSize.MD,
        "btn-size-lg": size === ButtonSize.LG,

        "text-body4": size === ButtonSize.SM || size === ButtonSize.XS,
        "text-body3": size === ButtonSize.MD,
        "text-h5": size === ButtonSize.LG,
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