import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <ThemeProvider theme={theme}>
      <>
      Hello Worldsss
      </>
  </ThemeProvider>
    )
  }
}

export default App;