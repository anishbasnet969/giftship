import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e6e6e6',
  },
  optionButton: {
    color: 'red',
  },
  logo: {
    textDecoration: 'none',
    color: 'black',
  },
});

export default function ButtonAppBar({ authenticated }) {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      elevation={0}
      color="primary"
    >
      <Toolbar className={classes.appBar}>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon className={classes.optionButton} />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: 'Poppins', fontWeight: 'bold' }}
          color="black"
        >
          <Link to="/" component={NavLink} className={classes.logo}>
            Gift<span className="red">Ship</span>
          </Link>
        </Typography>

        {authenticated ? (
          <div className="red" sx={{ display: 'flex' }}>
            <Button component={NavLink} to="/logout" color="inherit">
              Logout
            </Button>
          </div>
        ) : (
          <div className="red" sx={{ display: 'flex' }}>
            <Button component={NavLink} to="/register" color="inherit">
              SignUp
            </Button>
            <Button component={NavLink} to="/login" color="inherit">
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
