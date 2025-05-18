import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { Web3Provider } from "./provider";
import { store } from "./stores";
import "./styles/components.css";
import "./styles/custom.css";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Web3Provider>
        <App />
      </Web3Provider>
    </Provider>
  </StrictMode>,
);