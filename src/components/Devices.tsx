import React from 'react';
import {colors, fonts} from '../theme';

/** Minimal professional browser chrome */
export const BrowserFrame: React.FC<{
  url?: string;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  barHeight?: number;
}> = ({url = 'google.com', children, width = '100%', height = '100%', style, barHeight = 68}) => (
  <div
    style={{
      width,
      height,
      background: colors.surface,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      ...style,
    }}
  >
    <div
      style={{
        height: barHeight,
        background: colors.surfaceAlt,
        borderBottom: `1px solid ${colors.line}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 22px',
        gap: 10,
        flexShrink: 0,
      }}
    >
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
        <div key={c} style={{width: barHeight * 0.2, height: barHeight * 0.2, borderRadius: 99, background: c}} />
      ))}
      <div
        style={{
          marginLeft: 18,
          flex: 1,
          height: barHeight * 0.58,
          borderRadius: 99,
          background: colors.surface,
          border: `1px solid ${colors.line}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          gap: 10,
          fontFamily: fonts.latin,
          fontSize: barHeight * 0.3,
          color: colors.muted,
        }}
      >
        <Lock size={barHeight * 0.26} />
        <span style={{direction: 'ltr'}}>{url}</span>
      </div>
    </div>
    <div style={{flex: 1, position: 'relative', overflow: 'hidden'}}>{children}</div>
  </div>
);

export const Lock: React.FC<{size?: number; color?: string}> = ({size = 18, color = colors.faint}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
    <rect x="5" y="11" width="14" height="10" rx="2.5" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

/** Smartphone mockup, pure CSS, realistic enough at 2.5D */
export const Phone: React.FC<{
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  dark?: boolean;
}> = ({width = 320, children, style, dark = true}) => {
  const h = width * 2.05;
  const bezel = width * 0.035;
  return (
    <div
      style={{
        width,
        height: h,
        borderRadius: width * 0.16,
        background: dark ? 'linear-gradient(160deg,#1C2233,#0B1120)' : '#E6E8ED',
        padding: bezel,
        boxShadow:
          '0 60px 100px -30px rgba(11,27,58,0.45), 0 25px 40px -20px rgba(11,27,58,0.25), inset 0 0 0 2px rgba(255,255,255,0.08)',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: width * 0.13,
          background: colors.surface,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {children}
        <div
          style={{
            position: 'absolute',
            top: width * 0.04,
            left: '50%',
            transform: 'translateX(-50%)',
            width: width * 0.28,
            height: width * 0.075,
            borderRadius: 99,
            background: '#0B1120',
          }}
        />
      </div>
    </div>
  );
};

/** Laptop mockup: screen + base with subtle perspective */
export const Laptop: React.FC<{
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({width = 760, children, style}) => {
  const screenH = width * 0.62;
  const bezel = width * 0.018;
  return (
    <div style={{width, position: 'relative', ...style}}>
      <div
        style={{
          width,
          height: screenH,
          borderRadius: width * 0.03,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          background: 'linear-gradient(160deg,#2A3246,#0E1424)',
          padding: bezel,
          paddingBottom: bezel * 1.2,
          boxShadow: '0 60px 100px -30px rgba(11,27,58,0.45), 0 25px 40px -20px rgba(11,27,58,0.2)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: width * 0.014,
            background: colors.surface,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {children}
        </div>
      </div>
      <div
        style={{
          width: width * 1.14,
          marginLeft: -width * 0.07,
          height: width * 0.03,
          borderRadius: `0 0 ${width * 0.02}px ${width * 0.02}px`,
          background: 'linear-gradient(180deg,#D9DDE5,#B9BFCB)',
          boxShadow: '0 30px 50px -20px rgba(11,27,58,0.35)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            width: width * 0.16,
            height: width * 0.008,
            borderRadius: '0 0 8px 8px',
            background: '#9AA2B1',
          }}
        />
      </div>
    </div>
  );
};
