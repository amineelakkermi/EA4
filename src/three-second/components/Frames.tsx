import React from 'react';
import {palette, font} from '../config';

export const MOBILE = {w: 520, h: 1066} as const;
export const DESKTOP = {w: 960, h: 640} as const;
export const PHONE = {bezel: 16, radius: 68} as const;

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

export const phoneOuter = () => ({w: MOBILE.w + PHONE.bezel * 2, h: MOBILE.h + PHONE.bezel * 2});

/** Realistic smartphone shell around a 520×1066 page */
export const PhoneFrame: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => {
  const {w, h} = phoneOuter();
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: PHONE.radius,
        background: 'linear-gradient(160deg,#2B3344 0%,#111827 60%,#0B1120 100%)',
        padding: PHONE.bezel,
        boxShadow: '0 70px 110px -40px rgba(17,24,39,0.5), 0 30px 50px -25px rgba(17,24,39,0.3), inset 0 0 0 2px rgba(255,255,255,0.08)',
        position: 'relative',
        ...style,
      }}
    >
      <div style={{position: 'absolute', right: -3, top: 220, width: 4, height: 90, borderRadius: 2, background: '#1F2937'}} />
      <div style={{position: 'absolute', left: -3, top: 180, width: 4, height: 60, borderRadius: 2, background: '#1F2937'}} />
      <div style={{position: 'absolute', left: -3, top: 260, width: 4, height: 110, borderRadius: 2, background: '#1F2937'}} />
      <div style={{width: MOBILE.w, height: MOBILE.h, borderRadius: PHONE.radius - PHONE.bezel, overflow: 'hidden', background: '#fff', position: 'relative'}}>
        {children}
        <div style={{position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 128, height: 36, borderRadius: 99, background: '#0B1120'}} />
        <div style={{position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 170, height: 6, borderRadius: 99, background: 'rgba(17,24,39,0.35)'}} />
      </div>
    </div>
  );
};

/** Minimal desktop browser chrome around a 960×640 page */
export const BrowserFrame: React.FC<{url: string; children: React.ReactNode; style?: React.CSSProperties}> = ({url, children, style}) => (
  <div
    style={{
      width: DESKTOP.w,
      height: DESKTOP.h + 56,
      background: '#fff',
      borderRadius: 26,
      overflow: 'hidden',
      boxShadow: '0 60px 100px -35px rgba(17,24,39,0.4), 0 25px 40px -25px rgba(17,24,39,0.25), 0 0 0 1px rgba(17,24,39,0.06)',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
  >
    <div style={{height: 56, background: '#F3F4F6', borderBottom: `1px solid ${palette.gray}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 9, flexShrink: 0}}>
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
        <div key={c} style={{width: 13, height: 13, borderRadius: 99, background: c}} />
      ))}
      <div
        dir="ltr"
        style={{
          marginLeft: 16,
          flex: 1,
          height: 34,
          borderRadius: 99,
          background: '#fff',
          border: `1px solid ${palette.gray}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 8,
          fontFamily: font.family,
          fontSize: 16,
          fontWeight: 700,
          color: palette.muted,
        }}
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2.4} strokeLinecap="round">
          <rect x="5" y="11" width="14" height="10" rx="2.5" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        {url}
      </div>
    </div>
    <div style={{width: DESKTOP.w, height: DESKTOP.h, position: 'relative', overflow: 'hidden'}}>{children}</div>
  </div>
);

/** Mobile status bar + browser address pill */
export const MobileChrome: React.FC<{url: string; dark?: boolean}> = ({url, dark}) => (
  <div style={{height: 118, position: 'relative', flexShrink: 0}}>
    <div
      dir="ltr"
      style={{
        position: 'absolute',
        top: 22,
        left: 28,
        right: 28,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: font.family,
        fontSize: 17,
        fontWeight: 700,
        color: dark ? '#fff' : palette.text,
      }}
    >
      <span>9:41</span>
      <span style={{display: 'flex', gap: 6, alignItems: 'center'}}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill={dark ? '#fff' : palette.text}>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke={dark ? '#fff' : palette.text} strokeWidth="1.5">
          <rect x="1" y="1" width="19" height="10" rx="3" />
          <rect x="3" y="3" width="13" height="6" rx="1.5" fill={dark ? '#fff' : palette.text} stroke="none" />
          <path d="M22 4v4" />
        </svg>
      </span>
    </div>
    <div
      dir="ltr"
      style={{
        position: 'absolute',
        top: 66,
        left: 24,
        right: 24,
        height: 40,
        borderRadius: 14,
        background: dark ? 'rgba(255,255,255,0.14)' : '#F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontFamily: font.family,
        fontSize: 17,
        fontWeight: 700,
        color: dark ? '#fff' : palette.muted,
      }}
    >
      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
        <rect x="5" y="11" width="14" height="10" rx="2.5" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
      {url}
    </div>
  </div>
);
