import React from "react";
import { Card } from "../../components";
import { useAppContext } from "../../provider";

const Swap: React.FC = () => {
  const { handleChangeTheme } = useAppContext();

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="main-form-card w-full">
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