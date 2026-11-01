import React from 'react';
import {colors} from '../theme';

const base = (size: number, color: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const SearchIcon: React.FC<{size?: number; color?: string}> = ({size = 24, color = colors.muted}) => (
  <svg {...base(size, color)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);
export const CheckIcon: React.FC<{size?: number; color?: string; progress?: number; strokeWidth?: number}> = ({
  size = 24,
  color = colors.green,
  progress = 1,
  strokeWidth = 2.6,
}) => (
  <svg {...base(size, color)} strokeWidth={strokeWidth}>
    <path d="M5 12.5l4.5 4.5L19 7.5" strokeDasharray={22} strokeDashoffset={22 * (1 - progress)} />
  </svg>
);
export const BoltIcon: React.FC<{size?: number; color?: string}> = ({size = 24, color = colors.gold}) => (
  <svg {...base(size, color)} fill={color} stroke="none">
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);
export const ShieldIcon: React.FC<{size?: number; color?: string}> = ({size = 24, color = colors.blue}) => (
  <svg {...base(size, color)}>
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
export const LinkIcon: React.FC<{size?: number; color?: string}> = ({size = 24, color = colors.blue}) => (
  <svg {...base(size, color)}>
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);
export const GlobeIcon: React.FC<{size?: number; color?: string}> = ({size = 24, color = colors.muted}) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </svg>
);
export const TrendIcon: React.FC<{size?: number; color?: string}> = ({size = 24, color = colors.green}) => (
  <svg {...base(size, color)}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </svg>
);
export const ImageIcon: React.FC<{size?: number; color?: string}> = ({size = 24, color = colors.faint}) => (
  <svg {...base(size, color)}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="2" />
    <path d="M21 16l-5-5-9 9" />
  </svg>
);
export const DocIcon: React.FC<{size?: number; color?: string}> = ({size = 24, color = colors.blue}) => (
  <svg {...base(size, color)}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5M10 13h6M10 17h6" />
  </svg>
);

/** Google-like multicolour "G" without using the trademark asset */
export const GMark: React.FC<{size?: number}> = ({size = 40}) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l7 5.4c4.1-3.8 6.5-9.4 6.5-15.7z" />
    <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.6-5.3l-7-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.9-12.5-9.2l-7.2 5.6C7.9 41 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.5 28.3c-.5-1.3-.7-2.8-.7-4.3s.3-3 .7-4.3l-7.2-5.6C2.8 17.1 2 20.4 2 24s.8 6.9 2.3 9.9l7.2-5.6z" />
    <path fill="#EA4335" d="M24 10.5c3.2 0 5.4 1.4 6.7 2.6l5-4.9C32.9 5.4 28.9 3.5 24 3.5 15.4 3.5 7.9 8.5 4.3 15.9l7.2 5.6c1.8-5.3 6.7-9.2 12.5-9.2z" />
  </svg>
);
