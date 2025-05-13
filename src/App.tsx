import React, { Suspense } from "react";
import Layout from "./layout";
import { PreLoader } from "./views";

const Swap = React.lazy(() => import("./views/Swap"));

function App() {
  return (
    <React.Fragment>
      <PreLoader />

      <Layout>
        <Suspense>
          <Swap />
        </Suspense>
      </Layout>
    </React.Fragment>
  );
}

export default App;