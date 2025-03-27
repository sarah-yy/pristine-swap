import React from "react";
import { Card } from "../../components";
import { useAppContext } from "../../provider";

const Swap: React.FC = () => {
  const { handleChangeTheme } = useAppContext();

  return (
    <div className="full-width flex justify-center">
      <Card className="main-form-card full-width">
        <h4 className="text-h4 font-semibold">
          Hello world!
        </h4>
        <button onClick={handleChangeTheme}>
          Click to Change Theme
        </button>
      </Card>
    </div>
  );
};

export default Swap;