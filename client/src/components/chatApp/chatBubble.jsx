// ChatBubble.jsx
import React, { useState } from "react";
import { Box } from "@mui/material";

const ChatBubble = function (props) {
  const [showDate, setShowDate] = useState(false);

  const toggleDiv = function (e) {
    setShowDate(!showDate);
  };

  let formatDate = function (datestring) {
    let date = new Date(datestring);
    let options = {
      year: "numeric",
      month: "short",
      day:  "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };

  let chatDate;
  if (!showDate) {
    chatDate = null;
  } else {
    if (props.message.sent_to === props.currentFriend) {
      chatDate = (
        <Box className="outgoingchatdate" sx={{ textAlign: "right", fontSize: "0.75rem" }}>
          {formatDate(props.message.datetime)}
        </Box>
      );
    } else if (props.message.sent_from === props.currentFriend) {
      chatDate = (
        <Box className="incomingchatdate" sx={{ textAlign: "left", fontSize: "0.75rem" }}>
          {formatDate(props.message.datetime)}
        </Box>
      );
    }
  }

  if (props.message.sent_to === props.currentFriend) {
    return (
      <>
        <Box
          className="outgoingchatbubble"
          onClick={toggleDiv}
          sx={{
            alignSelf: "flex-end",
            backgroundColor: "#0f7c90",
            color: "#ffffff",
            borderRadius: "1rem",
            padding: "8px 16px",
            marginBottom: "8px",
            maxWidth: "70%",
            wordBreak: "break-word",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          {props.message.message}
        </Box>
        {chatDate}
      </>
    );
  }
  if (props.message.sent_from === props.currentFriend) {
    return (
      <>
        <Box
          className="incomingchatbubble"
          onClick={toggleDiv}
          sx={{
            alignSelf: "flex-start",
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            padding: "8px 16px",
            marginBottom: "8px",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
            maxWidth: "70%",
            wordBreak: "break-word",
          }}
        >
          {props.message.message}
        </Box>
        {chatDate}
      </>
    );
  }
};

export default ChatBubble;