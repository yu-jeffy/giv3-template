import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import ConfigContext from '../components/ConfigContext';
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
  appName: 'giv3',
  projectId: 'aead2177f58437ab7eb2081a27fba935',
  chains: [
    /* 
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    */
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigContext.Provider value={config}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider theme={midnightTheme()} initialChain={sepolia}>
            <Head>
              <title>giv3</title>
            </Head>
            <NavBar/>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigContext.Provider>
  );
}

export default MyApp;
