import React from 'react';
import axiosInstance from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

function ProductDelete() {
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteHandler = () => {
    axiosInstance.delete(`products/delete/${id}/`).then((res) => {
      console.log(res.data);
      navigate('/vendor');
      window.location.reload();
    });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ pt: 4 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Are you sure you want to delete?
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={4}>
            <Button
              fullWidth
              onClick={deleteHandler}
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Yes
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              onClick={() => {
                navigate('/vendor');
              }}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              No
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ProductDelete;
