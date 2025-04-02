import { NextRequest } from 'next/server';

/**
 * Health check endpoint for the Vercel-Wix chat application backend
 * This endpoint can be used to verify that the API is running correctly
 * 
 * @param req The incoming request object
 * @returns A JSON response with status and message
 */
export const config = {
  runtime: 'edge',
  regions: ['iad1'], // US East (N. Virginia)
};

export default async function handler(req: NextRequest) {
  // Only allow GET requests to this endpoint
  if (req.method !== 'GET') {
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

  // Return a simple health check response
  return new Response(
    JSON.stringify({
      status: "healthy",
      message: "API endpoint active",
      timestamp: new Date().toISOString(),
      environment: process.env.VERCEL_ENV || 'development'
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
