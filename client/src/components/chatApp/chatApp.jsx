import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import TransactionList from '../transactions/TransactionList.jsx';
import mockData from '../../../../mockData.js';
import ChatBubble from './chats.jsx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const chatApp = function() {
  return (
    <>
    <Grid container spacing={2}>
      <Grid xs={4}>
        <Item>Hello</Item>
      </Grid>
      <Grid xs={8}>
        <Item>
          <ChatBubble />
        </Item>
      </Grid>
    </Grid>
    </>
  )
}

export default chatApp;