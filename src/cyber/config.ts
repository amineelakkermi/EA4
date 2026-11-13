/** Arabic cybersecurity awareness reel: light grid UI, navy + blue/purple, red only for warnings. */
export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const sec = (s: number) => Math.round(s * FPS);

export const T = {
  hook: [0, 7],
  passwords: [7, 17.6],
  updates: [17.6, 26.4],
  permissions: [26.4, 35.3],
  backups: [35.3, 46.3],
  solution: [46.3, 64.5],
} as const;
export type SceneId = keyof typeof T;
export const scene = (id: SceneId) => ({from: sec(T[id][0]), duration: sec(T[id][1]) - sec(T[id][0])});
export const TOTAL = sec(T.solution[1]);
export const OVERLAP = 8;

/** voiceover clips: file + start (s) */
export const VO: Array<{file: string; at: number}> = [
  {file: 'vo/cyber-1.wav', at: 0.4},
  {file: 'vo/cyber-2.wav', at: 7.3},
  {file: 'vo/cyber-3.wav', at: 17.9},
  {file: 'vo/cyber-4.wav', at: 26.7},
  {file: 'vo/cyber-5.wav', at: 35.6},
  {file: 'vo/cyber-6.wav', at: 47.0},
  {file: 'vo/cyber-7.wav', at: 59.9},
];

export const C = {
  bg: '#F3F4F7',
  white: '#FFFFFF',
  surface: '#FAFBFC',
  navy: '#0E1630',
  ink: '#1C2238',
  ink2: '#3B4259',
  muted: '#6C7389',
  dim: '#A6ACBC',
  line: '#E4E7EE',
  soft: '#EEF0F5',
  grid: 'rgba(14,22,48,0.05)',
  blue: '#3355FF',
  blueSoft: 'rgba(51,85,255,0.09)',
  purple: '#7B4DFF',
  purpleSoft: 'rgba(123,77,255,0.10)',
  green: '#17A36B',
  greenSoft: 'rgba(23,163,107,0.11)',
  amber: '#E59A1A',
  amberSoft: 'rgba(229,154,26,0.12)',
  red: '#E0473F',
  redSoft: 'rgba(224,71,63,0.09)',
} as const;

export const GRAD = `linear-gradient(120deg, ${C.blue}, ${C.purple})`;
export const F = {ar: "'The Year of Handicrafts'"} as const;

export const shadow = {
  card: '0 40px 80px -30px rgba(14,22,48,0.22), 0 12px 24px -12px rgba(14,22,48,0.10), 0 0 0 1px rgba(14,22,48,0.05)',
  soft: '0 18px 40px -18px rgba(14,22,48,0.22), 0 0 0 1px rgba(14,22,48,0.05)',
  red: '0 24px 50px -18px rgba(224,71,63,0.45)',
  blue: '0 24px 50px -16px rgba(51,85,255,0.45)',
} as const;
