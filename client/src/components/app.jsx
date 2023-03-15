import React, { useState } from 'react';
import TransactionList from './TransactionList.jsx';
import mockData from '../../../mockData.js';

import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Route, Routes } from 'react-router-dom';
import AccountInfo from './accountInfo.jsx';
import Dashboard from './exampleComponent.jsx'
import Header from './header.jsx'


const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
  typography: {
    fontFamily: 'Inter, sans-Serif',
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'bold',
    },
  },
  components: {
    MuiCssBaseline: {
      // styleOverrides: `
      // @font-face { font-family: 'Inter'; font-style: normal; font-display: swap; font-weight: 400; src: local('Inter'), local('Inter-Regular'), url(${InterWoff2}) format('woff2'); unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF; } 
      // `,
    },
    Link: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
        },
      },
    },
  }
});

function App() {

  return (
  
    <ThemeProvider theme={theme}>
            {/* <TransactionList data={mockData}/> */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      <Header/>
          <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/accountInfo" element={<AccountInfo/>} />
          </Routes>
    </ThemeProvider>
  );
}

export default App;