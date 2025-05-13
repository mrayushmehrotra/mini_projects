const PDF = require('../models/PDF');
const { extractTextFromPDF, createEmbeddings, storeEmbeddings, searchSimilarEmbeddings, generateResponse } = require('../utils/pdfHelper');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload and process PDF
exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const buffer = req.file.buffer;
    const text = await extractTextFromPDF(buffer);
    const embeddings = await createEmbeddings(text);

    // Store in MongoDB
    const pdf = new PDF({
      filename: req.file.filename,
      originalName: req.file.originalname,
      text,
      embeddings,
    });
    await pdf.save();

    // Store in Pinecone
    await storeEmbeddings(embeddings, text, pdf._id.toString());

    res.status(200).json({
      message: 'PDF processed successfully',
      pdfId: pdf._id,
    });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: 'Error processing PDF' });
  }
};

// Search and answer questions
exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Search for similar embeddings
    const similarResults = await searchSimilarEmbeddings(question);
    const context = similarResults
      .map(result => result.metadata?.text || '')
      .join('\n\n');

    // Generate response
    const answer = await generateResponse(question, context);

    res.status(200).json({ answer });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ error: 'Error processing question' });
  }
}; 