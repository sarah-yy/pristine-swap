export type BaseButtonProps = React.ButtonHTMLAttributes<any> & React.PropsWithChildren;

export type PathColorType = {
  Fill: string;
  Stroke: string;
};

export const PathColor: PathColorType = {
  Fill: "fill",
  Stroke: "stroke",
};

export type ButtonSizeType = {
  XS: string;
  SM: string;
  MD: string;
  LG: string;
};

export const ButtonSize: ButtonSizeType = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
};