import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {palette, font, shadow} from '../config';
import {COPY} from '../copy';
import {clamp, ease, sp, springs} from '../../anim';

const F = font.family;

/** Oversized image: a picture icon that keeps inflating while its weight pill climbs */
const ImageViz: React.FC<{t: number}> = ({t}) => {
  const grow = interpolate(t, [0, 1], [0.9, 1.3], {...clamp, easing: ease.out});
  const mb = interpolate(t, [0, 1], [0.4, 8.6], {...clamp, easing: ease.out});
  return (
    <div style={{width: 300, height: 220, position: 'relative', display: 'grid', placeItems: 'center'}}>
      <div style={{position: 'absolute', width: 190, height: 140, borderRadius: 22, border: `2px dashed ${palette.slate}`, opacity: 0.5}} />
      <div style={{width: 190, height: 140, borderRadius: 22, background: `linear-gradient(160deg, ${palette.slate} 0%, ${palette.blue} 100%)`, transform: `scale(${grow})`, position: 'relative', overflow: 'hidden', boxShadow: '0 20px 36px -18px rgba(7,19,39,0.45)'}}>
        <div style={{position: 'absolute', width: 34, height: 34, borderRadius: '50%', background: '#fff', opacity: 0.9, right: 24, top: 20}} />
        <svg viewBox="0 0 190 140" width="190" height="140" style={{position: 'absolute', inset: 0}}>
          <path d="M0 140 L60 70 L95 105 L130 60 L190 140 Z" fill="#fff" opacity="0.85" />
        </svg>
      </div>
      <Pill text={`${mb.toFixed(1)} ${COPY.causes.cards[0].unit}`} warn={t > 0.45} style={{position: 'absolute', bottom: -6, left: 6}} />
    </div>
  );
};

/** Unoptimised code: tangled lines of varying width keep piling up; a counter of loaded files */
const CodeViz: React.FC<{t: number}> = ({t}) => {
  const n = Math.round(interpolate(t, [0, 1], [3, 14], {...clamp}));
  const files = Math.round(interpolate(t, [0, 1], [4, 47], {...clamp, easing: ease.out}));
  const widths = [72, 48, 88, 36, 64, 92, 40, 78, 56, 84, 30, 70, 50, 90];
  return (
    <div style={{width: 300, height: 220, position: 'relative'}}>
      <div style={{position: 'absolute', inset: '10px 20px 40px', borderRadius: 20, background: '#fff', boxShadow: shadow.soft, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 9, overflow: 'hidden', direction: 'ltr'}}>
        {widths.slice(0, n).map((w, i) => (
          <div key={i} style={{display: 'flex', gap: 8, marginLeft: (i % 3) * 18}}>
            <div style={{width: 14, height: 9, borderRadius: 5, background: palette.blue, opacity: 0.8}} />
            <div style={{width: `${w * 0.7}%`, height: 9, borderRadius: 5, background: i % 4 === 2 ? palette.slate : palette.skeleton, opacity: i % 4 === 2 ? 0.7 : 1}} />
          </div>
        ))}
      </div>
      <Pill text={`${files} ${COPY.causes.cards[1].unit}`} warn={t > 0.45} style={{position: 'absolute', bottom: -6, left: 6}} />
    </div>
  );
};

/** Slow server: request dot leaves the device, crawls to the server and the response time climbs */
const ServerViz: React.FC<{t: number}> = ({t}) => {
  const frame = useCurrentFrame();
  const sec = interpolate(t, [0, 1], [0.2, 2.8], {...clamp, easing: ease.out});
  const pos = (frame % 60) / 60;
  const x = pos < 0.5 ? interpolate(pos, [0, 0.5], [0, 1]) : interpolate(pos, [0.5, 1], [1, 0]);
  const dotX = 60 + x * 160;
  return (
    <div style={{width: 300, height: 220, position: 'relative'}}>
      {/* device */}
      <div style={{position: 'absolute', left: 18, top: 60, width: 48, height: 86, borderRadius: 12, background: palette.navy}}>
        <div style={{position: 'absolute', inset: '8px 6px 14px', borderRadius: 6, background: palette.skeleton2}} />
      </div>
      {/* link */}
      <div style={{position: 'absolute', left: 70, top: 101, width: 150, height: 3, background: palette.line, borderRadius: 2}} />
      <div style={{position: 'absolute', left: dotX, top: 95, width: 14, height: 14, borderRadius: '50%', background: palette.blue, boxShadow: `0 0 0 6px ${palette.tint}`}} />
      {/* server */}
      <div style={{position: 'absolute', right: 18, top: 42, width: 70, display: 'flex', flexDirection: 'column', gap: 8}}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{height: 36, borderRadius: 10, background: i === 1 ? palette.deep : palette.navy, position: 'relative'}}>
            <div style={{position: 'absolute', right: 10, top: 14, width: 8, height: 8, borderRadius: '50%', background: (frame + i * 7) % 24 < 12 ? palette.slate : '#fff', opacity: 0.9}} />
            <div style={{position: 'absolute', left: 10, top: 16, width: 26, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)'}} />
          </div>
        ))}
      </div>
      <Pill text={`${sec.toFixed(1)} ${COPY.causes.cards[2].unit}`} warn={t > 0.45} style={{position: 'absolute', bottom: -6, left: 6}} />
    </div>
  );
};

const Pill: React.FC<{text: string; warn?: boolean; style?: React.CSSProperties}> = ({text, warn, style}) => (
  <div dir="rtl" style={{fontFamily: F, fontSize: 28, color: warn ? '#fff' : palette.navy, background: warn ? palette.navy : '#fff', padding: '6px 20px', borderRadius: 999, boxShadow: shadow.soft, whiteSpace: 'nowrap', ...style}}>
    {text}
  </div>
);

const VIZ = [ImageViz, CodeViz, ServerViz];

/** One cause card: icon animation on the right (RTL start), title + sub on the left. */
export const CauseCard: React.FC<{index: number; at: number; active: boolean; y: number}> = ({index, at, active, y}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, at, springs.smooth);
  const t = interpolate(frame, [at + 6, at + 70], [0, 1], {...clamp});
  const Viz = VIZ[index];
  const c = COPY.causes.cards[index];
  const fade = active ? 1 : 0.55;
  return (
    <div
      dir="rtl"
      style={{
        position: 'absolute',
        top: y,
        left: 70,
        right: 70,
        height: 250,
        borderRadius: 34,
        background: '#fff',
        boxShadow: active ? shadow.card : shadow.soft,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 28px',
        opacity: Math.min(1, p * 1.5) * fade,
        transform: `translateY(${(1 - p) * 60}px) scale(${0.96 + 0.04 * p})`,
        fontFamily: F,
      }}
    >
      <div style={{width: 300, flexShrink: 0, transform: 'scale(0.78)', transformOrigin: 'center'}}>
        <Viz t={t} />
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 10}}>
        <div style={{fontSize: 46, color: palette.navy, lineHeight: 1.25}}>{c.title}</div>
        <div style={{fontSize: 26, color: palette.grey}}>{c.sub}</div>
      </div>
      <div style={{position: 'absolute', right: 0, top: 50, bottom: 50, width: 6, borderRadius: 3, background: palette.blue, opacity: active ? 1 : 0}} />
    </div>
  );
};
