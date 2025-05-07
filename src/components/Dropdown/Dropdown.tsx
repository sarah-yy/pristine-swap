import clsx from "clsx";
import React from "react";

import { BaseDivProps } from "../../constants";
import Card from "../Card";

interface Props extends BaseDivProps {
  align?: "start" | "end";
  label: React.ReactNode;
  handleClose: () => void;
  open: boolean;
}

const Dropdown: React.FC<Props> = (props: Props) => {
  const { align = "start", children, handleClose, label, open } = props;
  return (
    <div>
      {label}

      <div className={clsx("relative", { "z-[-1]": !open })}>
        <div
          className={clsx(
            "absolute",
            { open },
            align === "start" ? "left-0" : "right-0",
            "dropdown-div",
          )}
        >
          {open && (
            <Card className={clsx("dropdown-card", { open })} size="small">
              {children}
            </Card>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed w-full h-full top-0 left-0 z-[-1]" onClick={handleClose} />
      )}
    </div>
  );
};

export default Dropdown;