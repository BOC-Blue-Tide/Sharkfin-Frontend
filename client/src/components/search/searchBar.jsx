import React, { useState, useEffect } from 'react';
import helpers from '../stockCrypto/helperFunctions/requestHelpers.js'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
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
    if (searchScope === 'Stock') {
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
    if (e.target.innerText) {
      if (e.target.innerText.length > 0) {
        setSearchInput(e.target.innerText)
      }
    }


  }

  const handleInput = (value) => {
    setSearchInput(value);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = (e) => {
    const scope = e.target.value
    setSearchScope(scope)
    setAnchorEl(null)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(searchInput.length, searchScope)
    if (searchInput.length > 0 && searchScope === 'Stock') {
      props.getHoldingAmount(searchInput)
      props.getData(searchInput, searchScope)
      e.target.reset()
      navigate(`/stockContent`);
    } else if (searchInput.length > 0 && searchScope === 'Crypto') {
      props.getHoldingAmount(searchInput)
      props.getData(searchInput, searchScope)
      e.target.reset()
      navigate(`/cryptoContent`);
    }

  }
  return (
    <div className="searchBar-container">
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={0.5}>
          <Select
            value={searchScope}
            onChange={handleClose}
            variant="outlined"
          >
            <MenuItem value={'Stock'}>Stock</MenuItem>
            <MenuItem value={'Crypto'}>Crypto</MenuItem>
          </Select>
          <Autocomplete
  id="searchInput"
  freeSolo
  options={suggestionList.map((suggestion) => suggestion['1. symbol'])}
  onInputChange={(event, value) => handleInput(value)}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Search by symbol"
      style={{ width: '250px' }}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleSubmit}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )}
/>
        </Stack>
      </form>
    </div >
  )
}

export default searchBar