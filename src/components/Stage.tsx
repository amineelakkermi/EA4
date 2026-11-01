import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {colors} from '../theme';

/**
 * Light-grey premium stage: soft radial lighting, a very subtle technical grid
 * and a slow drift so the background never feels static.
 */
export const Stage: React.FC<{children?: React.ReactNode; drift?: number}> = ({
  children,
  drift = 1,
}) => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, 900], [0, 40 * drift]);
  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 70% at 50% 18%, #FFFFFF 0%, rgba(255,255,255,0) 60%), radial-gradient(90% 60% at 50% 100%, #E6E8EE 0%, rgba(230,232,238,0) 70%)',
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          backgroundPosition: `${shift}px ${shift * 0.6}px`,
          maskImage:
            'radial-gradient(90% 75% at 50% 45%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'radial-gradient(90% 75% at 50% 45%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0) 100%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
