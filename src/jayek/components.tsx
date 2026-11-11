import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, TOTAL} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';

/** site navy stage with the site's own texture and slow gold light */
export const Stage: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const a = f / TOTAL;
  return (
    <AbsoluteFill style={{background: C.navy, overflow: 'hidden', fontFamily: F.ar, fontSynthesis: 'none'}}>
      <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 40%, ${C.navy2} 0%, ${C.navy} 55%, ${C.navyDeep} 100%)`}} />
      <Img src={staticFile('img/jayek/texture.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35}} />
      <div style={{position: 'absolute', width: 1300, height: 1300, right: -420 + 220 * Math.sin(a * 5), top: -640 + 140 * Math.cos(a * 4), borderRadius: 1300, background: 'radial-gradient(circle, rgba(225,189,128,0.16) 0%, rgba(225,189,128,0) 60%)'}} />
      <div style={{position: 'absolute', width: 1200, height: 1200, left: -520 + 180 * Math.cos(a * 6), bottom: -720 + 120 * Math.sin(a * 5), borderRadius: 1200, background: 'radial-gradient(circle, rgba(120,140,220,0.16) 0%, rgba(120,140,220,0) 60%)'}} />
      {children}
    </AbsoluteFill>
  );
};

/** scene wrapper: zoom-through dissolve in/out with a slow push */
export const Shot: React.FC<{duration: number; children: React.ReactNode; push?: number; inF?: number; outF?: number}> = ({duration, children, push = 0.03, inF = 12, outF = 10}) => {
  const f = useCurrentFrame();
  const i = inF === 0 ? 1 : prog(f, 0, inF, ease.out);
  const o = outF === 0 ? 0 : prog(f, duration - outF, duration, ease.in);
  const cam = interpolate(f, [0, duration], [1, 1 + push], clamp);
  const s = (0.95 + 0.05 * i) * cam * (1 + o * 0.06);
  const blur = (1 - i) * 10 + o * 10;
  return (
    <AbsoluteFill style={{opacity: Math.min(i, 1 - o), transform: `scale(${s})`, filter: blur > 0.2 ? `blur(${blur}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};

const bare = (w: string) => w.replace(/[.,،!؟?«»]/g, '');

/** Arabic RTL words with a staggered blur-rise reveal */
export const Words: React.FC<{text: string; size: number; color?: string; hi?: readonly string[]; hiColor?: string; delay?: number; stagger?: number; lh?: number; justify?: React.CSSProperties['justifyContent']; style?: React.CSSProperties}> = ({text, size, color = C.white, hi = [], hiColor = C.gold, delay = 0, stagger = 2.4, lh = 1.35, justify = 'center', style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const Hh = hi.map(bare);
  return (
    <div dir="rtl" style={{display: 'flex', flexWrap: 'wrap', justifyContent: justify, columnGap: size * 0.26, fontFamily: F.ar, fontSize: size, lineHeight: lh, color, ...style}}>
      {text.split(' ').map((w, k) => {
        const p = sp(f, fps, delay + k * stagger, springs.smooth);
        return (
          <span key={k} style={{display: 'inline-block', color: Hh.includes(bare(w)) ? hiColor : undefined, opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * size * 0.5}px)`, filter: p < 0.97 ? `blur(${(1 - p) * 12}px)` : undefined}}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** glass pill caption with a gold dot */
export const Pill: React.FC<{children: React.ReactNode; style?: React.CSSProperties; size?: number}> = ({children, style, size = 34}) => (
  <div dir="rtl" style={{display: 'inline-flex', alignItems: 'center', gap: 16, padding: `${size * 0.42}px ${size * 0.9}px`, borderRadius: 999, background: 'rgba(22,27,48,0.78)', backdropFilter: 'blur(14px)', border: `1.5px solid rgba(225,189,128,0.35)`, boxShadow: '0 24px 50px -20px rgba(0,0,0,0.6)', color: C.white, fontFamily: F.ar, fontSize: size, lineHeight: 1.2, whiteSpace: 'nowrap', ...style}}>
    <span style={{width: size * 0.32, height: size * 0.32, borderRadius: 99, background: C.gold, boxShadow: `0 0 18px ${C.gold}`}} />
    {children}
  </div>
);

/* ---------- brand icons (paths from simple-icons, Figma drawn in its colours) ---------- */
export const NextIcon: React.FC<{size: number; color?: string}> = ({size, color = '#fff'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path fill={color} d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" /></svg>
);
export const TailwindIcon: React.FC<{size: number; color?: string}> = ({size, color = '#38BDF8'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path fill={color} d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" /></svg>
);
export const FigmaIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size * 0.667} height={size} viewBox="0 0 16 24">
    <path fill="#F24E1E" d="M4 0h4v8H4a4 4 0 0 1 0-8z" />
    <path fill="#FF7262" d="M8 0h4a4 4 0 0 1 0 8H8z" />
    <path fill="#A259FF" d="M4 8h4v8H4a4 4 0 0 1 0-8z" />
    <circle fill="#1ABCFE" cx="12" cy="12" r="4" />
    <path fill="#0ACF83" d="M4 16h4v4a4 4 0 1 1-4-4z" />
  </svg>
);

/** tech chip: icon tile + Latin label */
export const TechChip: React.FC<{icon: React.ReactNode; label: string; p: number; style?: React.CSSProperties}> = ({icon, label, p, style}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '16px 30px 16px 18px', borderRadius: 26, background: 'rgba(255,255,255,0.06)', border: `1.5px solid ${C.line}`, boxShadow: '0 30px 60px -30px rgba(0,0,0,0.7)', opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 40}px) scale(${0.85 + 0.15 * p})`, filter: p < 0.97 ? `blur(${(1 - p) * 10}px)` : undefined, ...style}}>
    <div style={{width: 72, height: 72, borderRadius: 18, background: C.navyDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.line}`}}>{icon}</div>
    <span style={{fontFamily: F.lat, fontWeight: 600, fontSize: 32, color: C.white, letterSpacing: -0.3}}>{label}</span>
  </div>
);

/** macOS-style pointer with click ripple */
export const Cursor: React.FC<{x: number; y: number; click?: number; opacity?: number}> = ({x, y, click = -1, opacity = 1}) => {
  const f = useCurrentFrame();
  const c = click >= 0 ? prog(f, click, click + 16, ease.out) : 0;
  const press = click >= 0 ? 1 - 0.14 * Math.sin(Math.PI * prog(f, click - 3, click + 6, ease.inOut)) : 1;
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity, zIndex: 40, pointerEvents: 'none'}}>
      {c > 0 && c < 1 && <div style={{position: 'absolute', left: -40 * c, top: -40 * c, width: 80 * c, height: 80 * c, borderRadius: 99, border: `3px solid ${C.gold}`, opacity: 1 - c}} />}
      <svg width={44} height={44} viewBox="0 0 24 24" style={{transform: `scale(${press})`, transformOrigin: '4px 2px', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.35))'}}>
        <path d="M4 2 L4 19 L8.6 14.8 L11.6 21.4 L14.4 20.2 L11.5 13.8 L17.6 13.6 Z" fill="#111" stroke="#fff" strokeWidth={1.5} strokeLinejoin="round" />
      </svg>
    </div>
  );
};
