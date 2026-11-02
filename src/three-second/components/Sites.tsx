import React from 'react';
import {useCurrentFrame} from 'remotion';
import {S, palette, font} from '../config';
import {MOBILE, DESKTOP, MobileChrome} from './Frames';

const F = font.family;
const A = S.sites.vague;
const B = S.sites.clear;
const C = S.sites.confusing;

/* ------------------------------------------------------------------ */
/* Website A — vague corporate consulting (mobile 520×1066)            */
/* ------------------------------------------------------------------ */

const Handshake: React.FC<{t: number}> = ({t}) => {
  const bob = Math.sin(t / 18) * 4;
  return (
    <svg width="300" height="190" viewBox="0 0 300 190" fill="none" style={{transform: `translateY(${bob}px)`}}>
      <ellipse cx="150" cy="172" rx="118" ry="12" fill="#1D4ED8" opacity="0.18" />
      <circle cx="150" cy="86" r="78" fill="#3B82F6" opacity="0.14" />
      <circle cx="150" cy="86" r="56" fill="#60A5FA" opacity="0.16" />
      {/* left arm */}
      <path d="M12 118 C 40 108, 70 96, 112 92 L 150 100 L 128 128 C 100 136, 60 142, 12 146 Z" fill="#2563EB" />
      <rect x="2" y="112" width="30" height="40" rx="8" fill="#1E3A8A" />
      {/* right arm */}
      <path d="M288 70 C 258 78, 228 86, 188 94 L 150 100 L 170 72 C 200 62, 240 56, 288 48 Z" fill="#3B82F6" />
      <rect x="268" y="42" width="30" height="40" rx="8" fill="#1E3A8A" />
      {/* clasped hands */}
      <rect x="118" y="78" width="66" height="46" rx="18" fill="#93C5FD" />
      <rect x="128" y="86" width="46" height="10" rx="5" fill="#DBEAFE" />
      <rect x="128" y="102" width="46" height="10" rx="5" fill="#DBEAFE" />
      {/* sparkle */}
      <path d="M232 22 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="#FBBF24" />
      <circle cx="62" cy="40" r="5" fill="#FBBF24" opacity="0.8" />
    </svg>
  );
};

const Icon: React.FC<{kind: 'chart' | 'bulb' | 'target'; color: string}> = ({kind, color}) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'chart' && <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />}
    {kind === 'bulb' && <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.3 1 2.5h6c0-1.2.4-1.9 1-2.5A6 6 0 0 0 12 3Z" />}
    {kind === 'target' && (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    )}
  </svg>
);

export const SiteVague: React.FC<{headlineNode?: React.ReactNode; aboveHeadline?: React.ReactNode}> = ({headlineNode, aboveHeadline}) => {
  const t = useCurrentFrame();
  return (
    <div dir="rtl" style={{width: MOBILE.w, height: MOBILE.h, background: '#fff', fontFamily: F, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <div style={{background: 'linear-gradient(180deg,#1D4ED8 0%,#2563EB 55%,#3B82F6 100%)', color: '#fff', paddingBottom: 30}}>
        <MobileChrome url={A.url} dark />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 30px 0'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <div style={{width: 38, height: 38, borderRadius: 12, background: '#fff', display: 'grid', placeItems: 'center'}}>
              <div style={{width: 18, height: 18, borderRadius: 5, background: '#2563EB', transform: 'rotate(45deg)'}} />
            </div>
            <span style={{fontSize: 22, fontWeight: 900}}>{A.brand}</span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
            {[28, 20, 28].map((w, i) => (
              <div key={i} style={{width: w, height: 3, borderRadius: 2, background: '#fff', alignSelf: 'flex-start'}} />
            ))}
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 6, height: 158}}>
          <div style={{transform: 'scale(0.84)', transformOrigin: 'top center'}}>
            <Handshake t={t} />
          </div>
        </div>
        <div style={{padding: '4px 34px 0', textAlign: 'center'}}>
          {aboveHeadline}
          <div style={{fontSize: 40, fontWeight: 900, lineHeight: 1.4, minHeight: 112}}>{headlineNode ?? A.headline}</div>
          <div style={{fontSize: 21, fontWeight: 700, opacity: 0.85, marginTop: 8, lineHeight: 1.6}}>{A.subheadline}</div>
          <div style={{display: 'inline-block', marginTop: 22, background: '#fff', color: '#1D4ED8', fontWeight: 900, fontSize: 21, padding: '12px 36px', borderRadius: 999}}>{A.cta}</div>
        </div>
      </div>
      <div style={{padding: '20px 30px 0', display: 'flex', flexDirection: 'column', gap: 10}}>
        <div style={{fontSize: 24, fontWeight: 900, color: '#111827'}}>لماذا نحن؟</div>
        {[
          ['chart', 'الاحترافية', 'نلتزم بأعلى معايير الجودة'],
          ['bulb', 'الابتكار', 'أفكار جديدة لكل تحدٍ'],
          ['target', 'الالتزام', 'شراكة طويلة المدى'],
        ].map(([k, h, s], i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16, background: '#F3F6FF', borderRadius: 18, padding: '10px 18px'}}>
            <div style={{width: 54, height: 54, borderRadius: 14, background: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0}}>
              <Icon kind={k as 'chart'} color="#2563EB" />
            </div>
            <div>
              <div style={{fontSize: 21, fontWeight: 900, color: '#111827'}}>{h}</div>
              <div style={{fontSize: 17, fontWeight: 700, color: '#6B7280'}}>{s}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 'auto', background: '#0F172A', color: '#94A3B8', fontSize: 15, fontWeight: 700, padding: '18px 30px 30px', display: 'flex', justifyContent: 'space-between'}}>
        <span>© {A.brand}</span>
        <span>{A.nav.slice(1).join(' · ')}</span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Website B — clear AC installation & maintenance (desktop 960×640)    */
/* ------------------------------------------------------------------ */

const AcUnit: React.FC<{t: number}> = ({t}) => {
  const wave = (i: number) => Math.sin(t / 9 + i) * 6;
  const spin = (t * 6) % 360;
  return (
    <svg width="420" height="330" viewBox="0 0 420 330" fill="none">
      <rect x="20" y="250" width="380" height="60" rx="30" fill="#172554" opacity="0.08" />
      {/* wall shadow */}
      <rect x="54" y="72" width="312" height="118" rx="26" fill="#172554" opacity="0.12" transform="translate(6 10)" />
      {/* unit body */}
      <rect x="54" y="72" width="312" height="118" rx="26" fill="#fff" stroke="#CBD5E1" strokeWidth="3" />
      <rect x="54" y="72" width="312" height="48" rx="26" fill="#F1F5F9" />
      <rect x="78" y="128" width="264" height="10" rx="5" fill="#CBD5E1" />
      <rect x="78" y="146" width="264" height="10" rx="5" fill="#CBD5E1" />
      <rect x="78" y="164" width="200" height="10" rx="5" fill="#E2E8F0" />
      <circle cx="326" cy="106" r="8" fill="#16A34A" />
      <rect x="290" y="98" width="22" height="16" rx="4" fill="#172554" />
      {/* cold air waves */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${110 + i * 70} 205 q 14 ${16 + wave(i)} 0 32 t 0 32 t 0 32`}
          stroke="#38BDF8"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={0.55 + 0.15 * i}
        />
      ))}
      {/* snowflake badge */}
      <g transform="translate(360 220)">
        <circle r="34" fill="#16A34A" />
        <g stroke="#fff" strokeWidth="4" strokeLinecap="round" transform={`rotate(${spin / 6})`}>
          <path d="M0 -20 V20 M-17 -10 L17 10 M-17 10 L17 -10" />
          <path d="M0 -20 l-5 -5 M0 -20 l5 -5 M0 20 l-5 5 M0 20 l5 5" />
        </g>
      </g>
      {/* technician glyph */}
      <g transform="translate(40 190)">
        <circle cx="30" cy="22" r="18" fill="#FBBF24" />
        <path d="M12 22 a18 18 0 0 1 36 0 Z" fill="#172554" />
        <rect x="6" y="44" width="48" height="62" rx="16" fill="#172554" />
        <rect x="18" y="50" width="24" height="26" rx="6" fill="#16A34A" />
        <rect x="-6" y="56" width="22" height="12" rx="6" fill="#FBBF24" />
      </g>
    </svg>
  );
};

export const SiteClear: React.FC = () => {
  const t = useCurrentFrame();
  return (
    <div dir="rtl" style={{width: DESKTOP.w, height: DESKTOP.h, background: '#fff', fontFamily: F, position: 'relative', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(60% 80% at 20% 40%, #E0F2FE 0%, rgba(224,242,254,0) 70%)'}} />
      <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 44px 0'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{width: 42, height: 42, borderRadius: 12, background: palette.navy, display: 'grid', placeItems: 'center'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
              <path d="M12 2v20M4 6l16 12M4 18L20 6" />
            </svg>
          </div>
          <span style={{fontSize: 26, fontWeight: 900, color: palette.navy}}>{B.brand}</span>
        </div>
        <div style={{display: 'flex', gap: 30, fontSize: 19, fontWeight: 700, color: '#334155'}}>
          {B.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
        <div style={{background: palette.green, color: '#fff', fontSize: 18, fontWeight: 900, padding: '10px 22px', borderRadius: 999, display: 'flex', gap: 8, alignItems: 'center'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
          </svg>
          920 000 000
        </div>
      </div>
      <div style={{position: 'relative', display: 'flex', alignItems: 'center', padding: '34px 44px 0', gap: 20}}>
        <div style={{flex: 1}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, background: '#DCFCE7', color: '#15803D', fontSize: 16, fontWeight: 900, padding: '6px 14px', borderRadius: 999}}>
            <span style={{width: 8, height: 8, borderRadius: 99, background: palette.green, display: 'inline-block'}} />
            متاحون الآن في الرياض
          </div>
          <div style={{fontSize: 46, fontWeight: 900, color: palette.navy, lineHeight: 1.35, marginTop: 14}}>{B.headline}</div>
          <div style={{fontSize: 22, fontWeight: 700, color: '#475569', marginTop: 10, lineHeight: 1.6}}>{B.subheadline}</div>
          <div style={{display: 'flex', gap: 14, marginTop: 24, alignItems: 'center'}}>
            <div style={{background: palette.green, color: '#fff', fontSize: 22, fontWeight: 900, padding: '14px 34px', borderRadius: 14, boxShadow: '0 12px 24px -10px rgba(22,163,74,0.6)'}}>{B.cta}</div>
            <div style={{border: `2px solid ${palette.gray}`, color: palette.navy, fontSize: 20, fontWeight: 700, padding: '12px 26px', borderRadius: 14}}>الأسعار</div>
          </div>
        </div>
        <div style={{width: 420, flexShrink: 0}}>
          <AcUnit t={t} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 44, right: 44, bottom: 26, display: 'flex', gap: 16}}>
        {B.badges.map((b) => (
          <div key={b} style={{flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `1px solid ${palette.gray}`, borderRadius: 14, padding: '12px 16px', fontSize: 18, fontWeight: 700, color: '#1E293B'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={palette.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Website C — confusing holding group (mobile 520×1066)               */
/* ------------------------------------------------------------------ */

const LogoPlaceholder: React.FC<{i: number}> = ({i}) => {
  const shapes = ['#7C3AED', '#F97316', '#0EA5E9', '#DB2777'];
  return (
    <div style={{width: 92, height: 56, borderRadius: 10, background: '#F3F4F6', border: '1px solid #E5E7EB', display: 'grid', placeItems: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
        <div style={{width: 18, height: 18, borderRadius: i % 2 ? 99 : 4, background: shapes[i % 4]}} />
        <div style={{width: 34, height: 8, borderRadius: 4, background: '#9CA3AF'}} />
      </div>
    </div>
  );
};

export const SiteConfusing: React.FC = () => {
  const t = useCurrentFrame();
  const slide = Math.floor(t / 30) % C.carousel.length;
  return (
    <div dir="rtl" style={{width: MOBILE.w, height: MOBILE.h, background: '#fff', fontFamily: F, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <MobileChrome url={C.url} />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 22px 0'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <div style={{width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#7C3AED,#DB2777)'}} />
          <div style={{width: 30, height: 30, borderRadius: 99, background: 'linear-gradient(135deg,#F97316,#FBBF24)', marginRight: -14}} />
          <span style={{fontSize: 16, fontWeight: 900, color: '#312E81'}}>{C.brand}</span>
        </div>
        <div style={{display: 'flex', gap: 6}}>
          {['#7C3AED', '#0EA5E9', '#F97316'].map((c) => (
            <div key={c} style={{width: 14, height: 14, borderRadius: 99, background: c}} />
          ))}
        </div>
      </div>
      <div style={{display: 'flex', gap: 10, padding: '10px 14px 0', fontSize: 12.5, fontWeight: 700, color: '#4B5563', whiteSpace: 'nowrap', justifyContent: 'space-between'}}>
        {C.nav.map((n, i) => (
          <span key={n} style={{borderBottom: i === 1 ? '2px solid #7C3AED' : '2px solid transparent', paddingBottom: 3}}>
            {n}
          </span>
        ))}
      </div>
      {/* carousel */}
      <div style={{margin: '12px 16px 0', height: 176, borderRadius: 16, overflow: 'hidden', position: 'relative', background: 'linear-gradient(120deg,#312E81,#7C3AED 60%,#DB2777)'}}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', transform: `translateX(${slide * 100}%)`, transition: 'none'}}>
          {C.carousel.map((c, i) => (
            <div key={c} style={{width: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: 6}}>
              <div style={{fontSize: 13, fontWeight: 700, opacity: 0.8, letterSpacing: 1}}>0{i + 1} / 03</div>
              <div style={{fontSize: 26, fontWeight: 900}}>{c}</div>
              <div style={{fontSize: 13, fontWeight: 700, background: 'rgba(255,255,255,0.2)', padding: '5px 16px', borderRadius: 99}}>{C.cta}</div>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6}}>
          {C.carousel.map((_, i) => (
            <div key={i} style={{width: i === slide ? 18 : 7, height: 7, borderRadius: 99, background: i === slide ? '#fff' : 'rgba(255,255,255,0.5)'}} />
          ))}
        </div>
        {['right', 'left'].map((side) => (
          <div key={side} style={{position: 'absolute', top: '50%', [side]: 10, transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: 99, background: 'rgba(255,255,255,0.25)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 14, fontWeight: 900}}>
            {side === 'right' ? '‹' : '›'}
          </div>
        ))}
      </div>
      <div style={{padding: '14px 22px 0', textAlign: 'center'}}>
        <div style={{fontSize: 30, fontWeight: 900, color: '#312E81', lineHeight: 1.4}}>{C.headline}</div>
        <div style={{fontSize: 15, fontWeight: 700, color: '#6B7280', marginTop: 2}}>{C.subheadline}</div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '12px 18px 0'}}>
        {C.sections.map((s, i) => (
          <div key={s} style={{borderRadius: 14, padding: '12px 14px', background: ['#EEF2FF', '#FFF7ED', '#ECFEFF', '#FDF2F8'][i], display: 'flex', alignItems: 'center', gap: 10}}>
            <div style={{width: 30, height: 30, borderRadius: 8, background: ['#7C3AED', '#F97316', '#0EA5E9', '#DB2777'][i], flexShrink: 0}} />
            <div>
              <div style={{fontSize: 17, fontWeight: 900, color: '#1F2937'}}>{s}</div>
              <div style={{width: 70, height: 6, borderRadius: 3, background: '#D1D5DB', marginTop: 5}} />
            </div>
          </div>
        ))}
      </div>
      <div style={{padding: '14px 22px 0'}}>
        <div style={{fontSize: 17, fontWeight: 900, color: '#1F2937', marginBottom: 8}}>{C.partnersTitle}</div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <LogoPlaceholder key={i} i={i} />
          ))}
        </div>
      </div>
      <div style={{padding: '14px 22px 0'}}>
        <div style={{fontSize: 17, fontWeight: 900, color: '#1F2937', marginBottom: 8}}>{C.newsTitle}</div>
        {[0, 1].map((i) => (
          <div key={i} style={{display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8}}>
            <div style={{width: 64, height: 44, borderRadius: 8, background: i ? '#FDE68A' : '#BFDBFE', flexShrink: 0}} />
            <div style={{flex: 1}}>
              <div style={{height: 8, borderRadius: 4, background: '#9CA3AF', width: '90%'}} />
              <div style={{height: 8, borderRadius: 4, background: '#D1D5DB', width: '60%', marginTop: 6}} />
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 'auto', display: 'flex', justifyContent: 'space-around', padding: '10px 0 26px', borderTop: '1px solid #E5E7EB', fontSize: 11, fontWeight: 700, color: '#6B7280'}}>
        {C.nav.slice(0, 5).map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  );
};
