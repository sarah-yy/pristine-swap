import clsx from "clsx";
import React from "react";
import { FillTypeProps, PathColor, Theme } from "../../constants";
import { useAppContext } from "../../hooks";

type PropsType = PropsWithClassName & FillTypeProps;

interface ThemedSvgProps extends PropsType {
  svgComponent: SVGComponent;
}

const ThemedSvgIcon: React.FC<ThemedSvgProps> = (props: ThemedSvgProps) => {
  const { className, fillType = PathColor.Fill, svgComponent: SvgAsset } = props;
  const { theme } = useAppContext();

  return (
    <SvgAsset
      className={clsx(`svg-${fillType}--${theme}`, className)}
    />
  );
};

export default ThemedSvgIcon;