/** Arabic SaaS architecture explainer reel: light editorial SaaS UI, navy ink + logo blues. */
export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const sec = (s: number) => Math.round(s * FPS);

export const T = {
  hook: [0, 6.5],
  what: [6.5, 15.5],
  arch: [15.5, 36],
  ai: [36, 49.5],
  final: [49.5, 59.5],
} as const;
export type SceneId = keyof typeof T;
export const scene = (id: SceneId) => ({from: sec(T[id][0]), duration: sec(T[id][1]) - sec(T[id][0])});
export const TOTAL = sec(T.final[1]);
export const OVERLAP = 8;

export const C = {
  bg: '#F4F5F8',
  white: '#FFFFFF',
  surface: '#FAFBFC',
  navy: '#111A33',
  ink: '#1B2236',
  ink2: '#3A4157',
  muted: '#6B7287',
  dim: '#A5ABBB',
  line: '#E3E6ED',
  soft: '#EEF0F5',
  grid: 'rgba(17,26,51,0.05)',
  blue: '#1F5BFF',
  blueSoft: 'rgba(31,91,255,0.09)',
  cyan: '#16A6E8',
  cyanSoft: 'rgba(22,166,232,0.11)',
  purple: '#7B4DFF',
  purpleSoft: 'rgba(123,77,255,0.10)',
  teal: '#0FA38C',
  tealSoft: 'rgba(15,163,140,0.11)',
  green: '#17A36B',
  greenSoft: 'rgba(23,163,107,0.11)',
  amber: '#E0900F',
  amberSoft: 'rgba(224,144,15,0.12)',
  red: '#E0473F',
  redSoft: 'rgba(224,71,63,0.09)',
} as const;

/** tenant colours: A blue, B purple, C teal */
export const TEN = {
  A: {c: C.blue, s: C.blueSoft},
  B: {c: C.purple, s: C.purpleSoft},
  C: {c: C.teal, s: C.tealSoft},
} as const;

export const GRAD = `linear-gradient(120deg, ${C.blue}, ${C.cyan})`;
/** Arabic glyphs come from The Year of Handicrafts; it has no Latin letters, so Latin falls back to Alexandria */
export const F = {ar: "'The Year of Handicrafts', 'Alexandria'", lat: "'Alexandria', sans-serif"} as const;

export const shadow = {
  card: '0 40px 80px -30px rgba(17,26,51,0.22), 0 12px 24px -12px rgba(17,26,51,0.10), 0 0 0 1px rgba(17,26,51,0.05)',
  soft: '0 18px 40px -18px rgba(17,26,51,0.22), 0 0 0 1px rgba(17,26,51,0.05)',
  red: '0 24px 50px -18px rgba(224,71,63,0.45)',
  blue: '0 24px 50px -16px rgba(31,91,255,0.45)',
} as const;
