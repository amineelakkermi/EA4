import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, GRAD, shadow, scene, sec, OVERLAP, SceneId} from './config';
import {COPY} from './copy';
import {sp, springs, clamp, ease, prog, lerp} from '../anim';
import {Words, StepHeader, Card, Bar, Icon, IconBadge, Pill, Alert, Meter, Num, IconName} from './components';

/** absolute timeline seconds -> local frame of a scene's Sequence */
export const L = (id: SceneId, abs: number) => sec(abs) - (scene(id).from - (id === 'hook' ? 0 : OVERLAP));
const dur = (id: SceneId) => scene(id).duration + (id === 'hook' ? 0 : OVERLAP);
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

const ArrowL: React.FC<{size?: number; color?: string; p?: number}> = ({size = 44, color = C.dim, p = 1}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{opacity: p, transform: `translateX(${(1 - p) * 14}px)`}}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

/* ---------------- 00 HOOK ---------------- */

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const H = COPY.hook;
  const D = dur('hook');
  const warnAt = L('hook', 4.1);
  const cam = interpolate(f, [0, D], [1.0, 1.07], {...clamp, easing: ease.soft});
  const camY = interpolate(f, [0, D], [30, -20], clamp);
  const win = sp(f, fps, 0, springs.smooth);
  const warn = prog(f, warnAt, warnAt + 14);
  const pulse = 0.5 + 0.5 * Math.sin((f - warnAt) / 5);
  const count = (v: number) => fmt(v * prog(f, 4, 50, ease.inOut));
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 250, left: 40, right: 40}}>
        <Words text={H.a} size={88} color={C.navy} delay={1} stagger={3} lh={1.35} />
      </div>
      <div style={{position: 'absolute', top: 400, left: 40, right: 40}}>
        <Words text={H.b} size={66} color={C.ink2} hi={['آمن؟']} hiColor={C.red} delay={L('hook', 3.7)} stagger={2.6} lh={1.4} />
      </div>
      <div style={{position: 'absolute', left: 64, right: 64, top: 600, height: 1000, transform: `translateY(${camY + (1 - win) * 260}px) scale(${cam})`, opacity: Math.min(1, win * 1.4), transformOrigin: '50% 30%'}}>
        <div style={{position: 'absolute', inset: 0, borderRadius: 40, background: C.white, boxShadow: warn > 0 ? `${shadow.card}, 0 0 0 ${3 * warn}px rgba(224,71,63,${0.35 * warn})` : shadow.card, overflow: 'hidden'}}>
          {/* browser chrome */}
          <div dir="ltr" style={{height: 96, background: C.surface, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 30px'}}>
            <div style={{display: 'flex', gap: 12}}>
              {['#E6E8EE', '#E6E8EE', '#E6E8EE'].map((c, i) => <div key={i} style={{width: 20, height: 20, borderRadius: 20, background: c}} />)}
            </div>
            <div style={{flex: 1, height: 56, borderRadius: 56, background: C.white, border: `1.5px solid ${warn > 0.5 ? 'rgba(224,71,63,0.35)' : C.line}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px'}}>
              <div style={{position: 'relative', width: 30, height: 30}}>
                <Icon name="lock" size={30} color={C.green} sw={2.2} style={{position: 'absolute', opacity: 1 - warn}} />
                <Icon name="unlock" size={30} color={C.red} sw={2.2} style={{position: 'absolute', opacity: warn}} />
              </div>
              <Bar w={300} h={14} color="#E3E6EE" />
            </div>
          </div>
          {/* page */}
          <div dir="rtl" style={{padding: '30px 40px', display: 'flex', flexDirection: 'column', gap: 30}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', gap: 30, fontSize: 28, color: C.ink2}}>
                {H.nav.map((n) => <span key={n}>{n}</span>)}
              </div>
              <Bar w={120} h={44} color={C.blueSoft} />
            </div>
            <div style={{height: 380, borderRadius: 30, background: `linear-gradient(135deg, ${C.navy} 0%, #1D2C78 55%, #4A33B8 100%)`, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 50px', gap: 22}}>
              <div style={{position: 'absolute', width: 520, height: 520, left: -140, top: -200, borderRadius: 520, background: 'radial-gradient(circle, rgba(123,77,255,0.55), rgba(123,77,255,0) 65%)', transform: `translateX(${f * 0.6}px)`}} />
              <span style={{fontSize: 64, color: '#fff', lineHeight: 1.3, position: 'relative'}}>{H.hero}</span>
              <Bar w={420} h={16} color="rgba(255,255,255,0.28)" style={{position: 'relative'}} />
              <Bar w={300} h={16} color="rgba(255,255,255,0.18)" style={{position: 'relative'}} />
              <div style={{marginTop: 10, alignSelf: 'flex-start', padding: '14px 40px', borderRadius: 999, background: '#fff', color: C.navy, fontSize: 30, position: 'relative'}}>{H.cta}</div>
            </div>
            <div style={{display: 'flex', gap: 24}}>
              {H.stats.map((s, i) => (
                <div key={i} style={{flex: 1, borderRadius: 26, border: `1.5px solid ${C.line}`, padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 6}}>
                  <span style={{fontSize: 26, color: C.muted}}>{s.label}</span>
                  <span style={{fontSize: 60, color: C.navy, lineHeight: 1.25}}>{count(s.v)}</span>
                </div>
              ))}
              <div style={{flex: 1, borderRadius: 26, border: `1.5px solid ${C.line}`, padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 6}}>
                <span style={{fontSize: 26, color: C.muted}}>{H.server}</span>
                <span style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 44, color: C.green, lineHeight: 1.6}}>
                  <span style={{width: 18, height: 18, borderRadius: 18, background: C.green, boxShadow: `0 0 0 ${6 + 4 * Math.sin(f / 6)}px rgba(23,163,107,0.15)`}} />
                  {H.online}
                </span>
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
              <Bar w="92%" /><Bar w="78%" /><Bar w="85%" />
            </div>
          </div>
        </div>
        {/* small security warning */}
        <div dir="rtl" style={{position: 'absolute', left: 40, bottom: 44, display: 'flex', alignItems: 'center', gap: 18, padding: '18px 26px', borderRadius: 24, background: 'rgba(255,255,255,0.98)', boxShadow: shadow.red, border: '1.5px solid rgba(224,71,63,0.22)', opacity: warn, transform: `translateY(${(1 - warn) * 40}px) translateX(${f - warnAt > 1 && f - warnAt < 10 ? Math.sin(f * 8) * 5 : 0}px)`}}>
          <div style={{position: 'relative', width: 60, height: 60, borderRadius: 18, background: C.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="alert" size={34} color={C.red} sw={2.2} />
            <span style={{position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: 18, background: C.red, boxShadow: `0 0 0 ${5 * pulse}px rgba(224,71,63,0.18)`}} />
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontSize: 32, color: C.red, lineHeight: 1.3}}>{H.warnTitle}</span>
            <span style={{fontSize: 25, color: C.muted, lineHeight: 1.3}}>{H.warnBody}</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- 01 PASSWORDS ---------------- */

const Field: React.FC<{label: string; children: React.ReactNode; focus?: number; tone?: string}> = ({label, children, focus = 0, tone = C.blue}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
    <span style={{fontSize: 28, color: C.muted}}>{label}</span>
    <div style={{height: 100, borderRadius: 24, border: `2px solid ${focus > 0 ? tone : C.line}`, boxShadow: focus > 0 ? `0 0 0 ${6 * focus}px ${tone === C.red ? 'rgba(224,71,63,0.10)' : 'rgba(51,85,255,0.10)'}` : undefined, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', fontSize: 40, color: C.ink}}>
      {children}
    </div>
  </div>
);

export const Passwords: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const P = COPY.passwords;
  const typeA = L('passwords', 9.4);
  const typed = Math.max(0, Math.min(P.passV.length, Math.floor((f - typeA) / 3.5)));
  const reveal = prog(f, L('passwords', 11.1), L('passwords', 11.5));
  const meter = 0.25 * prog(f, typeA + 4, typeA + 24);
  const alertAt = L('passwords', 12.9);
  const riskAt = L('passwords', 14.6);
  const risk = sp(f, fps, riskAt, springs.snappy);
  const focus = prog(f, typeA - 6, typeA);
  const caret = typed < P.passV.length && f > typeA - 6 && Math.floor(f / 8) % 2 === 0;
  return (
    <AbsoluteFill>
      <StepHeader n={P.n} title={P.title} sub={P.sub} hi={['وصول', 'غير', 'مصرح', 'به.']} />
      <Card delay={10} style={{left: 110, right: 110, top: 640, height: 900}}>
        <div dir="rtl" style={{padding: '52px 60px', display: 'flex', flexDirection: 'column', gap: 34}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <IconBadge name="lock" color="#fff" bg={GRAD} size={92} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontSize: 48, color: C.navy, lineHeight: 1.3}}>{P.login}</span>
              <span style={{fontSize: 28, color: C.muted, lineHeight: 1.3}}>{P.panel}</span>
            </div>
          </div>
          <Field label={P.user}><span>{P.userV}</span><Icon name="user" size={38} color={C.dim} /></Field>
          <Field label={P.pass} focus={focus} tone={risk > 0.5 ? C.red : C.blue}>
            <span dir="ltr" style={{display: 'flex', alignItems: 'center', gap: 10, letterSpacing: reveal > 0.5 ? 6 : 0}}>
              {reveal > 0.5 ? <span style={{opacity: reveal, fontSize: 46}}>{P.passV.slice(0, typed)}</span> : Array.from({length: typed}, (_, i) => <span key={i} style={{width: 18, height: 18, borderRadius: 18, background: C.ink, display: 'inline-block'}} />)}
              {caret ? <span style={{width: 3, height: 46, background: C.blue}} /> : null}
            </span>
            <Icon name="eye" size={40} color={reveal > 0.5 ? C.blue : C.dim} />
          </Field>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontSize: 28, color: C.muted}}>{P.strength}</span>
              <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: prog(f, typeA + 10, typeA + 20)}}>
                <Pill text={P.weak} color={C.amber} bg={C.amberSoft} size={28} />
                <ArrowL size={40} p={risk} color={C.dim} />
                <span style={{opacity: Math.min(1, risk * 1.4), transform: `scale(${0.8 + 0.2 * risk})`, display: 'inline-block'}}>
                  <Pill text={P.risk} color={C.red} bg={C.redSoft} icon="alert" size={28} />
                </span>
              </div>
            </div>
            <Meter v={meter} color={risk > 0.3 ? C.red : C.amber} />
          </div>
          <div style={{marginTop: 14, height: 104, borderRadius: 26, background: GRAD, color: '#fff', fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: shadow.blue}}>{P.enter}</div>
        </div>
      </Card>
      <Alert title={P.alertT} body={P.alertB} at={alertAt} style={{left: 70, right: 70, top: 1470}} />
    </AbsoluteFill>
  );
};

/* ---------------- 02 UPDATES ---------------- */

export const Updates: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const U = COPY.updates;
  const pendAt = L('updates', 18.8);
  const alertAt = L('updates', 22.6);
  const updAt = L('updates', 24.5);
  const alertOut = prog(f, updAt - 4, updAt + 6);
  const press = f >= updAt - 6 && f < updAt ? 1 : 0;
  const allDone = prog(f, updAt + 4 * 7 + 12, updAt + 4 * 7 + 22);
  return (
    <AbsoluteFill>
      <StepHeader n={U.n} title={U.title} sub={U.sub} hi={['ثغرات', 'معروفة.']} />
      <Card delay={8} style={{left: 60, right: 60, top: 640, height: 920}}>
        <div dir="rtl" style={{padding: '40px 44px', display: 'flex', flexDirection: 'column', gap: 26}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <IconBadge name="grid" color="#fff" bg={GRAD} size={80} />
              <span style={{fontSize: 42, color: C.navy}}>{U.head}</span>
            </div>
            <div style={{position: 'relative'}}>
              <span style={{opacity: 1 - allDone, display: 'inline-block'}}><Pill text={`${U.pending} 4`} color={C.amber} bg={C.amberSoft} icon="clock" size={28} /></span>
              <span style={{position: 'absolute', left: 0, top: 0, opacity: allDone, transform: `scale(${0.85 + 0.15 * allDone})`}}><Pill text={U.protected} color={C.green} bg={C.greenSoft} icon="shield" size={28} /></span>
            </div>
          </div>
          <div style={{height: 1.5, background: C.line}} />
          {U.items.map((it, i) => {
            const p = sp(f, fps, 16 + i * 6, springs.smooth);
            const hi = prog(f, pendAt + i * 4, pendAt + i * 4 + 10);
            const a = updAt + i * 7;
            const up = prog(f, a, a + 16, ease.inOut);
            const done = up >= 1;
            const flag = f >= alertAt && f < updAt ? 0.5 + 0.5 * Math.sin((f - alertAt) / 4) : 0;
            return (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '20px 24px', borderRadius: 26, background: done ? 'rgba(23,163,107,0.05)' : hi > 0 ? `rgba(229,154,26,${0.06 * hi})` : C.surface, border: `1.5px solid ${done ? 'rgba(23,163,107,0.25)' : flag > 0 ? `rgba(224,71,63,${0.15 + 0.2 * flag})` : C.line}`, opacity: Math.min(1, p * 1.4), transform: `translateX(${(1 - p) * -80}px)`}}>
                <IconBadge name={i === 0 ? 'grid' : 'plug'} color={done ? C.green : C.ink2} bg={done ? C.greenSoft : C.soft} size={72} />
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 8}}>
                  <span style={{fontSize: 34, color: C.ink, lineHeight: 1.3}}>{it.name}</span>
                  <span style={{fontSize: 25, color: C.muted, display: 'flex', alignItems: 'center', gap: 10}}>
                    {U.version} <Num>{done ? it.to : it.from}</Num>
                  </span>
                  {up > 0 && !done ? <div style={{height: 10, borderRadius: 10, background: C.soft, overflow: 'hidden'}}><div style={{width: `${up * 100}%`, height: '100%', background: GRAD}} /></div> : null}
                </div>
                {done ? (
                  <Pill text={U.done} color={C.green} bg={C.greenSoft} icon="check" size={27} />
                ) : up > 0 ? (
                  <Pill text={U.updating} color={C.blue} bg={C.blueSoft} icon="refresh" size={27} />
                ) : (
                  <span style={{opacity: 0.4 + 0.6 * hi}}><Pill text={U.old} color={hi > 0.5 ? C.amber : C.muted} bg={hi > 0.5 ? C.amberSoft : C.soft} icon="clock" size={27} /></span>
                )}
              </div>
            );
          })}
          <div style={{alignSelf: 'center', marginTop: 6, padding: '22px 70px', borderRadius: 999, background: GRAD, color: '#fff', fontSize: 36, boxShadow: shadow.blue, display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${1 - press * 0.05})`, opacity: 1 - allDone * 0.4}}>
            <Icon name="refresh" size={38} color="#fff" sw={2.4} style={{transform: `rotate(${prog(f, updAt, updAt + 50) * 720}deg)`}} />
            {U.updateAll}
          </div>
        </div>
      </Card>
      <div style={{opacity: 1 - alertOut}}>
        <Alert title={U.alertT} body={U.alertB} at={alertAt} style={{left: 90, right: 90, top: 1585}} />
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- 03 PERMISSIONS ---------------- */

export const Permissions: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const P = COPY.permissions;
  const flagAt = L('permissions', 30.3);
  const alertAt = L('permissions', 32.6);
  const flag = sp(f, fps, flagAt, springs.smooth);
  const roleCol = (tone: string): [string, string] => (tone === 'purple' ? [C.purple, C.purpleSoft] : tone === 'blue' ? [C.blue, C.blueSoft] : tone === 'flag' ? [C.purple, C.purpleSoft] : [C.muted, C.soft]);
  return (
    <AbsoluteFill>
      <StepHeader n={P.n} title={P.title} sub={P.sub} hi={['المدير.']} size={62} />
      <Card delay={8} style={{left: 60, right: 60, top: 600, height: 960}}>
        <div dir="rtl" style={{padding: '40px 44px', display: 'flex', flexDirection: 'column', gap: 20}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <IconBadge name="users" color="#fff" bg={GRAD} size={80} />
              <span style={{fontSize: 42, color: C.navy}}>{P.head}</span>
            </div>
            <Pill text={P.count} color={C.ink2} bg={C.soft} size={27} />
          </div>
          <div style={{height: 1.5, background: C.line, marginBottom: 4}} />
          {P.users.map((u, i) => {
            const p = sp(f, fps, 14 + i * 5, springs.smooth);
            const me = u.tone === 'flag';
            const dim = me ? 0 : flag * 0.45;
            const [rc, rb] = me ? [lerp(0, 1, flag) > 0.5 ? C.red : C.purple, flag > 0.5 ? C.redSoft : C.purpleSoft] : roleCol(u.tone);
            return (
              <div key={i} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 22, padding: '18px 24px', borderRadius: 26, background: me && flag > 0 ? `rgba(224,71,63,${0.05 * flag})` : C.surface, border: `${me ? 1.5 + 1.5 * flag : 1.5}px solid ${me && flag > 0 ? `rgba(224,71,63,${0.2 + 0.35 * flag})` : C.line}`, opacity: Math.min(1, p * 1.4) * (1 - dim), transform: `translateY(${(1 - p) * 60}px) scale(${me ? 1 + 0.03 * flag : 1 - 0.01 * flag})`, boxShadow: me && flag > 0 ? `0 24px 50px -24px rgba(224,71,63,${0.5 * flag})` : undefined}}>
                <div style={{width: 76, height: 76, borderRadius: 76, background: i % 2 ? C.purpleSoft : C.blueSoft, color: i % 2 ? C.purple : C.blue, fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{u.name[0]}</div>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 2}}>
                  <span style={{fontSize: 34, color: C.ink, lineHeight: 1.3}}>{u.name}</span>
                  <span style={{fontSize: 25, color: C.muted, lineHeight: 1.3}}>{u.job}</span>
                </div>
                <Pill text={u.role} color={rc} bg={rb} icon={u.role === 'مدير' ? 'crown' : u.role === 'مساهم' ? 'user' : 'eye'} size={27} />
                {me ? (
                  <div style={{position: 'absolute', left: 24, top: -22, opacity: flag, transform: `translateY(${(1 - flag) * 10}px)`}}>
                    <Pill text={P.flag} color="#fff" bg={C.red} icon="alert" size={22} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Card>
      <Alert title={P.alertT} body={P.alertB} at={alertAt} style={{left: 110, right: 110, top: 1500}} />
    </AbsoluteFill>
  );
};

/* ---------------- 04 BACKUPS ---------------- */

const Database: React.FC<{ok: number; f: number}> = ({ok, f}) => {
  const col = (a: string, b: string) => (ok > 0.5 ? b : a);
  const ring = (f / 90) * 360;
  return (
    <div style={{position: 'relative', width: 380, height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg width={380} height={380} viewBox="0 0 380 380" style={{position: 'absolute', inset: 0, transform: `rotate(${ring}deg)`}}>
        <circle cx={190} cy={190} r={176} fill="none" stroke={col('rgba(224,71,63,0.30)', 'rgba(51,85,255,0.35)')} strokeWidth={3} strokeDasharray="6 16" strokeLinecap="round" />
      </svg>
      <div style={{position: 'absolute', width: 300, height: 300, borderRadius: 300, background: col('radial-gradient(circle, rgba(224,71,63,0.12), rgba(224,71,63,0) 70%)', 'radial-gradient(circle, rgba(123,77,255,0.18), rgba(123,77,255,0) 70%)')}} />
      <svg width={220} height={240} viewBox="0 0 220 240">
        <defs>
          <linearGradient id="dbg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={col('#F4F5F8', C.blue)} />
            <stop offset="1" stopColor={col('#E1E4EC', C.purple)} />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(0 ${150 - k * 62})`}>
            <path d="M14 30 v40 a96 26 0 0 0 192 0 v-40" fill="url(#dbg)" stroke={col(C.dim, 'rgba(255,255,255,0.6)')} strokeWidth={3} />
            <ellipse cx={110} cy={30} rx={96} ry={26} fill={col('#FFFFFF', '#5B6BFF')} stroke={col(C.dim, 'rgba(255,255,255,0.7)')} strokeWidth={3} />
            <circle cx={176} cy={56} r={6} fill={col(k === 1 ? C.red : C.dim, '#fff')} />
          </g>
        ))}
      </svg>
    </div>
  );
};

export const Backups: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const B = COPY.backups;
  const warnAt = L('backups', 36.7);
  const runAt = L('backups', 39.3);
  const okAt = L('backups', 41.6);
  const readyAt = L('backups', 43.2);
  const run = prog(f, runAt, okAt, ease.inOut);
  const ok = prog(f, okAt, okAt + 10);
  const ready = sp(f, fps, readyAt, springs.snappy);
  const warn = sp(f, fps, warnAt, springs.snappy);
  const t = f - warnAt;
  const jit = t > 1 && t < 10 ? Math.sin(t * 9) * 6 : 0;
  const db = sp(f, fps, 8, springs.gentle);
  return (
    <AbsoluteFill>
      <StepHeader n={B.n} title={B.title} sub={B.sub} hi={['تخسر', 'بيانات', 'مهمة.']} />
      <div style={{position: 'absolute', top: 580, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: Math.min(1, db * 1.4), transform: `translateY(${(1 - db) * 80}px)`}}>
        <Database ok={ok} f={f} />
        <span style={{fontSize: 30, color: C.muted}}>{B.db}</span>
      </div>
      <Card delay={16} style={{left: 90, right: 90, top: 1060, height: 400}}>
        <div dir="rtl" style={{padding: '38px 46px', display: 'flex', flexDirection: 'column', gap: 24}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <IconBadge name="cloud" color="#fff" bg={GRAD} size={76} />
            <span style={{fontSize: 40, color: C.navy}}>{B.head}</span>
          </div>
          <div style={{height: 1.5, background: C.line}} />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
              <span style={{fontSize: 27, color: C.muted}}>{run > 0 && ok < 1 ? B.running : B.last}</span>
              <span style={{fontSize: 42, color: ok > 0.5 ? C.green : warn > 0.5 ? C.red : C.ink, lineHeight: 1.3}}>{ok > 0.5 ? B.newV : B.oldV}</span>
            </div>
            {ok > 0.5 ? (
              <span style={{transform: `scale(${0.8 + 0.2 * ok})`, display: 'inline-block'}}><Pill text={B.ok} color={C.green} bg={C.greenSoft} icon="check" size={30} /></span>
            ) : run > 0 ? (
              <span style={{fontSize: 44, color: C.blue}}><Num>{`${Math.round(run * 100)}%`}</Num></span>
            ) : (
              <span style={{opacity: Math.min(1, warn * 1.5), transform: `translateX(${jit}px) scale(${0.8 + 0.2 * warn})`, display: 'inline-block'}}><Pill text={B.old} color={C.red} bg={C.redSoft} icon="alert" size={30} /></span>
            )}
          </div>
          <div style={{height: 14, borderRadius: 14, background: C.soft, overflow: 'hidden', display: 'flex'}}>
            <div style={{width: `${(run > 0 ? run : 0.12) * 100}%`, height: '100%', borderRadius: 14, background: run > 0 ? (ok > 0.5 ? C.green : GRAD) : C.red, opacity: run > 0 ? 1 : 0.7 * warn}} />
          </div>
        </div>
      </Card>
      <div style={{position: 'absolute', top: 1500, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: Math.min(1, ready * 1.5), transform: `translateY(${(1 - ready) * 40}px) scale(${0.85 + 0.15 * ready})`}}>
        <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 18, padding: '22px 44px', borderRadius: 999, background: C.white, boxShadow: `${shadow.soft}, 0 0 0 ${2 + 8 * (0.5 + 0.5 * Math.sin((f - readyAt) / 6)) * ready}px rgba(23,163,107,0.12)`, fontSize: 40, color: C.green}}>
          <Icon name="restore" size={46} color={C.green} sw={2.3} />
          {B.ready}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- 05 SOLUTION + FINAL ---------------- */

export const POINT_AT = [48.8, 51.75, 53.9, 55.95] as const;
export const FINAL_AT = 59.3;

export const Solution: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const S = COPY.solution;
  const fin = L('solution', FINAL_AT);
  const out = prog(f, fin - 14, fin + 4, ease.in);
  const t = sp(f, fps, 4, springs.snappy);
  const fp = sp(f, fps, fin + 6, springs.gentle);
  const ring = prog(f, fin, fin + 36, ease.inOut);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: 1 - out, transform: `translateY(${-out * 60}px)`, filter: out > 0.02 ? `blur(${out * 10}px)` : undefined}}>
        <div style={{position: 'absolute', top: 270, left: 40, right: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
          <Words text={S.title} size={96} color={C.navy} delay={2} stagger={3} lh={1.3} />
          <div style={{width: 200 * t, height: 8, borderRadius: 8, background: GRAD}} />
        </div>
        <div style={{position: 'absolute', top: 560, left: 70, right: 70, display: 'flex', flexDirection: 'column', gap: 30}}>
          {S.points.map((pt, i) => {
            const a = L('solution', POINT_AT[i]);
            const p = sp(f, fps, a, springs.smooth);
            const chk = prog(f, a + 8, a + 20);
            return (
              <div key={i} dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 28, padding: '32px 36px', borderRadius: 34, background: C.white, boxShadow: shadow.soft, opacity: Math.min(1, p * 1.4), transform: `translateX(${(1 - p) * 120}px)`, filter: p < 0.95 ? `blur(${(1 - p) * 8}px)` : undefined}}>
                <IconBadge name={pt.icon as IconName} color="#fff" bg={GRAD} size={100} />
                <span style={{flex: 1, fontSize: 44, color: C.navy, lineHeight: 1.4}}>{pt.t}</span>
                <div style={{width: 64, height: 64, borderRadius: 64, background: C.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.5 + 0.5 * chk})`, opacity: chk}}>
                  <Icon name="check" size={38} color={C.green} sw={2.8} />
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      {f >= fin - 4 ? (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'absolute', top: 560, width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: Math.min(1, fp * 1.4), transform: `scale(${0.8 + 0.2 * fp})`}}>
            <div style={{position: 'absolute', width: 420, height: 420, borderRadius: 420, background: 'radial-gradient(circle, rgba(123,77,255,0.20), rgba(51,85,255,0) 68%)'}} />
            <svg width={300} height={300} viewBox="0 0 300 300" style={{position: 'absolute'}}>
              <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C.blue} /><stop offset="1" stopColor={C.purple} /></linearGradient></defs>
              <circle cx={150} cy={150} r={140} fill="none" stroke="url(#rg)" strokeWidth={5} strokeLinecap="round" strokeDasharray={2 * Math.PI * 140} strokeDashoffset={2 * Math.PI * 140 * (1 - ring)} transform="rotate(-90 150 150)" />
            </svg>
            <div style={{width: 200, height: 200, borderRadius: 60, background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: shadow.blue}}>
              <Icon name="shield" size={120} color="#fff" sw={1.8} />
            </div>
          </div>
          <div style={{position: 'absolute', top: 960, left: 70, right: 70, transform: `scale(${1.04 - 0.04 * prog(f, fin + 10, fin + 70)})`}}>
            <Words text={S.final} size={80} color={C.navy} hi={['بحماية', 'موقعك.']} hiColor={C.purple} delay={fin + 14} stagger={3.2} lh={1.5} />
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
