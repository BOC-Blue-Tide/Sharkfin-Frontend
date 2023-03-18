import React, { useState } from 'react';
import { Button } from '@mui/material';
import {friends, searchResults} from  '../../../../mockData_friends.js';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';

const AddFriends = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [showList, setShowList] = useState(true);
  const [showSearchResult, setSearchResult] = useState(false);

  const handleInput = async (e) => {
    // console.log('test', e.target.value);
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.length > 0) {
      console.log('search words:', searchInput);
      setShowList(false);
      setSearchResult(true);
    } else {
      setShowList(true);
      setSearchResult(false);
    }
  }

  const handleRequest = (e) => {
    console.log(e, 'Requested!');
  }

  const SearchBar = () => {
    return (
      <div className="searchBar-container">
        <form onSubmit={handleSubmit}>
          <SearchIcon />
          <input type="text" onInput={handleInput} />
          <Button variant="contained" type="submit" >Search</Button>
        </form>
      </div >
    )
  };

  const FriendsList = () => {
    return (
      <div>
        People you may like:
        {friends.map((friend) => {
          return (
            <div key={friend.id}>
            <label>{friend.username}</label>
            {/* <button>ADD Friend</button> */}
            <Button color="primary">Add Friend</Button>
          </div>
          )
        })}
      </div>
    )
  }

  const SearchResult = () => {
    return (
      <div>
        Search Results:
        {searchResults.map((friend) => {
          return (
            <div key={friend.id}>
            <label>{friend.username}</label>
            {/* <button>ADD Friend</button> */}
            <Button color="primary" onClick={handleRequest}>Add Friend</Button>
          </div>
          )
        })}
      </div>
    )
  }

    return (
      <div className = 'popup-content'>
        <div>Let's Make Friends!</div>

        {/* <SearchBar /> */}
        <div className="searchBar-container">
          <form onSubmit={handleSubmit}>
            <SearchIcon />
            <input type="text" onInput={handleInput} />
            <Button variant="contained" type="submit" >Search</Button>
          </form>
        </div >

        {/* <FriendsList /> */}
        {showList? (
          <div>
            People you may like:
            {friends.map((friend) => {
              return (
                <div key={friend.id}>
                  <label>{friend.username}</label>
                  {/* <button>ADD Friend</button> */}
                  <Button color="primary" id='12345' onClick={handleRequest}>Add Friend</Button>
                </div>
              )
            })}
          </div>
        ) : null}

        {showSearchResult? <SearchResult />: null}
      </div>
    )

}

export default AddFriends;

