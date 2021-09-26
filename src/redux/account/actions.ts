import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import { Web3Provider } from '@ethersproject/providers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getERC20Contract } from '../../context/contracts';

// Retrieve DAI balance
export const getDAIBalance = createAsyncThunk(
  'account/getDAIBalance',
  async ({
    library,
    account,
  }: {
    library: Web3Provider | undefined;
    account: string | undefined | null;
  }) => {
    const contract = getERC20Contract(library);
    console.log(contract)
    const dai: BigNumber = await contract.balanceOf(account);
    return formatEther(dai);
  },
);

// Retrieve exchange rate of ethereum and dai
export const getExchangeRate = createAsyncThunk(
  'account/getExchangeRate',
  async () => {
    const CoinGecko = require('coingecko-api');
    const CoinGeckoClient = new CoinGecko();

    let result = await CoinGeckoClient.simple.price({
      ids: ['ethereum', 'dai'],
      vs_currencies: ['eur', 'usd'],
    });
    return result.data
  },
);
