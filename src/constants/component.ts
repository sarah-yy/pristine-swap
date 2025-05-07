export type BaseButtonProps = React.ButtonHTMLAttributes<any> & React.PropsWithChildren & PropsWithClassName;

export interface RectangleButtonProps extends BaseButtonProps {
  loading?: boolean
  size?: typeof Size[keyof typeof Size];
}

export type BaseDivProps = React.PropsWithChildren & PropsWithClassName;

export type PathColorType = {
  Fill: string;
  Stroke: string;
};

export const PathColor: PathColorType = {
  Fill: "fill",
  Stroke: "stroke",
};

export type SizeType = {
  XS: string;
  SM: string;
  MD: string;
  LG: string;
};

export const Size: SizeType = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
};

export type ExchangeTxType = {
  Buy: string;
  Sell: string;
};

export const ExchangeTx: ExchangeTxType = {
  Buy: "buy",
  Sell: "sell",
};

export interface FillTypeProps {
  fillType?: typeof PathColor[keyof typeof PathColor];
}