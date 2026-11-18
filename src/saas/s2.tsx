import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, TEN, OVERLAP, sec, shadow} from './config';
import {sp, springs, clamp, ease, prog} from '../anim';
import {Words, Browser, Bar, Icon, Lat, Tag} from './components';

const at = (s: number) => OVERLAP + sec(s);

type Tenant = {id: 'A' | 'B' | 'C'; user: string; role: string; plan: string; members: number; projects: string[]};
const TENANTS: Tenant[] = [
  {id: 'A', user: 'سارة', role: 'Admin', plan: 'Pro', members: 12, projects: ['تطبيق المتجر', 'موقع الشركة', 'حملة رمضان']},
  {id: 'B', user: 'خالد', role: 'Member', plan: 'Starter', members: 5, projects: ['تقرير الربع', 'حملة التسويق']},
  {id: 'C', user: 'ليلى', role: 'Viewer', plan: 'Business', members: 40, projects: ['نظام الحجوزات', 'بوابة العملاء', 'تطبيق التوصيل']},
];
const SWITCH = [at(3.6), at(5.6)]; // A -> B -> C

const Workspace: React.FC<{t: Tenant; p: number}> = ({t, p}) => {
  const col = TEN[t.id].c;
  return (
    <div dir="rtl" style={{position: 'absolute', inset: 0, padding: 30, display: 'flex', flexDirection: 'column', gap: 22, opacity: p, transform: `translateX(${(1 - p) * -60}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderRadius: 18, background: TEN[t.id].s}}>
          <Icon name="building" size={36} color={col} sw={2.1} />
          <span style={{fontFamily: F.ar, fontSize: 34, color: col}}>شركة</span>
          <Lat size={34} weight={700} color={col}>{t.id}</Lat>
        </div>
        <Tag ar text={`${t.plan} · اشتراك شهري`} color={C.ink2} bg={C.soft} icon="card" size={24} />
      </div>
      <div style={{display: 'flex', gap: 18}}>
        {[
          ['المستخدم', t.user, 'user'],
          ['الصلاحية', t.role, 'key'],
          ['الأعضاء', String(t.members), 'users'],
        ].map(([k, v, ic]) => (
          <div key={k} style={{flex: 1, borderRadius: 20, background: C.surface, border: `1px solid ${C.line}`, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}><Icon name={ic as 'user'} size={24} color={C.muted} /><span style={{fontFamily: F.ar, fontSize: 22, color: C.muted}}>{k}</span></div>
            <span style={{fontFamily: F.ar, fontSize: 32, color: C.navy}}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{borderRadius: 22, border: `1px solid ${C.line}`, overflow: 'hidden'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '14px 22px', background: C.surface, fontFamily: F.ar, fontSize: 22, color: C.muted}}>
          <span>مشاريع الشركة</span><span>الحالة</span>
        </div>
        {t.projects.map((n, i) => (
          <div key={n} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', borderTop: `1px solid ${C.line}`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <div style={{width: 14, height: 14, borderRadius: 14, background: col}} />
              <span style={{fontFamily: F.ar, fontSize: 30, color: C.ink}}>{n}</span>
            </div>
            <Bar w={[120, 80, 150][i]} h={12} color={TEN[t.id].s} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const What: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const web = sp(f, fps, at(0.3), springs.smooth);
  const morph = prog(f, at(2.4), at(3.2), ease.inOut);
  const active = f < SWITCH[0] ? 0 : f < SWITCH[1] ? 1 : 2;
  const swP = (i: number) => (i === 0 ? 1 : prog(f, SWITCH[i - 1], SWITCH[i - 1] + 14));
  const ex = sp(f, fps, at(7.0), springs.snappy);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 236, left: 50, right: 50}}>
        <Words text="SaaS ليس مجرد موقع إلكتروني!" size={70} color={C.navy} hi={['ليس', 'مجرد', 'موقع', 'إلكتروني!']} delay={at(0)} stagger={3} />
      </div>
      <div style={{position: 'absolute', top: 350, left: 50, right: 50, display: 'flex', flexDirection: 'column', gap: 2}}>
        <Words text="إنه برنامج سحابي يخدم عدة عملاء،" size={42} color={C.ink2} hi={['سحابي', 'عدة', 'عملاء،']} delay={at(2.6)} stagger={2.2} />
        <Words text="لكل منهم حساب وبيانات وصلاحيات مستقلة،" size={42} color={C.ink2} hi={['حساب', 'وبيانات', 'وصلاحيات']} delay={at(3.9)} stagger={2.2} />
        <Words text="ويُقدم عادةً باشتراك متكرر." size={42} color={C.ink2} hi={['باشتراك', 'متكرر.']} delay={at(5.4)} stagger={2.2} />
      </div>

      {/* plain website card: before morph */}
      <div style={{position: 'absolute', left: 190, right: 190, top: 720, height: 560, opacity: Math.min(1, web * 1.4) * (1 - morph), transform: `translateY(${(1 - web) * 200}px) scale(${1 - morph * 0.1})`}}>
        <Browser url="www.company.com" style={{inset: 0}}>
          <div dir="rtl" style={{padding: 34, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center'}}>
            <Bar w="70%" h={26} color="#DDE2EC" />
            <Bar w="50%" h={16} />
            <div style={{width: '100%', height: 170, borderRadius: 18, background: C.soft, marginTop: 10}} />
            <div style={{display: 'flex', gap: 16, width: '100%'}}>{[0, 1, 2].map((i) => <div key={i} style={{flex: 1, height: 90, borderRadius: 16, background: C.soft}} />)}</div>
          </div>
        </Browser>
        <div style={{position: 'absolute', top: -34, right: 30}}><Tag ar text="موقع: صفحات ثابتة للزوار" color={C.muted} bg={C.white} icon="globe" size={26} style={{boxShadow: shadow.soft}} /></div>
      </div>

      {/* three companies, one platform */}
      <div dir="rtl" style={{position: 'absolute', left: 70, right: 70, top: 640, display: 'flex', justifyContent: 'center', gap: 22, opacity: morph}}>
        {TENANTS.map((t, i) => {
          const on = active === i;
          const p = prog(f, at(2.8) + i * 4, at(3.4) + i * 4);
          return (
            <div key={t.id} style={{display: 'flex', alignItems: 'center', gap: 10, padding: '12px 22px', borderRadius: 999, background: on ? TEN[t.id].c : C.white, boxShadow: shadow.soft, transform: `translateY(${(1 - p) * 30}px) scale(${on ? 1.06 : 1})`, opacity: p}}>
              <Icon name="building" size={30} color={on ? '#fff' : TEN[t.id].c} sw={2.1} />
              <span style={{fontFamily: F.ar, fontSize: 30, color: on ? '#fff' : C.ink}}>شركة</span>
              <Lat size={30} weight={700} color={on ? '#fff' : TEN[t.id].c}>{t.id}</Lat>
            </div>
          );
        })}
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: morph}}>
        {TENANTS.map((t, i) => {
          const x = [790, 540, 290][i];
          const on = active === i;
          return <path key={t.id} d={`M${x} 712 C ${x} 760, 540 740, 540 790`} fill="none" stroke={on ? TEN[t.id].c : C.dim} strokeWidth={on ? 4 : 2.5} strokeDasharray="8 10" strokeDashoffset={-f * 1.5} opacity={on ? 1 : 0.5} />;
        })}
      </svg>
      <div style={{position: 'absolute', left: 70, right: 70, top: 800, height: 640, opacity: morph, transform: `scale(${0.9 + 0.1 * morph})`}}>
        <Browser url="app.projecthub.io" style={{inset: 0}}>
          {TENANTS.map((t, i) => (active === i || (active === i + 1 && swP(i + 1) < 1) ? <Workspace key={t.id} t={t} p={active === i ? swP(i) : 1 - swP(i + 1)} /> : null))}
        </Browser>
      </div>
      {/* example label */}
      <div dir="rtl" style={{position: 'absolute', left: 0, right: 0, top: 1460, display: 'flex', justifyContent: 'center', opacity: Math.min(1, ex * 1.5), transform: `translateY(${(1 - ex) * 30}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '14px 28px', borderRadius: 999, background: C.navy, boxShadow: shadow.soft}}>
          <Icon name="layers" size={34} color="#fff" sw={2} />
          <span style={{fontFamily: F.ar, fontSize: 34, color: '#fff'}}>مثال: منصة لإدارة مشاريع الشركات.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
