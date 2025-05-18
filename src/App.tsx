import React, { Suspense, useEffect } from "react";
import { Theme } from "./constants";
import { useSelect } from "./hooks";
import Layout from "./layout";
import { ConnectStateProvider, ToastProvider } from "./provider";
import { PreLoader } from "./views";

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

      <ToastProvider>
        <ConnectStateProvider>
          <Layout>
            <Suspense>
              <Swap />
            </Suspense>
          </Layout>
        </ConnectStateProvider>
      </ToastProvider>
    </React.Fragment>
  );
}

export default App;