export const colors = {
  bg: '#F3F4F6',
  bgDeep: '#E9EBEF',
  surface: '#FFFFFF',
  surfaceAlt: '#F8F9FB',
  line: '#E2E5EA',
  grid: 'rgba(11, 27, 58, 0.055)',
  navy: '#0B1B3A',
  navySoft: '#243553',
  ink: '#1A2233',
  muted: '#6B7385',
  faint: '#A4ABBA',
  blue: '#1E2CFB',
  blueSoft: '#E9EBFF',
  blueDeep: '#1220B8',
  gold: '#C9A34A',
  goldSoft: '#F6EDD6',
  green: '#1E9E63',
  greenSoft: '#E3F5EC',
  red: '#D8463C',
  redSoft: '#FBE7E5',
} as const;

export const fonts = {
  arabic: "'IBM Plex Sans Arabic', 'Alexandria', sans-serif",
  latin: "'IBM Plex Sans Arabic', 'Inter', system-ui, sans-serif",
} as const;

export const FPS = 30;
export const W = 1080;
export const H = 1920;

/** Instagram Reels safe area: keep essential content inside */
export const SAFE = {
  top: 230,
  bottom: 1520,
  left: 80,
  right: 1080 - 180,
} as const;

export const shadow = {
  card: '0 30px 60px -20px rgba(11,27,58,0.22), 0 12px 24px -12px rgba(11,27,58,0.12), 0 0 0 1px rgba(11,27,58,0.04)',
  soft: '0 14px 30px -14px rgba(11,27,58,0.18), 0 0 0 1px rgba(11,27,58,0.04)',
  float: '0 50px 90px -30px rgba(11,27,58,0.30), 0 20px 40px -20px rgba(11,27,58,0.15)',
} as const;
