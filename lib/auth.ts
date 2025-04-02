/**
 * Authentication utilities for Wix JWT verification
 * 
 * This file handles the authentication flow between the Wix frontend and Vercel backend.
 * 
 * Flow:
 * 1. Wix frontend obtains JWT token via currentMember.getToken()
 * 2. Frontend sends requests to backend with Authorization header containing the JWT
 * 3. Backend extracts the token from the header
 * 4. Backend verifies the token using the Wix app's public key (from environment variables)
 * 5. If valid, the request is processed; if invalid, an error response is returned
 */

import { NextRequest } from 'next/server';

/**
 * Extracts the JWT token from the request headers
 * 
 * @param request The incoming request object
 * @returns The JWT token or null if not found
 */
export function extractTokenFromHeader(request: NextRequest): string | null {
  // Get the Authorization header
  const authHeader = request.headers.get('Authorization');
  
  // Check if the header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  // Extract the token (remove 'Bearer ' prefix)
  const token = authHeader.substring(7);
  return token || null;
}

/**
 * Verifies a JWT token from Wix
 * 
 * @param token The JWT token to verify
 * @returns An object containing the verification result and decoded payload if successful
 */
export async function verifyWixToken(token: string) {
  // TODO: Implement JWT verification using jose library
  // This will be implemented in Phase 2
  
  /* 
  Implementation will:
  1. Get the Wix app's public key from environment variables
  2. Use jose library to verify the token signature
  3. Validate token claims (exp, iss, aud)
  4. Return the decoded payload if valid
  */
  
  // Placeholder implementation
  return {
    isValid: false,
    error: 'Token verification not implemented yet',
    payload: null
  };
}

/**
 * Middleware function to authenticate requests
 * 
 * @param request The incoming request object
 * @returns An object containing the authentication result and user data if successful
 */
export async function authenticateRequest(request: NextRequest) {
  // Extract token from header
  const token = extractTokenFromHeader(request);
  
  // If no token is provided, return authentication failure
  if (!token) {
    return {
      isAuthenticated: false,
      error: 'No authentication token provided',
      user: null
    };
  }
  
  // Verify the token
  const verification = await verifyWixToken(token);
  
  // If token is invalid, return authentication failure
  if (!verification.isValid) {
    return {
      isAuthenticated: false,
      error: verification.error,
      user: null
    };
  }
  
  // If token is valid, return authentication success with user data
  return {
    isAuthenticated: true,
    error: null,
    user: verification.payload
  };
}
