    // Absolute minimum Edge Function for testing the builder

    export const config = {
      runtime: 'edge',
    };

    export default function handler(): Response {
      return new Response('OK');
    }
    
