import {interpolate, spring, Easing} from 'remotion';

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
  soft: Easing.bezier(0.33, 1, 0.68, 1),
};

export const springs = {
  snappy: {damping: 18, stiffness: 180, mass: 0.9},
  smooth: {damping: 22, stiffness: 120, mass: 1},
  gentle: {damping: 26, stiffness: 80, mass: 1},
  bouncy: {damping: 12, stiffness: 160, mass: 0.8},
};

export const sp = (
  frame: number,
  fps: number,
  delay = 0,
  config: {damping: number; stiffness: number; mass: number} = springs.smooth,
  durationInFrames?: number,
) =>
  spring({
    frame: frame - delay,
    fps,
    config,
    durationInFrames,
  });

/** eased 0..1 progress between frames a and b */
export const prog = (frame: number, a: number, b: number, e = ease.out) =>
  interpolate(frame, [a, b], [0, 1], {...clamp, easing: e});

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
