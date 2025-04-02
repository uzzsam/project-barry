# Vercel-Wix Chat Bot Backend

This repository contains the Vercel backend for a chat application that integrates with a Wix frontend. The backend is built using Vercel Edge Functions and TypeScript.

## Project Structure

```
├── api/                  # Vercel Edge Functions
│   ├── health.ts         # Health check endpoint
│   └── chat.ts           # Chat API endpoint
├── config/               # Configuration
│   └── index.ts          # Configuration settings
├── lib/                  # Shared utilities
│   └── auth.ts           # Authentication utilities
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in the required environment variables:
   ```
   cp .env.example .env.local
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Health Check

- **URL**: `/api/health`
- **Method**: `GET`
- **Description**: Simple health check endpoint to verify the API is running
- **Response**:
  ```json
  {
    "status": "healthy",
    "message": "API endpoint active",
    "timestamp": "2025-04-01T06:59:58.123Z",
    "environment": "development"
  }
  ```

### Chat

- **URL**: `/api/chat`
- **Method**: `POST`
- **Description**: Chat endpoint that processes messages and returns responses
- **Request Body**:
  ```json
  {
    "message": "Hello, how are you?",
    "conversationId": "optional-conversation-id",
    "model": "optional-model-name",
    "systemPrompt": "optional-system-prompt"
  }
  ```
- **Response**:
  ```json
  {
    "response": "I'm doing well, thank you for asking!",
    "model": "gpt-4",
    "conversationId": "conversation-id",
    "timestamp": "2025-04-01T06:59:58.123Z"
  }
  ```

## Authentication

Authentication is handled using Wix JWT tokens. The frontend obtains a JWT token via `currentMember.getToken()` and includes it in the `Authorization` header of requests to the backend. The backend verifies the token using the Wix app's public key.

## Environment Variables

The following environment variables are required:

- `MONGODB_URI_PROD`: MongoDB connection string for production
- `MONGODB_URI_PREVIEW`: MongoDB connection string for preview
- `OPENAI_API_KEY`: OpenAI API key
- `ANTHROPIC_API_KEY`: Anthropic API key (for Claude)
- `WIX_APP_PUBLIC_KEY`: Wix app's public key for JWT verification
- `WIX_APP_ID`: Wix application ID
- `PINECONE_API_KEY_PROD`: Pinecone API key for production (if RAG is in scope)
- `PINECONE_API_KEY_PREVIEW`: Pinecone API key for preview (if RAG is in scope)
- `PINECONE_ENVIRONMENT_PROD`: Pinecone environment for production (if RAG is in scope)
- `PINECONE_ENVIRONMENT_PREVIEW`: Pinecone environment for preview (if RAG is in scope)
- `PINECONE_INDEX_NAME`: Pinecone index name (if RAG is in scope)

## Development

This project is developed in phases:

- **Phase 1**: Environment setup and core API structure
- **Phase 2**: Authentication, LLM integration, and streaming responses
- **Phase 3**: Advanced features like RAG, conversation history, etc.

## License

MIT
