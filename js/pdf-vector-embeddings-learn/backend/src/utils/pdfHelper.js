const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Pinecone } = require('@pinecone-database/pinecone');
const pdfParse = require('pdf-parse');

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});

/**
 * Extracts text from a PDF buffer
 * @param {Buffer} pdfBuffer - The PDF file buffer
 * @returns {Promise<string>} - The extracted text
 */
async function extractTextFromPDF(pdfBuffer) {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

/**
 * Creates embeddings from text using Google Gemini
 * @param {string} text - The text to create embeddings from
 * @returns {Promise<number[]>} - The embeddings array
 */
async function createEmbeddings(text) {
  try {
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error creating embeddings:', error);
    throw new Error('Failed to create embeddings');
  }
}

/**
 * Stores embeddings in Pinecone
 * @param {number[]} embeddings - The embeddings to store
 * @param {string} text - The original text
 * @param {string} pdfId - The PDF document ID
 * @returns {Promise<void>}
 */
async function storeEmbeddings(embeddings, text, pdfId) {
  try {
    const index = pinecone.index('pdf-embeddings');
    
    await index.upsert([
      {
        id: pdfId,
        values: embeddings,
        metadata: {
          text,
          timestamp: new Date().toISOString(),
        },
      },
    ]);
  } catch (error) {
    console.error('Error storing embeddings in Pinecone:', error);
    throw new Error('Failed to store embeddings in Pinecone');
  }
}

/**
 * Searches for similar embeddings in Pinecone
 * @param {string} query - The search query
 * @param {number} topK - Number of results to return
 * @returns {Promise<Array>} - Array of similar results
 */
async function searchSimilarEmbeddings(query, topK = 5) {
  try {
    const queryEmbedding = await createEmbeddings(query);
    const index = pinecone.index('pdf-embeddings');
    
    const searchResults = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });
    
    return searchResults.matches;
  } catch (error) {
    console.error('Error searching embeddings:', error);
    throw new Error('Failed to search embeddings');
  }
}

/**
 * Generates a response using Gemini based on context and query
 * @param {string} query - The user's question
 * @param {string} context - The relevant context from PDFs
 * @returns {Promise<string>} - The generated response
 */
async function generateResponse(query, context) {
  try {
    const prompt = `Based on the following context, please answer the question. If the answer cannot be found in the context, say "I cannot find the answer in the provided context."

Context: ${context}

Question: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response');
  }
}

module.exports = {
  extractTextFromPDF,
  createEmbeddings,
  storeEmbeddings,
  searchSimilarEmbeddings,
  generateResponse,
}; 