/** "Devin AI for content creators" reel: dark premium-tech stage, light Devin-style app UI, EDM Detection Mode music. */
export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const sec = (s: number) => Math.round(s * FPS);

export const T = {
  hook: [0, 3.2],
  problem: [3.2, 9.3],
  reveal: [9.3, 14],
  brief: [14, 19.5],
  build: [19.5, 26.5],
  result: [26.5, 33],
  benefits: [33, 37.5],
  cta: [37.5, 41.5],
} as const;
export type SceneId = keyof typeof T;
export const scene = (id: SceneId) => ({from: sec(T[id][0]), duration: sec(T[id][1]) - sec(T[id][0])});
export const TOTAL = sec(T.cta[1]);

export const C = {
  bg: '#07080A',
  panel: '#101216',
  panel2: '#161920',
  ink: '#F5F6F7',
  muted: '#9AA0A8',
  dim: '#5E646D',
  line: 'rgba(255,255,255,0.09)',
  sky: '#8DBEE1',
  skyHi: '#CDE7F7',
  green: '#00C926',
  red: '#FF544E',
  uiBg: '#FCFCFC',
  uiSide: '#F4F4F5',
  uiInk: '#191919',
  uiMuted: '#737373',
  uiLine: '#E7E7E9',
} as const;

export const F = {
  ar: "'The Year of Handicrafts', 'Alexandria', sans-serif",
  lat: "'Alexandria', sans-serif",
  mono: "'JetBrains Mono', 'DejaVu Sans Mono', monospace",
} as const;
