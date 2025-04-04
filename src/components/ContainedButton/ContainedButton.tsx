import clsx from "clsx";
import React from "react";
import { BaseButtonProps, ButtonSize, Theme } from "../../constants";
import { useAppContext } from "../../hooks";

interface ContainedButtonProps extends BaseButtonProps {
  size?: typeof ButtonSize[keyof typeof ButtonSize];
}

const ContainedButton: React.FC<ContainedButtonProps> = (props: ContainedButtonProps) => {
  const { children, className, size = ButtonSize.MD, ...rest } = props;
  const { theme } = useAppContext();

  return (
    <button
      className={clsx({
        "contained-button-light": theme === Theme.Light,
        "contained-button-dark": theme === Theme.Dark,

        "btn-size-sm": size === ButtonSize.SM,
        "btn-size-xs": size === ButtonSize.XS,
        "btn-size-md": size === ButtonSize.MD,
        "btn-size-lg": size === ButtonSize.LG,

        "text-body4": size === ButtonSize.SM || size === ButtonSize.XS,
        "text-body3": size === ButtonSize.MD,
        "text-h5": size === ButtonSize.LG,
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