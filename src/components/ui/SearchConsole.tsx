import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {CheckIcon, SearchIcon, GlobeIcon, DocIcon, TrendIcon} from '../Icons';
import {Typed, Line} from './Typed';

/**
 * Search Console-inspired UI: sidebar, URL inspection bar typing a URL,
 * then a green "indexed" verdict card. No fabricated performance statistics.
 */
export const SearchConsole: React.FC<{start: number; width?: number}> = ({start, width = 900}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = width / 900;
  const url = 'ea-4.vercel.app/services';
  const typeStart = start + 6;
  const inspectAt = typeStart + Math.ceil(url.length / 0.9) + 8;
  const spin = interpolate(frame, [inspectAt, inspectAt + 18], [0, 1], {...clamp});
  const verdict = sp(frame, fps, inspectAt + 18, springs.smooth);
  const check = interpolate(frame, [inspectAt + 24, inspectAt + 40], [0, 1], {...clamp, easing: ease.out});
  const nav = [
    {t: 'نظرة عامة', i: <GlobeIcon size={24 * s} />},
    {t: 'فحص عنوان URL', i: <SearchIcon size={24 * s} color={colors.blue} />, active: true},
    {t: 'الأداء', i: <TrendIcon size={24 * s} color={colors.muted} />},
    {t: 'الصفحات', i: <DocIcon size={24 * s} color={colors.muted} />},
  ];
  return (
    <div dir="rtl" style={{width, display: 'flex', fontFamily: fonts.arabic, height: 760 * s}}>
      <div style={{width: 250 * s, background: colors.surfaceAlt, borderLeft: `1px solid ${colors.line}`, padding: 26 * s}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10 * s, marginBottom: 30 * s}}>
          <div style={{width: 34 * s, height: 34 * s, borderRadius: 10 * s, background: colors.blue}} />
          <div style={{fontSize: 20 * s, fontWeight: 700, color: colors.navy}}>Search Console</div>
        </div>
        {nav.map((n) => (
          <div
            key={n.t}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12 * s,
              padding: `${14 * s}px ${14 * s}px`,
              borderRadius: 14 * s,
              background: n.active ? colors.blueSoft : 'transparent',
              color: n.active ? colors.blue : colors.muted,
              fontSize: 21 * s,
              fontWeight: 600,
              marginBottom: 6 * s,
            }}
          >
            {n.i}
            {n.t}
          </div>
        ))}
      </div>
      <div style={{flex: 1, padding: 34 * s, position: 'relative'}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16 * s,
            height: 78 * s,
            borderRadius: 99,
            border: `1.5px solid ${colors.line}`,
            padding: `0 ${24 * s}px`,
            background: colors.surface,
            boxShadow: '0 8px 24px -12px rgba(11,27,58,0.2)',
          }}
        >
          <SearchIcon size={30 * s} color={colors.muted} />
          <Typed text={url} start={typeStart} cps={0.9} size={26 * s} dir="ltr" color={colors.ink} weight={500} />
        </div>
        <div style={{fontSize: 20 * s, color: colors.muted, marginTop: 14 * s, paddingRight: 10 * s}}>
          فحص أي عنوان URL في موقعك
        </div>

        {/* inspecting */}
        <div
          style={{
            marginTop: 40 * s,
            display: 'flex',
            alignItems: 'center',
            gap: 16 * s,
            opacity: spin > 0 && verdict < 0.4 ? 1 - verdict * 2.5 : 0,
          }}
        >
          <div
            style={{
              width: 30 * s,
              height: 30 * s,
              borderRadius: 99,
              border: `3px solid ${colors.blueSoft}`,
              borderTopColor: colors.blue,
              transform: `rotate(${(frame - inspectAt) * 24}deg)`,
            }}
          />
          <div style={{fontSize: 22 * s, color: colors.muted, fontWeight: 600}}>جارٍ فحص الصفحة…</div>
        </div>

        {/* verdict card */}
        <div
          style={{
            position: 'absolute',
            left: 34 * s,
            right: 34 * s,
            top: 200 * s,
            borderRadius: 26 * s,
            border: `1.5px solid ${colors.line}`,
            background: colors.surface,
            padding: 30 * s,
            opacity: Math.min(1, verdict * 1.5),
            transform: `translateY(${(1 - verdict) * 40}px)`,
            boxShadow: '0 20px 40px -20px rgba(11,27,58,0.2)',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 20 * s}}>
            <div
              style={{
                width: 72 * s,
                height: 72 * s,
                borderRadius: 99,
                background: colors.greenSoft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CheckIcon size={42 * s} progress={check} strokeWidth={3} />
            </div>
            <div>
              <div style={{fontSize: 30 * s, fontWeight: 700, color: colors.green}}>الصفحة مفهرسة في قوقل</div>
              <div style={{fontSize: 20 * s, color: colors.muted, marginTop: 6 * s}}>يمكن أن تظهر هذه الصفحة في نتائج البحث</div>
            </div>
          </div>
          <div style={{height: 1, background: colors.line, margin: `${26 * s}px 0`}} />
          {[
            ['الزحف', 'مسموح'],
            ['الفهرسة', 'مسموحة'],
            ['ملاءمة الجوال', 'الصفحة ملائمة'],
          ].map(([k, v], i) => {
            const p = sp(frame, fps, inspectAt + 30 + i * 4, springs.smooth);
            return (
              <div
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: `${12 * s}px 0`,
                  opacity: Math.min(1, p * 1.5),
                  transform: `translateX(${(1 - p) * 20}px)`,
                }}
              >
                <div style={{fontSize: 22 * s, color: colors.ink, fontWeight: 600}}>{k}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: 10 * s, color: colors.green, fontSize: 21 * s, fontWeight: 600}}>
                  <CheckIcon size={22 * s} progress={1} /> {v}
                </div>
              </div>
            );
          })}
          <div style={{display: 'flex', flexDirection: 'column', gap: 10 * s, marginTop: 20 * s}}>
            <Line w="70%" h={10 * s} />
            <Line w="45%" h={10 * s} />
          </div>
        </div>
      </div>
    </div>
  );
};
