import clsx from "clsx";
import React from "react";
import Card from "../Card";
import { BaseDivProps } from "../../constants";
import { useSelect } from "../../hooks";

interface DialogProps extends BaseDivProps {
  cardClass?: string;
  open: boolean;
  onClose: () => void;
};

const StandardDialog: React.FC<DialogProps> = (props: DialogProps) => {
  const { cardClass, children, className, open, onClose } = props;
  const theme = useSelect((store) => store.app.theme);

  if (!open) return null;

  return (
    <div
      className={clsx(
        `standard-dialog-${theme}`,
        "standard-dialog-base fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-4 py-6",
        className,
      )}
    >
      <Card className={clsx("relative w-full max-w-md rounded-lg shadow-lg z-10", cardClass)}>
        {children}
      </Card>

      {open && (
        <div className="w-full h-full absolute top-0 left-0 z-5" onClick={onClose} />
      )}
    </div>
  );
};

export default StandardDialog;