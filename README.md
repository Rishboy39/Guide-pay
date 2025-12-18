# GuidePay - Screen Companion App for Older Adults

GuidePay is a screen companion app that helps older adults (65+) navigate ANY online financial transaction with confidence.

## Core Value Proposition

"Practice privately. Transact confidently. Stay in control."

## Key Features

- **Universal Coverage** - Works on ANY website/app (banks, Amazon, utilities, Medicare, etc.)
- **Screen Overlay Guidance** - Family can see senior's screen and send visual "tap here" cues
- **Practice Mode** - Simulates real websites with fake money before going live
- **Frozen UI** - GuidePay's interface NEVER changes (no updates that confuse users)
- **Family Pays** - Subscription billed to family member, not senior
- **Dignity-First Design** - Senior always presses the buttons; family guides, not controls

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Guide-pay/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── onboarding/        # Onboarding flow
│   ├── login/             # Login page
│   ├── home/              # Home dashboard
│   ├── send/              # Send money flow
│   ├── practice/          # Practice mode
│   ├── family/            # Family helper/co-pilot
│   ├── help/              # Help page
│   └── settings/          # Settings page
├── components/
│   └── ui/                # Design system components
│       ├── GButton.tsx
│       ├── GInput.tsx
│       ├── GCard.tsx
│       ├── GHeader.tsx
│       ├── GHelpButton.tsx
│       └── GBottomNav.tsx
├── shared/
│   └── constants.ts       # Shared constants
└── package.json
```

## Design System

### Colors
- Primary Green: `#2E7D32` (money/success)
- Primary Blue: `#1565C0` (interactive elements)
- Danger Red: `#C62828` (help button, warnings)
- Practice Orange: `#F57C00` (practice mode)

### Typography
- Font Family: Inter
- Font Sizes: 18px (minimum), 20px (medium), 24px (large)
- Line Height: 1.5

### Touch Targets
- Minimum: 64px × 64px
- Button Padding: 20px vertical, 32px horizontal

## Accessibility

- All text ≥ 18px minimum
- All touch targets ≥ 64px
- High contrast mode support
- Screen reader compatible
- Keyboard navigation support
- Reduced motion support

## Pages

1. **Landing Page** (`/`) - Marketing and introduction
2. **Onboarding** (`/onboarding`) - First-time user setup
3. **Login** (`/login`) - Authentication
4. **Home** (`/home`) - Dashboard with balance and recent activity
5. **Send Money** (`/send`) - Multi-step payment flow
6. **Practice Mode** (`/practice`) - Practice scenarios
7. **Family Helper** (`/family`) - Co-pilot activation
8. **Help** (`/help`) - Support and help topics
9. **Settings** (`/settings`) - User preferences

## Build

```bash
npm run build
```

## License

Private - All rights reserved

