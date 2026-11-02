import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {palette, font} from '../config';
import {clamp} from '../../anim';

/**
 * Deterministic 3.00 → 0.00 timer. `start` is the local frame where the
 * countdown begins; it reaches 0.00 exactly `seconds` later. A ring drains
 * around the digits, the colour shifts navy → red in the last second, and
 * each whole second gives a small pulse.
 */
export const Countdown: React.FC<{
  start: number;
  seconds?: number;
  size?: number;
  style?: React.CSSProperties;
  variant?: 'ring' | 'pill';
  exit?: number;
}> = ({start, seconds = 3, size = 300, style, variant = 'ring', exit}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const elapsed = (frame - start) / fps;
  const t = Math.min(seconds, Math.max(0, seconds - elapsed));
  const started = frame >= start;
  const done = elapsed >= seconds;
  const frac = t / seconds;
  const phase = started ? (frame - start) % fps : 0;
  const pulse = started && !done ? 1 + 0.07 * Math.exp(-phase / 3.5) : done ? 1 + 0.1 * Math.exp(-(frame - start - seconds * fps) / 4) : 1;
  const danger = interpolate(t, [0, 1], [1, 0], {...clamp});
  const color = done ? palette.red : danger > 0 ? mix(palette.navy, palette.red, danger) : palette.navy;
  const enter = interpolate(frame, [start - 14, start - 2], [0, 1], {...clamp});
  const exitP = exit === undefined ? 0 : interpolate(frame, [exit, exit + 10], [0, 1], {...clamp});
  const label = t.toFixed(2);
  const chars = label.split('');
  const r = 46;
  const C = 2 * Math.PI * r;
  const digitSize = variant === 'ring' ? size * 0.27 : size * 0.36;
  return (
    <div
      style={{
        width: variant === 'ring' ? size : 'auto',
        height: variant === 'ring' ? size : size * 0.5,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${(0.7 + 0.3 * enter) * pulse})`,
        opacity: enter * (1 - exitP),
        ...style,
      }}
    >
      {variant === 'ring' ? (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', inset: 0}}>
          <circle cx="50" cy="50" r={r} fill={palette.surface} stroke={palette.gray} strokeWidth={3} />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={3.6}
            strokeLinecap="round"
            strokeDasharray={`${C * frac} ${C}`}
            transform="rotate(-90 50 50)"
          />
        </svg>
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 999,
            background: palette.surface,
            boxShadow: '0 16px 40px -16px rgba(23,37,84,0.3), 0 0 0 1px rgba(23,37,84,0.06)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${frac * 100}%`,
              background: `${color}1A`,
              borderRadius: 999,
            }}
          />
        </div>
      )}
      <div
        dir="ltr"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'baseline',
          fontFamily: font.family,
          fontWeight: 900,
          fontSize: digitSize,
          color,
          lineHeight: 1,
          padding: variant === 'pill' ? `0 ${size * 0.22}px` : 0,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {chars.map((c, i) => (
          <span key={i} style={{display: 'inline-block', width: c === '.' ? digitSize * 0.3 : digitSize * 0.62, textAlign: 'center'}}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

const mix = (a: string, b: string, t: number) => {
  const pa = hex(a);
  const pb = hex(b);
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
