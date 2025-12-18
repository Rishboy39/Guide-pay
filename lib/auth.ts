import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const SESSION_COOKIE_NAME = 'guidepay_session';

export async function getSession(request?: NextRequest): Promise<string | null> {
  if (request) {
    // Client-side request
    return request.cookies.get(SESSION_COOKIE_NAME)?.value || null;
  } else {
    // Server-side
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
  }
}

export function setSessionCookie(sessionId: string): void {
  // This will be handled by NextResponse.cookies in the route handlers
}

export function deleteSessionCookie(): void {
  // This will be handled by NextResponse.cookies in the route handlers
}

