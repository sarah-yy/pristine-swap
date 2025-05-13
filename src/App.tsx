import React, { Suspense } from "react";
import { PreLoader } from "./views";

const Layout = React.lazy(() => import("./layout"));
const Swap = React.lazy(() => import("./views/Swap"));

function App() {
  return (
    <React.Fragment>
      <PreLoader />

      <Suspense>
        <Layout>
          <Swap />
        </Layout>
      </Suspense>
    </React.Fragment>
  );
}

export default App;