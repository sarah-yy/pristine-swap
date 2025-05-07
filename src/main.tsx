import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/index.css";
import "./styles/components.css";
import "./styles/custom.css";
import { AppProvider, ConnectStateProvider, Web3Provider } from "./provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <Web3Provider>
        <ConnectStateProvider>
          <App />
        </ConnectStateProvider>
      </Web3Provider>
    </AppProvider>
  </StrictMode>,
);