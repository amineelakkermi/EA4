import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, OVERLAP, sec, shadow, GRAD} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';
import {Words, Icon, IconName, Lat, Tag, Wire, Svg, Mark, Bar} from './components';

const o = OVERLAP;
const b = (s: number) => o + sec(s);
const pulse = (f: number, a: number, len = 18) => (f >= a && f < a + len ? Math.sin(((f - a) / len) * Math.PI) : 0);

/** output card geometry (x, y, w, h) */
const BOX: Record<'ui' | 'api' | 'db' | 'pay' | 'test', [number, number, number, number]> = {
  ui: [505, 600, 405, 250],
  api: [70, 600, 405, 250],
  db: [505, 880, 405, 250],
  pay: [70, 880, 405, 250],
  test: [70, 1160, 840, 150],
};
/** appear time (seconds) of each generated component, in caption order */
const AT = {ui: 3.2, api: 4.0, db: 4.8, pay: 5.6, test: 6.5};
const REVIEW = 9.4;

const Out: React.FC<{k: keyof typeof BOX; icon: IconName; ar: string; lat: string; children: React.ReactNode; flag?: string}> = ({k, icon, ar, lat, children, flag}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [x, y, w, h] = BOX[k];
  const p = sp(f, fps, b(AT[k]), springs.snappy);
  const fl = sp(f, fps, b(REVIEW + 0.6) + ['api', 'db', 'pay', 'test'].indexOf(k) * 7, springs.snappy);
  return (
    <div dir="rtl" style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 28, background: C.white, boxShadow: flag && fl > 0.05 ? `${shadow.card}, 0 0 0 ${3 * fl}px rgba(224,144,15,0.45)` : shadow.card, padding: '18px 22px', opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * 60}px) scale(${0.92 + 0.08 * p})`, zIndex: 5}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12}}>
        <Icon name={icon} size={30} color={C.blue} sw={2.1} />
        <span style={{fontFamily: F.ar, fontSize: 28, color: C.navy}}>{ar}</span>
        <Lat size={22} color={C.muted} weight={400}>{lat}</Lat>
      </div>
      {children}
      {flag ? (
        <div style={{position: 'absolute', top: -22, left: 18, opacity: Math.min(1, fl * 1.5), transform: `translateY(${(1 - fl) * 14}px) scale(${0.8 + 0.2 * fl})`}}>
          <Tag ar text={flag} color="#fff" bg={C.amber} icon="alert" size={22} style={{boxShadow: '0 10px 24px -10px rgba(224,144,15,0.7)'}} />
        </div>
      ) : null}
    </div>
  );
};

export const Ai: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const yes = sp(f, fps, o + 1, springs.bouncy);
  const yesOut = prog(f, b(1.5), b(1.85), ease.in);
  const req = sp(f, fps, b(1.7), springs.snappy);
  const ai = sp(f, fps, b(2.3), springs.snappy);
  const rev = prog(f, b(REVIEW), b(REVIEW + 0.4));
  const g = (k: keyof typeof AT) => prog(f, b(AT[k]), b(AT[k] + 1.0), ease.inOut);
  const scan = (f * 0.9) % 140;
  const srcX = 490;
  const srcY = 548;
  const target = (k: keyof typeof BOX): [number, number] => {
    const [x, y, w] = BOX[k];
    return [x + w / 2, y - 4];
  };
  return (
    <AbsoluteFill>
      {/* "yes, it can" */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', opacity: Math.min(1, yes * 1.5) * (1 - yesOut), transform: `scale(${(0.6 + 0.4 * yes) * (1 - yesOut * 0.2)})`, filter: yesOut > 0 ? `blur(${yesOut * 10}px)` : undefined}}>
        <div dir="rtl" style={{fontFamily: F.ar, fontSize: 160, lineHeight: 1.3, background: GRAD, WebkitBackgroundClip: 'text', color: 'transparent'}}>نعم، يستطيع!</div>
      </div>
      {/* requirement */}
      <div dir="rtl" style={{position: 'absolute', left: 70, right: 70, top: 236, height: 220, borderRadius: 30, background: C.white, boxShadow: shadow.card, padding: '22px 30px', display: 'flex', flexDirection: 'column', gap: 10, opacity: Math.min(1, req * 1.5), transform: `translateY(${(1 - req) * -40}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Icon name="doc" size={34} color={C.navy} sw={2} />
          <span style={{fontFamily: F.ar, fontSize: 30, color: C.navy}}>متطلب المنتج</span>
          <Tag text="Product requirement" color={C.muted} bg={C.soft} size={20} />
        </div>
        <span style={{fontFamily: F.ar, fontSize: 34, color: C.ink, lineHeight: 1.45}}>منصة لإدارة مشاريع الشركات: حسابات وأدوار، بيانات معزولة لكل شركة، واشتراك شهري.</span>
      </div>
      {/* AI assist bar */}
      <div dir="rtl" style={{position: 'absolute', left: 220, right: 220, top: 482, height: 66, borderRadius: 999, background: rev > 0.5 ? C.amberSoft : C.white, border: `2px solid ${rev > 0.5 ? 'rgba(224,144,15,0.5)' : 'rgba(31,91,255,0.25)'}`, boxShadow: shadow.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, overflow: 'hidden', opacity: Math.min(1, ai * 1.5), transform: `scale(${0.8 + 0.2 * ai})`, zIndex: 6}}>
        {rev < 0.5 ? <div style={{position: 'absolute', top: 0, bottom: 0, width: 140, left: `${(scan / 140) * 100}%`, background: 'linear-gradient(90deg, rgba(31,91,255,0), rgba(31,91,255,0.14), rgba(31,91,255,0))'}} /> : null}
        <Icon name={rev > 0.5 ? 'alert' : 'sparkle'} size={34} color={rev > 0.5 ? C.amber : C.blue} sw={2} />
        {rev > 0.5 ? (
          <span style={{fontFamily: F.ar, fontSize: 28, color: C.amber}}>مسودة أولى: تحتاج مراجعة واختبار</span>
        ) : (
          <>
            <Lat size={28} weight={700} color={C.blue}>AI</Lat>
            <span style={{fontFamily: F.ar, fontSize: 28, color: C.ink2}}>يحوّل المتطلب إلى مكونات</span>
          </>
        )}
      </div>
      <Svg>
        {(Object.keys(AT) as Array<keyof typeof AT>).map((k) => {
          const [tx, ty] = target(k);
          return <Wire key={k} pts={[[srcX, srcY + 4], [srcX, srcY + 24], [tx, ty - 22], [tx, ty]]} draw={g(k)} color={C.blue} w={2.5} opacity={0.8} />;
        })}
      </Svg>

      <Out k="ui" icon="layout" ar="الواجهات" lat="UI" flag={undefined}>
        <div style={{display: 'flex', gap: 10, height: 150}}>
          <div style={{width: 70, borderRadius: 12, background: C.soft, padding: 8, display: 'flex', flexDirection: 'column', gap: 8, opacity: prog(f, b(AT.ui + 0.2), b(AT.ui + 0.5))}}>{[0, 1, 2, 3].map((i) => <Bar key={i} w="100%" h={10} color={i === 0 ? 'rgba(31,91,255,0.4)' : '#DFE3EB'} />)}</div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 10}}>
            <div style={{display: 'flex', gap: 10, opacity: prog(f, b(AT.ui + 0.35), b(AT.ui + 0.65))}}>{[C.blue, C.cyan, C.teal].map((c) => <div key={c} style={{flex: 1, height: 50, borderRadius: 10, background: `${c}1c`, borderBottom: `4px solid ${c}`}} />)}</div>
            <div style={{flex: 1, borderRadius: 10, background: C.surface, border: `1px solid ${C.line}`, display: 'flex', alignItems: 'flex-end', gap: 8, padding: 10, opacity: prog(f, b(AT.ui + 0.5), b(AT.ui + 0.8))}}>
              {[40, 65, 50, 80, 60, 90].map((h, i) => <div key={i} style={{flex: 1, height: `${h * prog(f, b(AT.ui + 0.6) + i * 2, b(AT.ui + 1.1) + i * 2)}%`, borderRadius: 4, background: C.blue, opacity: 0.75}} />)}
            </div>
          </div>
        </div>
      </Out>
      <Out k="api" icon="api" ar="واجهات برمجية" lat="APIs" flag="أمان البيانات">
        <div dir="ltr" style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {[['GET', '/projects', C.green], ['POST', '/projects', C.blue], ['DELETE', '/projects/:id', C.red], ['POST', '/billing/webhook', C.purple]].map(([m, p, c], i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 10, opacity: prog(f, b(AT.api + 0.2) + i * 4, b(AT.api + 0.4) + i * 4), transform: `translateX(${(1 - prog(f, b(AT.api + 0.2) + i * 4, b(AT.api + 0.4) + i * 4)) * 20}px)`}}>
              <span style={{fontFamily: F.lat, fontWeight: 700, fontSize: 17, color: c as string, background: `${c}18`, borderRadius: 8, padding: '3px 8px', width: 66, textAlign: 'center'}}>{m}</span>
              <Lat size={21} color={C.ink2} weight={400}>{p}</Lat>
            </div>
          ))}
        </div>
      </Out>
      <Out k="db" icon="db" ar="قاعدة البيانات" lat="Schema" flag="عزل العملاء">
        <div dir="ltr" style={{position: 'relative', height: 150}}>
          {[['tenants', 0, 0, ['id', 'name']], ['users', 125, 0, ['tenant_id', 'role']], ['projects', 250, 0, ['tenant_id', 'name']]].map(([n, x, , cols], i) => {
            const p = prog(f, b(AT.db + 0.2) + i * 5, b(AT.db + 0.45) + i * 5);
            return (
              <div key={n as string} style={{position: 'absolute', left: x as number, top: i === 1 ? 34 : 0, width: 112, borderRadius: 10, border: `1.5px solid ${C.line}`, background: C.surface, opacity: p, transform: `scale(${0.85 + 0.15 * p})`}}>
                <div style={{padding: '5px 8px', borderBottom: `1px solid ${C.line}`, background: C.blueSoft}}><Lat size={16} weight={600} color={C.blue}>{n as string}</Lat></div>
                {(cols as string[]).map((c) => <div key={c} style={{padding: '4px 8px'}}><Lat size={14} color={c === 'tenant_id' ? C.blue : C.muted} weight={400}>{c}</Lat></div>)}
              </div>
            );
          })}
          <svg width="370" height="150" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
            <path d="M112 30 C 120 30, 118 70, 125 70" fill="none" stroke={C.blue} strokeWidth={2} strokeDasharray="4 4" opacity={prog(f, b(AT.db + 0.6), b(AT.db + 0.8))} />
            <path d="M237 70 C 245 70, 243 36, 250 36" fill="none" stroke={C.blue} strokeWidth={2} strokeDasharray="4 4" opacity={prog(f, b(AT.db + 0.7), b(AT.db + 0.9))} />
          </svg>
        </div>
      </Out>
      <Out k="pay" icon="card" ar="خدمات الدفع" lat="Payments" flag="معالجة الأخطاء">
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 14, border: `1.5px solid ${C.blue}`, opacity: prog(f, b(AT.pay + 0.2), b(AT.pay + 0.45))}}>
            <Lat size={24} weight={700} color={C.blue}>Pro</Lat>
            <Lat size={22} color={C.navy}>$29 / mo</Lat>
          </div>
          <div style={{height: 44, borderRadius: 12, background: C.blue, color: '#fff', fontFamily: F.ar, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: prog(f, b(AT.pay + 0.35), b(AT.pay + 0.6))}}>ادفع الآن</div>
          <div style={{display: 'flex', gap: 8, opacity: prog(f, b(AT.pay + 0.5), b(AT.pay + 0.75))}}>
            <Tag text="webhook" color={C.purple} bg={C.purpleSoft} icon="webhook" size={17} />
            <Tag text="invoice" color={C.ink2} bg={C.soft} icon="doc" size={17} />
          </div>
        </div>
      </Out>
      <Out k="test" icon="flask" ar="الاختبارات" lat="Tests" flag="استقرار النظام">
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          {(() => {
            const tp = prog(f, b(AT.test + 0.2), b(AT.test + 1.4), ease.inOut);
            const pass = Math.round(18 * tp);
            const warn = Math.round(3 * prog(f, b(AT.test + 1.0), b(AT.test + 1.5)));
            return (
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}><Mark ok size={34} p={Math.min(1, tp * 3)} /><Lat size={26} weight={600} color={C.green}>{pass}</Lat><span style={{fontFamily: F.ar, fontSize: 24, color: C.ink2}}>ناجح</span></div>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, opacity: warn > 0 ? 1 : 0.3}}>
                  <div style={{width: 34, height: 34, borderRadius: 34, background: C.amberSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="alert" size={22} color={C.amber} sw={2.4} /></div>
                  <Lat size={26} weight={600} color={C.amber}>{warn}</Lat><span style={{fontFamily: F.ar, fontSize: 24, color: C.ink2}}>تحتاج مراجعة</span>
                </div>
                <div dir="ltr" style={{flex: 1, display: 'flex', gap: 4}}>
                  {Array.from({length: 21}, (_, i) => {
                    const on = i < Math.round(21 * tp);
                    return <div key={i} style={{flex: 1, height: 22, borderRadius: 5, background: !on ? C.soft : i >= 18 ? C.amber : C.green}} />;
                  })}
                </div>
              </>
            );
          })()}
        </div>
      </Out>

      {/* captions */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 1336, opacity: 1 - prog(f, b(REVIEW - 0.3), b(REVIEW))}}>
        <Words text={'أدوات الذكاء الاصطناعي أصبحت قادرة على توليد الواجهات،\nبناء APIs، تصميم قواعد البيانات، ربط خدمات الدفع\nوحتى كتابة الاختبارات.'} size={34} color={C.ink2} hi={['الواجهات،', 'APIs،', 'قواعد', 'البيانات،', 'الدفع', 'الاختبارات.']} delay={b(2.4)} stagger={5.2} lh={1.5} />
      </div>
      {f >= b(REVIEW - 0.1) ? (
        <div style={{position: 'absolute', left: 60, right: 60, top: 1336}}>
          <Words text={'لكن التحدي الحقيقي هو ضمان أمان البيانات، عزل العملاء،\nمعالجة الأخطاء واستقرار النظام.'} size={36} color={C.navy} hi={['أمان', 'البيانات،', 'عزل', 'العملاء،', 'معالجة', 'الأخطاء', 'واستقرار', 'النظام.']} hiColor={C.amber} delay={b(REVIEW)} stagger={2.6} lh={1.5} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
