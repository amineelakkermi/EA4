import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {palette, font} from '../config';
import {clamp} from '../../anim';

/** Slow, stuttering 0..1 progress (eases quickly to 40% then crawls) */
export const slowProgress = (t: number) => {
  const a = interpolate(t, [0, 0.25, 0.6, 1], [0, 0.38, 0.52, 0.64], {...clamp});
  const stutter = 0.012 * Math.sin(t * 40) * Math.max(0, Math.sin(t * 9));
  return Math.min(1, a + stutter);
};

/** Ring loader with seconds counter in the middle. `p` = 0..1 progress, `seconds` elapsed. */
export const RingLoader: React.FC<{p: number; seconds: number; size?: number; color?: string; label?: string; unit: string; dim?: number}> = ({p, seconds, size = 380, color = palette.blue, label, unit, dim = 0}) => {
  const r = 46;
  const C = 2 * Math.PI * r;
  const c = dim > 0 ? palette.grey : color;
  return (
    <div style={{width: size, height: size, position: 'relative', display: 'grid', placeItems: 'center', opacity: 1 - dim * 0.5}}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', inset: 0, transform: 'rotate(-90deg)'}}>
        <circle cx="50" cy="50" r={r} fill="none" stroke={palette.navy} strokeOpacity="0.08" strokeWidth="5" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${C * p} ${C}`} />
      </svg>
      <div dir="rtl" style={{fontFamily: font.family, textAlign: 'center', color: palette.navy}}>
        <div style={{fontSize: size * 0.3, lineHeight: 1, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10}}>
          <span>{seconds.toFixed(1)}</span>
          <span style={{fontSize: size * 0.12, color: palette.grey}}>{unit}</span>
        </div>
        {label && <div style={{fontSize: size * 0.085, color: palette.grey, marginTop: 10}}>{label}</div>}
      </div>
    </div>
  );
};

/** Thin progress bar */
export const Bar: React.FC<{p: number; w?: number; h?: number; color?: string}> = ({p, w = 560, h = 12, color = palette.blue}) => (
  <div style={{width: w, height: h, borderRadius: h, background: 'rgba(7,19,39,0.08)', overflow: 'hidden', direction: 'rtl'}}>
    <div style={{width: `${p * 100}%`, height: '100%', borderRadius: h, background: color}} />
  </div>
);

/** Three bouncing dots */
export const Dots: React.FC<{color?: string; size?: number}> = ({color = palette.slate, size = 14}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', gap: size * 0.8}}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{width: size, height: size, borderRadius: '50%', background: color, transform: `translateY(${Math.sin((frame - i * 4) / 4) * size * 0.4}px)`, opacity: 0.5 + 0.5 * (0.5 + 0.5 * Math.sin((frame - i * 4) / 4))}} />
      ))}
    </div>
  );
};
