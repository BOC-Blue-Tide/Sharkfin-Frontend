import React, { useState,useEffect } from 'react';
import { Button, Grid} from '@mui/material';
import {friends, searchResults} from  '../../../../mockData_friends.js';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ViewRequests = (props) => {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("googleInfo")).id;
    axios.get(`http://${SERVER_URL}/getFriendRequestsByID`, {params: {user_id: userId}})
    .then((response) => {
      console.log('get recommended friends', response);
      setFriendsList(response.data.rows);
    })
    .catch(err => console.log('getFriendRequestsByID', err));
  }, []);


  const handleRequest = (e) => {
    let relationshipId = e.target.id
    axios.post(`http://${SERVER_URL}/updateFriendStatus`, {data: {id: relationshipId}})
    .then((response) => {
      const index = friendsList.findIndex((item) => {
        return item.id === Number(e.target.id);
      });
      if (index === -1) return; // if no match found, do nothing
      const newFriendsList = [...friendsList]; // create a new copy of the list
      let oldValue = friendsList[index];
      oldValue['added'] = true;
      newFriendsList[index] = oldValue; // update the value at the specified index
      setFriendsList(newFriendsList); // set the new list as the state
    })
    .catch(err => console.log("updateFriendStatus", err));

  }



    return (
      <div className = 'popup-content'>
      <div style={{color:"#FFD300", fontSize: "large", fontWeight: "bold", marginBottom: "20px"}}>Friend Requests</div>
      <div>
        {friendsList.map((friend) => {
          return (

            <div key={friend.id} style={{"display": "flex", "flexDirection": "row","justifyContent": "space-between"}}>

              <div style={{"display": "flex", "flexDirection": "row","justifyContent": "flex-start", "paddingLeft": "20%"}}>
                <div >
                  <img src={friend.profilepic_url} alt="Image" style={{width: "25px", height: "25px"}}/>
                </div>
                <div style={{paddingLeft: "10px"}}>{friend.username}</div>
              </div>

              <div style={{"display": "flex", "flexDirection": "row","justifyContent": "flex-end", paddingRight: "20%"}}>
                {friend.added ? (
                  <Button color="primary" id={friend.id} sx={{ color: 'text.secondary' }}>added</Button>
                ) : (
                  <Button color="primary" id={friend.id} onClick={handleRequest}>Accept Request</Button>
                )}
              </div>

            </div>

          )
        })}
      </div>
    </div>
    )

}

export default ViewRequests;

