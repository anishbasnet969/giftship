import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogOut({ setAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('users/logout/', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axios.defaults.headers.common['Authorization'] = null;
    setAuthenticated(false);
    navigate('/login');
  });
  return <div>Logging Out....</div>;
}
