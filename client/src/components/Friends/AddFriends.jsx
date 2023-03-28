import React, { useState,useEffect } from 'react';
import { Button } from '@mui/material';
import {friends, searchResults} from  '../../../../mockData_friends.js';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AddFriends = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [showList, setShowList] = useState(true);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("googleInfo")).id;
    axios.get(`http://${SERVER_URL}/getRecommendedFriends`, {params: {id: userId}})
    .then((response) => {
      console.log('get recommended friends', response);
      setFriendsList(response.data.rows);
    })
    .catch(err => console.log('getRecommendedFriends', err));
  }, []);

  const handleInput = async (e) => {
    // console.log('test', e.target.value);
    setSearchInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.length > 0) {
      console.log('search words:', searchInput);
      axios.get(`http://${SERVER_URL}/getUserByEmail`, {params: {email: searchInput}})
      .then((response) => {
        setFriendsList(response.data.rows);
        setShowList(false);
      })
      .catch((err) => {
        console.log('getUserByEmail', err);
      });
    } else {
      setShowList(true);
    }
  }

  const handleRequest = (e) => {
    let friendId = JSON.parse(localStorage.getItem("googleInfo")).id;
    axios.post(`http://${SERVER_URL}/addFriend`, {data: {user_id: e.target.id, friend_id: friendId}})
    .then((response) => {
      const index = friendsList.findIndex((item) => {
        return item.id === Number(e.target.id);
      });
      if (index === -1) return; // if no match found, do nothing
      const newFriendsList = [...friendsList]; // create a new copy of the list
      let oldValue = friendsList[index];
      oldValue['requested'] = true;
      newFriendsList[index] = oldValue; // update the value at the specified index
      setFriendsList(newFriendsList); // set the new list as the state
    })
    .catch(err => console.log("addFriend", err));

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
        {showList?
        ( <div>People you may like:</div> ) :
        ( <div>Search result:</div> )
        }

            {friendsList.map((friend) => {
              return (
                <div key={friend.id}>
                  {/* <label>
                    <img src={friend.profilepic_url}/>
                  </label> */}
                  <label>{friend.username}</label>
                  {/* <button>ADD Friend</button> */}
                  {friend.requested ? (
                    // <label>  requested</label>
                    <Button color="primary" id={friend.id}>requested</Button>
                  ) : (
                  <Button color="primary" id={friend.id} onClick={handleRequest}>Add Friend</Button>
                  )}

                </div>
              )
            })}



        {/* {showSearchResult? <SearchResult />: null} */}
      </div>
    )

}

export default AddFriends;

