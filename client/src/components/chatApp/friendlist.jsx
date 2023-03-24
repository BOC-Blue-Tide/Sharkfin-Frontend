import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FriendListChat = function(props) {



  let map = props.friends.map((element) => {
    return <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        width: '100%',
        height: 128,
      },
    }}
  >
  <Item>
      <div className='chatfriendtile' onClick={() => props.handleClick(element.name)}>
      <img src={element.picture} height='100px' className='chatfriendpic'/>
      {element.name}
    </div>
      </Item>
  </Box>
  })
  return (
    <>
    {map}
    </>
  )
}

export default FriendListChat;