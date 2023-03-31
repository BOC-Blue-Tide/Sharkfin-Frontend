import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

const FriendListChat = function (props) {
  let map = props.friends.map((element, index) => {
    const recentMessage = props.recentMessages[element.friend_id];
    const messageText = recentMessage ? recentMessage.message : '';

    return (
      <ListItem
        key={index}
        button
        onClick={() => props.handleClick(element.friend_id)}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
          '&:not(:last-child)': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          },
          padding: '16px',
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={`${element.firstname} ${element.lastname}`}
            src={element.profilepic_url}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${element.firstname} ${element.lastname}`}
          secondary={messageText}
        />
      </ListItem>
    );
  });

  return (
    <Box sx={{ maxHeight: "490px", overflowY: "auto" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "##FBFBFB",
          borderRadius: "10px 10px 0px 0px",
        }}
      >
        <Box component="span" sx={{ fontWeight: "bold", margin: "12px 20px 10px 20px" }}>
          Messages
        </Box>
      </Box>
      <Divider sx={{ margin: "7px" }} />
      {map}
    </Box>
  );
};

export default FriendListChat;