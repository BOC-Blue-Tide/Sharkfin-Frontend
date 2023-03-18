import React, { useState } from 'react';
import { Button, InputBase, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Logo from '../img/logo.png';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  main: {
    flexGrow: 1,
    width: '100%',
    margin: '0 auto 50px 0',
    backgroundColor: 'white',
    boxShadow: 'none',
    '@media (min-width: 960px)': { maxWidth: 'none' },
  },
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


const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    
  (location.pathname === '/transferForm' ? '' :
    <AppBar
      position="static"
      sx={styles.main}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: .5 }}>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src={Logo} alt="Your Logo" height="50" />
          </Link>
        </Typography>
        <div sx={styles.search}>
          <InputBase
            placeholder="Search…"
            sx={{
              ...styles.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
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
          <Link to="/logout">
        <Button
          onClick={handleLogout}
          variant="outlined" color="primary"
        >
          Logout
        </Button>
        </Link>
      </Toolbar>
    </AppBar>
  ));
};

export default Header;