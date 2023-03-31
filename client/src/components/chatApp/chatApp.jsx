import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TransactionList from '../transactions/TransactionList.jsx';
import mockData from '../../../../mockData.js';
import ChatList from './chats.jsx';
import FriendListChat from './friendlist.jsx';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const chatApp = function(props) {
  const [chatData, setChatData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(0);


  const handleClick = function(input) {
    var array = chatData.filter(element => element.sent_from === input || element.sent_to === input);
    setCurrentFriend(input);
    setCurrentChat(array);
  }

  const handleFormSubmit = function(message) {
    let date = new Date();
    let data = {
      sent_to: currentFriend,
      sent_from: JSON.parse(localStorage.getItem(['googleInfo'])).id,
      message: message,
      datetime: date.toUTCString()
    }
    let unescapedData = {
      sent_to: currentFriend,
      sent_from: JSON.parse(localStorage.getItem(['googleInfo'])).id,
      message: message.replaceAll("''", "'"),
      datetime: date.toUTCString()
    }
    axios.post(`http://${SERVER_URL}/chat`, data)
    .then((response) => {
      setChatData([...chatData, data]);
      setCurrentChat([...currentChat, unescapedData]);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem(['googleInfo'])).id
    let getChatLog = axios.get(`http://${SERVER_URL}/chat/${id}`);
    let getFriendList = axios.get(`http://${SERVER_URL}/chat/${id}/friends`);

    Promise.all([getChatLog, getFriendList])
    .then(([response1, response2]) => {
      setChatData(response1.data);
      setFriendData(response2.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <>
    <Grid container spacing={2}>
      <Grid xs={4}>
        <Item>
          <FriendListChat friends={friendData} handleClick={handleClick}/>
        </Item>
      </Grid>
      <Grid xs={8}>
        <Item>
          <ChatList messages={currentChat} handleFormSubmit={handleFormSubmit} currentFriend={currentFriend}/>
        </Item>
      </Grid>
    </Grid>
    </>
  )
}

export default chatApp;