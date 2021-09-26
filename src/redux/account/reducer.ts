import { createReducer } from '@reduxjs/toolkit';
import { getDAIBalance } from './actions';
import { getExchangeRate } from './actions';

export type AccountState = {
  ethBalance?: string; // ETH balance
  daiBalance?: string; // DAI balance
  ethExchangeRate: number; // ETH exchange rate
  daiExchangeRate: number; // DAI exchange rate
};

const initialState: AccountState = {
  ethBalance: undefined,
  daiBalance: undefined,
  ethExchangeRate: 0,
  daiExchangeRate: 0
};

export const accountReducer = createReducer(initialState, (builder) => {
  builder.addCase(getDAIBalance.fulfilled, (state, { payload }) => {
    state.daiBalance = payload;
  }).addCase(getExchangeRate.fulfilled, (state, { payload }) => {
    state.ethExchangeRate = payload.ethereum.usd;
    state.daiExchangeRate = payload.dai.usd;
  });
});

export default accountReducer;
