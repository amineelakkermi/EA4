import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {clamp} from '../../anim';
import {colors, fonts} from '../../theme';
import {useLang} from '../../i18n';

/** Types text character by character with a blinking caret */
export const Typed: React.FC<{
  text: string;
  start: number;
  cps?: number; // characters per frame
  size?: number;
  color?: string;
  dir?: 'rtl' | 'ltr';
  weight?: number;
  caret?: boolean;
  style?: React.CSSProperties;
}> = ({text, start, cps = 0.8, size = 34, color = colors.ink, dir: dirProp, weight = 500, caret = true, style}) => {
  const {dir: ctxDir} = useLang();
  const dir = dirProp ?? ctxDir;
  const frame = useCurrentFrame();
  const n = Math.floor(Math.max(0, frame - start) * cps);
  const shown = text.slice(0, Math.min(text.length, n));
  const done = n >= text.length;
  const blink = Math.floor(frame / 8) % 2 === 0;
  const caretOn = caret && (!done || blink) && frame >= start;
  return (
    <span
      dir={dir}
      style={{
        fontFamily: fonts.arabic,
        fontSize: size,
        fontWeight: weight,
        color,
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        ...style,
      }}
    >
      {shown}
      <span
        style={{
          display: 'inline-block',
          width: Math.max(2, size * 0.07),
          height: size * 1.05,
          background: colors.blue,
          marginRight: dir === 'rtl' ? 4 : 0,
          marginLeft: dir === 'ltr' ? 4 : 0,
          opacity: caretOn ? 1 : 0,
          borderRadius: 2,
        }}
      />
    </span>
  );
};

export const typedDone = (text: string, start: number, cps = 0.8) => start + Math.ceil(text.length / cps);

/** Skeleton text line used inside mockups */
export const Line: React.FC<{
  w: number | string;
  h?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({w, h = 12, color = colors.line, style}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: h,
      background: color,
      ...style,
    }}
  />
);

export const useReveal = (start: number, dur = 10) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + dur], [0, 1], {...clamp});
};
