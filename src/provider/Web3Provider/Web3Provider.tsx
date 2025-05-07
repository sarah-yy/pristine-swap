import "@rainbow-me/rainbowkit/styles.css";

import {
  darkTheme,
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider } from "wagmi";
import * as EVMChains from "@wagmi/core/chains";
import { HttpTransport } from "viem";
import { http } from "wagmi";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { SimpleMap } from "../../constants";

const queryClient = new QueryClient();

const chains = [...Object.values(EVMChains)];
const config = getDefaultConfig({
  appName: import.meta.env.VITE_WALLET_CONNECT_PROJECT_NAME,
  projectId: import.meta.env.VITE_WALLET_CONNECT_ID,
  chains: chains as any,
  transports: chains.reduce((acc, { id }) => {
    acc[id] = http();
    return acc;
  }, {} as SimpleMap<HttpTransport>),
  wallets: [{
    groupName: "Recommended",
    wallets: [metaMaskWallet, walletConnectWallet, rabbyWallet, rainbowWallet, rabbyWallet, coinbaseWallet, trustWallet],
  }],
});

const Web3Provider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <WagmiProvider reconnectOnMount={false} config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;