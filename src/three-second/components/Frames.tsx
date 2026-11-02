import React from 'react';

/** Renders fixed-size design content at an arbitrary scale (keeps layout pixel-exact). */
export const Scaled: React.FC<{w: number; h: number; scale: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  w,
  h,
  scale,
  children,
  style,
}) => (
  <div style={{width: w * scale, height: h * scale, position: 'relative', ...style}}>
    <div style={{width: w, height: h, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0}}>{children}</div>
  </div>
);
