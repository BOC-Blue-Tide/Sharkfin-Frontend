import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Route, Routes } from 'react-router-dom';
import AccountInfo from './accountInfo.jsx';
import Dashboard from './exampleComponent.jsx'

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

function App() {

  return (
  
    <ThemeProvider theme={theme}>
          <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/accountInfo" element={<AccountInfo/>} />
          </Routes>
    </ThemeProvider>
  );
}

export default App;