# Quick Start Guide

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Routes

- `/` - Landing page
- `/onboarding` - First-time user onboarding
- `/login` - Login page
- `/home` - Main dashboard
- `/send` - Send money flow (3 steps)
- `/send/success` - Payment success page
- `/practice` - Practice mode selection
- `/practice/scenario/[id]` - Practice scenario flow
- `/practice/complete` - Practice completion page
- `/family` - Family helper/co-pilot
- `/help` - Help and support
- `/settings` - User settings

## Key Features Implemented

✅ Complete design system with accessible components
✅ Landing page with marketing content
✅ Onboarding flow (5 steps)
✅ Authentication pages
✅ Home dashboard with balance and activity
✅ Multi-step send money flow
✅ Practice mode with scenarios
✅ Family co-pilot interface
✅ Help page
✅ Settings page
✅ Responsive design
✅ Accessibility features (WCAG AAA compliant)

## Design System Components

All components follow the GuidePay design principles:
- Minimum 64px touch targets
- Minimum 18px font size
- High contrast colors
- No animations (frozen UI principle)
- Accessible by default

## Next Steps

1. Add backend API integration
2. Implement real authentication
3. Add screen overlay functionality
4. Integrate payment processing
5. Add real-time co-pilot features
6. Implement practice mode backend

## Development Notes

- Uses Next.js 14 App Router
- TypeScript for type safety
- Tailwind CSS for styling
- All components are client-side rendered where needed
- Follows accessibility best practices

