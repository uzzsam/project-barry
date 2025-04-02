import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: NextRequest): Promise<NextResponse> {
  if (request.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405, headers: { Allow: 'POST' } }
    );
  }

  try {
    const responsePayload = {
      message: "API endpoint '/api/chat' is active. Phase 1 setup complete.",
    };

    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
