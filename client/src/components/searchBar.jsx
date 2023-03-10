import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';


const searchBar = (props) => {

  const [searchScope, setSearchScope] = useState('stock')
  const [searchInput, setSearchInput] = useState('')


  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSelect = (e) => {
    setSearchScope(e.target.value)
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
        <select name="search-Options" id="search-options" onChange={handleSelect}>
          <option value="stock" id="stock" >Stock</option>
          <option value="crypto" id="crypto" >Crypto</option>
        </select>
      </form>
    </div>
  )
}

export default searchBar