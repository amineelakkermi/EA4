import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {SearchIcon, CheckIcon} from '../Icons';
import {Typed} from './Typed';

const suggestions = [
  {k: 'تصميم مواقع الرياض', v: 0.92, hi: true},
  {k: 'شركة تصميم مواقع', v: 0.84, hi: true},
  {k: 'تصميم متجر إلكتروني', v: 0.76, hi: true},
  {k: 'أسعار تصميم المواقع', v: 0.58, hi: false},
  {k: 'تصميم موقع شركة', v: 0.47, hi: false},
];

/**
 * Keyword research tool: query types in, suggestions drop down with intent
 * bars, and the relevant ones get ticked and gathered into a target list.
 */
export const KeywordPanel: React.FC<{start: number; width?: number}> = ({start, width = 900}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = width / 900;
  const listAt = start + 26;
  const pickAt = start + 60;
  return (
    <div dir="rtl" style={{width, padding: 40 * s, fontFamily: fonts.arabic}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18 * s,
          height: 90 * s,
          borderRadius: 24 * s,
          border: `2px solid ${colors.blue}`,
          boxShadow: `0 0 0 ${6 * s}px ${colors.blueSoft}`,
          padding: `0 ${26 * s}px`,
        }}
      >
        <SearchIcon size={34 * s} color={colors.blue} />
        <Typed text="تصميم مواقع" start={start + 4} cps={0.5} size={34 * s} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 30 * s, padding: `0 ${10 * s}px`}}>
        <div style={{fontSize: 22 * s, fontWeight: 700, color: colors.navy}}>اقتراحات الكلمات</div>
        <div style={{fontSize: 20 * s, fontWeight: 600, color: colors.muted}}>حجم البحث</div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14 * s, marginTop: 16 * s}}>
        {suggestions.map((sg, i) => {
          const p = sp(frame, fps, listAt + i * 4, springs.smooth);
          const picked = sg.hi ? sp(frame, fps, pickAt + i * 6, springs.snappy) : 0;
          const bar = interpolate(frame, [listAt + 6 + i * 4, listAt + 30 + i * 4], [0, sg.v], {...clamp, easing: ease.out});
          return (
            <div
              key={sg.k}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18 * s,
                padding: `${16 * s}px ${20 * s}px`,
                borderRadius: 20 * s,
                background: picked > 0.5 ? colors.blueSoft : colors.surfaceAlt,
                border: `1.5px solid ${picked > 0.5 ? colors.blue : colors.line}`,
                opacity: Math.min(1, p * 1.5),
                transform: `translateY(${(1 - p) * 24}px) scale(${1 + picked * 0.015})`,
              }}
            >
              <div
                style={{
                  width: 36 * s,
                  height: 36 * s,
                  borderRadius: 10 * s,
                  border: `2px solid ${picked > 0.5 ? colors.blue : colors.line}`,
                  background: picked > 0.5 ? colors.blue : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CheckIcon size={24 * s} color="#fff" progress={picked} />
              </div>
              <div style={{fontSize: 26 * s, fontWeight: 600, color: colors.ink, flex: 1}}>{sg.k}</div>
              <div style={{width: 200 * s, height: 12 * s, borderRadius: 99, background: colors.line, overflow: 'hidden'}}>
                <div
                  style={{
                    width: `${bar * 100}%`,
                    height: '100%',
                    background: sg.hi ? colors.blue : colors.faint,
                    borderRadius: 99,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
