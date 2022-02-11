import React, { useState } from 'react';
import axiosInstance from '../../axiosApi';
import { useNavigate, NavLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SignUp() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState('customer');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === 'vendor') {
      axiosInstance
        .post('users/create-vendor/', {
          email: email,
          password: password,
          profile: {
            user_name: userName,
            full_name: fullName,
            phone_number: phoneNumber,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate('/login');
        });
    } else {
      axiosInstance
        .post('users/create-customer/', {
          email: email,
          password: password,
          profile: {
            user_name: userName,
            full_name: fullName,
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate('/login');
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ pt: 4 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'red' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="user-name"
                name="username"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                autoComplete="full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Register As:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userType}
                  label="Register As"
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <MenuItem value="vendor">Vendor</MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {userType === 'vendor' ? (
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phonenum"
                  label="Phone Number"
                  name="phonenum"
                  autoComplete="phone-num"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.trim())}
                />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/login" component={NavLink} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
