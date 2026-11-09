import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {palette, font, TOTAL, W, LAYOUT, shadow} from './config';
import {COPY} from './copy';
import {sp, springs, clamp, ease, prog} from '../anim';

const S = COPY.site;

export const Stage: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, TOTAL], [0, 60]);
  return (
    <AbsoluteFill style={{backgroundColor: palette.bg, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: 'radial-gradient(120% 70% at 50% 10%, #FFFFFF 0%, rgba(255,255,255,0) 60%)'}} />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${palette.grid} 1px, transparent 1px), linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          backgroundPosition: `${shift}px ${shift * 0.6}px`,
          WebkitMaskImage: 'radial-gradient(95% 80% at 50% 40%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.1) 100%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/** Scene wrapper: quick fade/drift in and out */
export const Fade: React.FC<{duration: number; inF?: number; outF?: number; children: React.ReactNode}> = ({duration, inF = 6, outF = 8, children}) => {
  const frame = useCurrentFrame();
  const a = inF === 0 ? 1 : interpolate(frame, [0, inF], [0, 1], {...clamp, easing: ease.out});
  const b = interpolate(frame, [duration - outF, duration], [1, 0], {...clamp, easing: ease.in});
  return <AbsoluteFill style={{opacity: Math.min(a, b), transform: `translateY(${(1 - a) * 24 - (1 - b) * 24}px)`}}>{children}</AbsoluteFill>;
};

const bare = (w: string) => w.replace(/[.,;:!?…«»\u202F]/g, '');

/** Line of words (split on normal spaces only, so NNBSP keeps French punctuation attached). */
export const Words: React.FC<{
  text: string;
  size: number;
  weight?: number;
  color?: string;
  hi?: readonly string[];
  accent?: string;
  delay?: number;
  stagger?: number;
  animate?: boolean;
  lineHeight?: number;
  style?: React.CSSProperties;
}> = ({text, size, weight = 700, color = palette.navy, hi = [], accent = palette.blue, delay = 0, stagger = 2, animate = true, lineHeight = 1.18, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const hiSet = hi.map(bare);
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: size * 0.27, fontFamily: font.family, fontSize: size, fontWeight: weight, lineHeight, color, letterSpacing: '-0.015em', textAlign: 'center', ...style}}>
      {text.split(' ').map((w, i) => {
        const p = animate ? sp(frame, fps, delay + i * stagger, springs.snappy) : 1;
        return (
          <span key={i} style={{display: 'inline-block', color: hiSet.includes(bare(w)) ? accent : undefined, transform: `translateY(${(1 - p) * size * 0.45}px)`, opacity: Math.min(1, p * 1.7)}}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const Pill: React.FC<{text: string; bg?: string; color?: string; size?: number; delay?: number; style?: React.CSSProperties}> = ({text, bg = palette.navy, color = '#fff', size = 34, delay = 0, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = delay < 0 ? 1 : sp(frame, fps, delay, springs.bouncy);
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: font.family, fontWeight: 600, fontSize: size, color, background: bg, padding: `${size * 0.32}px ${size * 0.85}px`, borderRadius: 999, transform: `scale(${0.7 + 0.3 * p})`, opacity: Math.min(1, p * 2), whiteSpace: 'nowrap', boxShadow: shadow.soft, ...style}}>
      {text}
    </div>
  );
};

/** red X / green check badge */
export const Mark: React.FC<{kind: 'x' | 'ok'; at: number; size?: number; style?: React.CSSProperties}> = ({kind, at, size = 132, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < at) return null;
  const p = sp(frame, fps, at, springs.bouncy);
  const d = prog(frame, at + 3, at + 14);
  const c = kind === 'x' ? palette.red : palette.green;
  return (
    <div style={{position: 'absolute', width: size, height: size, borderRadius: size, background: c, boxShadow: `0 20px 40px -12px ${c}99, 0 0 0 10px ${c}22`, transform: `scale(${p}) rotate(${(1 - p) * -30}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, ...style}}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
        {kind === 'x' ? (
          <path d="M6 6 L18 18 M18 6 L6 18" strokeDasharray={34} strokeDashoffset={34 * (1 - d)} />
        ) : (
          <path d="M4.5 12.5 L10 18 L19.5 6.5" strokeDasharray={24} strokeDashoffset={24 * (1 - d)} />
        )}
      </svg>
    </div>
  );
};

export const Cursor: React.FC<{x: number; y: number; press?: number}> = ({x, y, press = 0}) => (
  <svg width={64} height={64} viewBox="0 0 24 24" style={{position: 'absolute', left: x, top: y, zIndex: 30, transform: `scale(${1 - press * 0.15})`, transformOrigin: '0 0', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.3))'}}>
    <path d="M3 2 L3 19 L8 14.5 L11.5 22 L14.5 20.6 L11 13.3 L18 13.3 Z" fill="#111" stroke="#fff" strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);

/** Full-bleed website sheet (no browser or device frame) */
export const Sheet: React.FC<{children: React.ReactNode; bg?: string; style?: React.CSSProperties; enterAt?: number}> = ({children, bg = palette.surface, style, enterAt = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = enterAt < 0 ? 1 : sp(frame, fps, enterAt, springs.smooth);
  return (
    <div style={{position: 'absolute', top: LAYOUT.sheetTop, left: 0, width: W, height: LAYOUT.sheetH, background: bg, overflow: 'hidden', boxShadow: shadow.card, transform: `translateY(${(1 - p) * 80}px)`, opacity: Math.min(1, p * 1.8), fontFamily: font.family, ...style}}>
      {children}
    </div>
  );
};

/** Modern site parts */
export const Header: React.FC<{cta?: number; burger?: boolean}> = ({cta = 0, burger}) => (
  <div style={{height: 100, padding: '0 54px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${palette.line}`, background: '#fff'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 32, fontWeight: 700, color: palette.navy}}>
      <div style={{width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${palette.navy}, ${palette.blue})`}} />
      {S.brand}
    </div>
    {burger ? (
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        {[0, 1, 2].map((i) => <div key={i} style={{width: 44, height: 5, borderRadius: 4, background: palette.navy}} />)}
      </div>
    ) : (
      <div style={{display: 'flex', alignItems: 'center', gap: 30, fontSize: 23, color: palette.muted, fontWeight: 500}}>
        {S.nav.slice(0, cta > 0 ? 3 : 4).map((n) => <span key={n}>{n}</span>)}
      </div>
    )}
  </div>
);

export const CtaButton: React.FC<{p?: number; size?: number; glow?: number; style?: React.CSSProperties}> = ({p = 1, size = 30, glow = 0, style}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, background: palette.blue, color: '#fff', fontSize: size, fontWeight: 600, padding: `${size * 0.72}px ${size * 1.35}px`, borderRadius: 18, transform: `scale(${p})`, opacity: Math.min(1, p * 1.5), boxShadow: `0 18px 36px -14px ${palette.blue}AA, 0 0 0 ${glow * 18}px ${palette.blue}${Math.round((1 - glow) * 60).toString(16).padStart(2, '0')}`, whiteSpace: 'nowrap', ...style}}>
    {S.cta}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  </div>
);

export const Hero: React.FC<{cta?: number; glow?: number}> = ({cta = 1, glow = 0}) => (
  <div style={{padding: '64px 54px 56px', background: 'linear-gradient(135deg, #EEF1FF 0%, #F8F9FB 70%)', position: 'relative', overflow: 'hidden', height: 380}}>
    <div style={{position: 'absolute', right: -60, top: 40, width: 380, height: 300, borderRadius: 28, background: `linear-gradient(160deg, #C9D2FF, ${palette.blue}55)`, transform: 'rotate(-6deg)'}} />
    <div style={{position: 'absolute', right: 60, top: 120, width: 220, height: 150, borderRadius: 18, background: '#fff', boxShadow: shadow.soft}} />
    <div style={{fontSize: 60, fontWeight: 700, color: palette.navy, lineHeight: 1.1, maxWidth: 620, letterSpacing: '-0.02em'}}>{S.hero}</div>
    <div style={{fontSize: 28, color: palette.muted, marginTop: 18, fontWeight: 400}}>{S.heroSub}</div>
    <div style={{marginTop: 34, height: 100}}>{cta > 0.001 ? <CtaButton p={cta} glow={glow} style={{transformOrigin: 'left center'}} /> : null}</div>
  </div>
);

export const Services: React.FC = () => (
  <div style={{display: 'flex', gap: 24, padding: '40px 54px'}}>
    {S.services.map((s, i) => (
      <div key={s} style={{flex: 1, height: 150, borderRadius: 20, border: `1px solid ${palette.line}`, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <div style={{width: 52, height: 52, borderRadius: 14, background: palette.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: 22, height: 22, borderRadius: i === 1 ? 4 : 22, border: `4px solid ${palette.blue}`}} />
        </div>
        <div style={{fontSize: 26, fontWeight: 600, color: palette.navy}}>{s}</div>
      </div>
    ))}
  </div>
);

export const ModernSite: React.FC<{cta?: number; glow?: number}> = ({cta = 1, glow = 0}) => (
  <>
    <Header />
    <Hero cta={cta} glow={glow} />
    <Services />
  </>
);

/** 1990s-style outdated page */
export const OldSite: React.FC = () => (
  <div style={{width: '100%', height: '100%', background: '#FFFFCC', fontFamily: 'Georgia, "Times New Roman", serif'}}>
    <div style={{height: 100, background: 'linear-gradient(#3333AA,#000077)', color: '#FFFF00', fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, borderBottom: '6px ridge #999'}}>
      ★ {S.brand.toUpperCase()} ★
    </div>
    <div style={{display: 'flex', gap: 0, height: 620}}>
      <div style={{width: 250, background: '#CCCCCC', borderRight: '4px outset #eee', padding: 24, display: 'flex', flexDirection: 'column', gap: 18}}>
        {S.nav.map((n) => (
          <div key={n} style={{background: '#E0E0E0', border: '3px outset #fff', fontSize: 24, padding: '8px 10px', color: '#000', textAlign: 'center'}}>{n}</div>
        ))}
      </div>
      <div style={{flex: 1, padding: '30px 40px', textAlign: 'center'}}>
        <div style={{fontSize: 44, color: '#CC0000', textDecoration: 'underline', fontStyle: 'italic', fontWeight: 700}}>{S.oldHero}</div>
        <div style={{fontSize: 25, color: '#333', marginTop: 22, lineHeight: 1.4}}>{S.oldSub}</div>
        <div style={{margin: '28px auto 0', width: 420, height: 170, background: 'repeating-linear-gradient(45deg,#ddd 0 12px,#bbb 12px 24px)', border: '3px inset #999'}} />
        <div style={{display: 'flex', justifyContent: 'center', gap: 26, marginTop: 26}}>
          {S.oldLinks.map((l) => <span key={l} style={{fontSize: 24, color: '#0000EE', textDecoration: 'underline'}}>{l}</span>)}
        </div>
      </div>
    </div>
  </div>
);

export const Skeleton: React.FC = () => {
  const frame = useCurrentFrame();
  const x = ((frame * 22) % 1600) - 400;
  const bar = (w: number | string, h: number, r = 12, extra?: React.CSSProperties) => <div style={{width: w, height: h, borderRadius: r, background: palette.skeleton, ...extra}} />;
  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
      <div style={{height: 100, padding: '0 54px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${palette.line}`}}>
        {bar(260, 34)}
        <div style={{display: 'flex', gap: 24}}>{[0, 1, 2, 3].map((i) => <div key={i}>{bar(100, 22)}</div>)}</div>
      </div>
      <div style={{padding: '64px 54px', display: 'flex', flexDirection: 'column', gap: 22}}>
        {bar(620, 56)}
        {bar(480, 56)}
        {bar(340, 28)}
        {bar(300, 90, 18, {marginTop: 20})}
      </div>
      <div style={{display: 'flex', gap: 24, padding: '0 54px'}}>{[0, 1, 2].map((i) => <div key={i} style={{flex: 1}}>{bar('100%', 150, 20)}</div>)}</div>
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(100deg, transparent ${x}px, rgba(255,255,255,0.65) ${x + 160}px, transparent ${x + 320}px)`}} />
    </div>
  );
};
