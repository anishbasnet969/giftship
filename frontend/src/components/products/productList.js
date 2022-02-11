import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosApi';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import ProductCard from './productCard';

function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get('products/').then((res) => {
      console.log(res.data);
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ pt: 4, align: 'center' }}>
      <CssBaseline />
      <Grid container spacing={2} sx={{ mt: 8 }}>
        <Grid item xs={12}>
          <Typography sx={{ ml: 2 }} variant="h5" component="h5">
            All Products:
          </Typography>
        </Grid>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} md={3}>
            <ProductCard loading={loading} product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductList;
