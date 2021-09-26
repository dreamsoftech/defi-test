import { createReducer } from '@reduxjs/toolkit';
import { getDAIBalance } from './actions';

export type AccountState = {
  ethBalance?: string; // ETH balance
  daiBalance?: string; // DAI balance
};

const initialState: AccountState = {
  ethBalance: undefined,
  daiBalance: undefined,
};

export const accountReducer = createReducer(initialState, (builder) => {
  builder.addCase(getDAIBalance.fulfilled, (state, { payload }) => {
    state.daiBalance = payload;
  });
});

export default accountReducer;
