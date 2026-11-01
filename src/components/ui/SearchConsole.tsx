import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {CheckIcon, SearchIcon, GlobeIcon, DocIcon, TrendIcon} from '../Icons';
import {Typed, Line} from './Typed';

/**
 * Search Console-inspired URL inspection: a URL is typed, inspected, found
 * NOT indexed; the owner requests indexing and gets a "request sent" note.
 * Deliberately no fabricated ranking data and no promise of results.
 */
export const SearchConsole: React.FC<{start: number; width?: number; requestAt: number}> = ({start, width = 900, requestAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = width / 900;
  const url = 'ea-4.vercel.app/services';
  const typeStart = start + 6;
  const inspectAt = typeStart + Math.ceil(url.length / 0.9) + 8;
  const spin = interpolate(frame, [inspectAt, inspectAt + 18], [0, 1], {...clamp});
  const verdict = sp(frame, fps, inspectAt + 18, springs.smooth);
  const warn = interpolate(frame, [inspectAt + 22, inspectAt + 36], [0, 1], {...clamp, easing: ease.out});
  const press = interpolate(frame, [requestAt, requestAt + 4, requestAt + 10], [1, 0.94, 1], {...clamp});
  const sent = sp(frame, fps, requestAt + 8, springs.snappy);
  const amber = '#C9871F';
  const amberSoft = '#FCF1DE';
  const nav = [
    {t: 'نظرة عامة', i: <GlobeIcon size={24 * s} />},
    {t: 'فحص عنوان URL', i: <SearchIcon size={24 * s} color={colors.blue} />, active: true},
    {t: 'الأداء', i: <TrendIcon size={24 * s} color={colors.muted} />},
    {t: 'الصفحات', i: <DocIcon size={24 * s} color={colors.muted} />},
  ];
  const rows: [string, string, 'ok' | 'warn' | 'na'][] = [
    ['الزحف', 'لم يتم الزحف بعد', 'na'],
    ['الفهرسة', 'غير مفهرسة', 'warn'],
    ['ملاءمة الجوال', 'لم يتم الفحص', 'na'],
  ];
  return (
    <div dir="rtl" style={{width, display: 'flex', fontFamily: fonts.arabic, height: 780 * s}}>
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
            top: 190 * s,
            borderRadius: 26 * s,
            border: `1.5px solid ${colors.line}`,
            background: colors.surface,
            padding: 28 * s,
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
                background: amberSoft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <div style={{width: 6 * s, height: 26 * s, borderRadius: 3, background: amber, transform: `scaleY(${warn})`, transformOrigin: 'top'}} />
              <div style={{position: 'absolute', bottom: 16 * s, width: 7 * s, height: 7 * s, borderRadius: 99, background: amber, opacity: warn}} />
            </div>
            <div>
              <div style={{fontSize: 29 * s, fontWeight: 700, color: amber}}>الصفحة غير موجودة على قوقل</div>
              <div style={{fontSize: 20 * s, color: colors.muted, marginTop: 6 * s}}>هذه الصفحة ما تمت فهرستها بعد، فما تقدر تظهر في نتائج البحث</div>
            </div>
          </div>
          <div style={{height: 1, background: colors.line, margin: `${22 * s}px 0`}} />
          {rows.map(([k, v, st], i) => {
            const p = sp(frame, fps, inspectAt + 30 + i * 4, springs.smooth);
            const c = st === 'warn' ? amber : colors.faint;
            return (
              <div
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: `${10 * s}px 0`,
                  opacity: Math.min(1, p * 1.5),
                  transform: `translateX(${(1 - p) * 20}px)`,
                }}
              >
                <div style={{fontSize: 22 * s, color: colors.ink, fontWeight: 600}}>{k}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: 10 * s, color: c, fontSize: 21 * s, fontWeight: 600}}>
                  <div style={{width: 12 * s, height: 12 * s, borderRadius: 99, background: c}} />
                  {v}
                </div>
              </div>
            );
          })}
          {/* request indexing */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 * s}}>
            <div
              style={{
                fontSize: 21 * s,
                fontWeight: 700,
                color: sent > 0.5 ? colors.green : '#fff',
                background: sent > 0.5 ? colors.greenSoft : colors.blue,
                padding: `${12 * s}px ${26 * s}px`,
                borderRadius: 99,
                transform: `scale(${press})`,
                display: 'flex',
                alignItems: 'center',
                gap: 10 * s,
                boxShadow: sent > 0.5 ? 'none' : '0 14px 28px -14px rgba(30,44,251,0.6)',
              }}
            >
              {sent > 0.5 && <CheckIcon size={20 * s} color={colors.green} progress={sent} />}
              {sent > 0.5 ? 'تم إرسال طلب الفهرسة' : 'طلب الفهرسة'}
            </div>
            <div style={{fontSize: 18 * s, color: colors.muted, opacity: Math.min(1, sent * 1.4), transform: `translateX(${(1 - sent) * -16}px)`}}>
              قوقل راح يراجع الصفحة، والفهرسة تاخذ وقت
            </div>
          </div>
        </div>
        <div style={{position: 'absolute', left: 34 * s, right: 34 * s, bottom: 30 * s, display: 'flex', flexDirection: 'column', gap: 10 * s}}>
          <Line w="60%" h={10 * s} />
          <Line w="40%" h={10 * s} />
        </div>
      </div>
    </div>
  );
};
