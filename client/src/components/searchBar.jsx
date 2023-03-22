import React, { useState, useEffect } from 'react';
import helpers from './helperFunctions/requestHelpers.js'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


import { useNavigate } from 'react-router-dom';

const searchBar = (props) => {

  const [searchScope, setSearchScope] = useState('stock')
  const [searchInput, setSearchInput] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const storedSearchHistory = localStorage.getItem('searchHistory');
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }
  }, []);

  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = (e) => {
    const scope = e.target.innerText
    setSearchScope(scope)
    setAnchorEl(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.length > 0) {
      // Update search history
      const newSearchHistory = [
        ...searchHistory,
        { searchInput, searchScope },
      ];
      setSearchHistory(newSearchHistory);
      console.log(newSearchHistory)
      localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));

      props.getStockData(searchInput, searchScope, 'search');
      e.target.reset();
      navigate(`/searchContent`);
    }
  };

  const handleSearchFocus = () => {
    const storedSearchHistory = localStorage.getItem('searchHistory');
    console.log('focused', storedSearchHistory)
    setShowSearchHistory(true);

    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }
  };



  return (
    <div className="searchBar-container">
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={0.5}>
          <SearchIcon />
          <input className='searchInput'
            type="text"
            onInput={handleInput}
            onFocus={handleSearchFocus}
            onBlur={() => setShowSearchHistory(false)}
            placeholder="Search by symbol" />
          <Button variant="contained" onClick={handleClick}>
            {`${searchScope}`}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem data-scope={'stock'} onClick={handleClose}>Stock</MenuItem>
            <MenuItem data-scope={'crypto'} onClick={handleClose}>Crypto</MenuItem>
          </Menu>
        </Stack>
      </form>      
      <Card className="searchHistory">
        {showSearchHistory && searchHistory.map((item, index) => (
           <Typography key={index} variant="body2" component="div">
            {item.searchInput} ({item.searchScope})
            </Typography>        
            ))}
      </Card>
    </div>
  );
};

export default searchBar;