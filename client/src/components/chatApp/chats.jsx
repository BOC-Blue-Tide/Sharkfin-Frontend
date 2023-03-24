import React, {useState} from 'react';
import ChatBubble from './chatBubble.jsx';
import ChatForm from './chatForm.jsx';


const ChatList = function(props) {
  if (props.messages.length === 0) {
    return <div>Click on a chat to begin</div>
  }
  let messageList = props.messages.map((element) => {
    return <ChatBubble message={element} />
  });

  return (
    <>
    {messageList}
    <ChatForm handleFormSubmit={props.handleFormSubmit}/>
    </>
  )
}

export default ChatList;