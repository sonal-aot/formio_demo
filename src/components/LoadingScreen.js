import React from 'react';
import { Box, CircularProgress, Container } from '@mui/material';

const LoadingScreen = () => (
  <Container>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      className="loading-container"
    >
      <CircularProgress />
    </Box>
  </Container>
);

export default LoadingScreen;
