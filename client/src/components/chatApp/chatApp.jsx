import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Unstable_Grid2';
import TransactionList from '../transactions/TransactionList.jsx';
import mockData from '../../../../mockData.js';
import ChatList from './chats.jsx';
import FriendListChat from './friendlist.jsx';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '##f7f7f7',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',

}));

const chatApp = function () {
  const [chatData, setChatData] = useState([
    {
      "sent_from": 1,
      "sent_to": 2,
      "message": "Hello",
      "datetime": "Sat, 25 Mar 2023 01:20:56 GMT"
    },
    {
      "sent_from": 1,
      "sent_to": 2,
      "message": "How are you doing today?",
      "datetime": "Sat, 25 Mar 2023 01:21:56 GMT"
    },
    {
      "sent_from": 2,
      "sent_to": 1,
      "message": "Im doing well! I just bought some bitcoin",
      "datetime": "Sat, 25 Mar 2023 01:22:56 GMT"
    }]);
  const [friendData, setFriendData] = useState([
    {
      "friend_id": 2,
      "username": "B_Sal",
      "firstname": "Brian",
      "lastname": "Salinger",
      "profilepic_url": "https://cdn-icons-png.flaticon.com/128/4872/4872603.png"
    },
    {
      "friend_id": 3,
      "username": "theRealKarlM",
      "firstname": "Karl",
      "lastname": "Mulroney",
      "profilepic_url": "https://cdn-icons-png.flaticon.com/128/4872/4872537.png"
    }
  ]);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(0);
  const [inChat, setInChat] = useState(false);
  const [currentFriendName, setCurrentFriendName] = useState('');



  //friends list

  let friends = [
    {
      id: 1,
      username: 'Rachel'
    },
    {
      id: 2,
      username: 'Monica'
    },
    {
      id: 3,
      username: 'Phoebe'
    },
    {
      id: 4,
      username: 'Chandler'
    },
    {
      id: 5,
      username: 'Joey'
    },
    {
      id: 6,
      username: 'Ross'
    }
  ];


  let searchResults = [
    {
      id: 1,
      username: 'Rachel'
    }
  ];

  const handleBackClick = () => {
    setInChat(false);
  };



  const handleClick = function (input) {
    var array = chatData.filter(element => element.sent_from === input || element.sent_to === input);
    var currentFriendData = friendData.find(element => element.friend_id === input);
    setCurrentChat(array);
    setCurrentFriend(currentFriendData)
    setInChat(true);
    console.log('inchat', inChat)
    console.log(currentChat, currentFriend)
    
  }

  const handleFormSubmit = function (message) {
    let date = new Date();
    let data = {
      sent_to: currentFriend,
      sent_from: 1,
      message: message,
      datetime: date.toUTCString()
    }
    axios.post(`http://${SERVER_URL}/chat`, data)
      .then((response) => {
        console.log(response);
        setChatData([...chatData, data]);
        setCurrentChat([...currentChat, data]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // useEffect(() => {
  //   let getChatLog = axios.get(`http://${SERVER_URL}/chat`, {'sent_from' = });
  //   let getFriendList = axios.get(`http://${SERVER_URL}/chat/friends`);

  //   Promise.all([getChatLog, getFriendList])
  //   .then(([response1, response2]) => {
  //     setChatData(response1.data);
  //     setFriendData(response2.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }, []);

  return (
    <>
      {inChat ? (
        <>
          <ChatList
            messages={currentChat}
            handleFormSubmit={handleFormSubmit}
            currentFriend={currentFriend}
            handleBackClick={handleBackClick}
          />
        </>
      ) : (
        <>
        <Box component="span" sx={{ fontWeight: "bold", margin: "20px" }}>
          Messages
        </Box>
        <FriendListChat friends={friendData} handleClick={handleClick} />
        </>
      )}
    </>
  );
};

export default chatApp;