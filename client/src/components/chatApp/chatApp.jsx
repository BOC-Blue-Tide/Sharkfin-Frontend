import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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

const chatApp = function(props) {
  const [chatData, setChatData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentFriend, setCurrentFriend] = useState(0);
  const [inChat, setInChat] = useState(false);


  const handleBackClick = () => {
    setInChat(false);
  };

  const getMostRecentMessages = (chatData) => {
    const recentMessages = {};

    chatData.forEach((message) => {
      const friend_id = message.sent_from === 1 ? message.sent_to : message.sent_from;

      if (
        !recentMessages[friend_id] ||
        new Date(recentMessages[friend_id].datetime) < new Date(message.datetime)
      ) {
        const truncatedMessage =
          message.message.length > 36
            ? message.message.slice(0, 33) + '...'
            : message.message;
        recentMessages[friend_id] = { ...message, message: truncatedMessage };
      }
    });

    return recentMessages;
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

  const recentMessages = getMostRecentMessages(chatData);


  return (
    <>
      {inChat ? (
        <>
          <ChatList
            messages={currentChat}
            handleFormSubmit={handleFormSubmit}
            currentFriend={currentFriend}
            handleBackClick={handleBackClick}
            sx={{
              overflowY: "none",
            }}
          />
        </>
      ) : (
        <>
          <FriendListChat recentMessages={recentMessages}
            friends={friendData} handleClick={handleClick} />
        </>
      )}
    </>
  );
};

export default chatApp;