# Testing Guide for Vercel-Wix Chat Bot Backend

This document provides comprehensive instructions for testing the Vercel-Wix Chat Bot backend implementation. Follow these steps to verify that the backend is functioning correctly and ready for integration with the Wix frontend.

## 1. Local Testing Instructions

### Prerequisites

- Node.js 18.x or later
- npm 8.x or later
- Git

### Setting Up the Local Environment

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vercel-wix-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a local environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Edit `.env.local` to include at least these minimal variables for testing:
   ```
   OPENAI_API_KEY=your-openai-api-key
   WIX_APP_PUBLIC_KEY=placeholder-for-testing
   WIX_APP_ID=placeholder-for-testing
   ```

### Running the Development Server

Start the Vercel development server:
```bash
npm run dev
```

This will start a local development server, typically at `http://localhost:3000`.

### Testing the Health Endpoint

1. Using a web browser, navigate to:
   ```
   http://localhost:3000/api/health
   ```

2. Using curl:
   ```bash
   curl http://localhost:3000/api/health
   ```

3. Expected response:
   ```json
   {
     "status": "healthy",
     "message": "API endpoint active",
     "timestamp": "2025-04-01T07:08:37.123Z",
     "environment": "development"
   }
   ```

### Testing the Chat Endpoint

1. Using curl:
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, this is a test message"}'
   ```

2. Using Postman:
   - Create a new POST request to `http://localhost:3000/api/chat`
   - Set the Content-Type header to `application/json`
   - In the request body, select "raw" and "JSON", then enter:
     ```json
     {
       "message": "Hello, this is a test message",
       "conversationId": "test-conversation",
       "model": "test-model"
     }
     ```
   - Click "Send"

3. Expected response:
   ```json
   {
     "response": "Echo: Hello, this is a test message",
     "model": "test-model",
     "conversationId": "test-conversation",
     "timestamp": "2025-04-01T07:08:37.123Z",
     "note": "This is a placeholder response. LLM integration will be implemented in Phase 2."
   }
   ```

### Troubleshooting Local Testing

- If you see CORS errors, ensure the Vercel development server is running with the correct configuration.
- If the server fails to start, check that all dependencies are installed and that the port is not in use.
- If endpoints return 500 errors, check the console output for error messages.

## 2. Vercel Deployment Testing

### Deploying to Vercel

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```
   
   This will prompt you with a few questions:
   - Set up and deploy? Yes
   - Which scope? (Select your account or team)
   - Link to existing project? No
   - What's your project's name? vercel-wix-bot (or your preferred name)
   - In which directory is your code located? ./
   - Want to override the settings? No

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Setting Up Environment Variables in Vercel

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" > "Environment Variables"
4. Add all the required environment variables from `.env.example`:
   - `OPENAI_API_KEY`
   - `WIX_APP_PUBLIC_KEY`
   - `WIX_APP_ID`
   - Any other variables needed for your specific implementation

5. You can set different values for Production, Preview, and Development environments.

### Verifying Deployment

1. After deployment, Vercel will provide a URL for your project (e.g., `https://vercel-wix-bot.vercel.app`)
2. Visit `https://your-deployment-url.vercel.app/api/health` to verify the health endpoint is working
3. The expected response is the same as in local testing, but with the environment value reflecting your deployment environment.

### Testing Deployed Endpoints

1. Health Endpoint:
   ```bash
   curl https://your-deployment-url.vercel.app/api/health
   ```

2. Chat Endpoint:
   ```bash
   curl -X POST https://your-deployment-url.vercel.app/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, this is a test message"}'
   ```

3. Verify that the responses match the expected format.

### Troubleshooting Vercel Deployment

- If deployment fails, check the Vercel build logs for errors.
- If endpoints return 500 errors, check the Function Logs in the Vercel dashboard.
- Ensure all environment variables are correctly set in the Vercel dashboard.
- Verify that the `vercel.json` configuration is correct.

## 3. Wix Frontend Integration Test

### Adding Backend Integration to Wix

Add the following code to your Wix site using Velo (Wix's development platform):

1. Create a new web module (e.g., `backend.js`):

```javascript
// backend.js
import { fetch } from 'wix-fetch';

// Replace with your actual Vercel deployment URL
const BACKEND_URL = 'https://your-deployment-url.vercel.app';

export async function checkBackendHealth() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/health`);
    return await response.json();
  } catch (error) {
    console.error('Error checking backend health:', error);
    return { error: error.message };
  }
}

export async function sendChatMessage(message, conversationId = null, model = null) {
  try {
    // In Phase 2, we'll add the authentication token
    // const token = await currentMember.getToken();
    
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` // Will be used in Phase 2
      },
      body: JSON.stringify({
        message,
        conversationId,
        model
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    return { error: error.message };
  }
}
```

2. Create a simple test page in Wix with a button to test the connection:

```javascript
// Page code (e.g., for a test page)
import { checkBackendHealth, sendChatMessage } from 'backend.js';
import wixWindow from 'wix-window';

$w.onReady(function () {
  // Test health endpoint
  $w('#healthButton').onClick(() => {
    $w('#resultText').text = 'Checking backend health...';
    
    checkBackendHealth()
      .then(result => {
        $w('#resultText').text = JSON.stringify(result, null, 2);
      })
      .catch(error => {
        $w('#resultText').text = `Error: ${error.message}`;
      });
  });
  
  // Test chat endpoint
  $w('#chatButton').onClick(() => {
    const message = $w('#messageInput').value;
    if (!message) {
      wixWindow.openLightbox('ErrorMessage', { message: 'Please enter a message' });
      return;
    }
    
    $w('#resultText').text = 'Sending message...';
    
    sendChatMessage(message)
      .then(result => {
        $w('#resultText').text = JSON.stringify(result, null, 2);
      })
      .catch(error => {
        $w('#resultText').text = `Error: ${error.message}`;
      });
  });
});
```

### Expected Responses

1. Health Check:
   ```json
   {
     "status": "healthy",
     "message": "API endpoint active",
     "timestamp": "2025-04-01T07:08:37.123Z",
     "environment": "production"
   }
   ```

2. Chat Message:
   ```json
   {
     "response": "Echo: Your test message",
     "model": "echo-model",
     "conversationId": "test-conversation",
     "timestamp": "2025-04-01T07:08:37.123Z",
     "note": "This is a placeholder response. LLM integration will be implemented in Phase 2."
   }
   ```

### Common Integration Issues and Troubleshooting

1. **CORS Errors**:
   - Ensure the Vercel backend has the correct CORS headers (already set in `vercel.json`).
   - Verify that the Wix domain is allowed in the CORS configuration.

2. **Network Errors**:
   - Check if the Vercel URL is correct and accessible.
   - Verify that the Wix site has internet access to external services.

3. **Authentication Issues** (for Phase 2):
   - Ensure the Wix app's public key is correctly set in the Vercel environment variables.
   - Verify that the JWT token is being correctly generated and sent.

4. **Payload Format Issues**:
   - Ensure the JSON payload sent from Wix matches the expected format in the backend.

## 4. Next Steps

### Phase 1 Completion Checklist

- [ ] Local development environment is set up and working
- [ ] Health endpoint returns the expected response
- [ ] Chat endpoint accepts POST requests and returns echo responses
- [ ] Project is successfully deployed to Vercel
- [ ] Environment variables are correctly set in Vercel
- [ ] Basic Wix frontend integration is tested and working
- [ ] All TypeScript files compile without errors
- [ ] Project structure follows the defined architecture

### Before Proceeding to Phase 2

1. Verify that all endpoints are accessible and return the expected responses.
2. Ensure that the project structure is clean and follows best practices.
3. Review the authentication placeholder code to ensure it aligns with the Wix authentication flow.
4. Check that all environment variables are properly documented and set up.
5. Verify that the Vercel deployment is stable and performs well.
6. Ensure that the Wix frontend can successfully communicate with the Vercel backend.
7. Document any issues or limitations discovered during testing.

### Phase 2 Preparation

1. Obtain the actual Wix app's public key for JWT verification.
2. Set up OpenAI and Anthropic API keys.
3. Plan the conversation history storage strategy (MongoDB).
4. Design the streaming response implementation.
5. Prepare for error handling and rate limiting implementation.
