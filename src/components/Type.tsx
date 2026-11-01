import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';
import {sp, springs, clamp} from '../anim';

type Props = {
  text: string;
  delay?: number;
  size?: number;
  weight?: number;
  color?: string;
  align?: 'right' | 'center' | 'left';
  stagger?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
  highlight?: string[]; // words rendered in accent color
  accent?: string;
  exit?: number; // frame at which the text starts leaving
  dir?: 'rtl' | 'ltr';
};

/**
 * Word-by-word masked rise. Each word slides up from behind a clip edge with a
 * spring so headlines feel choreographed rather than faded in.
 */
export const Headline: React.FC<Props> = ({
  text,
  delay = 0,
  size = 88,
  weight = 700,
  color = colors.navy,
  align = 'right',
  stagger = 3,
  lineHeight = 1.28,
  style,
  highlight = [],
  accent = colors.blue,
  exit,
  dir = 'rtl',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  const exitP =
    exit === undefined ? 0 : interpolate(frame, [exit, exit + 14], [0, 1], {...clamp});
  return (
    <div
      dir={dir}
      style={{
        fontFamily: fonts.arabic,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight,
        textAlign: align,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        columnGap: size * 0.26,
        rowGap: 0,
        opacity: 1 - exitP,
        transform: `translateY(${-exitP * 30}px)`,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const p = sp(frame, fps, delay + i * stagger, springs.smooth);
        const isHi = highlight.includes(w.replace(/[،؟!.]/g, ''));
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              paddingBottom: size * 0.12,
              marginBottom: -size * 0.12,
              paddingTop: size * 0.06,
              marginTop: -size * 0.06,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${(1 - p) * size * 1.05}px)`,
                opacity: Math.min(1, p * 1.6),
                color: isHi ? accent : undefined,
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export const Body: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  align?: 'right' | 'center' | 'left';
  weight?: number;
  style?: React.CSSProperties;
  exit?: number;
}> = ({text, delay = 0, size = 44, color = colors.muted, align = 'right', weight = 500, style, exit}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.smooth);
  const exitP =
    exit === undefined ? 0 : interpolate(frame, [exit, exit + 14], [0, 1], {...clamp});
  return (
    <div
      dir="rtl"
      style={{
        fontFamily: fonts.arabic,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight: 1.6,
        textAlign: align,
        opacity: Math.min(1, p * 1.4) * (1 - exitP),
        transform: `translateY(${(1 - p) * 24 - exitP * 20}px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

/** Big outlined step number with a solid gold fill that slides in */
export const StepNumber: React.FC<{n: string; delay?: number; size?: number}> = ({n, delay = 0, size = 220}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.snappy);
  const fill = interpolate(frame, [delay + 8, delay + 26], [0, 100], {...clamp});
  return (
    <div
      style={{
        position: 'relative',
        flexShrink: 0,
        fontFamily: fonts.latin,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: -size * 0.04,
        transform: `translateY(${(1 - p) * 40}px) scale(${0.9 + p * 0.1})`,
        opacity: Math.min(1, p * 2),
        width: size * 1.25,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          textAlign: 'center',
          color: 'transparent',
          WebkitTextStroke: `3px ${colors.navy}`,
          opacity: 0.22,
        }}
      >
        {n}
      </span>
      <span
        style={{
          position: 'absolute',
          inset: 0,
          textAlign: 'center',
          color: colors.gold,
          clipPath: `inset(0 0 ${100 - fill}% 0)`,
        }}
      >
        {n}
      </span>
    </div>
  );
};

/** Small uppercase label pill */
export const Pill: React.FC<{
  text: string;
  delay?: number;
  color?: string;
  bg?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({text, delay = 0, color = colors.blue, bg = colors.blueSoft, size = 30, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.snappy);
  return (
    <div
      dir="rtl"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: fonts.arabic,
        fontSize: size,
        fontWeight: 600,
        color,
        background: bg,
        padding: `${size * 0.35}px ${size * 0.8}px`,
        borderRadius: 999,
        transform: `scale(${0.8 + 0.2 * p})`,
        opacity: Math.min(1, p * 2),
        ...style,
      }}
    >
      {text}
    </div>
  );
};
