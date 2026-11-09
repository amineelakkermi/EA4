import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile} from 'remotion';
import {C, F, TOTAL} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';

/** Dark cinematic stage: two slow light orbs, dot grid, vignette and fine grain */
export const Backdrop: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const a = f / TOTAL;
  return (
    <AbsoluteFill style={{background: C.bg, overflow: 'hidden'}}>
      <div style={{position: 'absolute', width: 1200, height: 1200, left: -400 + 300 * Math.sin(a * 6), top: -300 + 200 * Math.cos(a * 5), borderRadius: 1200, background: 'radial-gradient(circle, rgba(141,190,225,0.30) 0%, rgba(141,190,225,0) 65%)'}} />
      <div style={{position: 'absolute', width: 1100, height: 1100, right: -450 + 250 * Math.cos(a * 4), bottom: -350 + 200 * Math.sin(a * 7), borderRadius: 1100, background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 65%)'}} />
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(255,255,255,0.09) 1.5px, transparent 1.5px)', backgroundSize: '44px 44px', backgroundPosition: `0 ${-f * 0.4}px`, WebkitMaskImage: 'radial-gradient(80% 60% at 50% 45%, #000 10%, transparent 100%)'}} />
      {children}
      <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.75) 100%)', pointerEvents: 'none'}} />
      <AbsoluteFill style={{opacity: 0.06, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
        <svg width="100%" height="100%"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 8} /></filter><rect width="100%" height="100%" filter="url(#g)" /></svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Scene shot: zoom-through in/out transitions + slow camera push */
export const Shot: React.FC<{duration: number; children: React.ReactNode; push?: number; noIn?: boolean; outF?: number}> = ({duration, children, push = 0.05, noIn, outF = 10}) => {
  const f = useCurrentFrame();
  const i = noIn ? 1 : prog(f, 0, 12, ease.out);
  const o = prog(f, duration - outF, duration, ease.in);
  const cam = interpolate(f, [0, duration], [1, 1 + push], clamp);
  const s = (noIn ? 1 : 0.86 + 0.14 * i) * cam * (1 + o * 0.3);
  const blur = (1 - i) * 16 + o * 18;
  return (
    <AbsoluteFill style={{opacity: Math.min(i, 1 - o), transform: `scale(${s})`, filter: blur > 0.2 ? `blur(${blur}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};

/** Arabic words, RTL, with blur-rise reveal */
export const Words: React.FC<{text: string; size: number; color?: string; hi?: readonly string[]; hiColor?: string; delay?: number; stagger?: number; animate?: boolean; lh?: number; style?: React.CSSProperties}> = ({text, size, color = C.ink, hi = [], hiColor = C.sky, delay = 0, stagger = 2.2, animate = true, lh = 1.35, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div dir="rtl" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: size * 0.26, fontFamily: F.ar, fontSize: size, lineHeight: lh, color, textAlign: 'center', ...style}}>
      {text.split(' ').map((w, k) => {
        const p = animate ? sp(f, fps, delay + k * stagger, springs.smooth) : 1;
        return (
          <span key={k} style={{display: 'inline-block', color: hi.includes(w) ? hiColor : undefined, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * size * 0.5}px)`, filter: p < 0.98 ? `blur(${(1 - p) * 10}px)` : undefined}}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const Mark: React.FC<{size: number; color?: 'white' | 'black'; style?: React.CSSProperties}> = ({size, color = 'white', style}) => (
  <Img src={staticFile('img/devin-mark.svg')} style={{width: size, height: size, filter: color === 'white' ? 'invert(1)' : undefined, ...style}} />
);

export const Check: React.FC<{size?: number; p?: number; bg?: string}> = ({size = 40, p = 1, bg = C.green}) => (
  <div style={{width: size, height: size, borderRadius: size, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`, flexShrink: 0}}>
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
  </div>
);

export const Cross: React.FC<{size?: number; p?: number}> = ({size = 40, p = 1}) => (
  <div style={{width: size, height: size, borderRadius: size, background: 'rgba(255,84,78,0.15)', border: `2px solid ${C.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`, flexShrink: 0}}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth={3.2} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
  </div>
);

export const Spinner: React.FC<{size?: number; color?: string}> = ({size = 28, color = C.uiMuted}) => {
  const f = useCurrentFrame();
  return <div style={{width: size, height: size, borderRadius: size, border: `3px solid ${color}33`, borderTopColor: color, transform: `rotate(${f * 14}deg)`}} />;
};

/** Step label: numbered pill + Arabic title */
export const Step: React.FC<{n: number; text: string; top?: number}> = ({n, text, top = 250}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, 2, springs.bouncy);
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
      <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 22, padding: '14px 34px 14px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.line}`, backdropFilter: 'blur(10px)', transform: `scale(${0.8 + 0.2 * p})`, opacity: Math.min(1, p * 1.6)}}>
        <div style={{width: 64, height: 64, borderRadius: 64, background: C.sky, color: C.bg, fontFamily: F.lat, fontWeight: 600, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
        <span style={{fontFamily: F.ar, fontSize: 54, color: C.ink}}>{text}</span>
      </div>
    </div>
  );
};

/** Light, Devin-style app window */
export const AppWindow: React.FC<{children: React.ReactNode; title?: string; style?: React.CSSProperties}> = ({children, title = 'New session', style}) => (
  <div style={{position: 'absolute', left: 40, right: 40, borderRadius: 30, background: C.uiBg, overflow: 'hidden', boxShadow: '0 60px 120px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.12), 0 0 80px rgba(141,190,225,0.15)', fontFamily: F.lat, color: C.uiInk, ...style}}>
    <div style={{height: 76, display: 'flex', alignItems: 'center', gap: 16, padding: '0 30px', borderBottom: `1px solid ${C.uiLine}`}}>
      <Mark size={34} color="black" />
      <span style={{fontSize: 30, fontWeight: 500}}>Devin</span>
      <span style={{fontSize: 24, color: C.uiMuted, marginLeft: 18}}>{title}</span>
    </div>
    {children}
  </div>
);

export const typed = (text: string, f: number, start: number, cps: number) => text.slice(0, Math.max(0, Math.floor(((f - start) / 30) * cps)));
