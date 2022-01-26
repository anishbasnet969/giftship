import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

axios.defaults.baseURL = baseURL;

axios.defaults.timeout = 5000;

axios.defaults.headers.common['Authorization'] = localStorage.getItem(
  'access_token'
)
  ? 'Bearer ' + localStorage.getItem('access_token')
  : null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refresh_token = localStorage.getItem('refresh_token');

      try {
        const response = await axios.post('/token/refresh/', {
          refresh: refresh_token,
        });
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response.data.access;
        originalRequest.headers.common['Authorization'] =
          'Bearer ' + response.data.access;
        return await axios(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }

    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
