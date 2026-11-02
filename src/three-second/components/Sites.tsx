import React from 'react';
import {useCurrentFrame} from 'remotion';
import {S, palette, font} from '../config';

export const PAGE_W = 1080;
const F = font.family;
const A = S.sites.vague;
const B = S.sites.clear;
const C = S.sites.confusing;

/* ------------------------------------------------------------------ */
/* shared bits                                                          */
/* ------------------------------------------------------------------ */

const Check: React.FC<{color: string; size?: number}> = ({color, size = 26}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

const Lines: React.FC<{widths: number[]; color?: string; h?: number; gap?: number}> = ({widths, color = '#D1D5DB', h = 10, gap = 10}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap}}>
    {widths.map((w, i) => (
      <div key={i} style={{width: `${w}%`, height: h, borderRadius: h / 2, background: color}} />
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Website A — vague corporate consulting                               */
/* ------------------------------------------------------------------ */

const Handshake: React.FC<{t: number}> = ({t}) => {
  const bob = Math.sin(t / 18) * 5;
  return (
    <svg width="480" height="304" viewBox="0 0 300 190" fill="none" style={{transform: `translateY(${bob}px)`}}>
      <ellipse cx="150" cy="172" rx="118" ry="12" fill="#1D4ED8" opacity="0.18" />
      <circle cx="150" cy="86" r="78" fill="#3B82F6" opacity="0.14" />
      <circle cx="150" cy="86" r="56" fill="#60A5FA" opacity="0.16" />
      <path d="M12 118 C 40 108, 70 96, 112 92 L 150 100 L 128 128 C 100 136, 60 142, 12 146 Z" fill="#2563EB" />
      <rect x="2" y="112" width="30" height="40" rx="8" fill="#1E3A8A" />
      <path d="M288 70 C 258 78, 228 86, 188 94 L 150 100 L 170 72 C 200 62, 240 56, 288 48 Z" fill="#3B82F6" />
      <rect x="268" y="42" width="30" height="40" rx="8" fill="#1E3A8A" />
      <rect x="118" y="78" width="66" height="46" rx="18" fill="#93C5FD" />
      <rect x="128" y="86" width="46" height="10" rx="5" fill="#DBEAFE" />
      <rect x="128" y="102" width="46" height="10" rx="5" fill="#DBEAFE" />
      <path d="M232 22 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="#FBBF24" />
      <circle cx="62" cy="40" r="5" fill="#FBBF24" opacity="0.8" />
    </svg>
  );
};

const Icon: React.FC<{kind: 'chart' | 'bulb' | 'target'; color: string; size?: number}> = ({kind, color, size = 44}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <div dir="rtl" style={{width: PAGE_W, background: '#fff', fontFamily: F, overflow: 'hidden', color: '#111827'}}>
      {/* hero */}
      <div style={{background: 'linear-gradient(170deg,#1E3A8A 0%,#1D4ED8 45%,#3B82F6 100%)', color: '#fff', paddingBottom: 60, position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', width: 620, height: 620, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', right: -220, top: -180}} />
        <div style={{position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', left: -160, bottom: 40}} />
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '34px 56px 0'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 56, height: 56, borderRadius: 16, background: '#fff', display: 'grid', placeItems: 'center'}}>
              <div style={{width: 26, height: 26, borderRadius: 7, background: '#2563EB', transform: 'rotate(45deg)'}} />
            </div>
            <span style={{fontSize: 34}}>{A.brand}</span>
          </div>
          <div style={{display: 'flex', gap: 34, fontSize: 25, opacity: 0.88}}>
            {A.nav.map((n, i) => (
              <span key={n} style={{borderBottom: i === 0 ? '2px solid #fff' : '2px solid transparent', paddingBottom: 4}}>
                {n}
              </span>
            ))}
          </div>
        </div>
        <div style={{position: 'relative', display: 'flex', justifyContent: 'center', marginTop: 26, height: 300}}>
          <Handshake t={t} />
        </div>
        <div style={{position: 'relative', padding: '0 70px', textAlign: 'center'}}>
          {aboveHeadline}
          <div style={{fontSize: 74, lineHeight: 1.35, minHeight: 200}}>{headlineNode ?? A.headline}</div>
          <div style={{fontSize: 33, opacity: 0.88, marginTop: 14, lineHeight: 1.6}}>{A.subheadline}</div>
          <div style={{display: 'inline-block', marginTop: 34, background: '#fff', color: '#1D4ED8', fontSize: 31, padding: '18px 58px', borderRadius: 999, boxShadow: '0 20px 40px -20px rgba(0,0,0,0.4)'}}>{A.cta}</div>
        </div>
        <div style={{position: 'relative', display: 'flex', margin: '64px 56px 0', borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: 30}}>
          {[
            ['250', 'مشروع منجز'],
            ['12', 'سنة خبرة'],
            ['40', 'خبير استشاري'],
          ].map(([n, l], i) => (
            <div key={i} style={{flex: 1, textAlign: 'center', borderRight: i ? '1px solid rgba(255,255,255,0.25)' : 'none'}}>
              <div style={{fontSize: 58, lineHeight: 1.1}}>{n}</div>
              <div style={{fontSize: 24, opacity: 0.8, marginTop: 6}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* why us */}
      <div style={{padding: '64px 56px 0'}}>
        <div style={{fontSize: 44, color: '#111827'}}>لماذا نحن؟</div>
        <div style={{fontSize: 26, color: '#6B7280', marginTop: 6}}>قيم نؤمن بها في كل ما نقوم به</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30}}>
          {[
            ['chart', 'الاحترافية', 'نلتزم بأعلى معايير الجودة في كل مرحلة'],
            ['bulb', 'الابتكار', 'أفكار جديدة لكل تحدٍ تواجهه منظمتك'],
            ['target', 'الالتزام', 'شراكة طويلة المدى مبنية على الثقة'],
          ].map(([k, h, s], i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 24, background: '#F3F6FF', borderRadius: 28, padding: '24px 30px'}}>
              <div style={{width: 84, height: 84, borderRadius: 22, background: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0, boxShadow: '0 10px 20px -12px rgba(37,99,235,0.4)'}}>
                <Icon kind={k as 'chart'} color="#2563EB" />
              </div>
              <div>
                <div style={{fontSize: 32, color: '#111827'}}>{h}</div>
                <div style={{fontSize: 24, color: '#6B7280', marginTop: 4}}>{s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* testimonial */}
      <div style={{margin: '64px 56px 0', background: '#0F172A', borderRadius: 36, padding: '44px 48px', color: '#fff', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', right: 30, top: 10, fontSize: 160, color: '#3B82F6', opacity: 0.35, lineHeight: 1}}>”</div>
        <div style={{fontSize: 32, lineHeight: 1.6, position: 'relative'}}>شريك موثوق ساهم في تطوير أعمالنا بشكل ملحوظ، ونتطلع لمزيد من التعاون.</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 28}}>
          <div style={{width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#60A5FA,#1D4ED8)'}} />
          <div>
            <div style={{fontSize: 26}}>أحد عملائنا</div>
            <div style={{fontSize: 22, color: '#94A3B8'}}>مدير تنفيذي</div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div style={{marginTop: 64, background: '#F8FAFC', borderTop: '1px solid #E5E7EB', padding: '40px 56px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span style={{fontSize: 28, color: '#111827'}}>{A.brand}</span>
        <span style={{fontSize: 22, color: '#6B7280'}}>{A.nav.slice(1).join('  ·  ')}</span>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Website B — clear AC installation & maintenance in Riyadh            */
/* ------------------------------------------------------------------ */

const AcUnit: React.FC<{t: number}> = ({t}) => {
  const wave = (i: number) => Math.sin(t / 9 + i) * 6;
  const spin = (t * 6) % 360;
  return (
    <svg width="760" height="597" viewBox="0 0 420 330" fill="none">
      <rect x="20" y="250" width="380" height="60" rx="30" fill="#172554" opacity="0.08" />
      <rect x="54" y="72" width="312" height="118" rx="26" fill="#172554" opacity="0.12" transform="translate(6 10)" />
      <rect x="54" y="72" width="312" height="118" rx="26" fill="#fff" stroke="#CBD5E1" strokeWidth="3" />
      <rect x="54" y="72" width="312" height="48" rx="26" fill="#F1F5F9" />
      <rect x="78" y="128" width="264" height="10" rx="5" fill="#CBD5E1" />
      <rect x="78" y="146" width="264" height="10" rx="5" fill="#CBD5E1" />
      <rect x="78" y="164" width="200" height="10" rx="5" fill="#E2E8F0" />
      <circle cx="326" cy="106" r="8" fill="#16A34A" />
      <rect x="290" y="98" width="22" height="16" rx="4" fill="#172554" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${110 + i * 70} 205 q 14 ${16 + wave(i)} 0 32 t 0 32 t 0 32`} stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity={0.55 + 0.15 * i} />
      ))}
      <g transform="translate(360 220)">
        <circle r="34" fill="#16A34A" />
        <g stroke="#fff" strokeWidth="4" strokeLinecap="round" transform={`rotate(${spin / 6})`}>
          <path d="M0 -20 V20 M-17 -10 L17 10 M-17 10 L17 -10" />
          <path d="M0 -20 l-5 -5 M0 -20 l5 -5 M0 20 l-5 5 M0 20 l5 5" />
        </g>
      </g>
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

const Snow: React.FC<{color: string; size?: number}> = ({color, size = 30}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round">
    <path d="M12 2v20M4 6l16 12M4 18L20 6" />
  </svg>
);

const Phone: React.FC<{color: string; size?: number}> = ({color, size = 22}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
  </svg>
);

export const SiteClear: React.FC = () => {
  const t = useCurrentFrame();
  return (
    <div dir="rtl" style={{width: PAGE_W, background: '#fff', fontFamily: F, overflow: 'hidden', color: palette.navy}}>
      <div style={{background: palette.navy, color: '#fff', fontSize: 22, padding: '12px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span>خدمة طوارئ على مدار الساعة في جميع أحياء الرياض</span>
        <span style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <Phone color="#fff" size={18} />
          <span dir="ltr">920 000 000</span>
        </span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 56px 0'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <div style={{width: 58, height: 58, borderRadius: 16, background: palette.navy, display: 'grid', placeItems: 'center'}}>
            <Snow color="#fff" />
          </div>
          <span style={{fontSize: 36}}>{B.brand}</span>
        </div>
        <div style={{display: 'flex', gap: 28, fontSize: 24, color: '#334155'}}>
          {B.nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
        <div style={{background: palette.green, color: '#fff', fontSize: 24, padding: '12px 24px', borderRadius: 999, display: 'flex', gap: 10, alignItems: 'center'}}>
          <Phone color="#fff" />
          اتصل بنا
        </div>
      </div>
      {/* hero */}
      <div style={{position: 'relative', padding: '44px 56px 0'}}>
        <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 80% 30%, #E0F2FE 0%, rgba(224,242,254,0) 70%)'}} />
        <div style={{position: 'relative'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, background: '#DCFCE7', color: '#15803D', fontSize: 24, padding: '8px 20px', borderRadius: 999}}>
            <span style={{width: 12, height: 12, borderRadius: 99, background: palette.green, display: 'inline-block'}} />
            متاحون الآن في الرياض
          </div>
          <div style={{fontSize: 78, lineHeight: 1.3, marginTop: 22}}>{B.headline}</div>
          <div style={{fontSize: 34, color: '#475569', marginTop: 14, lineHeight: 1.6}}>{B.subheadline}</div>
          <div style={{display: 'flex', gap: 18, marginTop: 34, alignItems: 'center'}}>
            <div style={{background: palette.green, color: '#fff', fontSize: 33, padding: '20px 50px', borderRadius: 20, boxShadow: '0 20px 34px -14px rgba(22,163,74,0.6)'}}>{B.cta}</div>
            <div style={{border: `2px solid ${palette.gray}`, color: palette.navy, fontSize: 30, padding: '18px 38px', borderRadius: 20}}>الأسعار</div>
          </div>
          <div style={{marginTop: 36, background: 'linear-gradient(180deg,#F1F5F9,#E0F2FE)', borderRadius: 40, height: 560, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
            <AcUnit t={t} />
          </div>
          <div style={{display: 'flex', gap: 16, marginTop: 28}}>
            {B.badges.map((b) => (
              <div key={b} style={{flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `1px solid ${palette.gray}`, borderRadius: 20, padding: '18px 16px', fontSize: 23, color: '#1E293B', boxShadow: '0 12px 24px -16px rgba(23,37,84,0.3)'}}>
                <Check color={palette.green} />
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* services */}
      <div style={{padding: '70px 56px 0'}}>
        <div style={{fontSize: 46}}>خدماتنا</div>
        <div style={{fontSize: 26, color: '#64748B', marginTop: 6}}>كل ما يحتاجه مكيفك في مكان واحد</div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 30}}>
          {[
            ['تركيب المكيفات', 'سبليت ومركزي وشباك'],
            ['صيانة دورية', 'فحص شامل وتنظيف الفلاتر'],
            ['تنظيف وتعقيم', 'بالبخار وبمواد آمنة'],
            ['تعبئة فريون', 'بالكمية المناسبة وضمان'],
          ].map(([h, s], i) => (
            <div key={i} style={{background: '#F8FAFC', borderRadius: 28, padding: '28px 26px', border: '1px solid #EEF2F7'}}>
              <div style={{width: 72, height: 72, borderRadius: 20, background: '#DCFCE7', display: 'grid', placeItems: 'center'}}>
                <Snow color={palette.green} size={34} />
              </div>
              <div style={{fontSize: 30, marginTop: 18}}>{h}</div>
              <div style={{fontSize: 23, color: '#64748B', marginTop: 4}}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      {/* steps */}
      <div style={{padding: '70px 56px 0'}}>
        <div style={{fontSize: 46}}>كيف نعمل؟</div>
        <div style={{display: 'flex', gap: 18, marginTop: 30}}>
          {['احجز موعدك', 'يصلك الفني', 'استمتع بالبرودة'].map((s, i) => (
            <div key={s} style={{flex: 1, textAlign: 'center', background: '#fff', border: `1px solid ${palette.gray}`, borderRadius: 28, padding: '26px 16px'}}>
              <div style={{width: 64, height: 64, borderRadius: '50%', background: palette.navy, color: '#fff', fontSize: 32, display: 'grid', placeItems: 'center', margin: '0 auto'}}>{i + 1}</div>
              <div style={{fontSize: 27, marginTop: 16}}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{marginTop: 70, background: palette.navy, color: '#fff', padding: '44px 56px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontSize: 32}}>{B.brand}</div>
          <div style={{fontSize: 22, color: '#93C5FD', marginTop: 6}}>الرياض، المملكة العربية السعودية</div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 28}}>
          <Phone color="#fff" />
          <span dir="ltr">920 000 000</span>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Website C — confusing holding group                                  */
/* ------------------------------------------------------------------ */

const LogoPlaceholder: React.FC<{i: number}> = ({i}) => {
  const shapes = ['#7C3AED', '#F97316', '#0EA5E9', '#DB2777', '#10B981'];
  return (
    <div style={{width: 176, height: 96, borderRadius: 16, background: '#F3F4F6', border: '1px solid #E5E7EB', display: 'grid', placeItems: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        <div style={{width: 30, height: 30, borderRadius: i % 2 ? 99 : 7, background: shapes[i % 5]}} />
        <div style={{width: 62, height: 12, borderRadius: 6, background: '#9CA3AF'}} />
      </div>
    </div>
  );
};

export const SiteConfusing: React.FC = () => {
  const t = useCurrentFrame();
  const slide = Math.floor(t / 30) % C.carousel.length;
  const hues = ['#7C3AED', '#F97316', '#0EA5E9', '#DB2777'];
  const soft = ['#EEF2FF', '#FFF7ED', '#ECFEFF', '#FDF2F8'];
  return (
    <div dir="rtl" style={{width: PAGE_W, background: '#fff', fontFamily: F, overflow: 'hidden', color: '#1F2937'}}>
      <div style={{background: 'linear-gradient(90deg,#312E81,#7C3AED,#DB2777)', color: '#fff', fontSize: 20, padding: '10px 40px', display: 'flex', justifyContent: 'space-between', whiteSpace: 'nowrap'}}>
        <span>مرحباً بكم في الموقع الرسمي للمجموعة</span>
        <span style={{opacity: 0.85}}>التقرير السنوي · البوابة الإلكترونية · الوظائف</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px 0'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(135deg,#7C3AED,#DB2777)'}} />
          <div style={{width: 46, height: 46, borderRadius: 99, background: 'linear-gradient(135deg,#F97316,#FBBF24)', marginRight: -24}} />
          <span style={{fontSize: 26, color: '#312E81'}}>{C.brand}</span>
        </div>
        <div style={{display: 'flex', gap: 10}}>
          {hues.map((c) => (
            <div key={c} style={{width: 20, height: 20, borderRadius: 99, background: c}} />
          ))}
        </div>
      </div>
      <div style={{display: 'flex', padding: '18px 24px 0', fontSize: 21, color: '#4B5563', whiteSpace: 'nowrap', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', margin: '0 16px'}}>
        {C.nav.map((n, i) => (
          <span key={n} style={{borderBottom: i === 1 ? '3px solid #7C3AED' : '3px solid transparent', paddingBottom: 8}}>
            {n}
          </span>
        ))}
      </div>
      <div style={{display: 'flex', gap: 10, padding: '12px 40px 0', fontSize: 18, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden'}}>
        {['الحوكمة', 'المسؤولية المجتمعية', 'الاستدامة', 'المركز الإعلامي', 'الاستثمار', 'الجودة'].map((n) => (
          <span key={n} style={{background: '#F3F4F6', borderRadius: 99, padding: '4px 14px'}}>
            {n}
          </span>
        ))}
      </div>
      {/* carousel */}
      <div style={{margin: '16px 24px 0', height: 420, borderRadius: 28, overflow: 'hidden', position: 'relative', background: 'linear-gradient(120deg,#312E81,#7C3AED 60%,#DB2777)'}}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', transform: `translateX(${slide * 100}%)`}}>
          {C.carousel.map((c, i) => (
            <div key={c} style={{width: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: 12}}>
              <div style={{fontSize: 20, opacity: 0.8, letterSpacing: 2}} dir="ltr">
                0{i + 1} / 03
              </div>
              <div style={{fontSize: 50}}>{c}</div>
              <div style={{fontSize: 20, opacity: 0.85}}>نحو مستقبل واعد يليق بطموحاتنا</div>
              <div style={{fontSize: 21, background: 'rgba(255,255,255,0.2)', padding: '8px 28px', borderRadius: 99, marginTop: 6}}>{C.cta}</div>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', bottom: 18, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8}}>
          {C.carousel.map((_, i) => (
            <div key={i} style={{width: i === slide ? 30 : 10, height: 10, borderRadius: 99, background: i === slide ? '#fff' : 'rgba(255,255,255,0.5)'}} />
          ))}
        </div>
        {(['right', 'left'] as const).map((side) => (
          <div key={side} style={{position: 'absolute', top: '50%', [side]: 18, transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: 99, background: 'rgba(255,255,255,0.25)', display: 'grid', placeItems: 'center'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d={side === 'right' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
            </svg>
          </div>
        ))}
      </div>
      <div style={{padding: '34px 40px 0', textAlign: 'center'}}>
        <div style={{fontSize: 54, color: '#312E81', lineHeight: 1.35}}>{C.headline}</div>
        <div style={{fontSize: 26, color: '#6B7280', marginTop: 6}}>{C.subheadline}</div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '28px 32px 0'}}>
        {C.sections.map((s, i) => (
          <div key={s} style={{borderRadius: 24, padding: '22px 24px', background: soft[i], display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{width: 52, height: 52, borderRadius: 14, background: hues[i], flexShrink: 0}} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 28}}>{s}</div>
              <div style={{marginTop: 10}}>
                <Lines widths={[90, 60]} h={9} gap={8} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', margin: '32px 32px 0', background: '#1F2937', borderRadius: 24, padding: '26px 20px', color: '#fff'}}>
        {[
          ['40', 'شركة تابعة'],
          ['7', 'قطاعات'],
          ['3', 'قارات'],
          ['1995', 'سنة التأسيس'],
        ].map(([n, l], i) => (
          <div key={i} style={{flex: 1, textAlign: 'center', borderRight: i ? '1px solid rgba(255,255,255,0.15)' : 'none'}}>
            <div style={{fontSize: 40, lineHeight: 1.1}}>{n}</div>
            <div style={{fontSize: 19, opacity: 0.75, marginTop: 4}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{padding: '36px 32px 0'}}>
        <div style={{fontSize: 30, marginBottom: 16}}>{C.partnersTitle}</div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <LogoPlaceholder key={i} i={i} />
          ))}
        </div>
      </div>
      <div style={{padding: '36px 32px 0'}}>
        <div style={{fontSize: 30, marginBottom: 16}}>{C.newsTitle}</div>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14}}>
            <div style={{width: 150, height: 96, borderRadius: 16, background: ['#BFDBFE', '#FDE68A', '#FBCFE8'][i], flexShrink: 0}} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 24, color: '#1F2937'}}>{['توقيع مذكرة تفاهم جديدة', 'مشاركة في المنتدى السنوي', 'إطلاق الهوية المؤسسية'][i]}</div>
              <div style={{marginTop: 10}}>
                <Lines widths={[85, 55]} h={8} gap={7} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 30, background: '#111827', color: '#9CA3AF', padding: '40px 32px 60px', display: 'flex', justifyContent: 'space-between', fontSize: 18, lineHeight: 2}}>
        {[C.nav.slice(0, 4), C.nav.slice(3), ['الشروط والأحكام', 'سياسة الخصوصية', 'خريطة الموقع', 'الدعم']].map((col, i) => (
          <div key={i}>
            {col.map((n) => (
              <div key={n}>{n}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
