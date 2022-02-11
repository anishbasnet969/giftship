import React, { useEffect } from 'react';
import axiosInstance from '../../axiosApi';
import { useNavigate } from 'react-router-dom';

export default function LogOut({ setAuthenticated, setUserInfo }) {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.post('users/logout/', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('id');
    axiosInstance.defaults.headers['Authorization'] = null;
    setUserInfo({});
    setAuthenticated(false);
    navigate('/login');
  });
  return <div>Logging Out....</div>;
}
