import clsx from "clsx";
import { useSelect } from "../../hooks";

interface Props {
  strokeWidth: number;
}

const Divider: React.FC<Props> = (props: Props) => {
  const { strokeWidth } = props;
  const theme = useSelect((state) => state.app.theme);
  return (
    <div className={clsx("w-full", `secondary-bg--${theme}`, "opacity-60")} style={{ height: strokeWidth }} />
  );
};

export default Divider;