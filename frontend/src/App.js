import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosApi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import Register from './components/users/register';
import Login from './components/users/login';
import LogOut from './components/users/logout';
import ProductList from './components/products/productList';
import ProductDetail from './components/products/productDetail';
import Checkout from './components/order/Checkout';

import VendorProducts from './components/vendor/vendorProducts';
import ProductCreate from './components/vendor/productCreate';
import ProductEdit from './components/vendor/productEdit';
import ProductDelete from './components/vendor/productDelete';

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

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem('user_type') === 'vendor') {
      axiosInstance.get('profiles/vendor-profile/').then((res) => {
        console.log(res.data.data);
        setUserInfo(res.data.data);
      });
    } else {
      axiosInstance.get('profiles/customer-profile/').then((res) => {
        console.log(res.data.data);
        setUserInfo(res.data.data);
      });
    }
  }, [setUserInfo]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header authenticated={authenticated} userInfo={userInfo} />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/:id" element={<ProductDetail />} />
          <Route path="/vendor" element={<VendorProducts />} />
          <Route path="/vendor/create" element={<ProductCreate />} />
          <Route path="/vendor/edit/:id" element={<ProductEdit />} />
          <Route path="/vendor/delete/:id" element={<ProductDelete />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/logout"
            element={
              <LogOut
                setAuthenticated={setAuthenticated}
                setUserInfo={setUserInfo}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
