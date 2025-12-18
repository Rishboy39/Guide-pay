import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getUserIdFromSession, createTransaction } from '@/lib/jsonStore';

export async function POST(request: NextRequest) {
  try {
    const sessionId = await getSession(request);
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userId = getUserIdFromSession(sessionId);
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    const { recipient, amount, note, isPractice } = await request.json();

    if (!recipient || !amount) {
      return NextResponse.json(
        { error: 'Recipient and amount are required' },
        { status: 400 }
      );
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const transaction = createTransaction(
      userId,
      recipient,
      amountNum,
      note,
      isPractice === true
    );

    if (!transaction) {
      return NextResponse.json(
        { error: 'Insufficient funds' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        recipient: transaction.recipient,
        amount: transaction.amount,
        note: transaction.note,
        date: transaction.date,
      },
    });
  } catch (error) {
    console.error('Send transaction error:', error);
    return NextResponse.json(
      { error: 'Failed to send transaction' },
      { status: 500 }
    );
  }
}

