import React from 'react';
import {palette, font} from '../config';

/** Simple visitor avatar (head + shoulders) in a circle, optional label underneath */
export const Visitor: React.FC<{size?: number; color?: string; bg?: string; label?: string; style?: React.CSSProperties}> = ({size = 120, color = palette.navy, bg = '#fff', label, style}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, ...style}}>
    <div style={{width: size, height: size, borderRadius: '50%', background: bg, boxShadow: '0 18px 34px -18px rgba(7,19,39,0.35), 0 0 0 1px rgba(7,19,39,0.06)', display: 'grid', placeItems: 'center', overflow: 'hidden'}}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 100 100">
        <circle cx="50" cy="36" r="20" fill={color} />
        <path d="M14 96 a36 30 0 0 1 72 0 Z" fill={color} />
      </svg>
    </div>
    {label && <div dir="rtl" style={{fontFamily: font.family, fontSize: size * 0.24, color: palette.grey}}>{label}</div>}
  </div>
);

/** Exit arrow icon (door + arrow) */
export const ExitIcon: React.FC<{size?: number; color?: string}> = ({size = 60, color = palette.grey}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-5" />
    <path d="M10 17l5-5-5-5M15 12H3" />
  </svg>
);
