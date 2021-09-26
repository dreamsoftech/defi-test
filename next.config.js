/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    ETHERSCAN_URL: 'https://etherscan.io/',
    RPC_URL_1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    RPC_URL_3: 'https://ropsten.infura.io/v3/8d810610fe7741cc9753cbaafb1f000c',
    ERC20_ADDRESS: '0xaD6D458402F60fD3Bd25163575031ACDce07538D',
  },
}
