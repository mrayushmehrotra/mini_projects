import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

const PDFUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      await uploadPDF(file);
    } else {
      setUploadStatus('Please upload a PDF file');
    }
  };

  const handleFileInput = async (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      await uploadPDF(file);
    } else {
      setUploadStatus('Please upload a PDF file');
    }
  };

  const uploadPDF = async (file) => {
    try {
      setIsProcessing(true);
      setUploadStatus('Processing PDF...');

      const formData = new FormData();
      formData.append('pdf', file);

      const response = await axios.post('http://localhost:5000/api/pdf/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('PDF processed successfully!');
    } catch (error) {
      setUploadStatus('Error processing PDF: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'grey.300',
          bgcolor: isDragging ? 'primary.light' : 'background.paper',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          style={{ display: 'none' }}
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload">
          <Button
            component="span"
            variant="contained"
            color="primary"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Upload PDF'}
          </Button>
        </label>
        <Typography variant="body1" sx={{ mt: 2 }}>
          or drag and drop your PDF here
        </Typography>
      </Paper>
      {uploadStatus && (
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            textAlign: 'center',
            color: uploadStatus.includes('Error') ? 'error.main' : 'success.main',
          }}
        >
          {uploadStatus}
        </Typography>
      )}
    </Box>
  );
};

export default PDFUpload; 