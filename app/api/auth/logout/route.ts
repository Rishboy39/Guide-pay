import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { deleteSession } from '@/lib/jsonStore';
import { SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const sessionId = await getSession(request);
    if (sessionId) {
      deleteSession(sessionId);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete(SESSION_COOKIE_NAME);

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}

