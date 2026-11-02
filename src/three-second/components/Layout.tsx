import React from 'react';

/** Horizontally centred absolute row at a given y */
export const Center: React.FC<{y: number; children: React.ReactNode; style?: React.CSSProperties; z?: number}> = ({y, children, style, z}) => (
  <div style={{position: 'absolute', top: y, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', zIndex: z, ...style}}>
    {children}
  </div>
);
