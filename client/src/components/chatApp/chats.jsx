import React, {useState} from 'react';

const ChatBubble = function(props) {
  let messageList = props.messages.map((element) => {
    if (element.type === 'outgoing') {
      return <div className='outgoingchatbubble'>{element.message}</div>
    }
    if (element.type === 'incoming') {
      return <div className='incomingchatbubble'>{element.message}</div>
    }
  });

  return messageList;
}

export default ChatBubble;