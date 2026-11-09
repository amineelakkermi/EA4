import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile, OffthreadVideo} from 'remotion';
import {C, F} from './config';
import {COPY} from './copy';
import {Words, Mark, Check, Cross, Spinner, Step, AppWindow, typed} from './components';
import {sp, springs, clamp, ease, prog} from '../anim';

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 96], [120, -20], clamp);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, marginTop: -140}}>
        <Words text={COPY.hook.a} size={92} animate={false} />
        <div dir="rtl" style={{fontFamily: F.ar, fontSize: 132, lineHeight: 1.3, background: `linear-gradient(100deg, ${C.ink} 20%, ${C.sky} 45%, ${C.skyHi} 50%, ${C.sky} 55%, ${C.ink} 80%)`, backgroundSize: '250% 100%', backgroundPosition: `${x}% 0`, WebkitBackgroundClip: 'text', color: 'transparent'}}>{COPY.hook.b}</div>
        <div style={{marginTop: 30, padding: '16px 40px', borderRadius: 999, border: `1px solid ${C.line}`, background: 'rgba(255,255,255,0.05)'}}>
          <Words text={COPY.hook.c} size={50} color={C.muted} animate={false} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const clips = [
  [[0, 22, '#8DBEE1'], [24, 50, '#5E7FA0'], [53, 80, '#8DBEE1']],
  [[5, 30, '#C9A34A'], [33, 64, '#E0C27A'], [66, 95, '#C9A34A']],
  [[0, 40, '#7E6BD8'], [44, 70, '#A08FF0']],
  [[10, 36, '#3FA37A'], [40, 58, '#6CCB9F'], [61, 92, '#3FA37A']],
  [[0, 100, '#2C3340']],
] as const;

export const Problem: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ph = interpolate(f, [0, 180], [8, 92], clamp);
  const bad = prog(f, 112, 126);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 270, left: 60, right: 60}}>
        <Words text={COPY.problem.title} size={66} />
      </div>
      <div style={{position: 'absolute', top: 520, left: 50, right: 50, height: 470, borderRadius: 26, background: C.panel, border: `1px solid ${C.line}`, padding: 26, overflow: 'hidden', transform: `perspective(1600px) rotateX(${(1 - sp(f, fps, 0)) * 18}deg)`, boxShadow: '0 50px 100px -30px rgba(0,0,0,0.8)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22}}>
          <div style={{display: 'flex', gap: 10}}>{[0, 1, 2].map((k) => <div key={k} style={{width: 16, height: 16, borderRadius: 16, background: '#2A2F38'}} />)}</div>
          <div dir="rtl" style={{fontFamily: F.ar, fontSize: 34, color: bad > 0 ? C.red : C.muted, display: 'flex', alignItems: 'center', gap: 12}}>
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            {COPY.problem.hours}
          </div>
        </div>
        <div style={{position: 'relative'}}>
          {clips.map((row, r) => (
            <div key={r} style={{position: 'relative', height: 62, marginBottom: 12, borderRadius: 10, background: 'rgba(255,255,255,0.03)'}}>
              {row.map(([a, b, c], k) => (
                <div key={k} style={{position: 'absolute', left: `${a}%`, width: `${b - a}%`, top: 6, bottom: 6, borderRadius: 8, background: r === 4 ? undefined : c, opacity: 0.85, overflow: 'hidden'}}>
                  {r === 4 ? (
                    <svg width="100%" height="100%" viewBox="0 0 400 50" preserveAspectRatio="none">
                      <path d={Array.from({length: 100}, (_, i) => `M${i * 4} ${25 - 18 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.31))} V${25 + 18 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.31))}`).join(' ')} stroke={C.sky} strokeWidth={2} />
                    </svg>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
          <div style={{position: 'absolute', top: -10, bottom: -10, left: `${ph}%`, width: 3, background: C.red, boxShadow: `0 0 16px ${C.red}`}} />
        </div>
        <div style={{position: 'absolute', inset: 0, background: `rgba(255,84,78,${0.12 * bad})`}} />
      </div>
      <div style={{position: 'absolute', top: 1050, left: 110, right: 110, display: 'flex', flexDirection: 'column', gap: 26}}>
        {COPY.problem.items.map((t, k) => {
          const p = sp(f, fps, 30 + k * 16, springs.snappy);
          return (
            <div key={t} dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 24, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * -60}px)`}}>
              <Cross size={54} p={p} />
              <span style={{fontFamily: F.ar, fontSize: 52, color: C.ink}}>{t}</span>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', top: 1410, left: 60, right: 60}}>
        <Words text={COPY.problem.q} size={60} color={C.sky} delay={112} />
      </div>
    </AbsoluteFill>
  );
};

export const Reveal: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, 0, {damping: 14, stiffness: 90, mass: 1});
  const ring = prog(f, 0, 40);
  const w = sp(f, fps, 14, springs.smooth);
  return (
    <AbsoluteFill style={{alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 470, width: 700, height: 700, left: 190, borderRadius: 700, background: 'radial-gradient(circle, rgba(141,190,225,0.45) 0%, rgba(141,190,225,0) 60%)', opacity: ring, transform: `scale(${0.6 + 0.5 * ring})`}} />
      <div style={{position: 'absolute', top: 560, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        {[0, 1].map((k) => (
          <div key={k} style={{position: 'absolute', top: -60 - k * 60, width: 420 + k * 120, height: 420 + k * 120, borderRadius: 999, border: `1.5px solid rgba(141,190,225,${0.35 - k * 0.15})`, opacity: ring, transform: `scale(${0.7 + 0.3 * ring}) rotate(${f * (k ? -0.4 : 0.6)}deg)`, borderTopColor: 'transparent'}} />
        ))}
        <Mark size={300} style={{transform: `scale(${p}) rotate(${(1 - p) * -90}deg)`, filter: 'invert(1) drop-shadow(0 0 40px rgba(141,190,225,0.6))'}} />
      </div>
      <div style={{position: 'absolute', top: 980, left: 0, right: 0, textAlign: 'center', fontFamily: F.lat, fontWeight: 500, fontSize: 150, color: C.ink, letterSpacing: '-0.03em', opacity: w, transform: `translateY(${(1 - w) * 40}px)`, filter: `blur(${(1 - w) * 12}px)`}}>
        Devin <span style={{color: C.sky}}>AI</span>
      </div>
      <div style={{position: 'absolute', top: 1210, left: 60, right: 60, display: 'flex', flexDirection: 'column', gap: 14}}>
        <Words text={COPY.reveal.line} size={56} delay={30} />
        <Words text={COPY.reveal.sub} size={44} color={C.muted} delay={44} />
      </div>
    </AbsoluteFill>
  );
};

const Sidebar: React.FC = () => (
  <div style={{width: 250, background: C.uiSide, borderRight: `1px solid ${C.uiLine}`, padding: '26px 20px', display: 'flex', flexDirection: 'column', gap: 20, fontSize: 22, color: C.uiInk}}>
    {['New session', 'Automations', 'Review', 'Wiki'].map((t, k) => (
      <div key={t} style={{display: 'flex', alignItems: 'center', gap: 12, fontWeight: k === 0 ? 500 : 400}}>
        <div style={{width: 20, height: 20, borderRadius: 6, border: `2px solid ${C.uiMuted}`}} />
        {t}
      </div>
    ))}
    <div style={{fontSize: 18, color: C.uiMuted, marginTop: 18}}>Sessions</div>
    {['Website audit', 'SEO reel', 'Landing page'].map((t) => (
      <div key={t} style={{fontSize: 20, color: C.uiMuted}}>{t}</div>
    ))}
  </div>
);

export const Brief: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const txt = typed(COPY.brief, f, 18, 30);
  const sent = f >= 128;
  const sendP = sp(f, fps, 128, springs.snappy);
  const zoom = interpolate(f, [10, 70, 120, 150], [1, 1.07, 1.07, 1], {...clamp, easing: ease.inOut});
  const win = sp(f, fps, 0, springs.smooth);
  return (
    <AbsoluteFill>
      <Step n={1} text={COPY.steps[0]} />
      <AppWindow style={{top: 450, height: 940, transform: `translateY(${(1 - win) * 120}px) scale(${zoom})`, transformOrigin: '50% 90%'}}>
        <div style={{display: 'flex', height: 864}}>
          <Sidebar />
          <div style={{flex: 1, padding: 34, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 26}}>
            {sent ? (
              <div dir="rtl" style={{alignSelf: 'flex-end', maxWidth: 620, background: '#EFEFF1', borderRadius: 24, padding: '22px 28px', fontFamily: F.ar, fontSize: 34, lineHeight: 1.5, opacity: sendP, transform: `translateY(${(1 - sendP) * 80}px)`}}>{COPY.brief}</div>
            ) : null}
            {sent && f > 145 ? (
              <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: C.uiMuted}}><Spinner /> Devin is working</div>
            ) : null}
            <div style={{border: `1.5px solid ${f > 14 && !sent ? C.uiInk : C.uiLine}`, borderRadius: 26, padding: 26, minHeight: 230, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#fff', boxShadow: '0 10px 30px -15px rgba(0,0,0,0.15)'}}>
              {!sent && txt.length > 0 ? (
                <div dir="rtl" style={{fontFamily: F.ar, fontSize: 36, lineHeight: 1.5, color: C.uiInk}}>{txt}<span style={{opacity: f % 16 < 8 ? 1 : 0, color: C.sky}}>|</span></div>
              ) : (
                <div style={{fontSize: 26, color: '#A3A3A3'}}>Plan a feature, fix bugs, or perform a security scan</div>
              )}
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18}}>
                <span style={{fontSize: 22, color: C.uiMuted}}>Ultra</span>
                <div style={{width: 58, height: 58, borderRadius: 58, background: C.uiInk, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.15 * Math.sin(Math.min(1, prog(f, 118, 132)) * Math.PI)})`}}>
                  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppWindow>
    </AbsoluteFill>
  );
};

const CODE = [
  "import {Sequence, Audio} from 'remotion';",
  '',
  'export const Reel = () => (',
  '  <Stage>',
  '    <Sequence durationInFrames={105}>',
  '      <Hook title={copy.hook} />',
  '    </Sequence>',
  '    <Reasons from={105} items={5} />',
  "    <Cta logo='ea4-logo.png' />",
  '    <Audio src={music} />',
  '  </Stage>',
  ');',
];
const tok = (line: string) =>
  line.split(/('[^']*'|<\/?[A-Za-z]+|\b(?:import|from|export|const)\b|\d+)/).map((t, k) => {
    const c = /^'/.test(t) ? '#A5D6A7' : /^<\/?/.test(t) ? C.sky : /^(import|from|export|const)$/.test(t) ? '#F48FB1' : /^\d+$/.test(t) ? '#FFCC80' : '#E6E6E6';
    return <span key={k} style={{color: c}}>{t}</span>;
  });

export const Build: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pan = interpolate(f, [70, 120], [0, -90], {...clamp, easing: ease.inOut});
  const chars = Math.max(0, Math.floor((f - 60) * 7));
  let left = chars;
  const render = prog(f, 150, 192, ease.inOut);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${pan}px)`}}>
        <Step n={2} text={COPY.steps[1]} />
        <AppWindow title="Reels video" style={{top: 410, height: 640}}>
          <div style={{padding: '24px 34px', display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <div style={{width: 46, height: 46, borderRadius: 12, background: C.uiInk, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Mark size={28} /></div>
              <span style={{fontSize: 26, fontWeight: 500}}>Devin</span>
            </div>
            <div dir="rtl" style={{fontFamily: F.ar, fontSize: 38, color: C.uiInk}}>{COPY.plan.head}</div>
            {COPY.plan.items.map((t, k) => {
              const at = 14 + k * 24;
              const p = sp(f, fps, at, springs.snappy);
              const done = f > at + 18;
              return (
                <div key={t} dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 18, opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * 20}px)`}}>
                  {done ? <Check size={42} p={sp(f, fps, at + 18, springs.bouncy)} /> : <Spinner size={38} />}
                  <span style={{fontFamily: F.ar, fontSize: 36, color: done ? C.uiInk : C.uiMuted}}>{t}</span>
                </div>
              );
            })}
          </div>
        </AppWindow>
        <div style={{position: 'absolute', top: 1090, left: 40, right: 40, height: 560, borderRadius: 26, background: '#0E1014', border: `1px solid ${C.line}`, boxShadow: '0 50px 100px -30px rgba(0,0,0,0.9)', overflow: 'hidden', fontFamily: F.mono, opacity: prog(f, 50, 66), transform: `translateY(${(1 - prog(f, 50, 70)) * 80}px)`}}>
          <div style={{height: 58, display: 'flex', alignItems: 'center', gap: 20, padding: '0 24px', borderBottom: `1px solid ${C.line}`, fontSize: 22, color: C.muted}}>
            <span style={{color: C.ink, borderBottom: `2px solid ${C.sky}`, paddingBottom: 14, marginTop: 16}}>Reel.tsx</span>
            <span>Terminal</span>
          </div>
          <div style={{padding: '18px 26px', fontSize: 25, lineHeight: 1.55, whiteSpace: 'pre'}}>
            {CODE.map((l, k) => {
              const n = Math.min(l.length, Math.max(0, left));
              left -= l.length + 1;
              return (
                <div key={k} style={{display: 'flex', gap: 22, height: 38}}>
                  <span style={{color: C.dim, width: 30, textAlign: 'right'}}>{k + 1}</span>
                  <span>{tok(l.slice(0, n))}</span>
                </div>
              );
            })}
          </div>
          {f > 140 ? (
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 92, background: '#14171D', borderTop: `1px solid ${C.line}`, padding: '0 26px', display: 'flex', alignItems: 'center', gap: 20, fontSize: 24, color: C.ink}}>
              <span style={{color: C.green}}>$</span>
              <span>render</span>
              <div style={{flex: 1, height: 12, borderRadius: 12, background: '#262A33', overflow: 'hidden'}}>
                <div style={{width: `${render * 100}%`, height: '100%', background: render >= 1 ? C.green : C.sky}} />
              </div>
              <span style={{width: 150, textAlign: 'right', color: render >= 1 ? C.green : C.muted}}>{Math.round(render * 1245)}/1245</span>
              {render >= 1 ? <Check size={36} p={sp(f, fps, 192, springs.bouncy)} /> : null}
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Bubble: React.FC<{at: number; text: string; devin?: boolean; style?: React.CSSProperties}> = ({at, text, devin, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const p = sp(f, fps, at, springs.bouncy);
  return (
    <div dir="rtl" style={{position: 'absolute', display: 'flex', alignItems: 'center', gap: 16, padding: '20px 30px', borderRadius: 28, background: devin ? C.uiBg : 'rgba(30,33,40,0.92)', color: devin ? C.uiInk : C.ink, border: devin ? 'none' : `1px solid ${C.line}`, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8)', fontFamily: F.ar, fontSize: 42, transform: `scale(${0.7 + 0.3 * p})`, opacity: Math.min(1, p * 1.6), whiteSpace: 'nowrap', zIndex: 5, ...style}}>
      {devin ? <Check size={44} /> : null}
      {text}
      {devin ? <div style={{width: 46, height: 46, borderRadius: 12, background: C.uiInk, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Mark size={28} /></div> : null}
    </div>
  );
};

export const Result: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, 0, {damping: 18, stiffness: 70, mass: 1});
  const glow = 0.5 + 0.5 * Math.sin(f / 10);
  return (
    <AbsoluteFill>
      <Step n={3} text={COPY.steps[2]} />
      <div style={{position: 'absolute', top: 410, left: 0, right: 0, display: 'flex', justifyContent: 'center', perspective: 1800}}>
        <div style={{width: 540, height: 960, borderRadius: 34, overflow: 'hidden', transform: `rotateY(${(1 - p) * 35}deg) rotateX(${(1 - p) * 10}deg) scale(${0.8 + 0.2 * p})`, boxShadow: `0 60px 120px -30px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.15), 0 0 ${60 + 30 * glow}px rgba(141,190,225,0.35)`}}>
          <OffthreadVideo src={staticFile('video/lost-fr.mp4')} muted style={{width: '100%', height: '100%'}} />
        </div>
      </div>
      <Bubble at={80} text={COPY.result.edit} style={{top: 1120, right: 70}} />
      <Bubble at={112} text={COPY.result.done} devin style={{top: 1250, left: 70}} />
      <div style={{position: 'absolute', top: 1405, left: 60, right: 60}}>
        <Words text={COPY.result.tag} size={50} color={C.sky} delay={130} />
      </div>
    </AbsoluteFill>
  );
};

export const Benefits: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 380, left: 60, right: 60}}>
        <Words text={COPY.benefits.title} size={96} color={C.sky} />
      </div>
      <div style={{position: 'absolute', top: 640, left: 90, right: 90, display: 'flex', flexDirection: 'column', gap: 34}}>
        {COPY.benefits.items.map((t, k) => {
          const p = sp(f, fps, 10 + k * 12, springs.snappy);
          return (
            <div key={t} dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 28, padding: '34px 40px', borderRadius: 30, background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))', border: `1px solid ${C.line}`, backdropFilter: 'blur(12px)', opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * -80}px) scale(${0.94 + 0.06 * p})`}}>
              <Check size={66} p={sp(f, fps, 16 + k * 12, springs.bouncy)} />
              <span style={{fontFamily: F.ar, fontSize: 56, color: C.ink}}>{t}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, 0, springs.smooth);
  const l = sp(f, fps, 26, springs.smooth);
  return (
    <AbsoluteFill>
      <div dir="rtl" style={{position: 'absolute', top: 500, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34, opacity: p, transform: `scale(${0.9 + 0.1 * p})`}}>
        <span style={{fontFamily: F.ar, fontSize: 110, color: C.ink}}>{COPY.cta.a}</span>
        <div dir="ltr" style={{display: 'flex', alignItems: 'center', gap: 22}}>
          <Mark size={110} style={{filter: 'invert(1) drop-shadow(0 0 30px rgba(141,190,225,0.6))'}} />
          <span style={{fontFamily: F.lat, fontWeight: 500, fontSize: 112, color: C.ink, letterSpacing: '-0.03em'}}>Devin</span>
        </div>
      </div>
      <div style={{position: 'absolute', top: 700, left: 60, right: 60}}>
        <Words text={COPY.cta.b} size={72} color={C.sky} delay={8} />
      </div>
      <div style={{position: 'absolute', top: 1010, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: l, transform: `translateY(${(1 - l) * 30}px)`}}>
        <div style={{background: '#fff', borderRadius: 30, padding: '22px 46px', boxShadow: '0 30px 70px -20px rgba(0,0,0,0.8)'}}>
          <Img src={staticFile('img/ea4-logo-full.png')} style={{width: 260, display: 'block'}} />
        </div>
      </div>
      <div style={{position: 'absolute', top: 1290, left: 60, right: 60}}>
        <Words text={COPY.cta.c} size={46} color={C.muted} delay={34} stagger={1.5} />
      </div>
    </AbsoluteFill>
  );
};
