import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, GRAD, shadow} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';
import {Words, Browser, Bar, Icon, Lat, Tag} from './components';

/** a dashboard piece that flies into place */
const Piece: React.FC<{at: number; from: [number, number]; style: React.CSSProperties; children?: React.ReactNode}> = ({at, from, style, children}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, at, springs.snappy);
  return (
    <div style={{position: 'absolute', borderRadius: 22, background: C.white, boxShadow: shadow.soft, overflow: 'hidden', opacity: Math.min(1, p * 2), transform: `translate(${(1 - p) * from[0]}px, ${(1 - p) * from[1]}px) scale(${0.85 + 0.15 * p})`, ...style}}>
      {children}
    </div>
  );
};

const Kpi: React.FC<{label: string; n: number; suffix?: string; color: string; at: number}> = ({label, n, suffix = '', color, at}) => {
  const f = useCurrentFrame();
  const k = prog(f, at, at + 24, ease.out);
  return (
    <div dir="rtl" style={{padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 6}}>
      <span style={{fontFamily: F.ar, fontSize: 24, color: C.muted}}>{label}</span>
      <Lat size={40} weight={600} color={C.navy}>{`${Math.round(n * k)}${suffix}`}</Lat>
      <div style={{height: 6, borderRadius: 6, background: C.soft}}><div style={{width: `${70 * k}%`, height: '100%', borderRadius: 6, background: color}} /></div>
    </div>
  );
};

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const Q = 96; // question beat
  const win = sp(f, fps, 0, springs.smooth);
  const aOut = prog(f, Q - 10, Q, ease.in);
  const tilt = prog(f, Q + 4, Q + 40, ease.inOut);
  const big = sp(f, fps, Q + 26, springs.bouncy);
  const sweep = interpolate(f, [Q + 30, Q + 80], [120, -20], clamp);
  const ul = prog(f, Q + 40, Q + 62);
  const layers = [
    {t: 'API', d: 'كيف تنتقل الطلبات؟', icon: 'api' as const},
    {t: 'Backend', d: 'من يعالج العمليات؟', icon: 'server' as const},
    {t: 'Database', d: 'أين تُحفظ البيانات؟', icon: 'db' as const},
  ];
  return (
    <AbsoluteFill>
      {/* line 1 */}
      <div style={{position: 'absolute', top: 260, left: 60, right: 60, opacity: 1 - aOut, transform: `translateY(${-aOut * 40}px)`}}>
        <Words text={'تستطيع اليوم بناء شركة برمجيات\nدون كتابة سطر كود تقريباً!'} size={68} color={C.navy} hi={['تقريباً!']} delay={2} stagger={2.6} lh={1.45} />
      </div>
      {/* line 2 */}
      {f >= Q - 4 ? (
        <div style={{position: 'absolute', top: 236, left: 40, right: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
          <Words text="لكن هل يستطيع الذكاء الاصطناعي بناء" size={52} color={C.ink2} delay={Q} stagger={2.4} />
          <div dir="rtl" style={{fontFamily: F.ar, fontSize: 150, lineHeight: 1.3, transform: `scale(${0.6 + 0.4 * big})`, opacity: Math.min(1, big * 1.6), background: `linear-gradient(100deg, ${C.navy} 30%, ${C.blue} 45%, ${C.cyan} 50%, ${C.blue} 55%, ${C.navy} 70%)`, backgroundSize: '260% 100%', backgroundPosition: `${sweep}% 0`, WebkitBackgroundClip: 'text', color: 'transparent', position: 'relative'}}>
            SaaS حقيقي؟
          </div>
          <div style={{width: 560 * ul, height: 8, borderRadius: 8, background: GRAD, marginTop: -6}} />
        </div>
      ) : null}

      {/* dashboard assembling, then tilting to reveal the missing layers beneath */}
      <div style={{position: 'absolute', left: 70, top: 620, width: 840, height: 800, perspective: 2200}}>
        <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `translateY(${(1 - win) * 240 + tilt * 40}px) rotateX(${tilt * 52}deg) rotateZ(${tilt * -10}deg) scale(${1 - tilt * 0.12})`, transformOrigin: '50% 40%', opacity: Math.min(1, win * 1.5)}}>
          {layers.map((l, i) => {
            const p = prog(f, Q + 22 + i * 7, Q + 44 + i * 7);
            return (
              <div key={l.t} style={{position: 'absolute', inset: 0, borderRadius: 32, border: `3px dashed ${C.dim}`, background: 'rgba(255,255,255,0.55)', transform: `translateZ(${-(i + 1) * 190 * p}px)`, opacity: p, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 40}}>
                <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 18}}>
                  <Icon name={l.icon} size={54} color={C.muted} sw={2} />
                  <Lat size={52} color={C.ink2} weight={600}>{l.t}</Lat>
                  <span style={{fontFamily: F.ar, fontSize: 40, color: C.muted}}>{l.d}</span>
                </div>
              </div>
            );
          })}
          <Browser url="app.projecthub.io" style={{inset: 0}}>
            <div dir="rtl" style={{position: 'absolute', inset: 0, background: C.surface}}>
              <Piece at={6} from={[260, 0]} style={{right: 20, top: 20, bottom: 20, width: 170, padding: 18, display: 'flex', flexDirection: 'column', gap: 16}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}><div style={{width: 34, height: 34, borderRadius: 10, background: GRAD}} /><Bar w={80} h={14} color="#DDE2EC" /></div>
                {['grid', 'layers', 'users', 'card', 'chart'].map((n, i) => (
                  <div key={n} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 12, background: i === 0 ? C.blueSoft : 'transparent'}}>
                    <Icon name={n as 'grid'} size={28} color={i === 0 ? C.blue : C.muted} />
                    <Bar w={70} h={12} color={i === 0 ? 'rgba(31,91,255,0.3)' : '#E3E6ED'} />
                  </div>
                ))}
              </Piece>
              <Piece at={11} from={[0, -200]} style={{right: 210, left: 20, top: 20, height: 150}}>
                <div style={{display: 'flex', height: '100%'}}>
                  <div style={{flex: 1}}><Kpi label="العملاء" n={128} color={C.blue} at={14} /></div>
                  <div style={{flex: 1, borderRight: `1px solid ${C.line}`}}><Kpi label="المشاريع" n={342} color={C.cyan} at={17} /></div>
                  <div style={{flex: 1, borderRight: `1px solid ${C.line}`}}><Kpi label="الإيراد الشهري" n={18} suffix="k" color={C.teal} at={20} /></div>
                </div>
              </Piece>
              <Piece at={16} from={[-260, 120]} style={{right: 210, left: 20, top: 190, height: 260, padding: 22}}>
                <svg width="100%" height="100%" viewBox="0 0 560 210" preserveAspectRatio="none">
                  <defs><linearGradient id="hk" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={C.blue} stopOpacity="0.25" /><stop offset="1" stopColor={C.blue} stopOpacity="0" /></linearGradient></defs>
                  {(() => {
                    const k = prog(f, 18, 50, ease.inOut);
                    const ys = [170, 150, 160, 120, 130, 90, 100, 60, 70, 35];
                    const pts = ys.map((y, i) => [i * 62, 210 - (210 - y) * k] as const);
                    const d = 'M' + pts.map((p) => p.join(' ')).join(' L');
                    return (<><path d={`${d} L558 210 L0 210 Z`} fill="url(#hk)" /><path d={d} fill="none" stroke={C.blue} strokeWidth={4} strokeLinejoin="round" /></>);
                  })()}
                </svg>
              </Piece>
              <Piece at={22} from={[0, 220]} style={{right: 210, left: 20, top: 470, bottom: 20, padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 12}}>
                {[
                  ['متجر النخبة', 'Pro', C.blue],
                  ['شركة الأفق', 'Starter', C.purple],
                  ['مؤسسة المدار', 'Business', C.teal],
                ].map(([n, plan, col], i) => (
                  <div key={n} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: prog(f, 26 + i * 4, 36 + i * 4), paddingBottom: 10, borderBottom: i < 2 ? `1px solid ${C.line}` : 'none'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                      <div style={{width: 40, height: 40, borderRadius: 40, background: col, opacity: 0.85}} />
                      <span style={{fontFamily: F.ar, fontSize: 28, color: C.ink}}>{n}</span>
                    </div>
                    <Tag text={plan} color={col} bg={C.soft} size={20} />
                  </div>
                ))}
              </Piece>
            </div>
          </Browser>
        </div>
      </div>
    </AbsoluteFill>
  );
};
