import clsx from "clsx";
import React from "react";
import { UnknownChainDark, UnknownChainLight } from "../../assets";
import { Theme } from "../../constants";
import { useSelect } from "../../hooks";

interface Props extends PropsWithClassName {
  srcUrl?: string;
};

const ChainIcon: React.FC<Props> = (props: Props) => {
  const { className, srcUrl } = props;
  const theme = useSelect((store) => store.app.theme);

  const [useFallbackImg, setUseFallbackImg] = React.useState<boolean>(false);

  const handleErrorImg = () => {
    setUseFallbackImg(true);
  };

  const FallbackImg = React.useMemo(() => theme === Theme.Dark ? UnknownChainDark : UnknownChainLight, [theme]);

  return (
    <React.Fragment>
      {!useFallbackImg && srcUrl ? (
        <img
          className={clsx("border-radius", className)}
          src={srcUrl}
          onError={handleErrorImg}
        />
      ) : (
        <FallbackImg className={className} />
      )}
    </React.Fragment>
  );
};

export default ChainIcon;