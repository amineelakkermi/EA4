import scenes from './scenes.json';

export const S = scenes;
export const FPS = S.meta.fps;
export const W = S.meta.width;
export const H = S.meta.height;
export const TOTAL = S.meta.durationSeconds * FPS;
export const CHALLENGE = S.meta.challengeSeconds * FPS;

export const sec = (s: number) => Math.round(s * FPS);

export type SceneId = (typeof S.scenes)[number]['id'];
export const scene = (id: SceneId) => {
  const sc = S.scenes.find((x) => x.id === id)!;
  return {from: sec(sc.start), duration: sec(sc.end - sc.start), ...sc};
};

/** Instagram Reels safe zone (brief): 150 top, 380 bottom, 60 sides */
export const SAFE = {top: 150, bottom: H - 380, left: 60, right: W - 60} as const;

export const palette = {
  bg: '#F4F5F7',
  surface: '#FFFFFF',
  text: '#111827',
  navy: '#172554',
  red: '#EF4444',
  green: '#16A34A',
  gray: '#E5E7EB',
  muted: '#6B7280',
  redSoft: '#FEE2E2',
  greenSoft: '#DCFCE7',
  navySoft: '#DBEAFE',
  blue: '#2563EB',
} as const;

/** The Year of Handicrafts ships a single Regular weight: hierarchy comes from size/colour,
 *  `font-synthesis: none` (set on the composition root) stops the browser from faux-bolding it.
 *  IBM Plex is only a fallback for Latin URLs / glyphs the font lacks. */
export const font = {
  family: "'The Year of Handicrafts', 'IBM Plex Sans Arabic', sans-serif",
  black: 400,
  bold: 400,
} as const;

export const shadow = {
  card: '0 30px 60px -20px rgba(23,37,84,0.25), 0 12px 24px -12px rgba(23,37,84,0.12), 0 0 0 1px rgba(23,37,84,0.05)',
  float: '0 50px 90px -30px rgba(23,37,84,0.32), 0 20px 40px -20px rgba(23,37,84,0.16)',
  soft: '0 14px 30px -14px rgba(23,37,84,0.18), 0 0 0 1px rgba(23,37,84,0.04)',
} as const;

/** Round structure inside a 5s round scene (frames) */
export const ROUND = {
  enter: 12, // site slides in
  challengeStart: 12,
  challengeEnd: 12 + CHALLENGE, // 102
  blurAt: 12 + CHALLENGE, // fast blur + whoosh
  questionAt: 12 + CHALLENGE + 6, // 108
} as const;
