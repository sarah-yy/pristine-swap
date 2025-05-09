import clsx from "clsx";
import React from "react";
import { FillTypeProps, PathColor } from "../../constants";
import { useSelect } from "../../hooks";

type PropsType = PropsWithClassName & FillTypeProps;

interface ThemedSvgProps extends PropsType {
  svgComponent: SVGComponent;
}

const ThemedSvgIcon: React.FC<ThemedSvgProps> = (props: ThemedSvgProps) => {
  const { className, fillType = PathColor.Fill, svgComponent: SvgAsset } = props;
  const theme = useSelect((store) => store.app.theme);

  return (
    <SvgAsset
      className={clsx(`svg-${fillType}--${theme}`, className)}
    />
  );
};

export default ThemedSvgIcon;