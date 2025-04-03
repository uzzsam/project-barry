    // Using standard Web API Request and Response types

    export const config = {
      runtime: 'edge', // Still using the Edge Runtime
    };

    /**
     * API Route Handler for /api/chat (Phase 1)
     * Confirms the endpoint is active using standard Request/Response.
     * @param {Request} request - The incoming request object (standard Fetch API).
     * @returns {Promise<Response>} - The response object (standard Fetch API).
     */
    export default async function handler(request: Request): Promise<Response> {
      // Allow only POST requests
      if (request.method !== 'POST') {
        // Create a standard Response object for the error
        return new Response(
          JSON.stringify({ error: 'Method Not Allowed' }),
          {
            status: 405,
            headers: {
              'Allow': 'POST',
              'Content-Type': 'application/json' // Good practice to set Content-Type
            }
          }
        );
      }

      try {
        // Basic success payload for Phase 1
        const responsePayload = {
          message: "API endpoint '/api/chat' is active. Phase 1 setup complete.",
        };

        // Return the success response using standard Response
        // Use Response.json() helper if available in the Edge runtime,
        // otherwise construct manually. Manual construction is safer.
        return new Response(
          JSON.stringify(responsePayload),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );

      } catch (error: any) {
        // Log any unexpected errors
        console.error("Error in /api/chat:", error);

        // Return a generic server error response using standard Response
        const errorPayload = {
          error: 'Internal Server Error',
          details: error.message || 'Unknown error'
        };
        return new Response(
          JSON.stringify(errorPayload),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }
  
