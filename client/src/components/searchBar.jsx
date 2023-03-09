import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';


const searchBar = (props) => {

  const [searchInput, setSearchInput] = useState('')


  const handleInput = (e) => {
    setSearchInput(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchInput.length > 0) {
      props.getStockData(searchInput, 'search')
      e.target.reset()
    }

  }

  return (
    <div className="searchBar-container">
      <form onSubmit={handleSubmit}>
        <SearchIcon />
        <input type="text" onInput={(e) => handleInput(e.target.value)} />
      </form>
    </div>
  )
}

export default searchBar