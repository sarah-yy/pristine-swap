import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { ConnectStateProvider, Web3Provider } from "./provider";
import { store } from "./stores";
import "./styles/components.css";
import "./styles/custom.css";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Web3Provider>
        <ConnectStateProvider>
          <App />
        </ConnectStateProvider>
      </Web3Provider>
    </Provider>
  </StrictMode>,
);