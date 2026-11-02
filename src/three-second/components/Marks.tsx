import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {palette} from '../config';
import {sp, springs, clamp, ease} from '../../anim';

/** Red X that pops in and draws its two strokes */
export const XMark: React.FC<{delay?: number; size?: number}> = ({delay = 0, size = 120}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.bouncy);
  const d1 = interpolate(frame, [delay + 4, delay + 12], [0, 1], {...clamp, easing: ease.out});
  const d2 = interpolate(frame, [delay + 9, delay + 17], [0, 1], {...clamp, easing: ease.out});
  const L = 42;
  return (
    <div style={{width: size, height: size, transform: `scale(${p})`, opacity: Math.min(1, p * 2)}}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill={palette.red} />
        <circle cx="50" cy="50" r="46" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" />
        <path d="M35 35 L65 65" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${L * d1} ${L}`} />
        <path d="M65 35 L35 65" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${L * d2} ${L}`} />
      </svg>
    </div>
  );
};

/** Green check that pops in and draws itself */
export const CheckMark: React.FC<{delay?: number; size?: number}> = ({delay = 0, size = 120}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.bouncy);
  const d = interpolate(frame, [delay + 4, delay + 16], [0, 1], {...clamp, easing: ease.out});
  const halo = interpolate(frame, [delay + 6, delay + 30], [0, 1], {...clamp, easing: ease.out});
  const L = 70;
  return (
    <div style={{width: size, height: size, transform: `scale(${p})`, opacity: Math.min(1, p * 2), position: 'relative'}}>
      <div
        style={{
          position: 'absolute',
          inset: -size * 0.3 * halo,
          borderRadius: '50%',
          border: `${size * 0.03}px solid ${palette.green}`,
          opacity: (1 - halo) * 0.6,
        }}
      />
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill={palette.green} />
        <circle cx="50" cy="50" r="46" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" />
        <path d="M28 52 L44 67 L72 36" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${L * d} ${L}`} />
      </svg>
    </div>
  );
};
