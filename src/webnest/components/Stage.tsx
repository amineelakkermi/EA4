import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {palette, TOTAL} from '../config';

/** Bright stage with a thin, low-contrast grid that drifts very slowly for the whole reel. */
export const Stage: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, TOTAL], [0, 60]);
  return (
    <AbsoluteFill style={{backgroundColor: palette.bg, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 70% at 50% 12%, #FFFFFF 0%, rgba(255,255,255,0) 60%), radial-gradient(90% 60% at 50% 100%, #E9ECF2 0%, rgba(233,236,242,0) 70%)',
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${palette.line} 1px, transparent 1px), linear-gradient(90deg, ${palette.line} 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          backgroundPosition: `${shift}px ${shift * 0.6}px`,
          maskImage: 'radial-gradient(95% 80% at 50% 45%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.05) 100%)',
          WebkitMaskImage: 'radial-gradient(95% 80% at 50% 45%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.05) 100%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
