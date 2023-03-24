import React, {useState} from 'react';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

let messages = [
  { user: 'outgoing',
    message: 'Hello'
  },
  { user: 'outgoing',
    message: 'how are you?'
  },
  { user: 'incoming',
  message: 'Im doing great! How are you?'
  }
];

const ChatBubble = function(props) {
  let messageList = messages.map((element) => {
    if (element.user === 'outgoing') {
      return <div className='outgoingchatbubble'>{element.message}</div>
    }
    if (element.user === 'incoming') {
      return <div className='incomingchatbubble'>{element.message}</div>
    }
  });

  return messageList;
}

export default ChatBubble;