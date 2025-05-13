import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PDFUpload from './components/PDFUpload';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold' }}
        >
          PDF Assistant
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          color="text.secondary"
        >
          Upload your PDF and ask questions about its content
        </Typography>

        <Box sx={{ my: 6 }}>
          <PDFUpload />
        </Box>

        <Box sx={{ my: 6 }}>
          <ChatInterface />
        </Box>
      </Box>
    </Container>
  );
}

export default App; 