import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {clamp, ease} from '../anim';

type Key = {frame: number; scale?: number; x?: number; y?: number; rotX?: number; rotY?: number};

/**
 * Cinematic camera: interpolates between keyframes with a smooth curve and
 * applies perspective so 2.5D tilts read as depth.
 */
export const Camera: React.FC<{keys: Key[]; children: React.ReactNode; perspective?: number}> = ({
  keys,
  children,
  perspective = 2200,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();
  const pick = (k: keyof Omit<Key, 'frame'>, def: number) => {
    const fr = keys.map((x) => x.frame);
    const vals = keys.map((x) => x[k] ?? def);
    if (fr.length < 2) return vals[0] ?? def;
    return interpolate(frame, fr, vals, {...clamp, easing: ease.inOut});
  };
  const scale = pick('scale', 1);
  const x = pick('x', 0);
  const y = pick('y', 0);
  const rotX = pick('rotX', 0);
  const rotY = pick('rotY', 0);
  return (
    <AbsoluteFill style={{perspective, transformStyle: 'preserve-3d'}}>
      <AbsoluteFill
        style={{
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformOrigin: '50% 50%',
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
