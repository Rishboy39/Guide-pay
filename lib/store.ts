// In-memory data store (free, no database needed!)

export interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  recipient: string;
  amount: number;
  note?: string;
  type: 'sent' | 'received';
  date: string;
  isPractice: boolean;
}

export interface PracticeSession {
  id: string;
  userId: string;
  scenarioId: string;
  completed: boolean;
  date: string;
}

export interface CoPilotSession {
  id: string;
  userId: string;
  helperEmail: string;
  active: boolean;
  startedAt: string;
}

// In-memory stores
let users: User[] = [
  {
    id: '1',
    email: 'demo@guidepay.com',
    name: 'Demo User',
    balance: 1250.00,
    createdAt: new Date().toISOString(),
  },
];

let transactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    recipient: 'Electric Company',
    amount: 85.50,
    note: 'Monthly bill',
    type: 'sent',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isPractice: false,
  },
  {
    id: '2',
    userId: '1',
    recipient: 'John Smith',
    amount: 50.00,
    note: 'Lunch money',
    type: 'sent',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isPractice: false,
  },
  {
    id: '3',
    userId: '1',
    recipient: 'Amazon',
    amount: 125.99,
    note: 'Online purchase',
    type: 'sent',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isPractice: false,
  },
];

let practiceSessions: PracticeSession[] = [];
let coPilotSessions: CoPilotSession[] = [];
let sessions: Map<string, string> = new Map(); // sessionId -> userId

// User operations
export const getUserByEmail = (email: string): User | undefined => {
  return users.find(u => u.email === email);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(u => u.id === id);
};

export const createUser = (email: string, name: string): User => {
  const user: User = {
    id: Date.now().toString(),
    email,
    name,
    balance: 1000.00, // Starting balance
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
};

export const updateUserBalance = (userId: string, amount: number): boolean => {
  const user = getUserById(userId);
  if (!user) return false;
  if (user.balance + amount < 0) return false; // Insufficient funds
  user.balance += amount;
  return true;
};

// Transaction operations
export const getTransactionsByUserId = (userId: string): Transaction[] => {
  return transactions
    .filter(t => t.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const createTransaction = (
  userId: string,
  recipient: string,
  amount: number,
  note?: string,
  isPractice: boolean = false
): Transaction | null => {
  if (!isPractice) {
    // Check balance for real transactions
    const user = getUserById(userId);
    if (!user || user.balance < amount) {
      return null; // Insufficient funds
    }
    // Deduct balance
    updateUserBalance(userId, -amount);
  }

  const transaction: Transaction = {
    id: Date.now().toString(),
    userId,
    recipient,
    amount,
    note,
    type: 'sent',
    date: new Date().toISOString(),
    isPractice,
  };
  transactions.push(transaction);
  return transaction;
};

// Practice operations
export const createPracticeSession = (userId: string, scenarioId: string): PracticeSession => {
  const session: PracticeSession = {
    id: Date.now().toString(),
    userId,
    scenarioId,
    completed: false,
    date: new Date().toISOString(),
  };
  practiceSessions.push(session);
  return session;
};

export const completePracticeSession = (sessionId: string): boolean => {
  const session = practiceSessions.find(s => s.id === sessionId);
  if (!session) return false;
  session.completed = true;
  return true;
};

// Co-pilot operations
export const createCoPilotSession = (userId: string, helperEmail: string): CoPilotSession => {
  // End any existing sessions
  coPilotSessions.forEach(s => {
    if (s.userId === userId && s.active) {
      s.active = false;
    }
  });

  const session: CoPilotSession = {
    id: Date.now().toString(),
    userId,
    helperEmail,
    active: true,
    startedAt: new Date().toISOString(),
  };
  coPilotSessions.push(session);
  return session;
};

export const getActiveCoPilotSession = (userId: string): CoPilotSession | undefined => {
  return coPilotSessions.find(s => s.userId === userId && s.active);
};

export const endCoPilotSession = (userId: string): boolean => {
  const session = getActiveCoPilotSession(userId);
  if (!session) return false;
  session.active = false;
  return true;
};

// Session management
export const createSession = (userId: string): string => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessions.set(sessionId, userId);
  return sessionId;
};

export const getUserIdFromSession = (sessionId: string): string | undefined => {
  return sessions.get(sessionId);
};

export const deleteSession = (sessionId: string): void => {
  sessions.delete(sessionId);
};


