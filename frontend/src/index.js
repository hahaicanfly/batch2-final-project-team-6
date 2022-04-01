import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { PostList, CreatePost } from './components'
import { providers } from "ethers";
import { Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

// API key for Ethereum node
// services are Infura (infura.io)
const infuraId = process.env.REACT_APP_INFURA_ID;

// Chains for connectors to support
const chains = [chain.hardhat, ...defaultChains];
const defaultChain = chain.rinkeby;

// Set up connectors
const connectors = ({ chainId }) => {
  console.log(chainId)
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0];
  // const rpcUrl = 'https://rinkeby.infura.io/v3'
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: "wagmi",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

const provider = ({ chainId }) =>
  new providers.InfuraProvider(chainId, infuraId)



ReactDOM.render(
  <React.StrictMode>
    <>
      <Provider autoConnect provider={provider}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/post/create" element={<CreatePost />} />
          </Routes>
        </Router>
      </Provider>
    </>
  </React.StrictMode>,
  document.getElementById('root')
)
