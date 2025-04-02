import { NextRequest } from 'next/server';
import { authenticateRequest } from '../lib/auth';

/**
 * Chat API endpoint for the Vercel-Wix chat application
 * 
 * This endpoint handles chat requests from the Wix frontend.
 * In future phases, it will:
 * 1. Authenticate the request using Wix JWT
 * 2. Process the chat message
 * 3. Call the appropriate LLM API (OpenAI, Claude)
 * 4. Stream the response back to the client
 * 
 * @param req The incoming request object
 * @returns A JSON response with the chat result
 */
export const config = {
  runtime: 'edge',
  regions: ['iad1'], // US East (N. Virginia)
};

interface ChatRequest {
  message: string;
  conversationId?: string;
  model?: string;
  systemPrompt?: string;
}

export default async function handler(req: NextRequest) {
  // Only allow POST requests to this endpoint
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // In Phase 2, we'll implement authentication
  // For now, we'll just log that authentication will be implemented
  // const auth = await authenticateRequest(req);
  // if (!auth.isAuthenticated) {
  //   return new Response(
  //     JSON.stringify({ error: 'Unauthorized', details: auth.error }),
  //     {
  //       status: 401,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  // }

  try {
    // Parse the request body
    const body = await req.json() as ChatRequest;
    
    // Validate the request body
    if (!body.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: message' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // For Phase 1, we'll just return a simple response
    // In Phase 2, we'll implement the actual LLM API calls
    return new Response(
      JSON.stringify({
        response: `Echo: ${body.message}`,
        model: body.model || 'echo-model',
        conversationId: body.conversationId || 'test-conversation',
        timestamp: new Date().toISOString(),
        note: 'This is a placeholder response. LLM integration will be implemented in Phase 2.'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    /* 
    In Phase 2, we'll implement:
    
    1. Model selection logic based on the request
    2. OpenAI/Claude API integration
    3. Response streaming
    4. Conversation history management
    5. Error handling and rate limiting
    6. Logging and analytics
    */
    
  } catch (error) {
    console.error('Error processing chat request:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
