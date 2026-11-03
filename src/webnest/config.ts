/** Webnest Studio speed reel: palette extracted from the official logo (WEBNEST LOGO.jpg). */
export const FPS = 30;
export const W = 1080;
export const H = 1920;

export const sec = (s: number) => Math.round(s * FPS);

/** scene boundaries (seconds) */
export const T = {
  hook: [0, 6],
  problem: [6, 13],
  causes: [13, 24],
  impact: [24, 30],
  statement: [30, 33.5],
  takeaway: [33.5, 37.5],
  outro: [37.5, 39.5],
} as const;
export type SceneId = keyof typeof T;
export const scene = (id: SceneId) => ({from: sec(T[id][0]), duration: sec(T[id][1] - T[id][0])});
export const TOTAL = sec(T.outro[1]);

/** Instagram Reels safe zone */
export const SAFE = {top: 190, bottom: H - 380, left: 70, right: W - 70} as const;

/**
 * Colours sampled from the logo: the "W" / wordmark navy, the gradient blue of the ring,
 * the three pixel squares (deep blue, mid blue, slate) and the "STUDIO" grey.
 * Light tones are tints of the navy on white.
 */
export const palette = {
  navy: '#071327', // W mark / wordmark
  ink: '#121728', // wordmark body
  deep: '#0c2958', // bottom square
  blue: '#16407b', // top square / ring highlight
  ring: '#283e6b', // ring gradient
  slate: '#566b95', // middle square
  grey: '#606779', // STUDIO
  bg: '#F5F6F9',
  surface: '#FFFFFF',
  line: 'rgba(7,19,39,0.08)',
  tint: 'rgba(22,64,123,0.08)',
  tint2: 'rgba(86,107,149,0.14)',
  muted: '#9AA3B8', // slate tint for placeholders
  skeleton: '#E6E9F0',
  skeleton2: '#F0F2F6',
} as const;

export const font = {
  family: "'The Year of Handicrafts'",
} as const;

export const shadow = {
  card: '0 30px 60px -20px rgba(7,19,39,0.22), 0 12px 24px -12px rgba(7,19,39,0.10), 0 0 0 1px rgba(7,19,39,0.05)',
  float: '0 50px 90px -30px rgba(7,19,39,0.30), 0 20px 40px -20px rgba(7,19,39,0.14)',
  soft: '0 14px 30px -14px rgba(7,19,39,0.16), 0 0 0 1px rgba(7,19,39,0.04)',
} as const;
