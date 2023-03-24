import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TransactionList from '../transactions/TransactionList.jsx';
import mockData from '../../../../mockData.js';
import ChatList from './chats.jsx';
import FriendListChat from './friendlist.jsx';
import pic1 from '../../../../client/dist/pic1.png';
import pic2 from '../../../../client/dist/pic2.png';
import pic3 from '../../../../client/dist/pic3.png';

let friends = [
  { name: 'Bob Salinger',
    picture: pic1},
  { name: 'Wendy Chan',
  picture: pic2},
  { name: 'Karl Mulroney',
  picture: pic3},
]

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

let messages = [
  { user: 'Bob Salinger',
    type: 'outgoing',
    message: 'Hello',
    date: 'Mar 24, 11:13 AM'
  },
  { user: 'Bob Salinger',
    type: 'outgoing',
    message: 'how are you?',
    date: 'Mar 24, 11:14 AM'
  },
  { user: 'Bob Salinger',
    type: 'incoming',
    message: 'Im doing great! How are you?',
    date: 'Mar 24, 11:14 AM'
  },
  { user: 'Bob Salinger',
    type: 'outgoing',
    message: 'I just bought more shares of TSLA!',
    date: 'Mar 24, 11:14 AM'
  },
  { user: 'Wendy Chan',
    type: 'outgoing',
    message: 'Hi Wendy!',
    date: 'Mar 24, 11:14 AM'
  },
  { user: 'Wendy Chan',
    type: 'incoming',
    message: 'Heyyyyy, how are you?',
    date: 'Mar 24, 11:14 AM'
  },
  { user: 'Karl Mulroney',
    type: 'incoming',
    message: 'Yo I just bought some TSLA!!',
    date: 'Mar 24, 11:14 AM'
  },
  { user: 'Karl Mulroney',
    type: 'outgoing',
    message: 'Same!!!',
    date: 'Mar 24, 11:14 AM'
  }
];

const chatApp = function() {
  const [currentChat, setCurrentFriend] = useState([]);

  const handleClick = function(input) {
    var array = messages.filter(element => element.user === input);
    setCurrentFriend(array);
  }

  const handleFormSubmit = function(data) {
    console.log(data);
  }

  return (
    <>
    <Grid container spacing={2}>
      <Grid xs={4}>
        <Item>
          <FriendListChat friends={friends} handleClick={handleClick}/>
        </Item>
      </Grid>
      <Grid xs={8}>
        <Item>
          <ChatList messages={currentChat} handleFormSubmit={handleFormSubmit}/>
        </Item>
      </Grid>
    </Grid>
    </>
  )
}

export default chatApp;