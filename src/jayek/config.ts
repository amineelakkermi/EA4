/** jayek.sa website showcase (Figma -> Next.js + Tailwind CSS): 16:9 for X, site navy + gold palette. */
export const FPS = 30;
export const W = 1920;
export const H = 1080;
export const sec = (s: number) => Math.round(s * FPS);

export const T = {
  intro: [0, 4],
  site: [4, 16.5],
  cards: [16.5, 22],
  mobile: [22, 27.5],
  outro: [27.5, 33],
} as const;
export type SceneId = keyof typeof T;
export const scene = (id: SceneId) => ({from: sec(T[id][0]), duration: sec(T[id][1]) - sec(T[id][0])});
export const TOTAL = sec(T.outro[1]);
export const OVERLAP = 10;

export const C = {
  navy: '#202641',
  navy2: '#2B365C',
  navyDeep: '#161B30',
  gold: '#E1BD80',
  goldHi: '#F3D9A8',
  white: '#FFFFFF',
  ink: '#1B1F2E',
  mute: 'rgba(255,255,255,0.68)',
  line: 'rgba(255,255,255,0.12)',
} as const;

export const F = {ar: "'The Year of Handicrafts'", lat: "'Alexandria'"} as const;

/** desktop full-page capture: 1440 css px @2x -> shown 1920 wide */
export const PAGE = {srcW: 2880, srcH: 8700, k: 1920 / 1440} as const;
/** mobile full-page capture: 390 css px @3x */
export const MPAGE = {srcW: 1170, srcH: 16776} as const;
