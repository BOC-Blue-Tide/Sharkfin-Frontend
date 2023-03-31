import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const GlobalPadding = ({ children, background, screen = 'full' }) => {
  return (
    <Container sx={{  margin: 0,
        padding: 0}} disableGutters>
      <Box
        sx={{
            margin: 0,
            padding: screen === 'full'
            ? '5px 7% 5px 7%'
            : screen === 'left'
            ? '5px 7% 5px 14%'
            : '5px 14% 5px 7%',
          width: '100%',
          height: '100%',
          background: background || 'transparent',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default GlobalPadding;



