import React from 'react';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import LoginLogic from './pages/LoginLogic';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginLogic />
    </ThemeProvider>
  );
}

export default App;
