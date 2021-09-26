import { AppBar, Button, Box, Toolbar, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injected } from '../../context/connectors'
import Account from '../Account'
import Balance from '../Balance'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1
    },
    connect: {
      color: theme.palette.primary.main
    }
  })
)

const Header = () => {
  const classes = useStyles()
  const { activate, active } = useWeb3React();

  const connectWallet = (con = injected) => {
    try {
      activate(con, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(con);
        }
      });
    } catch (error) {
      alert('Failed to connect.');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          DeFi App
        </Typography>

        {active ? (
          <Box display="flex" flexDirection="column" textAlign="end">
            <Account />
            <Balance />
          </Box>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => connectWallet()}>
            Connect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
