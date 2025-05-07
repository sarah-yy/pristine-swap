import clsx from "clsx";
import React from "react";
import { BaseButtonProps, Size, Theme } from "../../constants";
import { useAppContext } from "../../hooks";

interface ContainedButtonProps extends BaseButtonProps {
  size?: typeof Size[keyof typeof Size];
}

const ContainedButton: React.FC<ContainedButtonProps> = (props: ContainedButtonProps) => {
  const { children, className, size = Size.MD, ...rest } = props;
  const { theme } = useAppContext();

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
      {children}
    </button>
  );
};

export default ContainedButton;