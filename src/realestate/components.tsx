import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, TOTAL, LAYOUT, shadow} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';

/** #F8F9FA stage with a very faint drifting geometric grid and soft light */
export const Stage: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const a = f / TOTAL;
  return (
    <AbsoluteFill style={{background: C.bg, overflow: 'hidden', fontFamily: F.ar, fontSynthesis: 'none'}}>
      <div style={{position: 'absolute', width: 1300, height: 1300, right: -520 + 160 * Math.sin(a * 5), top: -420 + 120 * Math.cos(a * 4), borderRadius: 1300, background: 'radial-gradient(circle, rgba(30,107,255,0.09) 0%, rgba(30,107,255,0) 62%)'}} />
      <div style={{position: 'absolute', width: 1200, height: 1200, left: -560 + 140 * Math.cos(a * 6), bottom: -380 + 120 * Math.sin(a * 5), borderRadius: 1200, background: 'radial-gradient(circle, rgba(30,107,255,0.06) 0%, rgba(30,107,255,0) 62%)'}} />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px), linear-gradient(rgba(27,31,36,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(27,31,36,0.025) 1px, transparent 1px)`,
          backgroundSize: '180px 180px, 180px 180px, 36px 36px, 36px 36px',
          backgroundPosition: `${-f * 0.25}px ${-f * 0.4}px`,
          WebkitMaskImage: 'radial-gradient(90% 75% at 50% 45%, #000 25%, rgba(0,0,0,0.25) 100%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/** The attached logo, untouched, in an elegant circular frame (top-right, whole video) */
export const LogoBadge: React.FC<{size?: number}> = ({size = 168}) => {
  const f = useCurrentFrame();
  const shine = interpolate(f % 240, [0, 60], [-1, 2], clamp);
  return (
    <div style={{position: 'absolute', top: 92, right: 56, width: size, height: size, borderRadius: size, padding: 6, background: 'linear-gradient(145deg, #FFFFFF, #E9EEF6)', boxShadow: '0 22px 44px -16px rgba(27,31,36,0.35), 0 0 0 1.5px rgba(30,107,255,0.28)', zIndex: 50}}>
      <div style={{width: '100%', height: '100%', borderRadius: size, overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 0 0 1px rgba(27,31,36,0.06)'}}>
        <Img src={staticFile('img/ea-amine-logo.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(115deg, transparent ${shine * 100 - 20}%, rgba(255,255,255,0.45) ${shine * 100}%, transparent ${shine * 100 + 20}%)`}} />
      </div>
    </div>
  );
};

/** Scene wrapper: soft zoom-through dissolve in/out plus a slow camera push */
export const Shot: React.FC<{duration: number; children: React.ReactNode; push?: number; inF?: number; outF?: number}> = ({duration, children, push = 0.035, inF = 14, outF = 12}) => {
  const f = useCurrentFrame();
  const i = inF === 0 ? 1 : prog(f, 0, inF, ease.out);
  const o = outF === 0 ? 0 : prog(f, duration - outF, duration, ease.in);
  const cam = interpolate(f, [0, duration], [1, 1 + push], clamp);
  const s = (0.94 + 0.06 * i) * cam * (1 + o * 0.08);
  const blur = (1 - i) * 10 + o * 12;
  return (
    <AbsoluteFill style={{opacity: Math.min(i, 1 - o), transform: `scale(${s})`, filter: blur > 0.2 ? `blur(${blur}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};

const bare = (w: string) => w.replace(/[.,،!؟?«»]/g, '');

/** Arabic RTL words with a staggered blur-rise reveal */
export const Words: React.FC<{text: string; size: number; color?: string; hi?: readonly string[]; hiColor?: string; delay?: number; stagger?: number; lh?: number; style?: React.CSSProperties}> = ({text, size, color = C.ink, hi = [], hiColor = C.blue, delay = 0, stagger = 2.4, lh = 1.4, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const H = hi.map(bare);
  return (
    <div dir="rtl" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: size * 0.26, fontFamily: F.ar, fontSize: size, lineHeight: lh, color, textAlign: 'center', ...style}}>
      {text.split(' ').map((w, k) => {
        const p = sp(f, fps, delay + k * stagger, springs.smooth);
        return (
          <span key={k} style={{display: 'inline-block', color: H.includes(bare(w)) ? hiColor : undefined, opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * size * 0.55}px)`, filter: p < 0.97 ? `blur(${(1 - p) * 12}px)` : undefined}}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** Step header: "01 — title" + supporting line */
export const StepHeader: React.FC<{n: string; title: string; sub: string; size?: number}> = ({n, title, sub, size = 70}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, 4, springs.snappy);
  const line = prog(f, 8, 26);
  return (
    <div style={{position: 'absolute', top: LAYOUT.headerTop, left: 40, right: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
      <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 22, fontSize: size, lineHeight: 1.3, color: C.ink}}>
        <span style={{color: C.blue, fontSize: size * 1.05, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 40}px) scale(${0.7 + 0.3 * p})`, display: 'inline-block'}}>{n}</span>
        <span style={{width: 56 * line, height: 5, borderRadius: 4, background: C.blue, opacity: 0.85, display: 'inline-block'}} />
        <Words text={title} size={size} delay={8} stagger={2.6} />
      </div>
      <Words text={sub} size={44} color={C.muted} delay={20} stagger={2} />
    </div>
  );
};

/** White rounded UI panel in the lower part of the frame */
export const Panel: React.FC<{children: React.ReactNode; top?: number; bottom?: number; delay?: number; style?: React.CSSProperties}> = ({children, top = LAYOUT.panelTop, bottom = LAYOUT.panelBottom, delay = 0, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, delay, springs.gentle);
  return (
    <div style={{position: 'absolute', top, left: LAYOUT.side, right: LAYOUT.side, height: bottom - top, borderRadius: 40, background: C.white, boxShadow: shadow.card, overflow: 'hidden', transform: `translateY(${(1 - p) * 140}px)`, opacity: Math.min(1, p * 1.4), ...style}}>
      {children}
    </div>
  );
};

/** Real-estate photo with a slow Ken-Burns drift */
export const Photo: React.FC<{name: string; style?: React.CSSProperties; zoom?: [number, number]; dx?: number; dy?: number; dur?: number; pos?: string}> = ({name, style, zoom = [1.06, 1.16], dx = 0, dy = 0, dur = 150, pos = 'center'}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, dur], [0, 1], clamp);
  const z = zoom[0] + (zoom[1] - zoom[0]) * t;
  return (
    <div style={{position: 'relative', overflow: 'hidden', ...style}}>
      <Img src={staticFile(`img/re/${name}.jpg`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${z}) translate(${dx * t}px, ${dy * t}px)`}} />
    </div>
  );
};

type IconName = 'pin' | 'bed' | 'bath' | 'area' | 'car' | 'search' | 'check' | 'shield' | 'menu' | 'chev' | 'heart' | 'eye' | 'mail' | 'trend' | 'phone' | 'back' | 'home' | 'mic' | 'up' | 'bolt' | 'grid' | 'calendar';
const paths: Record<IconName, React.ReactNode> = {
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.6" /></>,
  bed: <><path d="M3 19v-7.5A1.5 1.5 0 0 1 4.5 10h15a1.5 1.5 0 0 1 1.5 1.5V19" /><path d="M3 15.5h18" /><path d="M6 10V7.5A1.5 1.5 0 0 1 7.5 6h3A1.5 1.5 0 0 1 12 7.5V10" /></>,
  bath: <><path d="M3.5 12h17v1.5A5.5 5.5 0 0 1 15 19H9a5.5 5.5 0 0 1-5.5-5.5V12z" /><path d="M6 12V6.5a2.5 2.5 0 0 1 5 0" /><path d="M7.5 19l-1 2M16.5 19l1 2" /></>,
  area: <><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M8 3.5v3M12 3.5v4.5M16 3.5v3M3.5 8h3M3.5 12h4.5M3.5 16h3" /></>,
  car: <><path d="M5 16.5l1.6-5.2A2 2 0 0 1 8.5 9.9h7a2 2 0 0 1 1.9 1.4l1.6 5.2" /><rect x="3.5" y="16" width="17" height="3.5" rx="1.2" /><path d="M7 19.5v1.5M17 19.5v1.5" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  shield: <><path d="M12 3l7.5 3v5.5c0 4.8-3.3 8.1-7.5 9.5-4.2-1.4-7.5-4.7-7.5-9.5V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chev: <path d="M7 10l5 5 5-5" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
  trend: <><path d="M3.5 17l5.5-5.5 4 4 7.5-7.5" /><path d="M15 8h5.5v5.5" /></>,
  phone: <path d="M6.6 3.5h2.6l1.6 4.2-2 1.4a11 11 0 0 0 5.9 5.9l1.4-2 4.2 1.6v2.6a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.6 5.5a2 2 0 0 1 2-2z" />,
  back: <path d="M9 5l7 7-7 7" />,
  home: <><path d="M3.5 11L12 4l8.5 7" /><path d="M5.5 9.5V20h13V9.5" /><path d="M10 20v-5h4v5" /></>,
  mic: <><rect x="9" y="3.5" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5" /></>,
  up: <path d="M12 19V5M6 11l6-6 6 6" />,
  bolt: <path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" />,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
};
export const Icon: React.FC<{name: IconName; size?: number; color?: string; sw?: number; style?: React.CSSProperties}> = ({name, size = 32, color = C.ink, sw = 1.9, style}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0, ...style}}>
    {paths[name]}
  </svg>
);

export const WaIcon: React.FC<{size?: number; color?: string}> = ({size = 40, color = '#fff'}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{flexShrink: 0}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export const Star: React.FC<{size?: number; fill?: number}> = ({size = 30, fill = 1}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{flexShrink: 0, transform: `scale(${0.4 + 0.6 * fill})`, opacity: Math.min(1, fill * 1.5)}}>
    <polygon points="12 2.5 14.9 8.6 21.5 9.3 16.5 13.8 18 20.3 12 16.9 6 20.3 7.5 13.8 2.5 9.3 9.1 8.6" fill={C.star} />
  </svg>
);

/** Mouse pointer with click ripple. x/y are local coordinates of the tip */
export const Cursor: React.FC<{x: number; y: number; press?: number; ripple?: number; opacity?: number}> = ({x, y, press = 0, ripple = -1, opacity = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 0, height: 0, zIndex: 40, opacity}}>
    {ripple >= 0 && ripple <= 1 ? <div style={{position: 'absolute', left: -60 * (0.3 + ripple), top: -60 * (0.3 + ripple), width: 120 * (0.3 + ripple), height: 120 * (0.3 + ripple), borderRadius: 999, border: `4px solid ${C.blue}`, opacity: 1 - ripple}} /> : null}
    <svg width={64} height={64} viewBox="0 0 24 24" style={{position: 'absolute', left: -6, top: -4, transform: `scale(${1 - press * 0.15})`, transformOrigin: '6px 4px', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.3))'}}>
      <path d="M5.5 3.2l13 11.6-6 .6 3.6 6.3-2.6 1.4-3.5-6.4-4.5 4z" fill="#111" stroke="#fff" strokeWidth={1.4} strokeLinejoin="round" />
    </svg>
  </div>
);

/** px offset helper for parallax */
export const drift = (f: number, dur: number, amount: number) => interpolate(f, [0, dur], [amount / 2, -amount / 2], clamp);

export const Num: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <span dir="ltr" style={{unicodeBidi: 'isolate', display: 'inline-block', ...style}}>{children}</span>
);

/** "450 م²" with the 2 drawn as a raised digit (font has no ²) */
export const Sqm: React.FC<{v: string; unit: string; size: number}> = ({v, unit, size}) => (
  <span dir="rtl" style={{display: 'inline-flex', alignItems: 'baseline', gap: size * 0.2}}>
    <span>{v}</span>
    <span>
      {unit}
      <span style={{fontSize: size * 0.55, position: 'relative', top: -size * 0.45}}>2</span>
    </span>
  </span>
);

export const fmtInt = (n: number) => Math.round(n).toLocaleString('en-US');
