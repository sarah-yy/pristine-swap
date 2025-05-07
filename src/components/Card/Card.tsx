import clsx from "clsx";
import React from "react";
import { BaseDivProps } from "../../constants";
import { useAppContext } from "../../hooks";

interface Props extends BaseDivProps {
  size?: "default" | "small"
}

const Card: React.FC<Props> = (props: Props) => {
  const { className, children, size = "default", ...rest } = props;
  const { theme } = useAppContext();

  return (
    <div className={clsx("card-base", "drop-shadow-md", `card-${theme}`, `card-${size}`, className)} {...rest}>
      {children}
    </div>
  );
};

export default Card;