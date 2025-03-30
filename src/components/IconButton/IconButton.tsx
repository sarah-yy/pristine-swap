import clsx from "clsx";
import React from "react";
import { BaseButtonProps, PathColor, Theme } from "../../constants";
import { useAppContext } from "../../hooks";

interface Props extends BaseButtonProps {
  className?: string;
  fillType?: typeof PathColor[keyof typeof PathColor];
}

const IconButton: React.FC<Props> = (props: Props) => {
  const { className, children, fillType = "fill", ...rest } = props;
  const { theme } = useAppContext();
  return (
    <button
      className={clsx({
        "icon-button-dark": theme === Theme.Dark,
        "icon-button-light": theme === Theme.Light,
      }, fillType, "icon-button-base", className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;