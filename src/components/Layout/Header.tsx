import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          DeFi App
        </Typography>


        <div>
          <Typography>User name</Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
