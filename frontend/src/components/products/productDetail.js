import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosApi';
import { NavLink, useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    category: {},
    description: '',
    name: '',
    picture: '',
    price: '',
    vendor: {
      email: '',
      vendor_profile: {},
    },
  });
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get('products/' + id).then((res) => {
      console.log(res.data);
      setProduct({
        category: res.data.category,
        description: res.data.description,
        name: res.data.name,
        picture: res.data.picture,
        price: res.data.price,
        vendor: {
          email: res.data.vendor.email,
          vendor_profile: res.data.vendor.vendor_profile,
        },
      });
    });
  }, [setProduct]);

  useEffect(() => {
    axiosInstance.get(`products/recent/`).then((res) => {
      console.log(res.data);
      setRecentProducts(res.data);
    });
  }, [setRecentProducts]);

  return (
    <Container component="main" maxWidth="lg" sx={{ pt: 8 }}>
      <Grid container spacing={2} sx={{ mt: 5 }} justifyContent="space-between">
        <Grid item md={8}>
          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item md={6}>
                  <img src={`${product.picture}`} alt="" height={290} />
                </Grid>
                <Grid item md={6}>
                  <Typography variant="h5" component="h5">
                    {product.name}
                  </Typography>
                  <Divider />
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <Typography variant="body1" component="p">
                      Vendor:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      sx={{ mt: 0.4, ml: 1 }}
                    >
                      {product.vendor.vendor_profile.full_name}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ mt: 6 }}
                    variant="h4"
                    color="primary"
                    component="h4"
                  >
                    Rs.{product.price}
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="h6" component="h6">
                      Category:
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ mt: 0.6, ml: 1 }}
                    >
                      {product.category.name}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    component={NavLink}
                    to="/checkout"
                    size="large"
                    sx={{ mt: 7 }}
                    disableElevation
                    endIcon={<CardGiftcardIcon />}
                  >
                    Gift
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Product Details:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item md={3}>
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ ml: 2 }} variant="h5" component="h5">
                You may like:
              </Typography>
            </Grid>
            {recentProducts.map((product) => (
              <Grid item key={product.id} xs={12}>
                <Card sx={{ maxWidth: 345, m: 2 }} elevation={2}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.picture}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="body2" color="black" component="p">
                      {product.name}
                    </Typography>
                    <Typography variant="h6" color="primary" component="h6">
                      Rs.{product.price}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    href={`/${product.id}`}
                    size="small"
                    sx={{ ml: 1, mb: 1 }}
                    disableElevation
                  >
                    View
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
