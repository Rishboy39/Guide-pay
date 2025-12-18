import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const TRANSACTIONS_FILE = path.join(DATA_DIR, 'transactions.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([
    {
      id: '1',
      email: 'demo@guidepay.com',
      name: 'Demo User',
      password: 'demo123', // Plain text for prototype
      balance: 1250.00,
      createdAt: new Date().toISOString(),
    }
  ], null, 2));
}

if (!fs.existsSync(TRANSACTIONS_FILE)) {
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify([
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
  ], null, 2));
}

if (!fs.existsSync(SESSIONS_FILE)) {
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify({}, null, 2));
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
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

// User operations
export function getUsers(): User[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find(u => u.id === id);
}

export function createUser(email: string, name: string, password: string): User {
  const users = getUsers();
  const user: User = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    name,
    password, // Plain text for prototype
    balance: 1000.00,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  return user;
}

export function updateUserBalance(userId: string, amount: number): boolean {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  if (user.balance + amount < 0) return false;
  user.balance += amount;
  saveUsers(users);
  return true;
}

// Transaction operations
export function getTransactions(): Transaction[] {
  try {
    const data = fs.readFileSync(TRANSACTIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
}

export function getTransactionsByUserId(userId: string): Transaction[] {
  const transactions = getTransactions();
  return transactions
    .filter(t => t.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function createTransaction(
  userId: string,
  recipient: string,
  amount: number,
  note?: string,
  isPractice: boolean = false
): Transaction | null {
  const transactions = getTransactions();
  
  if (!isPractice) {
    const user = getUserById(userId);
    if (!user || user.balance < amount) {
      return null;
    }
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
  saveTransactions(transactions);
  return transaction;
}

// Session operations
export interface Session {
  sessionId: string;
  userId: string;
  createdAt: string;
}

export function getSessions(): Record<string, string> {
  try {
    const data = fs.readFileSync(SESSIONS_FILE, 'utf-8');
    const sessions = JSON.parse(data);
    return sessions;
  } catch (error) {
    return {};
  }
}

export function saveSessions(sessions: Record<string, string>): void {
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
}

export function createSession(userId: string): string {
  const sessions = getSessions();
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessions[sessionId] = userId;
  saveSessions(sessions);
  return sessionId;
}

export function getUserIdFromSession(sessionId: string): string | undefined {
  const sessions = getSessions();
  return sessions[sessionId];
}

export function deleteSession(sessionId: string): void {
  const sessions = getSessions();
  delete sessions[sessionId];
  saveSessions(sessions);
}

