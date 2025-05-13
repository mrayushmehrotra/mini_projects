const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Upload PDF
router.post('/upload', upload.single('pdf'), pdfController.uploadPDF);

// Ask question
router.post('/ask', pdfController.askQuestion);

module.exports = router; 