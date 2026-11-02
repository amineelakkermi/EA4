import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {palette} from '../config';

/**
 * Light premium stage (#F4F5F7): soft top light, faint grid with slow drift and
 * an optional coloured glow (red / green / navy) that fades in with `glow`.
 */
export const Stage: React.FC<{
  children?: React.ReactNode;
  tint?: 'none' | 'red' | 'green' | 'navy';
  glow?: number; // 0..1
  drift?: number;
  offset?: number; // global frame of this scene's first frame, keeps the grid drift continuous across cuts
}> = ({children, tint = 'none', glow = 0, drift = 1, offset = 0}) => {
  const frame = useCurrentFrame() + offset;
  const shift = interpolate(frame, [0, 1080], [0, 44 * drift]);
  const tintColor = tint === 'red' ? palette.red : tint === 'green' ? palette.green : palette.navy;
  return (
    <AbsoluteFill style={{backgroundColor: palette.bg, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 70% at 50% 15%, #FFFFFF 0%, rgba(255,255,255,0) 60%), radial-gradient(90% 60% at 50% 100%, #E8EAEF 0%, rgba(232,234,239,0) 70%)',
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(rgba(23,37,84,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,37,84,0.05) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          backgroundPosition: `${shift}px ${shift * 0.6}px`,
          maskImage: 'radial-gradient(90% 75% at 50% 45%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'radial-gradient(90% 75% at 50% 45%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0) 100%)',
        }}
      />
      {tint !== 'none' && glow > 0 && (
        <AbsoluteFill
          style={{
            opacity: glow,
            background: `radial-gradient(70% 45% at 50% 50%, ${tintColor}22 0%, ${tintColor}00 70%)`,
          }}
        />
      )}
      {children}
    </AbsoluteFill>
  );
};
