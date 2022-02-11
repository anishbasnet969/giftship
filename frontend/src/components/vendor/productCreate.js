import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosApi';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProductCreate() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [productCategory, setProductCategory] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [price, setPrice] = useState('');

  useEffect(() => {
    axiosInstance.get('products/categories').then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, [setCategories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('picture', picture[0]);
    formData.append('price', price);
    formData.append('vendor', localStorage.getItem('id'));
    formData.append('category', productCategory);
    axiosInstance.post('products/create/', formData);
    navigate('/vendor');
    window.location.reload();
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
          Add a New Product
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
            <Grid item xs={12} sm={5}>
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
            <Grid item xs={12} sm={7}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={productCategory}
                  label="Register As"
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <input
                type="file"
                name="picture"
                id="picture"
                onChange={(e) => setPicture(e.target.files)}
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
            Add Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductCreate;
