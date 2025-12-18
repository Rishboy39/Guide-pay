// shared/constants.ts
export const APP_NAME = 'GuidePay';
export const TAGLINE = 'Practice privately. Transact confidently. Stay in control.';

export const COLORS = {
  PRIMARY_GREEN: '#2E7D32',
  PRIMARY_BLUE: '#1565C0',
  DANGER_RED: '#C62828',
  PRACTICE_ORANGE: '#F57C00',
  BACKGROUND: '#FFFFFF',
  TEXT_PRIMARY: '#212121',
  TEXT_SECONDARY: '#616161',
  DISABLED_GRAY: '#BDBDBD',
};

export const SIZES = {
  MIN_TOUCH_TARGET: 64,
  MIN_FONT_SIZE: 18,
  BUTTON_PADDING: 20,
  SCREEN_PADDING: 16,
};

export const PLANS = {
  BASIC_PRICE: 7.99,
  FAMILY_PRICE: 12.99,
  TRIAL_DAYS: 14,
};

export const THRESHOLDS = {
  LARGE_AMOUNT: 1000,
  CAUTION_AMOUNT: 500,
};

export const SIMPLIFIED_LANGUAGE: Record<string, string> = {
  authenticate: 'sign in',
  transaction: 'payment',
  recipient: "person you're paying",
  'insufficient funds': 'not enough money',
  verification: "make sure it's you",
  timeout: 'took too long',
  processing: 'working on it',
};

