/** "How to turn real-estate website visitors into clients" reel: light #F8F9FA stage, electric-blue accent. */
export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const sec = (s: number) => Math.round(s * FPS);

export const T = {
  hook: [0, 4.5],
  gallery: [4.5, 9.5],
  details: [9.5, 14.5],
  contact: [14.5, 20.5],
  search: [20.5, 25.5],
  trust: [25.5, 30.5],
  mobile: [30.5, 35.5],
  analytics: [35.5, 40.5],
  cta: [40.5, 48],
} as const;
export type SceneId = keyof typeof T;
export const scene = (id: SceneId) => ({from: sec(T[id][0]), duration: sec(T[id][1]) - sec(T[id][0])});
export const TOTAL = sec(T.cta[1]);
/** frames each scene starts early so it cross-dissolves with the previous one */
export const OVERLAP = 8;

export const C = {
  bg: '#F8F9FA',
  white: '#FFFFFF',
  ink: '#1B1F24',
  ink2: '#3A4048',
  muted: '#6B7280',
  dim: '#A3A9B3',
  line: '#E6E8EB',
  soft: '#F1F3F5',
  grid: 'rgba(27,31,36,0.045)',
  blue: '#1E6BFF',
  blueHi: '#4C8DFF',
  blueSoft: 'rgba(30,107,255,0.08)',
  green: '#16A34A',
  wa: '#25D366',
  waDark: '#075E54',
  waBg: '#EFEAE2',
  waOut: '#D9FDD3',
  red: '#E5484D',
  star: '#F5B400',
} as const;

export const F = {ar: "'The Year of Handicrafts'"} as const;

export const LAYOUT = {
  headerTop: 300,
  panelTop: 640,
  panelBottom: 1790,
  side: 48,
} as const;

export const shadow = {
  card: '0 40px 80px -30px rgba(27,31,36,0.22), 0 12px 24px -12px rgba(27,31,36,0.10), 0 0 0 1px rgba(27,31,36,0.05)',
  soft: '0 18px 40px -18px rgba(27,31,36,0.25), 0 0 0 1px rgba(27,31,36,0.05)',
  blue: '0 24px 50px -16px rgba(30,107,255,0.55)',
} as const;
