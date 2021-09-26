import { InjectedConnector } from '@web3-react/injected-connector';

export const Networks = {
  Ropsten: 3,
};

export const injected = new InjectedConnector({
  supportedChainIds: [Networks.Ropsten],
});
