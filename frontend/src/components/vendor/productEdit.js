import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosApi';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useParams } from 'react-router-dom';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axiosInstance.get('products/' + id).then((res) => {
      setName(res.data.name);
      setDescription(res.data.description);
      setPrice(res.data.price);
      setCategory(res.data.category.id);
    });
  }, [setName, setDescription, setPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`products/edit/${id}/`, {
        name: name,
        description: description,
        price: price,
        vendor: localStorage.getItem('id'),
        category: category,
      })
      .then((res) => {
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
          Edit Product
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Name of Product"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
                multiline
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="price"
                required
                fullWidth
                id="price"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductEdit;
