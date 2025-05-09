import clsx from "clsx";
import React from "react";
import { BaseButtonProps, FillTypeProps, PathColor, Theme } from "../../constants";
import { useSelect } from "../../hooks";

type PropsType = BaseButtonProps & FillTypeProps;

interface Props extends PropsType {
  fillType?: typeof PathColor[keyof typeof PathColor];
}

const IconButton: React.FC<Props> = (props: Props) => {
  const { className, children, fillType = "fill", ...rest } = props;
  const theme = useSelect((store) => store.app.theme);
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