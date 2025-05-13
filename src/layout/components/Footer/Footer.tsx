import React from "react";
import { useSelect } from "../../../hooks";

const Footer: React.FC = () => {
  const theme = useSelect((store) => store.app.theme);

  return (
    <div className="w-full flex justify-between px-4 md:px-5 py-4 sticky bottom-0">
      <div className={`text-tooltip secondary-text--${theme}`}>
        Copyright © 2025 Thong Yuan Yu Sarah
      </div>
    </div>
  );
};

export default Footer;