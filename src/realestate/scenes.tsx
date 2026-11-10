import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, LAYOUT, shadow, scene} from './config';
import {COPY} from './copy';
import {sp, springs, clamp, ease, prog, lerp} from '../anim';
import {Words, StepHeader, Panel, Photo, Icon, WaIcon, Star, Cursor, Num, Sqm, fmtInt, drift} from './components';

const PW = 1080 - LAYOUT.side * 2; // panel width 984
const PH = LAYOUT.panelBottom - LAYOUT.panelTop; // 1150

/* ---------------- shared site pieces ---------------- */

const SiteNav: React.FC<{dark?: boolean; size?: number}> = ({dark = true, size = 1}) => {
  const col = dark ? '#fff' : C.ink;
  return (
    <div dir="rtl" style={{position: 'absolute', top: 0, left: 0, right: 0, height: 110 * size, padding: `0 ${40 * size}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 3}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14 * size}}>
        <Icon name="home" size={40 * size} color={dark ? '#fff' : C.blue} sw={2.2} />
        <span style={{fontSize: 38 * size, color: col}}>{COPY.brand}</span>
      </div>
      <div style={{display: 'flex', gap: 30 * size, fontSize: 28 * size, color: col, opacity: 0.92}}>
        {COPY.nav.map((n) => <span key={n}>{n}</span>)}
      </div>
    </div>
  );
};

const Spec: React.FC<{icon: 'bed' | 'bath' | 'area'; v: string; size?: number}> = ({icon, v, size = 24}) => (
  <span style={{display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: size, color: C.muted}}>
    <Icon name={icon} size={size * 1.2} color={C.muted} />
    {icon === 'area' ? <Sqm v={v} unit={COPY.details.unit} size={size} /> : v}
  </span>
);

type Item = (typeof COPY.gallery.items)[number];
const PropertyCard: React.FC<{it: Item; w: number; ph: number; big?: boolean; p?: number; par?: number; badge?: boolean}> = ({it, w, ph, big, p = 1, par = 0, badge}) => {
  const s = big ? 1.25 : 1;
  return (
    <div dir="rtl" style={{width: w, borderRadius: 28, background: C.white, boxShadow: shadow.soft, overflow: 'hidden', opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 90}px) scale(${0.94 + 0.06 * p})`}}>
      <div style={{position: 'relative'}}>
        <Photo name={it.img} style={{width: w, height: ph}} zoom={[1.12, 1.2]} dy={par} />
        {badge ? <div style={{position: 'absolute', top: 22, right: 22, padding: '6px 22px', borderRadius: 999, background: C.blue, color: '#fff', fontSize: 26}}>{COPY.gallery.isNew}</div> : null}
        <div style={{position: 'absolute', top: 20, left: 20, width: 58, height: 58, borderRadius: 58, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="heart" size={30} color={C.ink2} /></div>
      </div>
      <div style={{padding: `${18 * s}px ${24 * s}px ${22 * s}px`, display: 'flex', flexDirection: 'column', gap: 6 * s}}>
        <span style={{fontSize: 34 * s, color: C.blue, lineHeight: 1.3}}>{it.price}</span>
        <span style={{fontSize: 28 * s, color: C.ink, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'clip'}}>{it.name}</span>
        <span style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 22 * s, color: C.muted}}><Icon name="pin" size={24 * s} color={C.muted} />{it.loc}</span>
        {big ? (
          <div style={{display: 'flex', gap: 34, marginTop: 8}}>
            <Spec icon="bed" v={it.beds} size={26} />
            <Spec icon="bath" v={it.baths} size={26} />
            <Spec icon="area" v={it.area} size={26} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

/* ---------------- HOOK ---------------- */

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dur = scene('hook').duration;
  const cam = interpolate(f, [0, dur], [1.0, 1.1], {...clamp, easing: ease.soft});
  const count = Math.round(1000 * prog(f, 0, 62, ease.inOut));
  const wIn = sp(f, fps, 4, springs.gentle);
  const zero = sp(f, fps, 14, springs.gentle);
  const shake = f > 64 && f < 82 ? Math.sin(f * 2.2) * 6 * (1 - (f - 64) / 18) : 0;
  const spark = prog(f, 0, 62, ease.inOut);
  const pts = Array.from({length: 13}, (_, i) => {
    const x = (i / 12) * 360;
    const y = 120 - Math.pow(i / 12, 1.7) * 105 - (i % 2 ? 6 : 0);
    return `${x},${y}`;
  });
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 282, left: 30, right: 30}}>
        <Words text={COPY.hook.a} size={96} hi={['1000']} delay={3} stagger={3} lh={1.3} />
      </div>
      <div style={{position: 'absolute', top: 440, left: 50, right: 50}}>
        <Words text={COPY.hook.b} size={56} color={C.ink2} hi={['فرص', 'البيع!']} delay={58} stagger={2.6} lh={1.35} />
      </div>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${cam})`, transformOrigin: '50% 600px'}}>
        <Panel top={600} bottom={1800} style={{transform: undefined, opacity: 1}}>
          <Photo name="villa-pool" style={{position: 'absolute', inset: 0}} zoom={[1.18, 1.05]} dur={dur} />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,14,22,0.55) 0%, rgba(10,14,22,0.15) 40%, rgba(10,14,22,0.0) 55%, rgba(10,14,22,0.55) 100%)'}} />
          <SiteNav />
          <div style={{position: 'absolute', top: 220, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: '#fff'}}>
            <span style={{fontSize: 72, textShadow: '0 6px 24px rgba(0,0,0,0.35)'}}>{COPY.hook.hero}</span>
            <span style={{fontSize: 34, opacity: 0.9}}>{COPY.hook.heroSub}</span>
            <div dir="rtl" style={{marginTop: 26, width: 760, height: 104, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px 0 40px', boxShadow: '0 20px 40px rgba(0,0,0,0.25)'}}>
              <span style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 32, color: C.muted}}><Icon name="pin" size={36} color={C.blue} />{COPY.hook.searchPh}</span>
              <div style={{width: 160, height: 78, borderRadius: 999, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="search" size={40} color="#fff" sw={2.4} /></div>
            </div>
          </div>
          {/* analytics widgets over the site */}
          <div dir="rtl" style={{position: 'absolute', left: 36, right: 36, bottom: 40, display: 'flex', gap: 24}}>
            <div style={{flex: 1, borderRadius: 30, padding: '26px 30px', background: 'rgba(255,255,255,0.94)', boxShadow: '0 24px 50px -20px rgba(0,0,0,0.45)', transform: `translateY(${(1 - wIn) * 160}px)`, opacity: Math.min(1, wIn * 1.5)}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 30, color: C.muted}}><Icon name="eye" size={34} color={C.blue} />{COPY.hook.visitors}</div>
              <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                <span style={{fontSize: 104, color: C.ink, lineHeight: 1.25}}>{count}</span>
                <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 64, background: 'rgba(22,163,74,0.12)', marginBottom: 22}}><Icon name="up" size={38} color={C.green} sw={2.6} /></span>
              </div>
              <svg width="100%" height={130} viewBox="0 0 360 130" preserveAspectRatio="none" style={{display: 'block'}}>
                <defs><linearGradient id="hk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.blue} stopOpacity="0.25" /><stop offset="1" stopColor={C.blue} stopOpacity="0" /></linearGradient></defs>
                <clipPath id="hkc"><rect x="0" y="0" width={360 * spark} height="130" /></clipPath>
                <g clipPath="url(#hkc)">
                  <polygon points={`0,130 ${pts.join(' ')} 360,130`} fill="url(#hk)" />
                  <polyline points={pts.join(' ')} fill="none" stroke={C.blue} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            <div style={{flex: 1, borderRadius: 30, padding: '26px 30px', background: 'rgba(255,255,255,0.94)', boxShadow: '0 24px 50px -20px rgba(0,0,0,0.45)', transform: `translateY(${(1 - zero) * 160}px) translateX(${shake}px)`, opacity: Math.min(1, zero * 1.5)}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 30, color: C.muted}}><Icon name="mail" size={34} color={C.red} />{COPY.hook.leads}</div>
              <span style={{fontSize: 104, color: C.red, lineHeight: 1.25, display: 'block'}}>0</span>
              <svg width="100%" height={70} viewBox="0 0 360 70" preserveAspectRatio="none" style={{display: 'block', marginTop: 10}}>
                <line x1="0" y1="50" x2={360 * spark} y2="50" stroke={C.dim} strokeWidth={5} strokeDasharray="14 12" strokeLinecap="round" />
              </svg>
              <span style={{fontSize: 26, color: C.red, opacity: prog(f, 60, 72)}}>{COPY.hook.noLeads}</span>
            </div>
          </div>
        </Panel>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- 01 GALLERY ---------------- */

export const Gallery: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dur = scene('gallery').duration;
  const G = COPY.gallery;
  const scroll = interpolate(f, [40, dur], [0, -330], {...clamp, easing: ease.inOut});
  const cw = (PW - 40 * 2 - 24) / 2;
  return (
    <AbsoluteFill>
      <StepHeader n={COPY.steps[0].n} title={COPY.steps[0].t} sub={COPY.steps[0].s} />
      <Panel delay={0} style={{background: C.bg}}>
        <div style={{position: 'absolute', inset: 0, padding: 40, transform: `translateY(${scroll}px)`}}>
          <div dir="rtl" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <span style={{fontSize: 52, color: C.ink}}>{G.title}</span>
            <span style={{fontSize: 30, color: C.blue}}>{G.all}</span>
          </div>
          <div dir="rtl" style={{display: 'flex', gap: 14, marginTop: 22}}>
            {G.tabs.map((t, i) => (
              <span key={t} style={{padding: '10px 32px', borderRadius: 999, fontSize: 28, background: i === 0 ? C.ink : C.white, color: i === 0 ? '#fff' : C.ink2, boxShadow: i === 0 ? undefined : `inset 0 0 0 1.5px ${C.line}`}}>{t}</span>
            ))}
          </div>
          <div style={{marginTop: 28}}>
            <PropertyCard it={G.items[0]} w={PW - 80} ph={430} big badge p={sp(f, fps, 6, springs.gentle)} par={-30} />
          </div>
          <div dir="rtl" style={{display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 24}}>
            {G.items.slice(1, 5).map((it, i) => (
              <PropertyCard key={it.name} it={it} w={cw} ph={260} p={sp(f, fps, 18 + i * 7, springs.gentle)} par={-20 - i * 6} />
            ))}
          </div>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ---------------- 02 DETAILS ---------------- */

export const Details: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const D = COPY.details;
  const thumbs = ['int-living', 'int-bed', 'int-glass', 'apt-kitchen'];
  const active = Math.min(3, Math.floor(interpolate(f, [30, 130], [0, 4], clamp)));
  return (
    <AbsoluteFill>
      <StepHeader n={COPY.steps[1].n} title={COPY.steps[1].t} sub={COPY.steps[1].s} size={72} />
      <Panel>
        <div style={{position: 'relative', height: 540}}>
          <Photo name="house-tree" style={{position: 'absolute', inset: 0}} zoom={[1.08, 1.18]} dx={-20} />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)'}} />
          <div dir="rtl" style={{position: 'absolute', bottom: 24, right: 28, display: 'flex', gap: 14}}>
            {thumbs.map((t, i) => {
              const p = sp(f, fps, 14 + i * 4, springs.snappy);
              return <Photo key={t} name={t} zoom={[1.05, 1.05]} style={{width: 132, height: 96, borderRadius: 16, border: `3px solid ${i === active ? '#fff' : 'rgba(255,255,255,0.35)'}`, transform: `translateY(${(1 - p) * 60}px)`, opacity: p}} />;
            })}
          </div>
          <div style={{position: 'absolute', bottom: 34, left: 30, padding: '8px 22px', borderRadius: 999, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 26}}><Num>{active + 1} / 24</Num></div>
        </div>
        <div dir="rtl" style={{padding: '30px 40px 0'}}>
          <Words text={D.title} size={52} delay={8} stagger={2} style={{justifyContent: 'flex-start'}} lh={1.3} />
          <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 30, color: C.muted, marginTop: 6, opacity: prog(f, 14, 26)}}><Icon name="pin" size={32} color={C.blue} />{D.loc}</div>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 14, opacity: prog(f, 18, 30), transform: `translateX(${(1 - prog(f, 18, 34)) * -40}px)`}}>
            <span style={{fontSize: 30, color: C.muted}}>{D.priceLabel}</span>
            <span style={{fontSize: 66, color: C.blue, lineHeight: 1.3}}>{D.price}</span>
          </div>
          <div style={{display: 'flex', gap: 18, marginTop: 20}}>
            {D.specs.map((s, i) => {
              const at = 34 + i * 10;
              const p = sp(f, fps, at, springs.bouncy);
              const ring = prog(f, at, at + 14) * (1 - prog(f, at + 18, at + 34));
              return (
                <div key={s.k} style={{flex: 1, height: 176, borderRadius: 26, background: C.soft, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, transform: `scale(${0.7 + 0.3 * p})`, opacity: Math.min(1, p * 1.5), boxShadow: `inset 0 0 0 ${3 * ring}px ${C.blue}`}}>
                  <Icon name={s.k as 'bed'} size={44} color={C.blue} />
                  <span style={{fontSize: 42, color: C.ink, lineHeight: 1.25}}>{s.k === 'area' ? <Sqm v={s.v} unit={D.unit} size={42} /> : s.v}</span>
                  <span style={{fontSize: 25, color: C.muted}}>{s.label}</span>
                </div>
              );
            })}
          </div>
          <div style={{fontSize: 32, color: C.ink, marginTop: 26, opacity: prog(f, 74, 86)}}>{D.featuresTitle}</div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 14}}>
            {D.features.map((t, i) => {
              const p = sp(f, fps, 80 + i * 5, springs.snappy);
              return (
                <span key={t} style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 999, background: C.blueSoft, color: C.ink2, fontSize: 26, opacity: p, transform: `translateY(${(1 - p) * 20}px)`}}>
                  <Icon name="check" size={26} color={C.blue} sw={2.6} />{t}
                </span>
              );
            })}
          </div>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ---------------- 03 CONTACT ---------------- */

export const CLICK_CONTACT = 54;
export const Contact: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const K = COPY.contact;
  const btnY = 945;
  const cx = interpolate(f, [12, CLICK_CONTACT - 6], [880, 560], {...clamp, easing: ease.inOut});
  const cy = interpolate(f, [12, CLICK_CONTACT - 6], [1120, btnY + 75], {...clamp, easing: ease.inOut});
  const press = prog(f, CLICK_CONTACT - 4, CLICK_CONTACT, ease.out) * (1 - prog(f, CLICK_CONTACT + 2, CLICK_CONTACT + 8));
  const ripple = interpolate(f, [CLICK_CONTACT, CLICK_CONTACT + 16], [0, 1], clamp);
  const chat = sp(f, fps, CLICK_CONTACT + 10, springs.gentle);
  const pulse = 1 + 0.03 * Math.sin(f / 4) * (1 - prog(f, CLICK_CONTACT - 10, CLICK_CONTACT));
  const msg = (at: number) => sp(f, fps, at, springs.snappy);
  const m1 = msg(CLICK_CONTACT + 30);
  const typing = f > CLICK_CONTACT + 50 && f < CLICK_CONTACT + 76;
  const m2 = msg(CLICK_CONTACT + 76);
  const m3 = msg(CLICK_CONTACT + 108);
  const ticks = (
    <svg width={30} height={20} viewBox="0 0 30 20"><path d="M2 11l5 5L17 5M12 15l1.5 1.5L24 5" fill="none" stroke="#53BDEB" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  const bubble = (side: 'out' | 'in', p: number, children: React.ReactNode, time: string) => (
    <div style={{display: 'flex', justifyContent: side === 'out' ? 'flex-end' : 'flex-start', opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 40}px) scale(${0.9 + 0.1 * p})`, transformOrigin: side === 'out' ? '0% 100%' : '100% 100%'}}>
      <div dir="rtl" style={{maxWidth: 680, padding: '18px 24px 12px', borderRadius: 26, background: side === 'out' ? C.waOut : '#fff', boxShadow: '0 2px 2px rgba(0,0,0,0.08)', fontSize: 32, lineHeight: 1.45, color: '#111B21'}}>
        {children}
        <div dir="ltr" style={{display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-start', fontSize: 22, color: '#667781', marginTop: 4}}>{time}{side === 'out' ? ticks : null}</div>
      </div>
    </div>
  );
  return (
    <AbsoluteFill>
      <StepHeader n={COPY.steps[2].n} title={COPY.steps[2].t} sub={COPY.steps[2].s} />
      <Panel>
        <Photo name="villa-modern" style={{height: 500}} zoom={[1.06, 1.14]} dur={120} />
        <div dir="rtl" style={{padding: '30px 40px'}}>
          <div style={{fontSize: 50, color: C.ink, lineHeight: 1.3}}>{K.title}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 30, color: C.muted, marginTop: 6}}><Icon name="pin" size={32} color={C.blue} />{K.loc}</div>
          <div style={{fontSize: 60, color: C.blue, marginTop: 10, lineHeight: 1.3}}>{K.price}</div>
          <div style={{fontSize: 30, color: C.muted, marginTop: 8, lineHeight: 1.5}}>{K.desc}</div>
        </div>
        <div dir="rtl" style={{position: 'absolute', top: btnY, left: 40, right: 40, height: 150, borderRadius: 32, background: C.wa, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, color: '#fff', fontSize: 48, boxShadow: `0 26px 50px -18px rgba(37,211,102,${0.75 * pulse - 0.1})`, transform: `scale(${pulse * (1 - press * 0.05)})`}}>
          <WaIcon size={64} />
          {K.cta}
        </div>
        <Cursor x={cx} y={cy} press={press} ripple={f >= CLICK_CONTACT ? ripple : -1} opacity={1 - prog(f, CLICK_CONTACT + 8, CLICK_CONTACT + 14)} />
        {/* WhatsApp chat sheet */}
        <div style={{position: 'absolute', inset: 0, background: C.waBg, transform: `translateY(${(1 - chat) * PH}px)`, display: 'flex', flexDirection: 'column'}}>
          <div dir="rtl" style={{height: 150, background: C.waDark, display: 'flex', alignItems: 'center', gap: 22, padding: '0 34px', color: '#fff'}}>
            <Icon name="back" size={40} color="#fff" sw={2.4} />
            <div style={{width: 92, height: 92, borderRadius: 92, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="home" size={50} color={C.blue} sw={2.2} /></div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontSize: 40}}>{COPY.brand}</span>
              <span style={{fontSize: 26, opacity: 0.85}}>{typing ? '...' : K.online}</span>
            </div>
            <div style={{flex: 1}} />
            <Icon name="phone" size={40} color="#fff" />
          </div>
          <div style={{flex: 1, padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 22, backgroundImage: 'radial-gradient(rgba(0,0,0,0.035) 2px, transparent 2px)', backgroundSize: '34px 34px'}}>
            {bubble('out', m1, (
              <>
                <div dir="rtl" style={{display: 'flex', gap: 16, alignItems: 'center', padding: 10, borderRadius: 18, background: 'rgba(0,0,0,0.05)', marginBottom: 10}}>
                  <Photo name="villa-modern" zoom={[1.1, 1.1]} style={{width: 120, height: 96, borderRadius: 12}} />
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span style={{fontSize: 28}}>{K.title}</span>
                    <span style={{fontSize: 26, color: C.blue}}>{K.price}</span>
                  </div>
                </div>
                {K.m1}
              </>
            ), K.t1)}
            {typing ? (
              <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                <div style={{display: 'flex', gap: 10, padding: '24px 30px', borderRadius: 26, background: '#fff'}}>
                  {[0, 1, 2].map((k) => <span key={k} style={{width: 16, height: 16, borderRadius: 16, background: '#8696A0', opacity: 0.4 + 0.6 * Math.max(0, Math.sin((f - k * 4) / 3))}} />)}
                </div>
              </div>
            ) : null}
            {f >= CLICK_CONTACT + 76 ? bubble('in', m2, K.m2, K.t2) : null}
            {bubble('out', m3, K.m3, K.t2)}
          </div>
          <div dir="rtl" style={{height: 130, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 18}}>
            <div style={{flex: 1, height: 92, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 34px', fontSize: 30, color: '#8696A0'}}>{K.input}</div>
            <div style={{width: 92, height: 92, borderRadius: 92, background: C.waDark, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="mic" size={44} color="#fff" /></div>
          </div>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ---------------- 04 SEARCH ---------------- */

export const SEARCH_CLICKS = [30, 52, 92, 112];
export const Search: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const S = COPY.search;
  const inner = PW - 80; // 904
  const optW = (inner - 3 * 12) / 4;
  const typeX = (i: number) => 40 + inner - (i * (optW + 12) + optW / 2);
  const roomW = (inner - 4 * 12) / 5;
  const roomX = (i: number) => 40 + inner - (i * (roomW + 12) + roomW / 2);
  const Y = {city: 150, type: 300, price: 470, rooms: 650, btn: 820, res: 975};
  const drag = prog(f, SEARCH_CLICKS[1], SEARCH_CLICKS[1] + 26, ease.inOut);
  const maxFrac = lerp(0.96, 0.6, drag);
  const minFrac = 0.2;
  const trackX = (fr: number) => 40 + inner - fr * inner;
  const maxV = Math.round(lerp(5000000, 3000000, drag) / 50000) * 50000;
  // cursor path: type -> slider handle -> drag -> rooms -> button
  const kx = [800, typeX(0), trackX(0.96), trackX(0.96), trackX(0.6), roomX(3), PW / 2];
  const ky = [1120, Y.type + 88, Y.price + 116, Y.price + 116, Y.price + 116, Y.rooms + 88, Y.btn + 60];
  const kt = [0, SEARCH_CLICKS[0], SEARCH_CLICKS[1] - 8, SEARCH_CLICKS[1], SEARCH_CLICKS[1] + 26, SEARCH_CLICKS[2], SEARCH_CLICKS[3]];
  const cx = interpolate(f, kt, kx, {...clamp, easing: ease.inOut});
  const cy = interpolate(f, kt, ky, {...clamp, easing: ease.inOut});
  const lastClick = [...SEARCH_CLICKS].reverse().find((c) => f >= c) ?? -100;
  const ripple = interpolate(f, [lastClick, lastClick + 14], [0, 1], clamp);
  const press = f >= lastClick && f < lastClick + 6 ? 1 : 0;
  const typeOn = f >= SEARCH_CLICKS[0];
  const roomOn = f >= SEARCH_CLICKS[2];
  const btnPress = f >= SEARCH_CLICKS[3] && f < SEARCH_CLICKS[3] + 6;
  const res = sp(f, fps, SEARCH_CLICKS[3] + 6, springs.gentle);
  const nRes = Math.round(lerp(0, 36, prog(f, SEARCH_CLICKS[3] + 4, SEARCH_CLICKS[3] + 26)));
  const label = (t: string, y: number) => <div dir="rtl" style={{position: 'absolute', top: y, right: 40, fontSize: 30, color: C.muted}}>{t}</div>;
  return (
    <AbsoluteFill>
      <StepHeader n={COPY.steps[3].n} title={COPY.steps[3].t} sub={COPY.steps[3].s} />
      <Panel>
        <div dir="rtl" style={{position: 'absolute', top: 36, right: 40, left: 40, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <span style={{fontSize: 52, color: C.ink}}>{S.title}</span>
          <span style={{fontSize: 28, color: C.muted}}>{S.sub}</span>
        </div>
        {label(S.city, Y.city - 46)}
        <div dir="rtl" style={{position: 'absolute', top: Y.city, left: 40, right: 40, height: 100, borderRadius: 24, boxShadow: `inset 0 0 0 2px ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', fontSize: 36, color: C.ink}}>
          <span style={{display: 'flex', alignItems: 'center', gap: 14}}><Icon name="pin" size={38} color={C.blue} />{S.cityV}</span>
          <Icon name="chev" size={38} color={C.muted} />
        </div>
        {label(S.type, Y.type - 46)}
        <div dir="rtl" style={{position: 'absolute', top: Y.type, left: 40, right: 40, display: 'flex', gap: 12}}>
          {S.types.map((t, i) => {
            const on = i === 0 && typeOn;
            return <div key={t} style={{width: optW, height: 100 + 76, borderRadius: 24, background: on ? C.blue : C.soft, color: on ? '#fff' : C.ink2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 32, transform: `scale(${on ? 1 + 0.04 * (1 - prog(f, SEARCH_CLICKS[0], SEARCH_CLICKS[0] + 10)) : 1})`, boxShadow: on ? shadow.blue : undefined}}>
              <Icon name={(['home', 'grid', 'bed', 'area'] as const)[i]} size={44} color={on ? '#fff' : C.muted} />
              {t}
            </div>;
          })}
        </div>
        {label(S.price, Y.price - 46 + 80)}
        <div dir="rtl" style={{position: 'absolute', top: Y.price + 34, left: 40, fontSize: 30, color: C.ink, display: 'flex', gap: 10}}>
          <span>{S.from}</span><span style={{color: C.blue}}>1,000,000</span><span>{S.to}</span><span style={{color: C.blue}}>{maxV.toLocaleString('en-US')}</span><span>{S.currency}</span>
        </div>
        <div style={{position: 'absolute', top: Y.price + 110, left: 40, width: inner, height: 12, borderRadius: 12, background: C.line}} />
        <div style={{position: 'absolute', top: Y.price + 110, left: trackX(maxFrac), width: trackX(minFrac) - trackX(maxFrac), height: 12, borderRadius: 12, background: C.blue}} />
        {[minFrac, maxFrac].map((fr, i) => <div key={i} style={{position: 'absolute', top: Y.price + 116 - 26, left: trackX(fr) - 26, width: 52, height: 52, borderRadius: 52, background: '#fff', boxShadow: `0 6px 14px rgba(0,0,0,0.2), inset 0 0 0 4px ${C.blue}`}} />)}
        {label(S.rooms, Y.rooms - 46 + 40)}
        <div dir="rtl" style={{position: 'absolute', top: Y.rooms + 40, left: 40, right: 40, display: 'flex', gap: 12}}>
          {S.roomOpts.map((t, i) => {
            const on = i === 3 && roomOn;
            return <div key={t} style={{width: roomW, height: 96, borderRadius: 22, background: on ? C.blue : C.soft, color: on ? '#fff' : C.ink2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, boxShadow: on ? shadow.blue : undefined}}><Num>{t}</Num></div>;
          })}
        </div>
        <div dir="rtl" style={{position: 'absolute', top: Y.btn, left: 40, right: 40, height: 116, borderRadius: 28, background: C.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontSize: 40, transform: `scale(${btnPress ? 0.97 : 1})`}}>
          <Icon name="search" size={44} color="#fff" sw={2.4} />{S.btn}
        </div>
        <div dir="rtl" style={{position: 'absolute', top: Y.res, left: 40, right: 40, opacity: Math.min(1, res * 1.5), transform: `translateY(${(1 - res) * 60}px)`}}>
          <div style={{fontSize: 34, color: C.ink, display: 'flex', gap: 12, alignItems: 'center'}}><Icon name="check" size={36} color={C.green} sw={2.8} /><span style={{color: C.blue}}>{nRes}</span>{S.results}</div>
          <div style={{display: 'flex', gap: 16, marginTop: 16}}>
            {['villa-palm', 'house-cedar', 'house-wood'].map((im, i) => {
              const p = sp(f, fps, SEARCH_CLICKS[3] + 10 + i * 5, springs.snappy);
              return <Photo key={im} name={im} zoom={[1.08, 1.08]} style={{flex: 1, height: 150, borderRadius: 20, opacity: p, transform: `translateY(${(1 - p) * 40}px)`}} />;
            })}
          </div>
        </div>
        <Cursor x={cx} y={cy} press={press} ripple={lastClick > 0 ? ripple : -1} />
      </Panel>
    </AbsoluteFill>
  );
};

/* ---------------- 05 TRUST ---------------- */

export const Trust: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const R = COPY.trust;
  const dur = scene('trust').duration;
  const top = LAYOUT.panelTop;
  const statP = sp(f, fps, 2, springs.gentle);
  const countTo = (v: string, t: number) => {
    const n = parseFloat(v.replace('+', ''));
    const cur = n * t;
    return (v.startsWith('+') ? '+' : '') + (v.includes('.') ? cur.toFixed(1) : Math.round(cur).toString());
  };
  const cnt = prog(f, 6, 40, ease.out);
  return (
    <AbsoluteFill>
      <StepHeader n={COPY.steps[4].n} title={COPY.steps[4].t} sub={COPY.steps[4].s} />
      <div dir="rtl" style={{position: 'absolute', top, left: LAYOUT.side, right: LAYOUT.side, height: 210, borderRadius: 34, background: C.white, boxShadow: shadow.card, display: 'flex', alignItems: 'center', opacity: statP, transform: `translateY(${(1 - statP) * 80 + drift(f, dur, 20)}px)`}}>
        {R.stats.map((s, i) => (
          <div key={s.l} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, borderLeft: i < 2 ? `2px solid ${C.line}` : undefined}}>
            <span style={{fontSize: 68, color: i === 2 ? C.ink : C.blue, lineHeight: 1.3, display: 'flex', alignItems: 'center', gap: 8}}>
              <Num>{countTo(s.v, cnt)}</Num>{i === 2 ? <Star size={46} /> : null}
            </span>
            <span style={{fontSize: 28, color: C.muted}}>{s.l}</span>
          </div>
        ))}
      </div>
      {R.reviews.map((r, i) => {
        const p = sp(f, fps, 18 + i * 14, springs.gentle);
        const y = top + 240 + i * 270;
        return (
          <div key={r.name} dir="rtl" style={{position: 'absolute', top: y, left: LAYOUT.side + (i ? 0 : 30), right: LAYOUT.side + (i ? 30 : 0), height: 246, borderRadius: 34, background: C.white, boxShadow: shadow.soft, padding: '28px 34px', opacity: Math.min(1, p * 1.4), transform: `translateX(${(1 - p) * (i ? -220 : 220)}px) translateY(${drift(f, dur, 40 + i * 30)}px)`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{width: 80, height: 80, borderRadius: 80, background: i ? C.ink : C.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40}}>{r.init}</div>
              <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <span style={{fontSize: 34, color: C.ink, lineHeight: 1.3}}>{r.name}</span>
                <span style={{fontSize: 24, color: C.muted}}>{r.role}</span>
              </div>
              <div dir="ltr" style={{display: 'flex', gap: 4}}>{[0, 1, 2, 3, 4].map((k) => <Star key={k} size={34} fill={sp(f, fps, 26 + i * 14 + k * 3, springs.bouncy)} />)}</div>
            </div>
            <div style={{fontSize: 33, color: C.ink2, marginTop: 16, lineHeight: 1.5}}>{r.q}</div>
          </div>
        );
      })}
      {(() => {
        const p = sp(f, fps, 50, springs.gentle);
        const stamp = sp(f, fps, 66, springs.bouncy);
        return (
          <div dir="rtl" style={{position: 'absolute', top: top + 790, left: LAYOUT.side, right: LAYOUT.side, height: 330, borderRadius: 34, background: C.white, boxShadow: shadow.card, overflow: 'hidden', display: 'flex', opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 120 + drift(f, dur, 60)}px)`}}>
            <Photo name="apt-tower" style={{width: 330, height: 330}} zoom={[1.1, 1.2]} pos="center 30%" />
            <div style={{flex: 1, padding: '32px 32px', display: 'flex', flexDirection: 'column', gap: 6}}>
              <span style={{fontSize: 36, color: C.ink, lineHeight: 1.3}}>{R.prop}</span>
              <span style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 26, color: C.muted}}><Icon name="pin" size={28} color={C.blue} />{R.propLoc}</span>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14}}>
                {R.badges.map((b, k) => {
                  const q = sp(f, fps, 66 + k * 7, springs.bouncy);
                  return (
                    <span key={b} style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: k === 0 ? 'rgba(22,163,74,0.1)' : C.blueSoft, color: k === 0 ? C.green : C.blue, fontSize: 26, transform: `scale(${q})`, opacity: Math.min(1, q * 1.5)}}>
                      <Icon name={k === 0 ? 'shield' : 'check'} size={28} color={k === 0 ? C.green : C.blue} sw={2.3} />{b}
                    </span>
                  );
                })}
              </div>
            </div>
            <div style={{position: 'absolute', top: 22, right: 22, width: 76, height: 76, borderRadius: 76, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${stamp}) rotate(${(1 - stamp) * -40}deg)`, boxShadow: '0 10px 24px -6px rgba(22,163,74,0.6)'}}>
              <Icon name="check" size={46} color="#fff" sw={3} />
            </div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};

/* ---------------- 06 MOBILE ---------------- */

export const Mobile: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dur = scene('mobile').duration;
  const M = COPY.mobile;
  const G = COPY.gallery;
  const pIn = sp(f, fps, 0, springs.gentle);
  const scroll = interpolate(f, [24, 70, 84, 140], [0, -560, -600, -1260], {...clamp, easing: ease.inOut});
  const rotY = interpolate(f, [0, dur], [-12, 8], clamp);
  const pw = 500, phh = 1040;
  const sw = pw - 28;
  return (
    <AbsoluteFill>
      <StepHeader n={COPY.steps[5].n} title={COPY.steps[5].t} sub={COPY.steps[5].s} />
      <div style={{position: 'absolute', top: 650, left: 0, right: 0, height: phh + 40, perspective: 2200}}>
        <div style={{position: 'absolute', left: (1080 - pw) / 2, top: 0, width: pw, height: phh, borderRadius: 78, background: '#14171C', padding: 14, boxShadow: '0 70px 120px -40px rgba(27,31,36,0.55), inset 0 0 0 2px #3A3F47', transform: `translateY(${(1 - pIn) * 260}px) rotateY(${rotY}deg) rotateX(4deg)`, opacity: Math.min(1, pIn * 1.5)}}>
          <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 64, overflow: 'hidden', background: C.bg}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, transform: `translateY(${scroll}px)`}}>
              <div style={{position: 'relative', height: 560}}>
                <Photo name="villa-palm" style={{position: 'absolute', inset: 0}} zoom={[1.1, 1.2]} />
                <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.55))'}} />
                <div dir="rtl" style={{position: 'absolute', top: 64, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff'}}>
                  <span style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 28}}><Icon name="home" size={30} color="#fff" sw={2.2} />{COPY.brand}</span>
                  <Icon name="menu" size={34} color="#fff" sw={2.4} />
                </div>
                <div style={{position: 'absolute', bottom: 40, left: 20, right: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, color: '#fff'}}>
                  <span style={{fontSize: 40}}>{COPY.hook.hero}</span>
                  <div dir="rtl" style={{width: '100%', height: 72, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 22px', color: C.muted, fontSize: 22}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: 8}}><Icon name="pin" size={26} color={C.blue} />{COPY.hook.searchPh}</span>
                    <span style={{width: 58, height: 58, borderRadius: 58, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="search" size={28} color="#fff" sw={2.4} /></span>
                  </div>
                </div>
              </div>
              <div dir="rtl" style={{padding: '24px 18px 0', fontSize: 32, color: C.ink}}>{M.section}</div>
              <div style={{padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 18}}>
                {G.items.map((it) => (
                  <div key={it.name} dir="rtl" style={{borderRadius: 24, background: '#fff', boxShadow: shadow.soft, overflow: 'hidden'}}>
                    <Photo name={it.img} zoom={[1.08, 1.08]} style={{height: 230}} />
                    <div style={{padding: '12px 18px 16px', display: 'flex', flexDirection: 'column', gap: 2}}>
                      <span style={{fontSize: 27, color: C.blue}}>{it.price}</span>
                      <span style={{fontSize: 23, color: C.ink}}>{it.name}</span>
                      <span style={{fontSize: 19, color: C.muted, display: 'flex', alignItems: 'center', gap: 4}}><Icon name="pin" size={20} color={C.muted} />{it.loc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{position: 'absolute', bottom: 34, left: 24, width: 96, height: 96, borderRadius: 96, background: C.wa, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 ${10 + 8 * Math.abs(Math.sin(f / 9))}px rgba(37,211,102,0.18), 0 12px 24px rgba(0,0,0,0.25)`}}>
              <WaIcon size={54} />
            </div>
            <div style={{position: 'absolute', top: 16, left: (sw - 150) / 2, width: 150, height: 40, borderRadius: 40, background: '#0B0D10'}} />
          </div>
        </div>
      </div>
      {M.chips.map((c, i) => {
        const p = sp(f, fps, 14 + i * 9, springs.bouncy);
        const pos = [{left: 34, top: 790}, {right: 34, top: 1130}, {left: 54, top: 1450}][i];
        return (
          <div key={c} dir="rtl" style={{position: 'absolute', ...pos, display: 'flex', alignItems: 'center', gap: 12, padding: '18px 28px', borderRadius: 999, background: 'rgba(255,255,255,0.96)', boxShadow: shadow.soft, fontSize: 32, color: C.ink, transform: `scale(${p}) translateY(${drift(f, dur, 50 + i * 30)}px)`, opacity: Math.min(1, p * 1.5)}}>
            <span style={{width: 46, height: 46, borderRadius: 46, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name={(['grid', 'check', 'bolt'] as const)[i]} size={28} color="#fff" sw={2.4} /></span>
            {c}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ---------------- 07 ANALYTICS ---------------- */

export const Analytics: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const A = COPY.analytics;
  const inner = PW - 80;
  const kw = (inner - 24) / 2;
  const cnt = prog(f, 14, 60, ease.out);
  const draw = prog(f, 34, 110, ease.inOut);
  const cw = inner - 40, ch = 330;
  const vis = [0.32, 0.38, 0.35, 0.47, 0.52, 0.5, 0.62, 0.66, 0.72, 0.7, 0.82, 0.9];
  const leads = [0.05, 0.07, 0.08, 0.12, 0.16, 0.19, 0.25, 0.3, 0.37, 0.42, 0.5, 0.6];
  const toPts = (arr: number[]) => arr.map((v, i) => [cw - (i / (arr.length - 1)) * cw, ch - v * ch] as const);
  const path = (arr: number[]) => toPts(arr).map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const len = 1400;
  const lp = toPts(leads);
  const tip = lp[Math.min(lp.length - 1, Math.floor(draw * (lp.length - 1)))];
  return (
    <AbsoluteFill>
      <StepHeader n={COPY.steps[6].n} title={COPY.steps[6].t} sub={COPY.steps[6].s} />
      <Panel style={{background: '#FBFCFD'}}>
        <div dir="rtl" style={{position: 'absolute', top: 36, left: 40, right: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontSize: 46, color: C.ink}}>{A.title}</span>
          <span style={{display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 999, boxShadow: `inset 0 0 0 2px ${C.line}`, fontSize: 26, color: C.ink2}}><Icon name="calendar" size={28} color={C.muted} />{A.range}</span>
        </div>
        <div dir="rtl" style={{position: 'absolute', top: 130, left: 40, right: 40, display: 'flex', flexWrap: 'wrap', gap: 24}}>
          {A.kpis.map((k, i) => {
            const p = sp(f, fps, 4 + i * 5, springs.gentle);
            const v = k.v * cnt;
            const hl = i === 3;
            return (
              <div key={k.label} style={{width: kw, height: 220, borderRadius: 28, background: hl ? C.blue : '#fff', boxShadow: hl ? shadow.blue : shadow.soft, padding: '26px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 60}px)`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <span style={{width: 58, height: 58, borderRadius: 18, background: hl ? 'rgba(255,255,255,0.18)' : k.k === 'wa' ? 'rgba(37,211,102,0.12)' : C.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {k.k === 'wa' ? <WaIcon size={32} color={C.wa} /> : <Icon name={k.k as 'eye'} size={32} color={hl ? '#fff' : C.blue} />}
                  </span>
                  <span style={{fontSize: 28, color: hl ? 'rgba(255,255,255,0.9)' : C.muted}}>{k.label}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span style={{fontSize: 70, color: hl ? '#fff' : C.ink, lineHeight: 1.2}}><Num>{k.fmt === 'pct' ? `${v.toFixed(1)}%` : fmtInt(v)}</Num></span>
                  <span style={{padding: '6px 14px', borderRadius: 999, background: hl ? 'rgba(255,255,255,0.2)' : 'rgba(22,163,74,0.1)', color: hl ? '#fff' : C.green, fontSize: 24, opacity: prog(f, 50, 62)}}><Num>{k.d}</Num></span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', top: 630, left: 40, right: 40, height: 480, borderRadius: 28, background: '#fff', boxShadow: shadow.soft, padding: 20}}>
          <div dir="rtl" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 6px 10px'}}>
            <span style={{fontSize: 30, color: C.ink}}>{A.chart}</span>
            <span style={{display: 'flex', gap: 20, fontSize: 22, color: C.muted}}>
              <span style={{display: 'flex', alignItems: 'center', gap: 6}}><span style={{width: 16, height: 16, borderRadius: 16, background: C.dim}} />{A.legend[0]}</span>
              <span style={{display: 'flex', alignItems: 'center', gap: 6}}><span style={{width: 16, height: 16, borderRadius: 16, background: C.blue}} />{A.legend[1]}</span>
            </span>
          </div>
          <svg width={cw} height={ch + 10} viewBox={`0 -5 ${cw} ${ch + 10}`} style={{display: 'block', margin: '0 auto', overflow: 'visible'}}>
            <defs>
              <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.blue} stopOpacity="0.22" /><stop offset="1" stopColor={C.blue} stopOpacity="0" /></linearGradient>
              <clipPath id="ac"><rect x={cw * (1 - draw)} y={-10} width={cw * draw + 10} height={ch + 20} /></clipPath>
            </defs>
            {[0.25, 0.5, 0.75, 1].map((g) => <line key={g} x1={0} x2={cw} y1={ch - g * ch} y2={ch - g * ch} stroke={C.line} strokeWidth={1.5} strokeDasharray="6 8" />)}
            <path d={path(vis)} fill="none" stroke={C.dim} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
            <g clipPath="url(#ac)"><path d={`${path(leads)} L0,${ch} L${cw},${ch} Z`} fill="url(#ag)" /></g>
            <path d={path(leads)} fill="none" stroke={C.blue} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
            {draw > 0.02 ? <circle cx={tip[0]} cy={tip[1]} r={11} fill="#fff" stroke={C.blue} strokeWidth={5} /> : null}
          </svg>
          <div dir="rtl" style={{display: 'flex', justifyContent: 'space-between', padding: '14px 10px 0', fontSize: 22, color: C.muted}}>
            {A.weeks.map((w) => <span key={w}>{w}</span>)}
          </div>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ---------------- FINAL CTA ---------------- */

export const CTA_CLICK = 132;
export const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dur = scene('cta').duration;
  const K = COPY.cta;
  const top = 700;
  const pIn = sp(f, fps, 0, springs.gentle);
  const arrow = prog(f, 78, 108, ease.inOut);
  const bob = f > 108 ? Math.sin((f - 108) / 5) * 8 : 0;
  const glow = prog(f, 100, 116);
  const press = f >= CTA_CLICK && f < CTA_CLICK + 6 ? 1 : 0;
  const ripple = interpolate(f, [CTA_CLICK, CTA_CLICK + 18], [0, 1], clamp);
  const out = prog(f, dur - 62, dur - 26, ease.inOut);
  const textY = interpolate(out, [0, 1], [0, 420]);
  const btnTop = 790, btnW = 420, btnH = 120;
  const cx = interpolate(f, [100, CTA_CLICK - 4], [860, 934 - btnW / 2], {...clamp, easing: ease.inOut});
  const cy = interpolate(f, [100, CTA_CLICK - 4], [1060, btnTop + btnH / 2 + 10], {...clamp, easing: ease.inOut});
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 290 + textY, left: 30, right: 30}}>
        <Words text={K.a} size={84} delay={6} stagger={3} />
        <div style={{height: 10}} />
        <Words text={K.b} size={102} color={C.blue} delay={40} stagger={4} hi={['حوّلهم']} hiColor={C.ink} />
        <div style={{margin: '26px auto 0', width: 260 * prog(f, 56, 80), height: 6, borderRadius: 6, background: C.blue, opacity: 0.8}} />
      </div>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - out, transform: `translateY(${out * 200}px) scale(${1 - out * 0.08})`, filter: out > 0.02 ? `blur(${out * 12}px)` : undefined}}>
        <div style={{position: 'absolute', top, left: LAYOUT.side, right: LAYOUT.side, height: 1800 - top, borderRadius: 40, overflow: 'hidden', boxShadow: shadow.card, transform: `translateY(${(1 - pIn) * 160}px)`, opacity: Math.min(1, pIn * 1.4)}}>
          <Photo name="house-dusk" style={{position: 'absolute', inset: 0}} zoom={[1.15, 1.04]} dur={dur} pos="center 60%" />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,20,0.6) 0%, rgba(8,12,20,0.1) 30%, rgba(8,12,20,0.25) 55%, rgba(8,12,20,0.85) 100%)'}} />
          <SiteNav />
          <div dir="rtl" style={{position: 'absolute', top: 400, left: 50, right: 50, color: '#fff', display: 'flex', flexDirection: 'column', gap: 8}}>
            <span style={{fontSize: 30, color: C.blueHi, display: 'flex', alignItems: 'center', gap: 12}}><span style={{width: 40, height: 3, background: C.blueHi}} />{K.label}</span>
            <span style={{fontSize: 86, lineHeight: 1.3}}>{K.hero}</span>
            <span style={{fontSize: 34, opacity: 0.88}}>{K.heroSub}</span>
          </div>
          <div dir="rtl" style={{position: 'absolute', top: btnTop, right: 50, display: 'flex', gap: 20}}>
            <div style={{width: btnW, height: btnH, borderRadius: 999, background: C.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 40, boxShadow: `0 0 0 ${glow * (10 + 8 * Math.abs(Math.sin(f / 7)))}px rgba(30,107,255,0.28), 0 24px 50px -14px rgba(30,107,255,0.8)`, transform: `scale(${1 - press * 0.05})`}}>
              <Icon name="phone" size={42} color="#fff" sw={2.2} />{K.btn}
            </div>
            <div style={{height: btnH, padding: '0 38px', borderRadius: 999, boxShadow: 'inset 0 0 0 2.5px rgba(255,255,255,0.75)', color: '#fff', display: 'flex', alignItems: 'center', fontSize: 34}}>{K.btn2}</div>
          </div>
          {/* animated arrow pointing at the contact button */}
          <svg width={460} height={360} viewBox="0 0 460 360" style={{position: 'absolute', top: btnTop - 318 + bob, left: 120, overflow: 'visible', filter: 'drop-shadow(0 6px 14px rgba(30,107,255,0.6))'}}>
            <path d="M60 10 C 10 150, 130 270, 360 296" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeDasharray={460} strokeDashoffset={460 * (1 - arrow)} />
            <path d="M326 266 L 362 296 L 322 324" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={prog(f, 100, 108)} />
          </svg>
          <Cursor x={cx} y={cy} press={press} ripple={f >= CTA_CLICK ? ripple : -1} opacity={prog(f, 100, 108) * (1 - prog(f, CTA_CLICK + 14, CTA_CLICK + 22))} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
