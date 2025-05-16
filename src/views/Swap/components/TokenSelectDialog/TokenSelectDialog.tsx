import React, { Suspense } from "react";
import { StandardDialog } from "../../../../components";
import { useTokenSelectionContext } from "../../../../hooks";
import SelectTokenPage from "./pages/SelectTokenPage";

const SelectChainPage = React.lazy(() => import("./pages/SelectChainPage"));

const TokenSelectDialog: React.FC = () => {
  const { handleCloseTokenDialog, openTokenDialog } = useTokenSelectionContext();

  return (
    <StandardDialog open={openTokenDialog} onClose={handleCloseTokenDialog}>
      <div className="grid grid-cols-1 gap-3">
        <h4 className="font-semibold text-start text-h5 md:text-h4">Select Token</h4>

        <div className="max-h-[23rem] min-h-[23rem] relative overflow-hidden">
          <SelectTokenPage />
          <Suspense>
            <SelectChainPage />
          </Suspense>
        </div>
      </div>
    </StandardDialog>
  );
};

export default TokenSelectDialog;