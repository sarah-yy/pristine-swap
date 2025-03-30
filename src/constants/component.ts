export type BaseButtonProps = React.ButtonHTMLAttributes<any> & React.PropsWithChildren;

export type PathColorType = {
  Fill: string;
  Stroke: string;
};

export const PathColor: PathColorType = {
  Fill: "fill",
  Stroke: "stroke",
};