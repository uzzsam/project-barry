import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Parse the request body
    const { message, model = 'gpt-4o-2024-11-20', chatHistory = [] } = await req.json();

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Prepare messages for the API
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...chatHistory,
      { role: 'user', content: message }
    ];

    // Create a stream from OpenAI
    const stream = await openai.chat.completions.create({
      model: model,
      messages: messages,
      stream: true,
    });

    // Set up the response stream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          // Format chunk as a Server-Sent Event
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            const eventData = JSON.stringify({ content });
            const eventString = `event: chunk\ndata: ${eventData}\n\n`;
            controller.enqueue(encoder.encode(eventString));
          }
        }
        controller.close();
      },
      cancel() {
        // Attempt to cancel the fetch if the client disconnects
        stream.controller.abort();
      }
    });

    // Return the stream as a response
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Connection': 'keep-alive'
      },
    });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Format error as a Server-Sent Event
    const encoder = new TextEncoder();
    const eventData = JSON.stringify({ error: errorMessage });
    const eventString = `event: error\ndata: ${eventData}\n\n`;
    
    return new Response(encoder.encode(eventString), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}
