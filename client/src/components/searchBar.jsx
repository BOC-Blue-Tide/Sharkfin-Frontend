import React, { useState } from 'react';
import helpers from './helperFunctions/requestHelpers.js'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


const searchBar = (props) => {

  const [searchScope, setSearchScope] = useState('stock')
  const [searchInput, setSearchInput] = useState('')
  // const [selection, setSelection] = useState(searchScope)


  const handleInput = async (e) => {
    setSearchInput(e)
  }


  const handleSelect = (e) => {
    const { scope } = e.currentTarget.dataset
    setSearchScope(scope)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchInput.length > 0) {
      props.getStockData(searchInput, searchScope, 'search')
      e.target.reset()
    }

  }

  return (
    <div className="searchBar-container">
      <form onSubmit={handleSubmit}>
        <SearchIcon />
        <input type="text" onInput={handleInput} />
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
                {`${searchScope}`}
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem data-scope={'stock'} onClick={handleSelect, popupState.close}>Stock</MenuItem>
                <MenuItem data-scope={'crypto'} onClick={handleSelect, popupState.close}>Crypto</MenuItem>

              </Menu>
            </React.Fragment>
          )}
        </PopupState>

      </form>
    </div >
  )
}

export default searchBar


