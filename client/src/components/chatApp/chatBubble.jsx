import React, {useState} from 'react';

const ChatBubble = function(props) {
  const [showDate, setShowDate] = useState(false);

  const toggleDiv = function(e) {
    setShowDate(!showDate);
  }

  let formatDate = function(datestring) {
    let date = new Date(datestring);
    let options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC'
    };
    return date.toLocaleString('en-US', options);
  }

    let chatDate;
    if (!showDate) {
      chatDate = null;
    } else {
      if (props.message.sent_to === props.currentFriend) {
        chatDate = <div className='outgoingchatdate'>{formatDate(props.message.datetime)}</div>;
      } else if (props.message.sent_from === props.currentFriend) {
        chatDate = <div className='incomingchatdate'>{formatDate(props.message.datetime)}</div>;
      }
    }

    if (props.message.sent_to === props.currentFriend) {
      return <>
      <div className='outgoingchatbubble' onClick={toggleDiv}>{props.message.message}</div>
      {chatDate}
      </>
    }
    if (props.message.sent_from === props.currentFriend) {
      return <>
      <div className='incomingchatbubble' onClick={toggleDiv}>{props.message.message}</div>
      {chatDate}
      </>
    }
}

export default ChatBubble;