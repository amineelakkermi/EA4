import {continueRender, delayRender, staticFile} from 'remotion';

const faces: Array<[string, string, number]> = [
  ['IBM Plex Sans Arabic', 'IBMPlexSansArabic-Regular.ttf', 400],
  ['IBM Plex Sans Arabic', 'IBMPlexSansArabic-Medium.ttf', 500],
  ['IBM Plex Sans Arabic', 'IBMPlexSansArabic-SemiBold.ttf', 600],
  ['IBM Plex Sans Arabic', 'IBMPlexSansArabic-Bold.ttf', 700],
];

let loaded: Promise<void> | null = null;

export const loadFonts = (): Promise<void> => {
  if (loaded) return loaded;
  const handle = delayRender('Loading fonts');
  loaded = Promise.all(
    faces.map(([family, file, weight]) => {
      const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)})`, {
        weight: String(weight),
      });
      return face.load().then((f) => {
        (document.fonts as unknown as {add: (f: FontFace) => void}).add(f);
      });
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
  return loaded;
};
