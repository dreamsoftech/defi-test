import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import { Box } from '@material-ui/core';
import { useAppSelector } from '../../redux/hooks';
import { accountSelector } from '../../redux/account/selectors';

const Balance = () => {
  const { account, library, chainId } = useWeb3React();
  const [balance, setBalance] = useState<string>();
  const { ethExchangeRate } = useAppSelector(accountSelector);

  useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: string) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance('');
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <Box component="span">
      {balance === null
        ? 'Error'
        : balance
        ? `${parseFloat(formatEther(balance)).toFixed(2)} ETH`
        : ''}
      {ethExchangeRate != null && balance != null &&
        `  ($${(ethExchangeRate * parseFloat(formatEther(balance))).toFixed(2)})`
      }
    </Box>
  );
};

export default Balance;
