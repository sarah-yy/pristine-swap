import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from 'wagmi';
import {
  bsc,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: import.meta.env.VITE_WALLET_CONNECT_PROJECT_NAME,
  projectId: import.meta.env.VITE_WALLET_CONNECT_ID,
  chains: [mainnet, bsc, arbitrum, base, optimism, polygon],
  wallets: [{
    groupName: "Recommended",
    wallets: [metaMaskWallet, walletConnectWallet],
  }, {
    groupName: "Others",
    wallets: [rainbowWallet, rabbyWallet],
  }],
});

const Web3Provider: React.FC<React.PropsWithChildren> = (props: React.PropsWithChildren) => {
  const { children } = props;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;