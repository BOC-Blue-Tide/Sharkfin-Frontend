import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/styles';
import { Button, SearchIcon, InputBase, AppBar, TextField, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/material/Menu';
import Logo from '../img/logo.png'

// import SearchIcon from "@material-ui/material/Search";

import { Link } from 'react-router-dom';

const styles = {
    link: {
      margin: '0  20px',
      textDecoration: 'none',
      color: 'black',
      fontWeight: '500',
      borderBottom: 'none',
    },
    search: {
        float: 'left',
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: (theme) => theme.palette.common.white,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.common.white,
        },
        marginLeft: 0,
        width: '100%',
        ['@media (min-width: 600px)']: {
          marginLeft: 1,
          width: 'auto',
        },
      },
    searchIcon: {
      padding: 1,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: 1,
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${4}px)`,
      transition: (theme) => theme.transitions.create('width'),
      width: '100%',
      ['@media (min-width: 600px)']: {
        width: '20ch',
      },
    },
  };

  const Header = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    };

    const handleLogout = () => {
      // Handle logout logic here
    };

    return (
      <div
        position="static"
        sx={{
          flexGrow: 1,
          width: '100%',
          margin: '0 auto',
          '@media (min-width: 960px)': { maxWidth: 'none' },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: .5 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={Logo} alt="Your Logo" height="50" />
          </Typography>
          <div sx={styles.search}>
            {/* <div sx={styles.searchIcon}>
              <SearchIcon />
            </div> */}
            <InputBase
              placeholder="Search…"
              sx={{
                ...styles.inputInput,
                ...styles.inputRoot,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <Typography sx={styles.link}>
            <Link component="button" to="/leaderboard">
              Leaderboard
            </Link>
          </Typography>
          <Typography sx={styles.link}>
            <Link to="/history" sx={styles.link}>
              History
            </Link>
          </Typography>
          <Typography sx={styles.link}>
            <Link to="/account" sx={styles.link}>
              Account
            </Link>
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </div>
    );
  };

  export default Header;