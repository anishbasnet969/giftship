import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import Home from './home';
import Register from './components/users/register';
import Login from './components/users/login';
import LogOut from './components/users/logout';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
  },
});

function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('access_token') ? true : false
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header authenticated={authenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/logout"
            element={<LogOut setAuthenticated={setAuthenticated} />}
          />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
