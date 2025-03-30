import clsx from "clsx";
import React from "react";
import { BaseButtonProps, Theme } from "../../constants";
import { useAppContext } from "../../hooks";

interface ContainedButtonProps extends BaseButtonProps {
  className?: string;
  size?: "normal" | "large";
}

const ContainedButton: React.FC<ContainedButtonProps> = (props: ContainedButtonProps) => {
  const { children, className, size = "normal", ...rest } = props;
  const { theme } = useAppContext();

  return (
    <button
      className={clsx({
        "contained-button-light": theme === Theme.Light,
        "contained-button-dark": theme === Theme.Dark,

        "btn-size-normal": size === "normal",
        "btn-size-large": size === "large",
        "text-body3": size === "normal",
        "text-h5": size === "large",
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