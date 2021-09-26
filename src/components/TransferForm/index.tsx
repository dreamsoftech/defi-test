import { useRef, useState, useEffect } from 'react';
import { Box, TextField, Button } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { accountSelector } from '../../redux/account/selectors';
import { getDAIBalance, getExchangeRate } from '../../redux/account/actions';
import { transactionSelector } from '../../redux/transaction/selector';
import { transferTx, waitTx } from '../../redux/transaction/actions';

const TransferForm = () => {
  const dispatch = useAppDispatch();
  const transferFormRef = useRef<HTMLFormElement>(null);
  const { library, account } = useWeb3React<Web3Provider>();
  const { daiBalance, daiExchangeRate } = useAppSelector(accountSelector);
  const { pending, tx } = useAppSelector(transactionSelector);
  const [amount, setAmount] = useState<string>();
  const [accountTo, setAccountTo] = useState<string>();

  // Retrieve DAI balance and exchange rate of ETH and DAI after connecting wallet
  useEffect(() => {
    dispatch(getDAIBalance({ library, account }));
    dispatch(getExchangeRate());
  }, [library, account, pending]);

  useEffect(() => {
    const clearForm = () => {
      transferFormRef.current?.reset();
      setAmount('');
      setAccountTo('');
    };

    if (tx && pending) {
      dispatch(waitTx(tx));
    }
    if (!pending) {
      clearForm();
    }
  }, [pending, tx]);

  const handleSubmitTransfer = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!amount || !accountTo) return;

    dispatch(transferTx({ library, transferTo: accountTo, amount }));
  };

  return (
    <>
      <form
        ref={transferFormRef}
        onSubmit={handleSubmitTransfer}
        noValidate
        autoComplete="off">
        <Box mb={2}>
          <TextField
            id="dai-amount"
            label="Enter DAI Amount"
            helperText={`Balance: ${
              daiBalance ? parseFloat(daiBalance).toFixed(2) : '0'
            } DAI ($${daiBalance && daiExchangeRate ? (daiExchangeRate * parseFloat(daiBalance)).toFixed(2) : '0'})`}
            fullWidth
            inputProps={{
              pattern: /([0-9]*[.])?[0-9]+/,
            }}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>

        <Box>
          <TextField
            id="recipients-address"
            label="Enter recipients address"
            fullWidth
            required
            onChange={(e) => setAccountTo(e.target.value)}
          />
        </Box>
        <Box mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={pending || !amount || !accountTo}>
            Send
          </Button>
        </Box>
        {pending && (
          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href={`${process.env.ETHERSCAN_URL}tx/${tx?.hash}`}
              size="large"
              target="_blank">
              View on Etherscan
            </Button>
          </Box>
        )}
      </form>
    </>
  )
}

export default TransferForm
