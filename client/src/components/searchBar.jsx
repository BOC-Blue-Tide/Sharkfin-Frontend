import React, { useState } from 'react';
import helpers from './helperFunctions/requestHelpers.js'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const searchBar = (props) => {

  const [searchScope, setSearchScope] = useState('stock')
  const [searchInput, setSearchInput] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()


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
    e.preventDefault()
    if (searchInput.length > 0) {
      props.getStockData(searchInput, searchScope, 'search')
      e.target.reset()
      navigate(`/searchContent`);
    }

  }

  return (
    <div className="searchBar-container">
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={0.5}>
          <SearchIcon />
          <input className='searchInput' type="text" onInput={handleInput} placeholder="Search by symbol" />
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
    </div >
  )
}

export default searchBar


