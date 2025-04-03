# Project Barry - Wix Chatbot Backend

## Overview

This repository contains the backend API for Project Barry, a chatbot integrated with a Wix frontend. The backend is built using Node.js, TypeScript, and deployed as Vercel Edge Functions. It handles chat processing, user authentication (via Wix JWTs), chat history management (via MongoDB), and interaction with Large Language Models (LLMs).

**Links:**

* **GitHub Repository:** [https://github.com/uzzsam/project-barry/](https://github.com/uzzsam/project-barry/)
* **Wix Frontend:** [Link to your Wix site] *(<- Add link when available)*
* **Vercel Deployment (Production):** [Link to your Vercel production deployment] *(<- Add link when available)*
* **Vercel Deployment (Preview):** [Link to your latest Vercel preview deployment] *(<- Add link when available)*

## Current Status

**Development Phase:** **Phase 1 Complete**

* [x] Environment Setup (Node.js, TypeScript, Git)
* [x] Vercel Project Linked
* [x] Basic API Endpoint (`/api/chat`) created and deployed
* [x] Cloud Service Placeholders (MongoDB Atlas, Pinecone - if applicable) considered
* [x] Initial Vercel configuration (`vercel.json`, environment variables structure) defined

**Next Step:** Proceeding to **Phase 2: Authentication & Chat History**.

*(Update this section as you progress through the phases)*

## Project Phases Overview

1.  **Phase 1: Environment Setup & Core API** (Completed)
    * Goal: Set up the foundational project environment, cloud services, basic code structure, and initial API endpoint.
2.  **Phase 2: Authentication & Chat History** (Current / Next)
    * Goal: Implement secure user authentication (Wix JWT verification) and database logic for storing/retrieving chat history (MongoDB).
3.  **Phase 3: LLM Integration & Streaming**
    * Goal: Integrate the chosen LLM API, manage conversation context, and stream responses back to the frontend.
4.  **Phase 4: Embeddings & RAG (Conditional)**
    * Goal: Implement text embeddings, vector storage (Pinecone), and Retrieval-Augmented Generation for context-aware responses.
5.  **Phase 5: Testing & Deployment**
    * Goal: Implement comprehensive testing (unit, integration, E2E) and refine multi-environment deployment workflows.

*(Refer to the detailed Phase Task documents for specific sub-tasks)*

## Key Technologies

* **Backend Framework:** Node.js with Vercel Edge Functions
* **Language:** TypeScript
* **Deployment:** Vercel
* **Database:** MongoDB Atlas (for chat history)
* **Authentication:** Wix JWT verification (using `jose`)
* **LLM:** [Specify LLM, e.g., OpenAI GPT-4o] *(<- Update)*
* **Vector Database (Phase 4):** Pinecone
* **Frontend:** Wix (Velo)

## Local Development Setup

*(Optional: Add instructions on how to set up and run the project locally)*

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/uzzsam/project-barry.git](https://www.google.com/search?q=https://github.com/uzzsam/project-barry.git)
    cd project-barry
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    * Copy `.env.example` to `.env`.
    * Fill in the required values in `.env` (API keys, database URIs, etc.).
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    *(This uses `vercel dev`, which requires the Vercel CLI to be installed and logged in)*






















# Vercel-Wix Chat Bot Backend (CLINE setup)

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
