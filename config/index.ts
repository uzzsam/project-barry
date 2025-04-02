/**
 * Configuration settings for the Vercel-Wix chat application
 * 
 * This file centralizes configuration settings and environment variables
 * for easier management and access throughout the application.
 */

// Environment detection
export const isProd = process.env.VERCEL_ENV === 'production';
export const isPreview = process.env.VERCEL_ENV === 'preview';
export const isDev = !isProd && !isPreview;

// MongoDB connection strings
export const mongoDbUri = isProd 
  ? process.env.MONGODB_URI_PROD 
  : process.env.MONGODB_URI_PREVIEW;

// Wix authentication settings
export const wixAppId = process.env.WIX_APP_ID;
export const wixPublicKey = process.env.WIX_APP_PUBLIC_KEY;

// LLM API settings
export const openAiApiKey = process.env.OPENAI_API_KEY;
export const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

// Pinecone settings (for RAG implementation)
export const pineconeApiKey = isProd 
  ? process.env.PINECONE_API_KEY_PROD 
  : process.env.PINECONE_API_KEY_PREVIEW;
export const pineconeEnvironment = isProd 
  ? process.env.PINECONE_ENVIRONMENT_PROD 
  : process.env.PINECONE_ENVIRONMENT_PREVIEW;
export const pineconeIndexName = process.env.PINECONE_INDEX_NAME;

// Rate limiting
export const maxRequestsPerMinute = parseInt(process.env.MAX_REQUESTS_PER_MINUTE || '60', 10);

// Default model settings
export const defaultModel = 'gpt-4';
export const fallbackModel = 'gpt-3.5-turbo';

// API endpoints
export const apiEndpoints = {
  health: '/api/health',
  chat: '/api/chat',
};

// Default system prompts
export const defaultSystemPrompt = 
  'You are a helpful AI assistant that provides accurate and concise information.';
