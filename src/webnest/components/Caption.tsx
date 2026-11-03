import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {palette, font} from '../config';
import {sp, springs, clamp} from '../../anim';

export type HighlightGroup = {words: readonly string[]; at: number};

type Props = {
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  highlight?: readonly string[];
  /** words that turn to the accent colour at a given local frame */
  groups?: HighlightGroup[];
  accent?: string;
  align?: 'center' | 'start';
  stagger?: number;
  lineHeight?: number;
  exit?: number;
  style?: React.CSSProperties;
  mode?: 'rise' | 'pop';
};

const strip = (w: string) => w.replace(/[،؟!.?,:;]/g, '');

/**
 * Arabic caption set in The Year of Handicrafts (client font, single weight → hierarchy by size).
 * Words rise one by one from behind a mask; selected words take the logo blue.
 */
export const Caption: React.FC<Props> = ({
  text,
  delay = 0,
  size = 64,
  color = palette.navy,
  highlight = [],
  groups = [],
  accent = palette.blue,
  align = 'center',
  stagger = 2.5,
  lineHeight = 1.6,
  exit,
  style,
  mode = 'rise',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  const exitP = exit === undefined ? 0 : interpolate(frame, [exit, exit + 12], [0, 1], {...clamp});
  if (exit !== undefined && frame > exit + 14) return null;
  return (
    <div
      dir="rtl"
      lang="ar"
      style={{
        fontFamily: font.family,
        fontSize: size,
        fontWeight: 400,
        color,
        lineHeight,
        textAlign: align === 'center' ? 'center' : 'right',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        columnGap: size * 0.26,
        opacity: 1 - exitP,
        transform: `translateY(${-exitP * 26}px) scale(${1 - exitP * 0.03})`,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const p = sp(frame, fps, delay + i * stagger, mode === 'pop' ? springs.bouncy : springs.smooth);
        const bare = strip(w);
        const staticHi = highlight.includes(w) || highlight.includes(bare);
        let hi = staticHi ? 1 : 0;
        for (const g of groups) {
          if (g.words.includes(w) || g.words.includes(bare)) hi = Math.max(hi, interpolate(frame, [g.at, g.at + 10], [0, 1], {...clamp}));
        }
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
              paddingBottom: size * 0.22,
              marginBottom: -size * 0.22,
              paddingTop: size * 0.12,
              marginTop: -size * 0.12,
            }}
          >
            <span style={{display: 'inline-block', color: hi > 0 ? mixColor(color, accent, hi) : undefined, transition: 'none', ...inner}}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};

const hex = (c: string) => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
export const mixColor = (a: string, b: string, t: number) => {
  const A = hex(a);
  const B = hex(b);
  const m = A.map((v, i) => Math.round(v + (B[i] - v) * t));
  return `rgb(${m[0]},${m[1]},${m[2]})`;
};

/** Small rounded label */
export const Tag: React.FC<{
  text: string;
  delay?: number;
  color?: string;
  bg?: string;
  size?: number;
  style?: React.CSSProperties;
  exit?: number;
  icon?: React.ReactNode;
}> = ({text, delay = 0, color = palette.navy, bg = palette.surface, size = 30, style, exit, icon}) => {
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
        gap: 14,
        fontFamily: font.family,
        fontSize: size,
        color,
        background: bg,
        padding: `${size * 0.3}px ${size * 0.9}px`,
        borderRadius: 999,
        boxShadow: '0 10px 24px -12px rgba(7,19,39,0.22), 0 0 0 1px rgba(7,19,39,0.06)',
        transform: `scale(${0.8 + 0.2 * p}) translateY(${(1 - p) * 10}px)`,
        opacity: Math.min(1, p * 2) * (1 - exitP),
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {icon}
      {text}
    </div>
  );
};

/** Horizontally centred absolute row at a given y */
export const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties; z?: number}> = ({y, children, style, z}) => (
  <div style={{position: 'absolute', top: y, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', zIndex: z, ...style}}>
    {children}
  </div>
);

/** Caption block pinned in the top safe area with side margins */
export const TopCopy: React.FC<{children: React.ReactNode; y?: number; style?: React.CSSProperties}> = ({children, y = 210, style}) => (
  <div style={{position: 'absolute', top: y, left: 70, right: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, ...style}}>{children}</div>
);
