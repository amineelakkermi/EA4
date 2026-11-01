import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../theme';
import {sp, springs, clamp, ease} from '../anim';

/**
 * EA4 mark rebuilt as vector so the ring can draw itself in and the letters
 * can rise through a mask. Mirrors the official logo (open ring + EA4).
 */
export const LogoMark: React.FC<{size?: number; delay?: number; color?: string; ring?: string}> = ({
  size = 300,
  delay = 0,
  color = colors.navy,
  ring = colors.navy,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const draw = interpolate(frame, [delay, delay + 34], [0, 1], {...clamp, easing: ease.inOut});
  const letters = sp(frame, fps, delay + 14, springs.smooth);
  const r = 44;
  const C = 2 * Math.PI * r;
  const arc = 0.82; // open ring like the brand mark
  return (
    <div style={{width: size, height: size, position: 'relative'}}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', inset: 0}}>
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={ring}
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeDasharray={`${C * arc * draw} ${C}`}
          transform="rotate(-20 50 50)"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontFamily: fonts.latin,
            fontWeight: 500,
            fontSize: size * 0.33,
            letterSpacing: size * 0.005,
            color,
            transform: `translateY(${(1 - letters) * size * 0.4}px)`,
            opacity: Math.min(1, letters * 1.5),
            paddingLeft: size * 0.1,
          }}
        >
          EA4
        </div>
      </div>
    </div>
  );
};

export const LogoImage: React.FC<{size?: number; style?: React.CSSProperties}> = ({size = 120, style}) => (
  <Img src={staticFile('img/ea4-logo.png')} style={{width: size, height: size, ...style}} />
);
