import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, TOTAL, GRAD, shadow} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';

/** Off-white stage, thin drifting grid, soft blue/purple light; `alarm` (0..1) tints the light red */
export const Stage: React.FC<{children?: React.ReactNode; alarm?: number}> = ({children, alarm = 0}) => {
  const f = useCurrentFrame();
  const a = f / TOTAL;
  return (
    <AbsoluteFill style={{background: C.bg, overflow: 'hidden', fontFamily: F.ar, fontSynthesis: 'none'}}>
      <div style={{position: 'absolute', width: 1300, height: 1300, right: -560 + 160 * Math.sin(a * 5), top: -460 + 120 * Math.cos(a * 4), borderRadius: 1300, background: 'radial-gradient(circle, rgba(51,85,255,0.10) 0%, rgba(51,85,255,0) 62%)'}} />
      <div style={{position: 'absolute', width: 1250, height: 1250, left: -600 + 140 * Math.cos(a * 6), bottom: -420 + 120 * Math.sin(a * 5), borderRadius: 1250, background: 'radial-gradient(circle, rgba(123,77,255,0.09) 0%, rgba(123,77,255,0) 62%)'}} />
      <div style={{position: 'absolute', width: 1400, height: 1400, left: -160, top: 300, borderRadius: 1400, opacity: alarm, background: 'radial-gradient(circle, rgba(224,71,63,0.07) 0%, rgba(224,71,63,0) 60%)'}} />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px), linear-gradient(rgba(14,22,48,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(14,22,48,0.022) 1px, transparent 1px)`,
          backgroundSize: '180px 180px, 180px 180px, 36px 36px, 36px 36px',
          backgroundPosition: `${-f * 0.25}px ${-f * 0.4}px`,
          WebkitMaskImage: 'radial-gradient(90% 75% at 50% 45%, #000 25%, rgba(0,0,0,0.25) 100%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/** Scene wrapper: soft blur dissolve in/out plus a slow camera push */
export const Shot: React.FC<{duration: number; children: React.ReactNode; push?: number; inF?: number; outF?: number}> = ({duration, children, push = 0.03, inF = 14, outF = 12}) => {
  const f = useCurrentFrame();
  const i = inF === 0 ? 1 : prog(f, 0, inF, ease.out);
  const o = outF === 0 ? 0 : prog(f, duration - outF, duration, ease.in);
  const cam = interpolate(f, [0, duration], [1, 1 + push], clamp);
  const s = (0.95 + 0.05 * i) * cam * (1 + o * 0.06);
  const blur = (1 - i) * 10 + o * 12;
  return (
    <AbsoluteFill style={{opacity: Math.min(i, 1 - o), transform: `scale(${s})`, filter: blur > 0.2 ? `blur(${blur}px)` : undefined}}>
      {children}
    </AbsoluteFill>
  );
};

const bare = (w: string) => w.replace(/[.,،!؟?«»]/g, '');

/** Arabic RTL words with a staggered blur-rise reveal; "\n" forces a line break */
export const Words: React.FC<{text: string; size: number; color?: string; hi?: readonly string[]; hiColor?: string; delay?: number; stagger?: number; lh?: number; style?: React.CSSProperties}> = ({text, size, color = C.ink, hi = [], hiColor = C.blue, delay = 0, stagger = 2.4, lh = 1.4, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const H = hi.map(bare);
  let k = 0;
  return (
    <div dir="rtl" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: F.ar, fontSize: size, lineHeight: lh, color, textAlign: 'center', ...style}}>
      {text.split('\n').map((line, li) => (
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: size * 0.26}}>
          {line.split(' ').map((w) => {
            const p = sp(f, fps, delay + k++ * stagger, springs.smooth);
            return (
              <span key={k} style={{display: 'inline-block', color: H.includes(bare(w)) ? hiColor : undefined, opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * size * 0.5}px)`, filter: p < 0.97 ? `blur(${(1 - p) * 12}px)` : undefined}}>
                {w}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** "01 — title" + the scene's on-screen sentence */
export const StepHeader: React.FC<{n: string; title: string; sub: string; subAt?: number; hi?: readonly string[]; top?: number; size?: number}> = ({n, title, sub, subAt = 24, hi = [], top = 250, size = 76}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, 3, springs.snappy);
  const line = prog(f, 8, 26);
  return (
    <div style={{position: 'absolute', top, left: 50, right: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
      <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 24, fontSize: size, lineHeight: 1.3, color: C.navy}}>
        <span dir="ltr" style={{fontSize: size * 1.05, background: GRAD, WebkitBackgroundClip: 'text', color: 'transparent', opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 40}px) scale(${0.7 + 0.3 * p})`, display: 'inline-block'}}>{n}</span>
        <span style={{fontSize: size, color: C.dim, opacity: line, transform: `scaleX(${line})`, display: 'inline-block'}}>—</span>
        <Words text={title} size={size} color={C.navy} delay={8} stagger={2.6} />
      </div>
      <Words text={sub} size={46} color={C.ink2} hi={hi} hiColor={C.red} delay={subAt} stagger={2} lh={1.5} />
    </div>
  );
};

/** White rounded UI card that rises in */
export const Card: React.FC<{children: React.ReactNode; delay?: number; style?: React.CSSProperties; radius?: number}> = ({children, delay = 0, style, radius = 40}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, delay, springs.gentle);
  return (
    <div style={{position: 'absolute', borderRadius: radius, background: C.white, boxShadow: shadow.card, overflow: 'hidden', transform: `translateY(${(1 - p) * 120}px)`, opacity: Math.min(1, p * 1.4), ...style}}>
      {children}
    </div>
  );
};

/** Grey skeleton bar for placeholder copy */
export const Bar: React.FC<{w: number | string; h?: number; color?: string; style?: React.CSSProperties}> = ({w, h = 18, color = C.soft, style}) => (
  <div style={{width: w, height: h, borderRadius: h, background: color, flexShrink: 0, ...style}} />
);

export type IconName = 'lock' | 'unlock' | 'shield' | 'alert' | 'user' | 'users' | 'key' | 'db' | 'refresh' | 'check' | 'plug' | 'cloud' | 'eye' | 'x' | 'crown' | 'clock' | 'grid' | 'bell' | 'chart' | 'restore';
const paths: Record<IconName, React.ReactNode> = {
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /><path d="M12 14.5v2.5" /></>,
  unlock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7" /><path d="M12 14.5v2.5" /></>,
  shield: <><path d="M12 3l7.5 3v5.5c0 4.8-3.3 8.1-7.5 9.5-4.2-1.4-7.5-4.7-7.5-9.5V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  alert: <><path d="M12 3.8L21.2 19.5H2.8z" /><path d="M12 10v4.2M12 17h.01" /></>,
  user: <><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /></>,
  users: <><circle cx="9" cy="8.5" r="3.4" /><path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" /><path d="M15.5 5.4a3.4 3.4 0 0 1 0 6.4M17.5 14.2a6.2 6.2 0 0 1 3.7 5.8" /></>,
  key: <><circle cx="8" cy="15" r="4.2" /><path d="M11 12l8.5-8.5M16.5 6.5l2.5 2.5M14 9l2 2" /></>,
  db: <><ellipse cx="12" cy="5.8" rx="7.5" ry="2.8" /><path d="M4.5 5.8v12.4c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V5.8" /><path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" /></>,
  refresh: <><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" /><path d="M19.5 4v4.5H15" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  plug: <><path d="M9 3.5v4M15 3.5v4" /><path d="M6.5 7.5h11v3a5.5 5.5 0 0 1-11 0z" /><path d="M12 16v4.5" /></>,
  cloud: <path d="M7.5 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.4 1.6 3.8 3.8 0 0 1-.8 7.4z" />,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  crown: <><path d="M3.5 8l4.5 4 4-6.5 4 6.5 4.5-4-1.8 10H5.3z" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
  bell: <><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></>,
  chart: <><path d="M4 20h16" /><path d="M7 16v-4M11.5 16V8M16 16v-6" /></>,
  restore: <><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" /><path d="M4.5 4v4.5H9" /><path d="M12 8.5V12l2.5 1.5" /></>,
};
export const Icon: React.FC<{name: IconName; size?: number; color?: string; sw?: number; style?: React.CSSProperties}> = ({name, size = 32, color = C.ink, sw = 1.9, style}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0, ...style}}>
    {paths[name]}
  </svg>
);

/** Round tinted icon badge */
export const IconBadge: React.FC<{name: IconName; color: string; bg: string; size?: number; style?: React.CSSProperties}> = ({name, color, bg, size = 84, style}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ...style}}>
    <Icon name={name} size={size * 0.52} color={color} sw={2.1} />
  </div>
);

/** Small status pill (e.g. warning / ok) */
export const Pill: React.FC<{text: string; color: string; bg: string; icon?: IconName; size?: number; style?: React.CSSProperties}> = ({text, color, bg, icon, size = 28, style}) => (
  <span dir="rtl" style={{display: 'inline-flex', alignItems: 'center', gap: size * 0.35, padding: `${size * 0.22}px ${size * 0.7}px`, borderRadius: 999, background: bg, color, fontSize: size, lineHeight: 1.35, whiteSpace: 'nowrap', ...style}}>
    {icon ? <Icon name={icon} size={size * 1.05} color={color} sw={2.3} /> : null}
    {text}
  </span>
);

/** Floating alert toast that slides in with a short glitch jitter */
export const Alert: React.FC<{title: string; body?: string; at: number; tone?: 'red' | 'green' | 'blue'; style?: React.CSSProperties; glitch?: boolean}> = ({title, body, at, tone = 'red', style, glitch = true}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, at, springs.snappy);
  const col = tone === 'red' ? C.red : tone === 'green' ? C.green : C.blue;
  const bg = tone === 'red' ? C.redSoft : tone === 'green' ? C.greenSoft : C.blueSoft;
  const t = f - at;
  const jit = glitch && t > 2 && t < 12 ? (Math.sin(t * 9.1) * 7 * (1 - t / 12)) : 0;
  const ghost = glitch && t > 2 && t < 10 ? 0.5 * (1 - t / 10) : 0;
  return (
    <div dir="rtl" style={{position: 'absolute', display: 'flex', alignItems: 'center', gap: 24, padding: '26px 30px', borderRadius: 30, background: 'rgba(255,255,255,0.97)', boxShadow: tone === 'red' ? shadow.red : shadow.soft, border: `2px solid ${tone === 'red' ? 'rgba(224,71,63,0.25)' : 'rgba(14,22,48,0.05)'}`, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 60}px) translateX(${jit}px) scale(${0.92 + 0.08 * p})`, ...style}}>
      {ghost > 0 ? <div style={{position: 'absolute', inset: 0, borderRadius: 30, boxShadow: `${-8 * ghost * 2}px 0 0 rgba(51,85,255,${ghost * 0.5}), ${8 * ghost * 2}px 0 0 rgba(224,71,63,${ghost * 0.6})`}} /> : null}
      <IconBadge name={tone === 'red' ? 'alert' : tone === 'green' ? 'shield' : 'refresh'} color={col} bg={bg} size={86} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <span style={{fontSize: 36, color: tone === 'red' ? C.red : C.navy, lineHeight: 1.3}}>{title}</span>
        {body ? <span style={{fontSize: 27, color: C.muted, lineHeight: 1.35}}>{body}</span> : null}
      </div>
    </div>
  );
};

/** Animated progress / strength meter, value 0..1, LTR fill drawn RTL */
export const Meter: React.FC<{v: number; color: string; h?: number; segments?: number}> = ({v, color, h = 16, segments = 4}) => (
  <div dir="rtl" style={{display: 'flex', gap: 10, width: '100%'}}>
    {Array.from({length: segments}, (_, i) => {
      const fill = Math.max(0, Math.min(1, v * segments - i));
      return (
        <div key={i} style={{flex: 1, height: h, borderRadius: h, background: C.soft, overflow: 'hidden', display: 'flex', justifyContent: 'flex-start'}}>
          <div style={{width: `${fill * 100}%`, height: '100%', borderRadius: h, background: color}} />
        </div>
      );
    })}
  </div>
);

/** Digit string kept LTR inside RTL text */
export const Num: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <span dir="ltr" style={{unicodeBidi: 'isolate', display: 'inline-block', ...style}}>{children}</span>
);
