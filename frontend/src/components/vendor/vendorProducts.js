import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../../axiosApi';
import { NavLink } from 'react-router-dom';

function VendorProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get('products/vendor/items/').then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, [setProducts]);

  return (
    <Container maxWidth="md" component="main" sx={{ pt: 8 }}>
      <Typography sx={{ mt: 4, mb: 2, ml: 1 }} variant="h6" component="div">
        Your Products:
      </Typography>
      <Paper>
        <List>
          {products.map((product) => (
            <ListItem
              key={product.id}
              secondaryAction={
                <>
                  <IconButton
                    component={NavLink}
                    to={'/vendor/edit/' + product.id}
                    edge="end"
                    aria-label="delete"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    component={NavLink}
                    to={'/vendor/delete/' + product.id}
                    sx={{ ml: 2 }}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar src={'http://localhost:8000' + product.picture} />
              </ListItemAvatar>
              <ListItemText primary={product.name} />
            </ListItem>
          ))}
          <ListItem
            secondaryAction={
              <IconButton
                component={NavLink}
                to="/vendor/create"
                edge="end"
                aria-label="delete"
              >
                <AddCircleOutlineIcon />
              </IconButton>
            }
          >
            <ListItemText primary="Add New Item" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

export default VendorProducts;
