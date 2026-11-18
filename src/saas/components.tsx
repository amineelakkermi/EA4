import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, TOTAL, shadow} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';

/** Off-white stage, thin drifting grid, soft blue/purple light; `alarm` (0..1) tints the light red */
export const Stage: React.FC<{children?: React.ReactNode; alarm?: number}> = ({children, alarm = 0}) => {
  const f = useCurrentFrame();
  const a = f / TOTAL;
  return (
    <AbsoluteFill style={{background: C.bg, overflow: 'hidden', fontFamily: F.ar, fontSynthesis: 'none'}}>
      <div style={{position: 'absolute', width: 1300, height: 1300, right: -560 + 160 * Math.sin(a * 5), top: -460 + 120 * Math.cos(a * 4), borderRadius: 1300, background: 'radial-gradient(circle, rgba(31,91,255,0.10) 0%, rgba(31,91,255,0) 62%)'}} />
      <div style={{position: 'absolute', width: 1250, height: 1250, left: -600 + 140 * Math.cos(a * 6), bottom: -420 + 120 * Math.sin(a * 5), borderRadius: 1250, background: 'radial-gradient(circle, rgba(22,166,232,0.09) 0%, rgba(22,166,232,0) 62%)'}} />
      <div style={{position: 'absolute', width: 1400, height: 1400, left: -160, top: 300, borderRadius: 1400, opacity: alarm, background: 'radial-gradient(circle, rgba(224,71,63,0.07) 0%, rgba(224,71,63,0) 60%)'}} />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px), linear-gradient(rgba(17,26,51,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(17,26,51,0.022) 1px, transparent 1px)`,
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

export type IconName = 'lock' | 'unlock' | 'shield' | 'alert' | 'user' | 'users' | 'key' | 'db' | 'refresh' | 'check' | 'plug' | 'cloud' | 'eye' | 'x' | 'crown' | 'clock' | 'grid' | 'bell' | 'chart' | 'restore' | 'layout' | 'server' | 'api' | 'card' | 'building' | 'sparkle' | 'flask' | 'doc' | 'webhook' | 'layers' | 'trash' | 'edit' | 'globe';
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
  layout: <><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><path d="M3.5 9h17M9 9v10.5" /></>,
  server: <><rect x="4" y="4" width="16" height="7" rx="2" /><rect x="4" y="13" width="16" height="7" rx="2" /><path d="M8 7.5h.01M8 16.5h.01M12 7.5h4M12 16.5h4" /></>,
  api: <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /><path d="M13.5 5l-3 14" /></>,
  card: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3 10h18M7 15h3" /></>,
  building: <><rect x="5" y="3.5" width="14" height="17" rx="1.5" /><path d="M9 7.5h.01M15 7.5h.01M9 11.5h.01M15 11.5h.01M9 15.5h.01M15 15.5h.01M10.5 20.5v-3h3v3" /></>,
  sparkle: <><path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9z" /><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" /></>,
  flask: <><path d="M9.5 3.5h5M10.5 3.5v5.5L5 18.5a1.5 1.5 0 0 0 1.3 2.2h11.4a1.5 1.5 0 0 0 1.3-2.2L13.5 9V3.5" /><path d="M7.5 14.5h9" /></>,
  doc: <><path d="M6.5 3.5h7.5l4 4v12a1 1 0 0 1-1 1h-10.5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1z" /><path d="M14 3.5v4h4M9 12h6M9 15.5h6" /></>,
  webhook: <><circle cx="12" cy="6.5" r="2.5" /><circle cx="6" cy="17" r="2.5" /><circle cx="18" cy="17" r="2.5" /><path d="M10.8 8.7L7.3 14.8M13.2 8.7l3.5 6.1M8.5 17h7" /></>,
  layers: <><path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8z" /><path d="M3.5 12l8.5 4.5 8.5-4.5" /><path d="M3.5 16l8.5 4.5 8.5-4.5" /></>,
  trash: <><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" /></>,
  edit: <><path d="M4.5 19.5l1-4.5L16 4.5l3.5 3.5L9 18.5z" /><path d="M13.5 7l3.5 3.5" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.3 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.3-3.5-8.5s1-6 3.5-8.5z" /></>,
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

/** Digit string kept LTR inside RTL text */
export const Num: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <span dir="ltr" style={{unicodeBidi: 'isolate', display: 'inline-block', ...style}}>{children}</span>
);

/** Latin technical term (Alexandria) kept LTR inside RTL layouts */
export const Lat: React.FC<{children: React.ReactNode; size?: number; color?: string; weight?: number; style?: React.CSSProperties}> = ({children, size = 30, color = C.ink, weight = 500, style}) => (
  <span dir="ltr" style={{fontFamily: F.lat, fontSize: size, fontWeight: weight, color, letterSpacing: '-0.01em', unicodeBidi: 'isolate', whiteSpace: 'nowrap', lineHeight: 1.25, ...style}}>{children}</span>
);

/** Browser window chrome with a URL and content */
export const Browser: React.FC<{url: string; children: React.ReactNode; style?: React.CSSProperties; bar?: number}> = ({url, children, style, bar = 72}) => (
  <div style={{position: 'absolute', borderRadius: 32, background: C.white, boxShadow: shadow.card, overflow: 'hidden', ...style}}>
    <div dir="ltr" style={{height: bar, background: C.surface, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px'}}>
      <div style={{display: 'flex', gap: 10}}>
        {[0, 1, 2].map((i) => <div key={i} style={{width: 15, height: 15, borderRadius: 15, background: '#E2E5EC'}} />)}
      </div>
      <div style={{flex: 1, height: bar * 0.58, borderRadius: 40, background: C.white, border: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px'}}>
        <Icon name="lock" size={bar * 0.3} color={C.green} sw={2.3} />
        <Lat size={bar * 0.3} color={C.muted} weight={400}>{url}</Lat>
      </div>
    </div>
    <div style={{position: 'relative', height: `calc(100% - ${bar}px)`}}>{children}</div>
  </div>
);

/** position along a polyline at progress t (0..1) */
export const along = (pts: Array<[number, number]>, t: number): [number, number] => {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = seg.reduce((a, b) => a + b, 0);
  let d = Math.max(0, Math.min(1, t)) * total;
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const k = seg[i] === 0 ? 0 : Math.min(1, d / seg[i]);
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
    }
    d -= seg[i];
  }
  return pts[pts.length - 1];
};

/** Connector drawn in (draw 0..1), then a slow dash flow; place inside a full-frame <svg> */
export const Wire: React.FC<{pts: Array<[number, number]>; draw: number; color?: string; w?: number; flow?: boolean; arrow?: boolean; opacity?: number}> = ({pts, draw, color = C.dim, w = 3, flow = true, arrow = true, opacity = 1}) => {
  const f = useCurrentFrame();
  if (draw <= 0) return null;
  const len = pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  const d = 'M' + pts.map((p) => p.join(' ')).join(' L');
  const end = along(pts, draw);
  const prev = along(pts, Math.max(0, draw - 0.01));
  const ang = draw > 0.01 ? Math.atan2(end[1] - prev[1], end[0] - prev[0]) : Math.atan2(pts[1][1] - pts[0][1], pts[1][0] - pts[0][0]);
  const fl = Math.max(0, (draw - 0.9) * 10);
  return (
    <g opacity={opacity}>
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeOpacity={0.3} strokeDasharray={`${len} ${len}`} strokeDashoffset={len * (1 - draw)} strokeLinecap="round" />
      {flow && fl > 0 ? <path d={d} fill="none" stroke={color} strokeWidth={w} strokeDasharray="8 16" strokeDashoffset={-f * 1.4} strokeLinecap="round" opacity={fl} /> : null}
      {arrow ? <path d="M-10 -8 L2 0 L-10 8" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" transform={`translate(${end[0]} ${end[1]}) rotate(${(ang * 180) / Math.PI})`} /> : null}
    </g>
  );
};

/** full-frame SVG overlay */
export const Svg: React.FC<{children: React.ReactNode; z?: number}> = ({children, z = 1}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0, zIndex: z, overflow: 'visible', pointerEvents: 'none'}}>{children}</svg>
);

/** Data packet moving along a path; t 0..1, hidden outside (0,1] */
export const Packet: React.FC<{pts: Array<[number, number]>; t: number; color?: string; r?: number}> = ({pts, t, color = C.blue, r = 13}) => {
  if (t <= 0 || t >= 1.0001) return null;
  const [x, y] = along(pts, t);
  const [tx, ty] = along(pts, Math.max(0, t - 0.06));
  return (
    <g>
      <line x1={tx} y1={ty} x2={x} y2={y} stroke={color} strokeWidth={r * 0.9} strokeLinecap="round" strokeOpacity={0.25} />
      <circle cx={x} cy={y} r={r * 2.1} fill={color} fillOpacity={0.14} />
      <circle cx={x} cy={y} r={r} fill={color} />
      <circle cx={x} cy={y} r={r * 0.42} fill="#fff" />
    </g>
  );
};

/** Animated check / cross glyph (drawn in SVG; the font lacks ✓ ✗) */
export const Mark: React.FC<{ok: boolean; size?: number; p?: number; color?: string}> = ({ok, size = 34, p = 1, color}) => {
  const col = color ?? (ok ? C.green : C.red);
  return (
    <div style={{width: size, height: size, borderRadius: size, background: ok ? C.greenSoft : C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${0.5 + 0.5 * p})`, opacity: Math.min(1, p * 1.5)}}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {ok ? <path d="M5 12.5l4.5 4.5L19 7" strokeDasharray="22" strokeDashoffset={22 * (1 - p)} /> : <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" strokeDasharray="32" strokeDashoffset={32 * (1 - p)} />}
      </svg>
    </div>
  );
};

/** Mouse cursor that glides between points and presses at `clickAt` */
export const Cursor: React.FC<{path: Array<[number, number, number]>; clickAt?: number[]}> = ({path, clickAt = []}) => {
  const f = useCurrentFrame();
  let x = path[0][1];
  let y = path[0][2];
  for (let i = 1; i < path.length; i++) {
    const [fa, xa, ya] = path[i - 1];
    const [fb, xb, yb] = path[i];
    if (f >= fa) {
      const k = prog(f, fa, fb, ease.inOut);
      x = xa + (xb - xa) * k;
      y = ya + (yb - ya) * k;
    }
  }
  const press = clickAt.reduce((m, c) => Math.max(m, f >= c && f < c + 8 ? 1 - Math.abs(f - c - 3) / 5 : 0), 0);
  const ring = clickAt.reduce((m, c) => (f >= c && f < c + 16 ? (f - c) / 16 : m), -1);
  const vis = prog(f, path[0][0] - 6, path[0][0]);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 0, height: 0, opacity: vis, zIndex: 50}}>
      {ring >= 0 ? <div style={{position: 'absolute', left: -30 - ring * 20, top: -30 - ring * 20, width: 60 + ring * 40, height: 60 + ring * 40, borderRadius: 999, border: `3px solid ${C.blue}`, opacity: 1 - ring}} /> : null}
      <svg width={46} height={46} viewBox="0 0 24 24" style={{position: 'absolute', left: -6, top: -4, transform: `scale(${1 - press * 0.15})`, filter: 'drop-shadow(0 6px 8px rgba(17,26,51,0.3))'}}>
        <path d="M5 3l13 7.5-5.8 1.5L9.5 18z" fill={C.navy} stroke="#fff" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    </div>
  );
};

/** Short rounded tag with optional icon; Latin by default */
export const Tag: React.FC<{text: string; color: string; bg: string; icon?: IconName; size?: number; ar?: boolean; style?: React.CSSProperties}> = ({text, color, bg, icon, size = 24, ar = false, style}) => (
  <span dir={ar ? 'rtl' : 'ltr'} style={{display: 'inline-flex', alignItems: 'center', gap: size * 0.4, padding: `${size * 0.25}px ${size * 0.65}px`, borderRadius: 999, background: bg, color, fontFamily: ar ? F.ar : F.lat, fontWeight: ar ? undefined : 500, fontSize: size, lineHeight: 1.3, whiteSpace: 'nowrap', ...style}}>
    {icon ? <Icon name={icon} size={size * 1.1} color={color} sw={2.3} /> : null}
    {text}
  </span>
);
