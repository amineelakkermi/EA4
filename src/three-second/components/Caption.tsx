import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {palette, font} from '../config';
import {sp, springs, clamp} from '../../anim';

type Props = {
  text: string;
  delay?: number;
  size?: number;
  weight?: 700 | 900;
  color?: string;
  highlight?: string[];
  accent?: string;
  align?: 'center' | 'start' | 'end';
  stagger?: number;
  lineHeight?: number;
  exit?: number;
  style?: React.CSSProperties;
  mode?: 'rise' | 'pop';
};

const strip = (w: string) => w.replace(/[،؟!.?,:;…]/g, '');

/**
 * Large Cairo caption. Words rise one by one from behind a mask (or pop with a
 * spring) and selected words are coloured red/green. RTL is explicit so the
 * line breaks follow Arabic reading order.
 */
export const Caption: React.FC<Props> = ({
  text,
  delay = 0,
  size = 76,
  weight = 900,
  color = palette.text,
  highlight = [],
  accent = palette.red,
  align = 'center',
  stagger = 3,
  lineHeight = 1.55,
  exit,
  style,
  mode = 'rise',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  const exitP = exit === undefined ? 0 : interpolate(frame, [exit, exit + 12], [0, 1], {...clamp});
  return (
    <div
      dir="rtl"
      lang="ar"
      style={{
        fontFamily: font.family,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight,
        textAlign: align === 'center' ? 'center' : align === 'start' ? 'right' : 'left',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        columnGap: size * 0.24,
        opacity: 1 - exitP,
        transform: `translateY(${-exitP * 30}px) scale(${1 - exitP * 0.04})`,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const p = sp(frame, fps, delay + i * stagger, mode === 'pop' ? springs.bouncy : springs.smooth);
        const isHi = highlight.includes(w) || highlight.includes(strip(w));
        const inner =
          mode === 'rise'
            ? {transform: `translateY(${(1 - p) * size * 1.0}px)`, opacity: Math.min(1, p * 1.6)}
            : {transform: `scale(${0.6 + 0.4 * p}) translateY(${(1 - p) * 20}px)`, opacity: Math.min(1, p * 1.8)};
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: mode === 'rise' ? 'hidden' : 'visible',
              paddingBottom: size * 0.2,
              marginBottom: -size * 0.2,
              paddingTop: size * 0.1,
              marginTop: -size * 0.1,
            }}
          >
            <span style={{display: 'inline-block', color: isHi ? accent : undefined, ...inner}}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};

/** Small rounded label (e.g. "الموقع الأول") */
export const Tag: React.FC<{
  text: string;
  delay?: number;
  color?: string;
  bg?: string;
  size?: number;
  style?: React.CSSProperties;
  exit?: number;
}> = ({text, delay = 0, color = palette.navy, bg = palette.surface, size = 30, style, exit}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.snappy);
  const exitP = exit === undefined ? 0 : interpolate(frame, [exit, exit + 10], [0, 1], {...clamp});
  return (
    <div
      dir="rtl"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: font.family,
        fontSize: size,
        fontWeight: 700,
        color,
        background: bg,
        padding: `${size * 0.25}px ${size * 0.9}px`,
        borderRadius: 999,
        boxShadow: '0 10px 24px -12px rgba(23,37,84,0.25), 0 0 0 1px rgba(23,37,84,0.06)',
        transform: `scale(${0.8 + 0.2 * p}) translateY(${(1 - p) * 10}px)`,
        opacity: Math.min(1, p * 2) * (1 - exitP),
        ...style,
      }}
    >
      {text}
    </div>
  );
};
