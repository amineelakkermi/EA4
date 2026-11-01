import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {ImageIcon, CheckIcon} from '../Icons';
import {Typed, Line} from './Typed';

/** Elegant publishing interface: title types, body lines fill, publish button presses */
export const ContentEditor: React.FC<{start: number; width?: number; publishAt: number}> = ({start, width = 900, publishAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = width / 900;
  const title = 'كيف تختار شركة تصميم مواقع في السعودية؟';
  const press = interpolate(frame, [publishAt, publishAt + 4, publishAt + 10], [1, 0.94, 1], {...clamp});
  const published = sp(frame, fps, publishAt + 6, springs.snappy);
  const lines = [0.95, 0.88, 0.6, 0.92, 0.7];
  return (
    <div dir="rtl" style={{width, padding: 36 * s, fontFamily: fonts.arabic, position: 'relative'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', gap: 10 * s}}>
          {['B', 'I', 'H2', '🔗'].map((t, i) => (
            <div
              key={i}
              style={{
                width: 44 * s,
                height: 44 * s,
                borderRadius: 12 * s,
                background: colors.surfaceAlt,
                border: `1px solid ${colors.line}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fonts.latin,
                fontWeight: 700,
                fontSize: 18 * s,
                color: colors.muted,
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: 20 * s,
            fontWeight: 700,
            color: published > 0.5 ? '#fff' : colors.blue,
            background: published > 0.5 ? colors.green : colors.blueSoft,
            padding: `${10 * s}px ${24 * s}px`,
            borderRadius: 99,
            transform: `scale(${press})`,
            display: 'flex',
            alignItems: 'center',
            gap: 8 * s,
          }}
        >
          {published > 0.5 && <CheckIcon size={20 * s} color="#fff" progress={published} />}
          {published > 0.5 ? 'تم النشر' : 'نشر'}
        </div>
      </div>
      <div style={{marginTop: 30 * s, minHeight: 50 * s}}>
        <Typed text={title} start={start + 4} cps={0.9} size={30 * s} weight={700} color={colors.navy} />
      </div>
      <div style={{display: 'flex', gap: 20 * s, marginTop: 22 * s}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 14 * s}}>
          {lines.map((w, i) => {
            const p = interpolate(frame, [start + 40 + i * 5, start + 54 + i * 5], [0, 1], {...clamp, easing: ease.out});
            return <Line key={i} w={`${w * 100 * p}%`} h={12 * s} color={i === 2 ? colors.blueSoft : colors.line} />;
          })}
        </div>
        <div
          style={{
            width: 220 * s,
            height: 150 * s,
            borderRadius: 18 * s,
            background: colors.surfaceAlt,
            border: `1.5px dashed ${colors.line}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: sp(frame, fps, start + 50, springs.smooth),
          }}
        >
          <ImageIcon size={44 * s} />
        </div>
      </div>
      <div style={{display: 'flex', gap: 10 * s, marginTop: 24 * s}}>
        {['SEO', 'تصميم مواقع', 'دليل'].map((t, i) => {
          const p = sp(frame, fps, start + 64 + i * 4, springs.snappy);
          return (
            <div
              key={t}
              style={{
                fontSize: 18 * s,
                fontWeight: 600,
                color: colors.navy,
                background: colors.bg,
                border: `1px solid ${colors.line}`,
                padding: `${6 * s}px ${16 * s}px`,
                borderRadius: 99,
                opacity: Math.min(1, p * 1.5),
                transform: `scale(${0.8 + p * 0.2})`,
              }}
            >
              #{t}
            </div>
          );
        })}
      </div>
    </div>
  );
};
