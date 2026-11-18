import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, TEN, OVERLAP, sec, scene, shadow, GRAD} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';
import {Words, Icon, IconName, Lat, Tag, Wire, Packet, Svg, Mark, Cursor, Shot, Bar} from './components';

const o = OVERLAP;
const b = (s: number) => o + sec(s);

/** sub-shot boundaries (seconds into the architecture scene) */
export const SUB = {flow: [0, 7], auth: [7, 11.5], tenancy: [11.5, 16.5], billing: [16.5, 20.5]} as const;

/** architecture node card */
const Node: React.FC<{x: number; y: number; w: number; h: number; icon: IconName; title: string; desc?: string; at: number; glow?: number; color?: string; tone?: 'red' | 'green'; children?: React.ReactNode}> = ({x, y, w, h, icon, title, desc, at, glow = 0, color = C.blue, tone, children}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, at, springs.snappy);
  const ring = tone === 'red' ? C.red : tone === 'green' ? C.green : color;
  return (
    <div dir="rtl" style={{position: 'absolute', left: x, top: y, width: w, height: h, zIndex: 5, borderRadius: 30, background: C.white, boxShadow: `${shadow.card}${glow > 0 ? `, 0 0 0 ${4 * glow}px ${ring}55, 0 0 ${60 * glow}px ${ring}40` : ''}`, opacity: Math.min(1, p * 1.6), transform: `translateY(${(1 - p) * 50}px) scale(${(0.9 + 0.1 * p) * (1 + glow * 0.025)})`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 28px'}}>
      <div style={{width: 76, height: 76, borderRadius: 22, background: `${color}17`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
        <Icon name={icon} size={42} color={color} sw={2.1} />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start', minWidth: 0}}>
        <Lat size={38} weight={600} color={C.navy}>{title}</Lat>
        {desc ? <span style={{fontFamily: F.ar, fontSize: 28, color: C.muted, lineHeight: 1.35}}>{desc}</span> : null}
      </div>
      {children}
    </div>
  );
};

/** sub-shot header: Latin component name + Arabic role */
const Head: React.FC<{title: string; desc: string; sub?: React.ReactNode}> = ({title, desc, sub}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, o + 2, springs.snappy);
  return (
    <div style={{position: 'absolute', top: 232, left: 50, right: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
      <div style={{opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 30}px)`}}>
        <Lat size={64} weight={700} style={{background: GRAD, WebkitBackgroundClip: 'text', color: 'transparent'}}>{title}</Lat>
      </div>
      <Words text={desc} size={44} color={C.ink2} delay={o + 8} stagger={2.4} />
      {sub}
    </div>
  );
};

const pulse = (f: number, a: number, len = 18) => (f >= a && f < a + len ? Math.sin(((f - a) / len) * Math.PI) : 0);

/* ---------------- request flow ---------------- */
const NX = 400;
const NW = 500;
const NH = 140;
const NY = [450, 680, 910, 1140];
const DOWN = 620;
const UP = 690;

const Flow: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const hop = (i: number) => [b(3.1 + i * 0.65), b(3.45 + i * 0.65)] as const;
  const req = (i: number) => prog(f, hop(i)[0], hop(i)[1], ease.inOut);
  const res = prog(f, b(5.15), b(6.05), ease.inOut);
  const arrive = (i: number) => (i === 0 ? b(2.9) : hop(i - 1)[1]);
  const back = [b(6.05), b(5.75), b(5.45), b(5.15)];
  const glow = (i: number) => Math.max(pulse(f, arrive(i) - 2, 20), pulse(f, back[i] - 2, 16));
  const note = (i: number, s: number) => sp(f, fps, s, springs.snappy);
  const nodes: Array<{icon: IconName; t: string; d: string}> = [
    {icon: 'layout', t: 'Frontend', d: 'لواجهة المستخدم'},
    {icon: 'api', t: 'API', d: 'بوابة الطلبات إلى الخادم'},
    {icon: 'server', t: 'Backend', d: 'لمعالجة العمليات'},
    {icon: 'db', t: 'Database', d: 'لتخزين البيانات'},
  ];
  const leader = (i: number, s: number) => <line x1={372} y1={NY[i] + NH / 2} x2={NX - 4} y2={NY[i] + NH / 2} stroke={C.dim} strokeWidth={2.5} strokeDasharray="4 8" opacity={prog(f, s, s + 8)} />;
  const done = prog(f, b(6.05), b(6.4));
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 236, left: 50, right: 50}}>
        <Words text={'لبناء SaaS حقيقي، تحتاج إلى\nأكثر من واجهة جميلة:'} size={54} color={C.navy} hi={['أكثر', 'واجهة', 'جميلة:']} delay={o} stagger={2.4} lh={1.4} />
      </div>
      <Svg>
        {[0, 1, 2].map((i) => (
          <React.Fragment key={i}>
            <Wire pts={[[DOWN, NY[i] + NH], [DOWN, NY[i + 1] - 6]]} draw={prog(f, b(1.5) + i * 6, b(1.9) + i * 6)} color={C.blue} />
            <Wire pts={[[UP, NY[i + 1]], [UP, NY[i] + NH + 6]]} draw={prog(f, b(1.7) + i * 6, b(2.1) + i * 6)} color={C.green} />
          </React.Fragment>
        ))}
        {[0, 1, 2].map((i) => <Packet key={i} pts={[[DOWN, NY[i] + NH - 10], [DOWN, NY[i + 1] + 10]]} t={req(i) > 0 && req(i) < 1 ? req(i) : 0} color={C.blue} />)}
        <Packet pts={[[UP, NY[3] + 10], [UP, NY[0] + NH - 10]]} t={res > 0 && res < 1 ? res : 0} color={C.green} />
        {leader(0, b(2.4))}
        {leader(1, hop(0)[1])}
        {leader(2, hop(1)[1])}
        {leader(3, hop(2)[1])}
      </Svg>
      {nodes.map((n, i) => (
        <Node key={n.t} x={NX} y={NY[i]} w={NW} h={NH} icon={n.icon} title={n.t} desc={n.d} at={b(1.2) + i * 6} glow={glow(i)} color={i === 3 && f > back[3] - 4 && f < back[3] + 30 ? C.green : C.blue} />
      ))}
      {/* trace notes, left lane */}
      <div dir="rtl" style={{position: 'absolute', left: 60, top: NY[0] + 6, width: 312, height: NH - 12, borderRadius: 24, background: C.white, boxShadow: shadow.soft, padding: '14px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10, opacity: prog(f, b(2.3), b(2.6)), zIndex: 6}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '10px 16px', borderRadius: 14, background: C.blue, color: '#fff', fontFamily: F.ar, fontSize: 28, transform: `scale(${1 - pulse(f, b(2.9), 8) * 0.08})`, opacity: 1 - done}}>
          <span>+ مشروع جديد</span>
        </div>
        <div style={{position: 'absolute', inset: 14, display: 'flex', alignItems: 'center', gap: 12, opacity: done}}>
          <Mark ok size={44} p={done} />
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontFamily: F.ar, fontSize: 28, color: C.ink}}>تم إنشاء المشروع</span>
            <span style={{fontFamily: F.ar, fontSize: 22, color: C.muted}}>الواجهة تحدّثت</span>
          </div>
        </div>
      </div>
      <div dir="rtl" style={{position: 'absolute', left: 60, top: NY[1] + 12, width: 312, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', opacity: Math.min(1, note(1, hop(0)[1] - 4) * 1.5), transform: `translateX(${(1 - note(1, hop(0)[1] - 4)) * -30}px)`, zIndex: 6}}>
        <Tag text="POST /projects" color={C.blue} bg={C.blueSoft} size={26} />
        <span style={{fontFamily: F.ar, fontSize: 26, color: C.ink2}}>الطلب + رمز الدخول <Lat size={24} color={C.muted}>JWT</Lat></span>
        <div style={{opacity: prog(f, b(5.75), b(5.95)), transform: `translateY(${(1 - prog(f, b(5.75), b(5.95))) * 10}px)`}}><Tag text="201 Created" color={C.green} bg={C.greenSoft} size={24} /></div>
      </div>
      <div dir="rtl" style={{position: 'absolute', left: 60, top: NY[2] + 14, width: 312, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', opacity: Math.min(1, note(2, hop(1)[1] - 4) * 1.5), transform: `translateX(${(1 - note(2, hop(1)[1] - 4)) * -30}px)`, zIndex: 6}}>
        <span style={{fontFamily: F.ar, fontSize: 26, color: C.ink2, lineHeight: 1.4}}>يتحقق من الهوية والصلاحية</span>
        <Tag text="tenant_id = A" color={TEN.A.c} bg={TEN.A.s} size={24} icon="building" />
      </div>
      <div dir="rtl" style={{position: 'absolute', left: 60, top: NY[3] + 18, width: 312, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', opacity: Math.min(1, note(3, hop(2)[1] - 4) * 1.5), transform: `translateX(${(1 - note(3, hop(2)[1] - 4)) * -30}px)`, zIndex: 6}}>
        <span style={{fontFamily: F.ar, fontSize: 26, color: C.ink2}}>يحفظ سجلاً جديداً في</span>
        <Tag text="projects" color={C.ink2} bg={C.soft} size={24} icon="db" />
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- authentication + RBAC ---------------- */
const ROLES: Array<[string, boolean[]]> = [
  ['Admin', [true, true, true]],
  ['Member', [true, true, false]],
  ['Viewer', [true, false, false]],
];

const Auth: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const login = sp(f, fps, b(0.3), springs.snappy);
  const tok = sp(f, fps, b(1.25), springs.snappy);
  const mat = sp(f, fps, b(1.8), springs.snappy);
  const reqT = prog(f, b(2.8), b(3.3), ease.inOut);
  const deny = prog(f, b(3.3), b(3.5));
  const shake = f > b(3.3) && f < b(3.3) + 12 ? Math.sin((f - b(3.3)) * 2.2) * 8 * (1 - (f - b(3.3)) / 12) : 0;
  const typed = 'sara@company-a.com'.slice(0, Math.floor(interpolate(f, [b(0.5), b(0.95)], [0, 18], clamp)));
  return (
    <AbsoluteFill>
      <Head title="Authentication" desc="لإدارة الحسابات" sub={<div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 2, opacity: prog(f, b(0.6), b(0.9))}}><span style={{fontFamily: F.ar, fontSize: 34, color: C.muted}}>+ صلاحيات حسب الدور</span><Tag text="RBAC" color={C.blue} bg={C.blueSoft} size={26} /></div>} />
      {/* login */}
      <div dir="rtl" style={{position: 'absolute', left: 520, top: 500, width: 380, height: 300, borderRadius: 30, background: C.white, boxShadow: shadow.card, padding: 26, display: 'flex', flexDirection: 'column', gap: 14, opacity: Math.min(1, login * 1.5), transform: `translateY(${(1 - login) * 60}px)`}}>
        <span style={{fontFamily: F.ar, fontSize: 30, color: C.navy}}>تسجيل الدخول</span>
        <div dir="ltr" style={{height: 54, borderRadius: 14, border: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 16px'}}><Lat size={22} color={C.ink2} weight={400}>{typed}</Lat></div>
        <div dir="ltr" style={{height: 54, borderRadius: 14, border: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px'}}>
          {Array.from({length: Math.floor(interpolate(f, [b(0.95), b(1.15)], [0, 9], clamp))}, (_, i) => <div key={i} style={{width: 11, height: 11, borderRadius: 11, background: C.ink2}} />)}
        </div>
        <div style={{height: 54, borderRadius: 14, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.ar, fontSize: 26, color: '#fff', transform: `scale(${1 - pulse(f, b(1.15), 8) * 0.06})`}}>دخول</div>
      </div>
      <Cursor path={[[b(0.4), 800, 820], [b(1.05), 760, 755], [b(1.6), 760, 760]]} clickAt={[b(1.15)]} />
      <Svg>
        <Wire pts={[[512, 650], [478, 650]]} draw={prog(f, b(1.2), b(1.4))} color={C.blue} />
      </Svg>
      {/* token */}
      <div dir="rtl" style={{position: 'absolute', left: 70, top: 500, width: 400, height: 300, borderRadius: 30, background: C.white, boxShadow: shadow.card, padding: 24, display: 'flex', flexDirection: 'column', gap: 12, opacity: Math.min(1, tok * 1.5), transform: `translateX(${(1 - tok) * 60}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <span style={{fontFamily: F.ar, fontSize: 30, color: C.navy}}>١. من أنت؟</span>
        </div>
        <Tag text="JWT · signed" color={C.blue} bg={C.blueSoft} icon="key" size={24} style={{alignSelf: 'flex-start'}} />
        <div dir="ltr" style={{display: 'flex', flexDirection: 'column', gap: 6, padding: '10px 16px', borderRadius: 14, background: C.surface, border: `1px solid ${C.line}`}}>
          {[['user', 'sara'], ['tenant', 'A'], ['role', 'Viewer']].map(([k, v], i) => (
            <div key={k} style={{display: 'flex', gap: 10, opacity: prog(f, b(1.4) + i * 4, b(1.6) + i * 4)}}>
              <Lat size={24} color={C.muted} weight={400}>{k}:</Lat>
              <Lat size={24} color={k === 'role' ? C.purple : C.navy} weight={600}>{v}</Lat>
            </div>
          ))}
        </div>
      </div>
      {/* RBAC matrix */}
      <div dir="rtl" style={{position: 'absolute', left: 70, right: 180, top: 840, height: 410, borderRadius: 30, background: C.white, boxShadow: shadow.card, padding: '22px 30px', opacity: Math.min(1, mat * 1.5), transform: `translateY(${(1 - mat) * 60}px) translateX(${shake}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12}}>
          <span style={{fontFamily: F.ar, fontSize: 30, color: C.navy}}>٢. ماذا يحق لك؟</span>
          <Lat size={24} color={C.muted} weight={400}>Authorization</Lat>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', rowGap: 6, alignItems: 'center'}}>
          {['الدور', 'عرض', 'تعديل', 'حذف'].map((h) => <span key={h} style={{fontFamily: F.ar, fontSize: 26, color: C.muted, textAlign: h === 'الدور' ? 'right' : 'center', paddingBottom: 6}}>{h}</span>)}
          {ROLES.map(([r, perms], ri) => {
            const rp = prog(f, b(2.0) + ri * 4, b(2.25) + ri * 4);
            const isV = r === 'Viewer';
            return (
              <React.Fragment key={r}>
                <div style={{padding: '14px 0', borderTop: `1px solid ${C.line}`, opacity: rp, background: isV && reqT > 0 ? `rgba(123,77,255,${0.06 * Math.min(1, reqT * 3)})` : undefined}}><Lat size={28} weight={600} color={isV ? C.purple : C.navy}>{r}</Lat></div>
                {perms.map((ok, ci) => {
                  const hit = isV && ci === 2;
                  return (
                    <div key={ci} style={{display: 'flex', justifyContent: 'center', padding: '10px 0', borderTop: `1px solid ${C.line}`, opacity: rp, background: isV && reqT > 0 ? `rgba(123,77,255,${0.06 * Math.min(1, reqT * 3)})` : undefined}}>
                      <div style={{transform: `scale(${1 + (hit ? pulse(f, b(3.3), 16) * 0.5 : 0)})`, boxShadow: hit && deny > 0 ? `0 0 0 ${6 * deny}px rgba(224,71,63,0.18)` : undefined, borderRadius: 40}}><Mark ok={ok} size={42} p={rp} /></div>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* viewer tries to delete */}
      <div style={{position: 'absolute', left: 0, top: 0, transform: `translate(${interpolate(reqT, [0, 1], [-40, 110])}px, ${interpolate(reqT, [0, 1], [1330, 1185])}px)`, opacity: reqT > 0 ? 1 - deny : 0, zIndex: 8}}>
        <Tag text="DELETE /projects/42" color={C.red} bg={C.white} size={26} style={{boxShadow: shadow.soft}} />
      </div>
      <div dir="rtl" style={{position: 'absolute', left: 70, right: 180, top: 1270, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: deny, transform: `translateY(${(1 - deny) * 20}px)`}}>
        <Tag text="403 Forbidden" color={C.red} bg={C.redSoft} icon="lock" size={26} />
        <span style={{fontFamily: F.ar, fontSize: 30, color: C.red}}>لا يملك صلاحية الحذف</span>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- multi-tenancy ---------------- */
const ROWS: Array<['A' | 'B', string]> = [
  ['A', 'تطبيق المتجر'],
  ['B', 'حملة التسويق'],
  ['A', 'موقع الشركة'],
  ['B', 'تقرير الربع'],
];

const Tenancy: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const AX = 700;
  const BX = 280;
  const PY = [690, 810];
  const DBY = 890;
  const r1 = prog(f, b(0.9), b(1.5), ease.inOut);
  const filt = prog(f, b(1.45), b(1.7));
  const resT = prog(f, b(1.75), b(2.25), ease.inOut);
  const got = prog(f, b(2.25), b(2.5));
  const atk = prog(f, b(2.9), b(3.25), ease.inOut);
  const block = prog(f, b(3.25), b(3.45));
  const shake = f > b(3.25) && f < b(3.25) + 14 ? Math.sin((f - b(3.25)) * 2.3) * 9 * (1 - (f - b(3.25)) / 14) : 0;
  const co = (id: 'A' | 'B', x: number, at: number) => {
    const p = sp(f, fps, at, springs.snappy);
    const c = TEN[id];
    return (
      <div dir="rtl" style={{position: 'absolute', left: x - 190, top: 450, width: 380, height: 160, borderRadius: 28, background: C.white, boxShadow: shadow.card, border: `3px solid ${c.c}33`, padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 10, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 40}px)`, zIndex: 5}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Icon name="building" size={40} color={c.c} sw={2.1} />
          <span style={{fontFamily: F.ar, fontSize: 36, color: c.c}}>شركة</span>
          <Lat size={36} weight={700} color={c.c}>{id}</Lat>
        </div>
        {id === 'A' ? (
          <div style={{position: 'relative', height: 44}}>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 10, opacity: 1 - got}}><Tag text="GET /projects" color={c.c} bg={c.s} size={22} /></div>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 10, opacity: got * (1 - prog(f, b(2.75), b(2.9)))}}><Mark ok size={38} p={got} /><span style={{fontFamily: F.ar, fontSize: 26, color: C.ink}}>مشروعان فقط: بياناتها</span></div>
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 10, opacity: prog(f, b(2.8), b(2.95))}}><Tag text="GET /projects/B-17" color={C.red} bg={C.redSoft} size={22} /><span style={{fontFamily: F.ar, fontSize: 24, color: C.muted, whiteSpace: 'nowrap'}}>محاولة</span></div>
          </div>
        ) : (
          <span style={{fontFamily: F.ar, fontSize: 26, color: C.muted}}>نفس المنصة، بيانات منفصلة</span>
        )}
      </div>
    );
  };
  const plat = sp(f, fps, b(0.4), springs.snappy);
  return (
    <AbsoluteFill>
      <Head title="Multi-tenancy" desc="لعزل بيانات العملاء" />
      {co('A', AX, b(0.2))}
      {co('B', BX, b(0.3))}
      <Svg>
        <Wire pts={[[AX, 612], [AX, PY[0] - 6]]} draw={prog(f, b(0.5), b(0.8))} color={TEN.A.c} />
        <Wire pts={[[BX, 612], [BX, PY[0] - 6]]} draw={prog(f, b(0.55), b(0.85))} color={TEN.B.c} />
        <Wire pts={[[490, PY[1]], [490, DBY - 6]]} draw={prog(f, b(0.7), b(1.0))} color={C.dim} />
        <Packet pts={[[AX, 612], [AX, PY[0] + 20], [490, PY[1] - 20], [490, DBY + 10]]} t={r1 > 0 && r1 < 1 ? r1 : 0} color={TEN.A.c} />
        <Packet pts={[[490, DBY + 10], [490, PY[1] - 20], [AX, PY[0] + 20], [AX, 612]]} t={resT > 0 && resT < 1 ? resT : 0} color={C.green} />
        <Packet pts={[[AX, 612], [AX, PY[0] + 30]]} t={atk > 0 && atk < 1 ? atk : 0} color={C.red} />
      </Svg>
      {/* shared platform with tenant gate */}
      <div dir="rtl" style={{position: 'absolute', left: 90, right: 90, top: PY[0], height: PY[1] - PY[0], borderRadius: 28, background: C.white, boxShadow: block > 0 ? `${shadow.card}, 0 0 0 ${4 * block}px rgba(224,71,63,0.35)` : shadow.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', opacity: Math.min(1, plat * 1.5), transform: `translateX(${shake}px)`, zIndex: 6}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Icon name="server" size={42} color={C.navy} sw={2} />
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{fontFamily: F.ar, fontSize: 30, color: C.navy}}>منصة واحدة مشتركة</span>
            <Lat size={22} color={C.muted} weight={400}>API + Backend</Lat>
          </div>
        </div>
        <div style={{position: 'relative', width: 300, height: 60}}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', opacity: 1 - block}}>
            <Tag text={filt > 0 ? 'filter: tenant_id = A' : 'filter: tenant_id'} color={filt > 0 ? TEN.A.c : C.muted} bg={filt > 0 ? TEN.A.s : C.soft} icon="shield" size={22} style={{transform: `scale(${1 + pulse(f, b(1.45), 12) * 0.1})`}} />
          </div>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', opacity: block}}>
            <Tag text="403 · tenant mismatch" color={C.red} bg={C.redSoft} icon="lock" size={22} />
          </div>
        </div>
      </div>
      {/* shared database, rows tagged by tenant */}
      <div dir="rtl" style={{position: 'absolute', left: 90, right: 90, top: DBY, height: 420, borderRadius: 30, background: C.white, boxShadow: shadow.card, padding: '20px 28px', opacity: prog(f, b(0.6), b(0.9)), zIndex: 5}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12}}>
          <Icon name="db" size={38} color={C.navy} sw={2} />
          <span style={{fontFamily: F.ar, fontSize: 28, color: C.navy}}>قاعدة بيانات مشتركة · جدول</span>
          <Lat size={26} color={C.ink2}>projects</Lat>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '180px 1fr 70px', alignItems: 'center'}}>
          <div style={{padding: '8px 0'}}><Lat size={22} color={C.muted} weight={400}>tenant_id</Lat></div>
          <span style={{fontFamily: F.ar, fontSize: 24, color: C.muted}}>المشروع</span>
          <span />
          {ROWS.map(([t, n], i) => {
            const mine = t === 'A';
            const dim = filt * (mine ? 0 : 1);
            const lit = filt * (mine ? 1 : 0);
            const lockP = mine ? 0 : Math.max(filt, block);
            return (
              <React.Fragment key={i}>
                <div style={{padding: '14px 0', borderTop: `1px solid ${C.line}`, opacity: 1 - dim * 0.55, background: `rgba(31,91,255,${0.07 * lit})`}}>
                  <Tag text={t} color={TEN[t].c} bg={TEN[t].s} size={24} style={{marginRight: 10}} />
                </div>
                <div style={{padding: '16px 0', borderTop: `1px solid ${C.line}`, opacity: 1 - dim * 0.55, background: `rgba(31,91,255,${0.07 * lit})`, fontFamily: F.ar, fontSize: 30, color: C.ink, filter: dim > 0 ? `blur(${dim * 3}px)` : undefined}}>{n}</div>
                <div style={{padding: '14px 0', borderTop: `1px solid ${C.line}`, display: 'flex', justifyContent: 'center', background: `rgba(31,91,255,${0.07 * lit})`}}>
                  {mine ? <Mark ok size={36} p={lit} /> : <div style={{opacity: lockP, transform: `scale(${0.6 + 0.4 * lockP + (block > 0 && block < 1 ? 0.2 * block : 0)})`}}><Icon name="lock" size={32} color={block > 0 ? C.red : C.muted} sw={2.2} /></div>}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* conclusion */}
      <div dir="rtl" style={{position: 'absolute', left: 60, right: 60, top: 1330, display: 'flex', justifyContent: 'center', opacity: prog(f, b(3.5), b(3.8)), transform: `translateY(${(1 - prog(f, b(3.5), b(3.8))) * 20}px)`, zIndex: 7}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '14px 26px', borderRadius: 999, background: C.navy}}>
          <Icon name="lock" size={32} color="#fff" sw={2.2} />
          <span style={{fontFamily: F.ar, fontSize: 32, color: '#fff'}}>شركة A لا تستطيع الوصول إلى بيانات شركة B</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- subscription & billing ---------------- */
const Billing: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const plans = sp(f, fps, b(0.2), springs.snappy);
  const sel = prog(f, b(0.95), b(1.1));
  const FY = 760;
  const fx = [[640, 900], [360, 600], [80, 320]];
  const hop1 = prog(f, b(1.2), b(1.55), ease.inOut);
  const hop2 = prog(f, b(1.7), b(2.1), ease.inOut);
  const active = prog(f, b(2.2), b(2.4));
  const inv = sp(f, fps, b(2.7), springs.snappy);
  const rec = sp(f, fps, b(1.0), springs.snappy);
  const flowNode = (i: number, icon: IconName, t: string, d: string) => {
    const p = sp(f, fps, b(0.8) + i * 4, springs.snappy);
    const g = i === 1 ? pulse(f, b(1.55), 14) : i === 2 ? pulse(f, b(2.1), 14) : pulse(f, b(1.1), 12);
    return (
      <div dir="rtl" style={{position: 'absolute', left: fx[i][1] - 240, top: FY, width: 240, height: 130, borderRadius: 26, background: C.white, boxShadow: `${shadow.card}${g > 0 ? `, 0 0 0 ${4 * g}px ${C.blue}55` : ''}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 40}px)`, zIndex: 5}}>
        <Icon name={icon} size={40} color={C.blue} sw={2} />
        <Lat size={26} weight={600} color={C.navy}>{t}</Lat>
        <span style={{fontFamily: F.ar, fontSize: 22, color: C.muted}}>{d}</span>
      </div>
    );
  };
  const plan = (x: number, name: string, price: string, pro: boolean) => (
    <div dir="rtl" style={{position: 'absolute', left: x, top: 460, width: 370, height: 240, borderRadius: 30, background: C.white, boxShadow: pro && sel > 0 ? `${shadow.card}, 0 0 0 ${4 * sel}px ${C.blue}` : shadow.card, padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 10, opacity: Math.min(1, plans * 1.5), transform: `translateY(${(1 - plans) * 50}px) scale(${pro ? 1 + sel * 0.03 : 1 - sel * 0.03})`}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Lat size={34} weight={700} color={pro ? C.blue : C.navy}>{name}</Lat>
        {pro ? <Tag ar text="الأكثر طلباً" color={C.blue} bg={C.blueSoft} size={20} /> : null}
      </div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 8}}>
        <Lat size={48} weight={700} color={C.navy}>{price}</Lat>
        <span style={{fontFamily: F.ar, fontSize: 26, color: C.muted}}>/ شهرياً</span>
      </div>
      <div style={{height: 52, borderRadius: 14, background: pro ? C.blue : C.soft, color: pro ? '#fff' : C.ink2, fontFamily: F.ar, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pro ? 1 - pulse(f, b(0.95), 8) * 0.06 : 1})`}}>اشترك</div>
    </div>
  );
  return (
    <AbsoluteFill>
      <Head title="Subscription & Billing" desc="لإدارة الاشتراكات والمدفوعات" />
      {plan(530, 'Pro', '$29', true)}
      {plan(110, 'Starter', '$9', false)}
      <Cursor path={[[b(0.4), 860, 790], [b(0.9), 760, 670], [b(1.4), 760, 675]]} clickAt={[b(0.95)]} />
      <Svg>
        <Wire pts={[[fx[0][0] - 6, FY + 65], [fx[1][1] + 6, FY + 65]]} draw={prog(f, b(0.9), b(1.15))} color={C.blue} />
        <Wire pts={[[fx[1][0] - 6, FY + 65], [fx[2][1] + 6, FY + 65]]} draw={prog(f, b(1.0), b(1.25))} color={C.blue} />
        <Packet pts={[[fx[0][0], FY + 65], [fx[1][1], FY + 65]]} t={hop1 > 0 && hop1 < 1 ? hop1 : 0} color={C.blue} />
        <Packet pts={[[fx[1][0], FY + 65], [fx[2][1], FY + 65]]} t={hop2 > 0 && hop2 < 1 ? hop2 : 0} color={C.green} />
        <Wire pts={[[200, FY + 136], [200, 974]]} draw={prog(f, b(2.05), b(2.25))} color={C.green} />
      </Svg>
      {flowNode(0, 'card', 'Checkout', 'صفحة الدفع')}
      {flowNode(1, 'shield', 'Payment', 'مزود الدفع')}
      {flowNode(2, 'server', 'Backend', 'يحدّث الاشتراك')}
      <div style={{position: 'absolute', left: 300, top: FY - 50, width: 360, display: 'flex', justifyContent: 'center', opacity: prog(f, b(1.6), b(1.8))}}>
        <Tag text="webhook: payment.succeeded" color={C.green} bg={C.greenSoft} icon="webhook" size={20} />
      </div>
      {/* subscription record */}
      <div dir="rtl" style={{position: 'absolute', left: 90, right: 180, top: 980, height: 330, borderRadius: 30, background: C.white, boxShadow: shadow.card, padding: '22px 30px', display: 'flex', flexDirection: 'column', gap: 4, opacity: Math.min(1, rec * 1.5), transform: `translateY(${(1 - rec) * 50}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6}}>
          <Icon name="db" size={34} color={C.navy} sw={2} />
          <Lat size={28} weight={600} color={C.navy}>subscription</Lat>
          <Tag text="tenant A" color={TEN.A.c} bg={TEN.A.s} size={20} />
        </div>
        {[
          ['الخطة', <Lat key="p" size={28} weight={600} color={C.blue}>Pro</Lat>],
          ['الحالة', (
            <div key="s" style={{position: 'relative', width: 160, height: 38}}>
              <div style={{position: 'absolute', right: 0, opacity: 1 - active}}><Tag text="pending" color={C.amber} bg={C.amberSoft} size={22} /></div>
              <div style={{position: 'absolute', right: 0, opacity: active, transform: `scale(${0.8 + 0.2 * active})`}}><Tag text="active" color={C.green} bg={C.greenSoft} icon="check" size={22} /></div>
            </div>
          )],
          ['التجديد التالي', <Lat key="r" size={26} color={C.ink2}>18/12/2026</Lat>],
          ['حد المستخدمين', <Lat key="u" size={26} color={C.ink2}>{active > 0.5 ? '10' : '3'}</Lat>],
        ].map(([k, v], i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: `1px solid ${C.line}`}}>
            <span style={{fontFamily: F.ar, fontSize: 28, color: C.muted}}>{k}</span>
            {v}
          </div>
        ))}
      </div>
      <div dir="rtl" style={{position: 'absolute', left: 0, right: 90, top: 1325, display: 'flex', justifyContent: 'center', opacity: Math.min(1, inv * 1.5), transform: `translateY(${(1 - inv) * 20}px)`}}>
        <Tag ar text="فاتورة رقم 1024 · مدفوعة · تجديد تلقائي شهري" color={C.ink2} bg={C.white} icon="doc" size={26} style={{boxShadow: shadow.soft}} />
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- component checklist ---------------- */
const CHIPS: Array<[string, IconName, number]> = [
  ['Frontend', 'layout', b(1.2)],
  ['Backend', 'server', b(1.6)],
  ['Database', 'db', b(1.8)],
  ['Authentication', 'key', b(7.3)],
  ['Multi-tenancy', 'building', b(11.8)],
  ['Subscription & Billing', 'card', b(16.8)],
];
const Checklist: React.FC = () => {
  const f = useCurrentFrame();
  const vis = prog(f, b(1.0), b(1.4));
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: 1468, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, opacity: vis, direction: 'rtl', zIndex: 9}}>
      {CHIPS.map(([t, ic, a]) => {
        const on = prog(f, a, a + 10);
        return (
          <div key={t} dir="ltr" style={{display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 999, background: on > 0.5 ? C.navy : 'rgba(255,255,255,0.8)', border: `1.5px solid ${on > 0.5 ? C.navy : C.line}`, transform: `scale(${1 + pulse(f, a, 12) * 0.12})`}}>
            <Icon name={ic} size={22} color={on > 0.5 ? '#fff' : C.dim} sw={2.2} />
            <Lat size={21} color={on > 0.5 ? '#fff' : C.dim}>{t}</Lat>
          </div>
        );
      })}
    </div>
  );
};

export const Arch: React.FC = () => {
  const total = scene('arch').duration + o;
  const parts: Array<[keyof typeof SUB, React.FC]> = [['flow', Flow], ['auth', Auth], ['tenancy', Tenancy], ['billing', Billing]];
  return (
    <AbsoluteFill>
      {parts.map(([id, Comp], k) => {
        const from = k === 0 ? 0 : sec(SUB[id][0]);
        const end = k === parts.length - 1 ? total : o + sec(SUB[id][1]);
        const d = end - from;
        return (
          <Sequence key={id} from={from} durationInFrames={d} layout="none">
            <Shot duration={d} inF={k === 0 ? 0 : 12} outF={k === parts.length - 1 ? 0 : 10} push={0.02}>
              <Comp />
            </Shot>
          </Sequence>
        );
      })}
      <Checklist />
    </AbsoluteFill>
  );
};
