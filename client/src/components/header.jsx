import React, { useState } from 'react';
import { Button, InputBase, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Logo from '../img/logo.png';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './searchBar.jsx'

const styles = {
  link: (isActive) => ({
    margin: '0  20px',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : '500',
    '&:hover': {
      color: 'primary',
    },
  }),
  search: {
    float: 'left',
    position: 'relative',
    borderRadius: '4px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
    marginLeft: 0,
    width: '100%',
    '@media (min-width: 600px)': {
      marginLeft: 1,
      width: 'auto',
    },
  },
  inputInput: {
    padding: 1,
    paddingLeft: `calc(1em + ${4}px)`,
    transition: 'width',
    width: '100%',
    '@media (min-width: 600px)': {
      width: '20ch',
    },
  },
};

const Header = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <AppBar
      position="static"
      sx={{
        flexGrow: 1,
        width: '100%',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: 'none',
        '@media (min-width: 960px)': { maxWidth: 'none' },
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: .5 }}>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src={Logo} alt="Your Logo" height="50" />
          </Link>
        </Typography>
        <SearchBar getStockData={props.getStockData} />
        <Typography sx={styles.link(location.pathname === '/leaderboard')}>
          <Link component="button" to="/leaderboard">
            Leaderboard
          </Link>
        </Typography>
        <Typography sx={styles.link(location.pathname === '/transactionList')}>
          <Link to="/transactionList">
            Transactions
          </Link>
        </Typography>
        <Typography sx={styles.link(location.pathname === '/accountInfo')}>
          <Link to="/accountInfo">
            Account
          </Link>
        </Typography>
        <Typography sx={styles.link}>
          <Link to="/signin" sx={styles.link}>
            Signin
          </Link>
        </Typography>
        <Button
          onClick={handleLogout}
          variant="outlined" color="primary"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;