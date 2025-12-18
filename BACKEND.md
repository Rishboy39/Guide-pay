# Backend API Documentation

## Overview

This is a **100% free** backend using Next.js API routes with in-memory storage. No database, no external services, no costs!

## API Endpoints

### Authentication

#### `POST /api/auth/login`
Login or create a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "name": "User Name" // Optional for existing users
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "User Name",
    "balance": 1000.00
  },
  "sessionId": "session_123..."
}
```

#### `POST /api/auth/logout`
Logout current user.

**Response:**
```json
{
  "success": true
}
```

#### `GET /api/auth/me`
Get current authenticated user.

**Response:**
```json
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "User Name",
    "balance": 1000.00
  }
}
```

### Transactions

#### `POST /api/transactions/send`
Send money to a recipient.

**Request:**
```json
{
  "recipient": "John Doe",
  "amount": 50.00,
  "note": "Payment for lunch",
  "isPractice": false
}
```

**Response:**
```json
{
  "success": true,
  "transaction": {
    "id": "tx_123",
    "recipient": "John Doe",
    "amount": 50.00,
    "note": "Payment for lunch",
    "date": "2024-01-01T12:00:00Z"
  }
}
```

#### `GET /api/transactions/list`
Get all transactions for current user.

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "tx_123",
      "recipient": "John Doe",
      "amount": 50.00,
      "note": "Payment for lunch",
      "type": "sent",
      "date": "2024-01-01T12:00:00Z",
      "isPractice": false
    }
  ]
}
```

### Practice Mode

#### `POST /api/practice/start`
Start a practice session.

**Request:**
```json
{
  "scenarioId": "1"
}
```

**Response:**
```json
{
  "success": true,
  "session": {
    "id": "practice_123",
    "scenarioId": "1",
    "date": "2024-01-01T12:00:00Z"
  }
}
```

#### `POST /api/practice/complete`
Complete a practice session.

**Request:**
```json
{
  "sessionId": "practice_123"
}
```

**Response:**
```json
{
  "success": true
}
```

### Co-Pilot (Family Helper)

#### `POST /api/copilot/start`
Start a co-pilot session with a family helper.

**Request:**
```json
{
  "helperEmail": "helper@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "session": {
    "id": "copilot_123",
    "helperEmail": "helper@example.com",
    "active": true,
    "startedAt": "2024-01-01T12:00:00Z"
  }
}
```

#### `POST /api/copilot/end`
End current co-pilot session.

**Response:**
```json
{
  "success": true
}
```

#### `GET /api/copilot/status`
Get current co-pilot session status.

**Response:**
```json
{
  "success": true,
  "session": {
    "id": "copilot_123",
    "helperEmail": "helper@example.com",
    "active": true,
    "startedAt": "2024-01-01T12:00:00Z"
  }
}
```

## Data Storage

All data is stored in memory using the `lib/store.ts` file. This means:
- ✅ No database setup needed
- ✅ No external services
- ✅ 100% free
- ⚠️ Data resets on server restart (perfect for development/demo)

## Session Management

Sessions are managed via HTTP-only cookies:
- Cookie name: `guidepay_session`
- Expires: 30 days
- HttpOnly: Yes (secure)
- SameSite: Lax

## Authentication Flow

1. User logs in via `/api/auth/login`
2. Server creates session and sets cookie
3. All subsequent requests include cookie automatically
4. API routes check cookie to authenticate user
5. Middleware protects routes (redirects to login if not authenticated)

## Demo Account

A demo account is pre-created:
- Email: `demo@guidepay.com`
- Balance: $1250.00
- Has 3 sample transactions

## Features Implemented

✅ User authentication (login/logout)
✅ Session management
✅ Send money transactions
✅ Transaction history
✅ Practice mode sessions
✅ Co-pilot (family helper) sessions
✅ Balance tracking
✅ Route protection middleware
✅ Error handling

## How It Works

1. **In-Memory Store**: All data lives in `lib/store.ts` arrays
2. **API Routes**: Next.js API routes handle HTTP requests
3. **Session Cookies**: Authentication via secure cookies
4. **Middleware**: Protects routes automatically

## Testing

You can test all endpoints using:
- Browser (for GET requests)
- Postman/Insomnia
- curl commands
- The frontend pages (they all call these APIs)

## Next Steps (Optional)

If you want persistent data later, you can:
- Add a free database (MongoDB Atlas free tier, Supabase free tier, etc.)
- Replace `lib/store.ts` with database calls
- Keep the same API structure - no frontend changes needed!


