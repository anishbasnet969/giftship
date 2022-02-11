import * as React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

function Media({ loading, product }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }} elevation={2}>
      {loading ? (
        <Skeleton sx={{ height: 100 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image={product.picture}
          alt={product.name}
        />
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 20 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="body2" color="black" component="p">
              {product.name}
            </Typography>
          </React.Fragment>
        )}
      </CardContent>
      {loading ? null : (
        <React.Fragment>
          <Typography
            sx={{ ml: 2 }}
            variant="h6"
            color="primary"
            component="h6"
          >
            Rs.{product.price}
          </Typography>
        </React.Fragment>
      )}
      <CardActions>
        {loading ? null : (
          <React.Fragment>
            <Button
              variant="contained"
              component={NavLink}
              to={`/${product.id}`}
              size="small"
              disableElevation
            >
              View
            </Button>
            <Button
              variant="contained"
              component={NavLink}
              to="/checkout"
              size="small"
              sx={{ ml: 1 }}
              disableElevation
              endIcon={<CardGiftcardIcon />}
            >
              Gift
            </Button>
          </React.Fragment>
        )}
      </CardActions>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function ProductCard({ loading, product }) {
  return (
    <div>
      <Media loading={loading} product={product} />
    </div>
  );
}
