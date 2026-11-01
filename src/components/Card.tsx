import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, shadow} from '../theme';
import {sp, springs, clamp} from '../anim';

type Props = {
  children?: React.ReactNode;
  delay?: number;
  width?: number | string;
  height?: number | string;
  radius?: number;
  style?: React.CSSProperties;
  from?: 'bottom' | 'left' | 'right' | 'top' | 'scale';
  tilt?: {x?: number; y?: number};
  elevation?: keyof typeof shadow;
  exit?: number;
  padding?: number;
};

/** White surface with soft realistic shadow and a spring entrance */
export const Card: React.FC<Props> = ({
  children,
  delay = 0,
  width,
  height,
  radius = 36,
  style,
  from = 'bottom',
  tilt,
  elevation = 'card',
  exit,
  padding = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.smooth);
  const exitP =
    exit === undefined ? 0 : interpolate(frame, [exit, exit + 16], [0, 1], {...clamp});
  const d = (1 - p) * 90;
  const t =
    from === 'bottom'
      ? `translateY(${d}px)`
      : from === 'top'
        ? `translateY(${-d}px)`
        : from === 'left'
          ? `translateX(${-d}px)`
          : from === 'right'
            ? `translateX(${d}px)`
            : `scale(${0.92 + 0.08 * p})`;
  return (
    <div
      style={{
        width,
        height,
        background: colors.surface,
        borderRadius: radius,
        boxShadow: shadow[elevation],
        opacity: Math.min(1, p * 1.5) * (1 - exitP),
        transform: `${t} rotateX(${tilt?.x ?? 0}deg) rotateY(${tilt?.y ?? 0}deg) translateY(${-exitP * 40}px)`,
        transformStyle: 'preserve-3d',
        padding,
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
