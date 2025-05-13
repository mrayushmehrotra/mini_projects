import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

const ChatInterface = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setResponse('');

      const response = await axios.post('http://localhost:5000/api/pdf/ask', {
        question: query,
      });

      setResponse(response.data.answer);
    } catch (error) {
      setResponse('Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Ask a question about your PDF"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? 'Processing...' : 'Ask Question'}
          </Button>
        </form>

        {response && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Answer:
            </Typography>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                bgcolor: 'background.default',
                whiteSpace: 'pre-wrap',
              }}
            >
              <Typography>{response}</Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ChatInterface; 