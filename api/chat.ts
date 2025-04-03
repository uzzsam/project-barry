import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Configuration for Vercel Edge Function
export const config = {
  runtime: 'edge', // Use the Vercel Edge Runtime
};

/**
 * API Route Handler for /api/chat (Phase 1)
 * Confirms the endpoint is active.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export default async function handler(request: NextRequest): Promise<NextResponse> {
  // Allow only POST requests
  if (request.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405, headers: { Allow: 'POST' } } // Include Allow header
    );
  }

  try {
    // Basic success payload for Phase 1
    const responsePayload = {
      message: "API endpoint '/api/chat' is active. Phase 1 setup complete.",
    };

    // Return the success response
    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error: any) {
    // Log any unexpected errors
    console.error("Error in /api/chat:", error);

    // Return a generic server error response
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
