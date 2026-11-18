import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, OVERLAP, sec, shadow, GRAD} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';
import {Words, Icon, IconName, Lat, Browser, Bar} from './components';

const o = OVERLAP;
const b = (s: number) => o + sec(s);
export const Q_AT = 5.0;
export const LOGO_AT = 7.6;

const PARTS: Array<[string, IconName, number, number]> = [
  ['Frontend', 'layout', -330, -40],
  ['API', 'api', -110, -40],
  ['Backend', 'server', 110, -40],
  ['Database', 'db', 330, -40],
  ['Auth', 'key', -330, 40],
  ['Multi-tenancy', 'building', -110, 40],
  ['Billing', 'card', 110, 40],
  ['Tests', 'flask', 330, 40],
];

export const Final: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const outA = prog(f, b(Q_AT - 0.4), b(Q_AT), ease.in);
  const app = sp(f, fps, o + 4, springs.gentle);
  const big = sp(f, fps, b(1.9), springs.bouncy);
  const sweep = interpolate(f, [b(2.0), b(3.4)], [120, -20], clamp);
  const logo = sp(f, fps, b(LOGO_AT), springs.gentle);
  const ring = prog(f, b(LOGO_AT), b(LOGO_AT + 1.4), ease.out);
  const qUp = prog(f, b(LOGO_AT - 0.3), b(LOGO_AT + 0.3), ease.inOut);
  return (
    <AbsoluteFill>
      {/* statement */}
      <div style={{position: 'absolute', top: 236, left: 50, right: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 1 - outA, transform: `translateY(${-outA * 40}px)`, filter: outA > 0 ? `blur(${outA * 8}px)` : undefined}}>
        <Words text="إذن، المشكلة لم تعد في كتابة الكود..." size={56} color={C.ink2} hi={['كتابة', 'الكود...']} hiColor={C.muted} delay={o} stagger={3} />
        <div dir="rtl" style={{fontFamily: F.ar, fontSize: 104, lineHeight: 1.35, transform: `scale(${0.6 + 0.4 * big})`, opacity: Math.min(1, big * 1.6), background: `linear-gradient(100deg, ${C.navy} 30%, ${C.blue} 45%, ${C.cyan} 50%, ${C.blue} 55%, ${C.navy} 70%)`, backgroundSize: '260% 100%', backgroundPosition: `${sweep}% 0`, WebkitBackgroundClip: 'text', color: 'transparent'}}>بل في هندسة المنتج</div>
        <Words text="والتحقق من أنه يعمل فعلاً." size={60} color={C.navy} hi={['يعمل', 'فعلاً.']} delay={b(2.6)} stagger={3} />
      </div>
      {/* assembled product: components converge into one stack */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
        {PARTS.map(([t, ic, x, y], i) => {
          const p = sp(f, fps, o + 2 + i * 3, springs.smooth);
          const sx = [-1, 1][i % 2] * (420 + i * 30);
          const sy = -300 + (i % 3) * 200;
          const dy = qUp * 640;
          const ds = 1 - qUp * 0.12;
          return (
            <div key={t} dir="ltr" style={{position: 'absolute', left: 540 + x - 100, top: 740 + y - 30, width: 200, height: 62, borderRadius: 18, background: C.white, boxShadow: shadow.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `translate(${(1 - p) * sx}px, ${(1 - p) * sy + dy}px) rotate(${(1 - p) * 20}deg) scale(${ds})`, opacity: Math.min(1, p * 1.5) * (1 - outA * (1 - qUp))}}>
              <Icon name={ic} size={26} color={C.blue} sw={2.1} />
              <Lat size={22} weight={600} color={C.navy}>{t}</Lat>
            </div>
          );
        })}
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          {[-330, -110, 110, 330].map((x, i) => <line key={i} x1={540 + x} y1={812} x2={540 + x * 0.6} y2={880} stroke={C.blue} strokeWidth={2.5} strokeDasharray="6 8" strokeDashoffset={-f * 1.4} opacity={prog(f, o + 30, o + 44) * 0.6 * (1 - outA)} />)}
        </svg>
        <div style={{position: 'absolute', left: 110, right: 110, top: 890, height: 520, opacity: Math.min(1, app * 1.5) * (1 - outA), transform: `translateY(${(1 - app) * 160}px)`}}>
          <Browser url="app.projecthub.io" style={{inset: 0}}>
            <div dir="rtl" style={{position: 'absolute', inset: 0, padding: 24, display: 'flex', gap: 18, background: C.surface}}>
              <div style={{width: 130, borderRadius: 18, background: C.white, boxShadow: shadow.soft, padding: 14, display: 'flex', flexDirection: 'column', gap: 12}}>{[0, 1, 2, 3, 4].map((i) => <Bar key={i} w="100%" h={12} color={i === 0 ? 'rgba(31,91,255,0.4)' : '#E3E6ED'} />)}</div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 16}}>
                <div style={{display: 'flex', gap: 14}}>{[C.blue, C.cyan, C.teal].map((c, i) => <div key={c} style={{flex: 1, height: 100, borderRadius: 16, background: C.white, boxShadow: shadow.soft, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}><Bar w="60%" h={10} /><div style={{height: 8, borderRadius: 8, background: C.soft}}><div style={{width: `${[72, 55, 88][i] * prog(f, o + 20, o + 60)}%`, height: '100%', borderRadius: 8, background: c}} /></div></div>)}</div>
                <div style={{flex: 1, borderRadius: 16, background: C.white, boxShadow: shadow.soft, display: 'flex', alignItems: 'flex-end', gap: 10, padding: 18}}>
                  {[35, 50, 42, 66, 58, 80, 72, 92].map((h, i) => <div key={i} style={{flex: 1, height: `${h * prog(f, o + 24 + i * 2, o + 54 + i * 2)}%`, borderRadius: 6, background: GRAD, opacity: 0.85}} />)}
                </div>
              </div>
            </div>
          </Browser>
        </div>
      </div>
      {/* question */}
      {f >= b(Q_AT - 0.2) ? (
        <div style={{position: 'absolute', left: 50, right: 50, top: interpolate(qUp, [0, 1], [620, 360]), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
          <Words text={'هل تعتقد أن AI أصبح كافياً\nلبناء SaaS جاهز للبيع؟'} size={interpolate(qUp, [0, 1], [84, 68])} color={C.navy} hi={['AI', 'كافياً', 'جاهز', 'للبيع؟']} delay={b(Q_AT)} stagger={3.2} lh={1.45} />
        </div>
      ) : null}
      {/* logo */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center', opacity: Math.min(1, logo * 1.4)}}>
        <div style={{position: 'relative', width: 560, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'absolute', width: 480 + ring * 120, height: 480 + ring * 120, borderRadius: 999, border: `2px solid rgba(31,91,255,${0.3 * (1 - ring)})`}} />
          <div style={{position: 'absolute', width: 520, height: 520, borderRadius: 999, background: 'radial-gradient(circle, rgba(31,91,255,0.10) 0%, rgba(31,91,255,0) 65%)'}} />
          <Img src={staticFile('img/ea4-logo-v2.png')} style={{width: 460, transform: `scale(${0.85 + 0.15 * logo}) translateY(${(1 - logo) * 30}px)`, filter: logo < 0.98 ? `blur(${(1 - logo) * 8}px)` : undefined}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
