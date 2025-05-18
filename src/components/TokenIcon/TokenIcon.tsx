import clsx from "clsx";
import React from "react";
import { UnknownCoinDark, UnknownCoinLight } from "../../assets";
import { Theme } from "../../constants";
import { useSelect } from "../../hooks";

interface Props extends PropsWithClassName {
  srcUrl?: string;
};

const TokenIcon: React.FC<Props> = (props: Props) => {
  const { className, srcUrl } = props;
  const theme = useSelect((store) => store.app.theme);

  const [useFallbackImg, setUseFallbackImg] = React.useState<boolean>(false);

  const handleErrorImg = () => {
    setUseFallbackImg(true);
  };

  const FallbackImg = React.useMemo(() => theme === Theme.Dark ? UnknownCoinDark : UnknownCoinLight, [theme]);

  return (
    <React.Fragment>
      {!useFallbackImg && srcUrl ? (
        <img
          className={clsx("border-radius-round", className)}
          src={srcUrl}
          onError={handleErrorImg}
        />
      ) : (
        <FallbackImg className={className} />
      )}
    </React.Fragment>
  );
};

export default TokenIcon;