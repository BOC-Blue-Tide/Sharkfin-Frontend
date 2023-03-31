import React, { useState } from "react";
import ChatBubble from "./chatBubble.jsx";
import ChatForm from "./chatForm.jsx";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import { Divider } from '@mui/material';


const ChatList = function (props) {
  console.log('current', props.currentFriend.friend_id);
  if (props.currentFriend.friend_id === 0) {
    return <div>Click on a chat to begin</div>;
  }
  let messageList = props.messages.map((element, index) => {
    return (
      <ChatBubble key={index} message={element} currentFriend={props.currentFriend.friend_id} />
    );
  });

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", background: "##FBFBFB", borderRadius: "10px 10px 0px 0px" }}>
        <IconButton
          color="primary"
          onClick={props.handleBackClick}
          sx={{
            marginLeft: "8px",
            marginRight: "4px",
          }}
          aria-label="Back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Box component="span" sx={{ fontWeight: "bold" }}>
        {`${props.currentFriend.firstname} ${props.currentFriend.lastname}`}
        </Box>
      </Box>
      <Divider sx={{marginTop: "7px"}}/>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
          marginBottom: "16px",
          maxHeight: "400px",
        }}
      >
        {messageList}
      </Box>
     
        <ChatForm handleFormSubmit={props.handleFormSubmit} />
    </>
  );
};

export default ChatList;