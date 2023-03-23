import React, { useState, useEffect } from 'react';
import helpers from '../stockCrypto/helperFunctions/requestHelpers.js'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'

const searchBar = (props) => {

  const [searchScope, setSearchScope] = useState('Stock')
  const [searchInput, setSearchInput] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  // const [selectStock, setSelectStock] = useState('')
  const [suggestionList, setSuggestionList] = useState([])



  useEffect(() => {
    if (searchScope === 'stock') {
      const searchStock = () => {
        Axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'SYMBOL_SEARCH',
            keywords: searchInput,
            apikey: process.env.REACT_APP_ALPHA_VANTAGE
          }
        })
          .then(json => {
            // console.log(json.data)
            setSuggestionList(json.data?.bestMatches);
          })
      }
      const timeOutId = setTimeout(() => {
        if (searchInput) {
          searchStock();
        }
      }, 500);

      return () => {
        clearTimeout(timeOutId);
      }
    }

  }, [searchInput])

  const handleOptionClick = (e) => {
    if (e.target.innerText.length > 0) {
      setSearchInput(e.target.innerText)
    }

  }

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
    if (searchInput.length > 0 && searchScope === 'Stock') {
      //console.log(searchInput)
      props.getStockData(searchInput, searchScope)
      e.target.reset()
      navigate(`/stockContent`);
    } else if (searchInput.length > 0 && searchScope === 'Crypto') {
      props.getStockData(searchInput, searchScope)
      e.target.reset()
      navigate(`/cryptoContent`);
    }

  }

  return (
    <div className="searchBar-container">
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={0.5}>
          {/* <SearchIcon /> */}
          <input className='searchInput' type="text" onChange={handleInput} placeholder="Search by symbol" />
          {/* <Autocomplete
            id="searchInput"
            freeSolo
            options={suggestionList.map((suggestion) => suggestion['1. symbol'])}
            onChange={handleOptionClick}
            renderInput={(params) => <TextField {...params} label="Search by symbol"
              onChange={handleInput} style={{ width: '250px' }}
            />}
          /> */}
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


