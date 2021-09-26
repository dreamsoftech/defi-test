import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import { Web3Provider } from '@ethersproject/providers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getERC20Contract } from '../../context/contracts';

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
