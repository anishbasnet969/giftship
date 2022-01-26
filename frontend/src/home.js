import React from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 6, pt: 6 }}>
      <Typography variant="h2" component="h2">
        Loading Products......
      </Typography>
    </Container>
  );
}
