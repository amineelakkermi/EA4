/** EA4 French reel "Votre site vous fait perdre des clients": EA4 palette (src/theme.ts), Alexandria (Latin; Handicrafts has no Latin glyphs), Floating Cities music. */
export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const sec = (s: number) => Math.round(s * FPS);

export const R = 4.6; // seconds per reason
export const T = {
  hook: [0, 3.5],
  r1: [3.5, 3.5 + R],
  r2: [3.5 + R, 3.5 + 2 * R],
  r3: [3.5 + 2 * R, 3.5 + 3 * R],
  r4: [3.5 + 3 * R, 3.5 + 4 * R],
  r5: [3.5 + 4 * R, 3.5 + 5 * R],
  statement: [26.5, 29.8],
  cta: [29.8, 33.5],
} as const;
export type SceneId = keyof typeof T;
export const scene = (id: SceneId) => ({from: sec(T[id][0]), duration: sec(T[id][1]) - sec(T[id][0])});
export const TOTAL = sec(T.cta[1]);

export const palette = {
  bg: '#F3F4F6',
  surface: '#FFFFFF',
  navy: '#0B1B3A',
  ink: '#1A2233',
  muted: '#6B7385',
  faint: '#A4ABBA',
  line: '#E2E5EA',
  grid: 'rgba(11,27,58,0.055)',
  blue: '#1E2CFB',
  blueSoft: '#E9EBFF',
  red: '#D8463C',
  redSoft: '#FBE7E5',
  green: '#1E9E63',
  greenSoft: '#E3F5EC',
  gold: '#C9A34A',
  skeleton: '#E6E9F0',
} as const;

export const font = {family: "'Alexandria', 'IBM Plex Sans Arabic', sans-serif"} as const;

export const shadow = {
  card: '0 30px 60px -20px rgba(11,27,58,0.22), 0 12px 24px -12px rgba(11,27,58,0.12), 0 0 0 1px rgba(11,27,58,0.04)',
  soft: '0 14px 30px -14px rgba(11,27,58,0.18), 0 0 0 1px rgba(11,27,58,0.04)',
} as const;

/** text block top / site sheet area (Reels safe zone: keep text below 220 and above 1540) */
export const LAYOUT = {textTop: 300, sheetTop: 760, sheetH: 720} as const;
