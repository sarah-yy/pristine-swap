import React, { Suspense, useEffect } from "react";
import { Theme } from "./constants";
import { useSelect } from "./hooks";
import { PreLoader } from "./views";

const Layout = React.lazy(() => import("./layout"));
const Swap = React.lazy(() => import("./views/Swap"));

function App() {
  const theme = useSelect((store) => store.app.theme);

  useEffect(() => {
    const bodyEl = document.querySelector("body");
    if (bodyEl) {
      if (bodyEl.classList.contains(Theme.Dark)) {
        bodyEl.classList.remove(Theme.Dark);
      } else if (bodyEl.classList.contains(Theme.Light)) {
        bodyEl.classList.remove(Theme.Light);
      }

      bodyEl.classList.add(theme);
    }
    return () => { };
  }, [theme]);

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