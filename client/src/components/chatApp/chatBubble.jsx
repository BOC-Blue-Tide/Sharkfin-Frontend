import React, {useState} from 'react';


const ChatBubble = function(props) {
  const [showDate, setShowDate] = useState(false);

  const toggleDiv = function(e) {
    setShowDate(!showDate);
  }

    let chatDate;
    if (!showDate) {
      chatDate = null;
    } else {
      if (props.message.type === 'outgoing') {
        chatDate = <div className='outgoingchatdate'>{props.message.date}</div>;
      } else if (props.message.type === 'incoming') {
        chatDate = <div className='incomingchatdate'>{props.message.date}</div>;
      }
    }

    if (props.message.type === 'outgoing') {
      return <>
      <div className='outgoingchatbubble' onClick={toggleDiv}>{props.message.message}</div>
      {chatDate}
      </>
    }
    if (props.message.type === 'incoming') {
      return <>
      <div className='incomingchatbubble' onClick={toggleDiv}>{props.message.message}</div>
      {chatDate}
      </>
    }
}

export default ChatBubble;