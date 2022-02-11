import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
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

const drawerWidth = 240;

export default function ButtonAppBar({ authenticated, userInfo }) {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const drawerContent = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon sx={{ mr: -3 }}>
            <AccountCircleIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={
              userInfo.full_name + ` (${localStorage.getItem('user_type')})`
            }
          />
        </ListItem>
        <Divider />
        {localStorage.getItem('user_type') === 'vendor' ? (
          <ListItem button component={NavLink} to="/vendor">
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItem>
        ) : null}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        elevation={0}
        color="primary"
      >
        <Toolbar className={classes.appBar}>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(!drawerOpen)}
          >
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
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        {drawerContent()}
      </Drawer>
    </Box>
  );
}
