import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {clamp, ease} from '../../anim';

/** Scene content wrapper: fades/drifts in over `inF` frames and out over the last `outF` frames of `duration`. */
export const Fade: React.FC<{duration: number; inF?: number; outF?: number; children: React.ReactNode; drift?: number}> = ({duration, inF = 10, outF = 12, children, drift = 20}) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [0, inF], [0, 1], {...clamp, easing: ease.out});
  const b = interpolate(frame, [duration - outF, duration], [1, 0], {...clamp, easing: ease.in});
  const o = Math.min(a, b);
  return <AbsoluteFill style={{opacity: o, transform: `translateY(${(1 - a) * drift - (1 - b) * drift}px)`}}>{children}</AbsoluteFill>;
};
