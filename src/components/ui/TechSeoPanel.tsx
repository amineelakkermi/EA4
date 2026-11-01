import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts, shadow} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {CheckIcon} from '../Icons';
import {Typed} from './Typed';

const mono = "'IBM Plex Mono', 'SF Mono', Menlo, Consolas, monospace";

/**
 * Top: a Google result preview where the <title> and meta description are
 * typed live. Bottom: a technical checklist; robots.txt starts by blocking
 * crawlers and is fixed.
 */
export const TechSeoPanel: React.FC<{start: number; width?: number; fixAt: number}> = ({start, width = 900, fixAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = width / 900;
  const title = 'تصميم مواقع احترافية في السعودية | EA4';
  const desc = 'نصمم مواقع سريعة ومتجاوبة تعكس هوية نشاطك، وتساعد عملاءك يوصلون لك بسهولة.';
  const titleAt = start + 8;
  const descAt = titleAt + Math.ceil(title.length / 1.0) + 6;
  const card = sp(frame, fps, start, springs.smooth);
  const listAt = descAt + Math.ceil(desc.length / 2.2) + 8;
  const list = sp(frame, fps, listAt, springs.smooth);
  const fix = interpolate(frame, [fixAt, fixAt + 12], [0, 1], {...clamp, easing: ease.out});
  const fixPop = sp(frame, fps, fixAt, springs.snappy);
  const items: {k: string; v: string; code?: string; at: number}[] = [
    {k: 'عنوان الصفحة', code: '<title>', v: 'واضح ومحدد', at: listAt + 8},
    {k: 'وصف الصفحة', code: 'meta description', v: 'يلخّص محتوى الصفحة', at: listAt + 18},
    {k: 'خريطة الموقع', code: 'sitemap.xml', v: 'مُرسلة لقوقل', at: listAt + 28},
  ];
  const Tag: React.FC<{t: string; color?: string; bg?: string}> = ({t, color = colors.gold, bg = colors.goldSoft}) => (
    <div style={{fontFamily: mono, fontSize: 15 * s, fontWeight: 600, color, background: bg, padding: `${3 * s}px ${9 * s}px`, borderRadius: 8 * s, direction: 'ltr', whiteSpace: 'nowrap'}}>{t}</div>
  );
  return (
    <div dir="rtl" style={{width, fontFamily: fonts.arabic, display: 'flex', flexDirection: 'column', gap: 22 * s}}>
      {/* SERP snippet preview */}
      <div
        style={{
          borderRadius: 30 * s,
          background: colors.surface,
          boxShadow: shadow.float,
          padding: `${28 * s}px ${34 * s}px`,
          opacity: Math.min(1, card * 1.5),
          transform: `translateY(${(1 - card) * 60}px)`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontSize: 18 * s, color: colors.muted, fontWeight: 600}}>معاينة النتيجة في قوقل</div>
          <div style={{display: 'flex', gap: 8 * s}}>
            <Tag t="<title>" />
            <Tag t="<meta name=&quot;description&quot;>" color={colors.blue} bg={colors.blueSoft} />
          </div>
        </div>
        <div style={{height: 1, background: colors.line, margin: `${18 * s}px 0`}} />
        <div style={{display: 'flex', alignItems: 'center', gap: 12 * s, direction: 'ltr', justifyContent: 'flex-end'}}>
          <div style={{fontFamily: fonts.latin, fontSize: 17 * s, color: colors.muted}}>ea-4.vercel.app › services</div>
          <div style={{fontFamily: fonts.latin, fontSize: 18 * s, color: colors.ink, fontWeight: 600}}>EA4</div>
          <div style={{width: 34 * s, height: 34 * s, borderRadius: 99, background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.line}`}}>
            <Img src={staticFile('img/ea4-logo-mark.png')} style={{width: 22 * s}} />
          </div>
        </div>
        <div style={{marginTop: 12 * s, minHeight: 44 * s, display: 'flex', alignItems: 'center', gap: 14 * s}}>
          <Typed text={title} start={titleAt} cps={1.0} size={30 * s} weight={600} color={colors.blueDeep} />
        </div>
        <div style={{marginTop: 8 * s, minHeight: 72 * s, fontSize: 22 * s, lineHeight: 1.6, color: colors.muted}}>
          <Typed text={desc} start={descAt} cps={2.2} size={22 * s} weight={500} color={colors.muted} />
        </div>
      </div>

      {/* technical checklist */}
      <div
        style={{
          borderRadius: 30 * s,
          background: colors.surface,
          boxShadow: shadow.card,
          padding: `${24 * s}px ${34 * s}px`,
          opacity: Math.min(1, list * 1.5),
          transform: `translateY(${(1 - list) * 60}px)`,
        }}
      >
        <div style={{fontSize: 20 * s, color: colors.muted, fontWeight: 600, marginBottom: 6 * s}}>فحص تقني سريع</div>
        {items.map((it) => {
          const p = sp(frame, fps, it.at, springs.smooth);
          return (
            <div key={it.k} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${12 * s}px 0`, borderBottom: `1px solid ${colors.line}`, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * 20}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12 * s}}>
                <div style={{width: 40 * s, height: 40 * s, borderRadius: 99, background: colors.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <CheckIcon size={22 * s} progress={interpolate(frame, [it.at + 6, it.at + 18], [0, 1], {...clamp})} />
                </div>
                <div style={{fontSize: 23 * s, fontWeight: 700, color: colors.ink}}>{it.k}</div>
                {it.code && <Tag t={it.code} color={colors.muted} bg={colors.bg} />}
              </div>
              <div style={{fontSize: 20 * s, color: colors.green, fontWeight: 600}}>{it.v}</div>
            </div>
          );
        })}
        {/* robots.txt row */}
        {(() => {
          const at = listAt + 40;
          const p = sp(frame, fps, at, springs.smooth);
          const bad = colors.red;
          const c = fix > 0.5 ? colors.green : bad;
          return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${12 * s}px 0`, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * 20}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12 * s}}>
                <div style={{width: 40 * s, height: 40 * s, borderRadius: 99, background: fix > 0.5 ? colors.greenSoft : colors.redSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + (1 - Math.min(1, fixPop)) * 0.2 * (fix > 0 ? 1 : 0)})`}}>
                  {fix > 0.5 ? (
                    <CheckIcon size={22 * s} progress={fix} />
                  ) : (
                    <div style={{fontFamily: fonts.latin, fontWeight: 800, color: bad, fontSize: 22 * s, lineHeight: 1}}>!</div>
                  )}
                </div>
                <div style={{fontSize: 23 * s, fontWeight: 700, color: colors.ink}}>ملف robots.txt</div>
                <Tag t={fix > 0.5 ? 'Allow: /' : 'Disallow: /'} color={c} bg={fix > 0.5 ? colors.greenSoft : colors.redSoft} />
              </div>
              <div style={{fontSize: 20 * s, color: c, fontWeight: 600}}>{fix > 0.5 ? 'محركات البحث تقدر توصل' : 'يمنع محركات البحث!'}</div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
