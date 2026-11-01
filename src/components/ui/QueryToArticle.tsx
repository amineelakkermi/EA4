import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts, shadow} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {SearchIcon, CheckIcon} from '../Icons';
import {Typed, Line} from './Typed';

/**
 * A real customer question is typed into a search bar. A keyword-stuffed
 * snippet appears and is struck out; a structured article that actually
 * answers the question rises in its place.
 */
export const QueryToArticle: React.FC<{start: number; width?: number}> = ({start, width = 900}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = width / 900;
  const query = 'كم تكلفة تصميم موقع إلكتروني؟';
  const badAt = start + 40;
  const strikeAt = start + 62;
  const swapAt = start + 78;
  const bar = sp(frame, fps, start, springs.smooth);
  const bad = sp(frame, fps, badAt, springs.smooth);
  const strike = interpolate(frame, [strikeAt, strikeAt + 12], [0, 1], {...clamp, easing: ease.inOut});
  const badOut = interpolate(frame, [swapAt - 6, swapAt + 10], [0, 1], {...clamp, easing: ease.in});
  const art = sp(frame, fps, swapAt, springs.smooth);
  const connector = interpolate(frame, [swapAt + 6, swapAt + 24], [0, 1], {...clamp, easing: ease.out});
  const sections = ['وش العوامل اللي تحدد التكلفة؟', 'الفرق بين الموقع التعريفي والمتجر الإلكتروني', 'كيف تختار الباقة المناسبة لنشاطك؟'];
  return (
    <div dir="rtl" style={{width, position: 'relative', fontFamily: fonts.arabic, height: 820 * s}}>
      {/* search bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18 * s,
          height: 96 * s,
          borderRadius: 99,
          background: colors.surface,
          boxShadow: shadow.card,
          padding: `0 ${30 * s}px`,
          opacity: Math.min(1, bar * 1.5),
          transform: `translateY(${(1 - bar) * 40}px)`,
        }}
      >
        <SearchIcon size={32 * s} color={colors.blue} />
        <Typed text={query} start={start + 8} cps={0.9} size={30 * s} weight={600} color={colors.navy} />
        <div style={{marginRight: 'auto', fontSize: 18 * s, color: colors.muted, background: colors.bg, padding: `${6 * s}px ${14 * s}px`, borderRadius: 99, whiteSpace: 'nowrap'}}>سؤال عميل حقيقي</div>
      </div>

      {/* gold connector */}
      <div style={{position: 'absolute', right: 70 * s, top: 110 * s, width: 3, height: 60 * s * connector, background: colors.gold, borderRadius: 2}} />

      {/* keyword-stuffed snippet (struck out) */}
      <div
        style={{
          position: 'absolute',
          top: 150 * s,
          left: 0,
          right: 0,
          borderRadius: 28 * s,
          background: colors.surface,
          boxShadow: shadow.soft,
          padding: `${26 * s}px ${30 * s}px`,
          opacity: Math.min(1, bad * 1.5) * (1 - badOut),
          transform: `translateY(${(1 - bad) * 40 + badOut * 60}px) scale(${1 - badOut * 0.06})`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 12 * s, marginBottom: 14 * s}}>
          <div style={{width: 12 * s, height: 12 * s, borderRadius: 99, background: colors.red}} />
          <div style={{fontSize: 20 * s, fontWeight: 700, color: colors.red}}>تكرار كلمات بدون فايدة للقارئ</div>
        </div>
        <div style={{position: 'relative', fontSize: 24 * s, lineHeight: 1.7, color: colors.muted}}>
          تصميم مواقع، تصميم مواقع الرياض، أفضل تصميم مواقع، شركة تصميم مواقع، تصميم مواقع رخيص، تصميم مواقع…
          <div style={{position: 'absolute', right: 0, top: '50%', height: 3, width: `${strike * 100}%`, background: colors.red, opacity: 0.85}} />
        </div>
      </div>

      {/* structured article */}
      <div
        style={{
          position: 'absolute',
          top: 170 * s,
          left: 0,
          right: 0,
          borderRadius: 30 * s,
          background: colors.surface,
          boxShadow: shadow.float,
          padding: `${30 * s}px ${34 * s}px`,
          opacity: Math.min(1, art * 1.5),
          transform: `translateY(${(1 - art) * 90}px)`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontSize: 17 * s, color: colors.muted, fontFamily: fonts.latin, direction: 'ltr'}}>ea-4.vercel.app › blog</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 8 * s, fontSize: 18 * s, fontWeight: 700, color: colors.green, background: colors.greenSoft, padding: `${6 * s}px ${14 * s}px`, borderRadius: 99}}>
            <CheckIcon size={18 * s} progress={art} /> يجاوب على سؤال العميل
          </div>
        </div>
        <div style={{fontSize: 31 * s, fontWeight: 700, color: colors.navy, marginTop: 18 * s, lineHeight: 1.4}}>
          كم تكلفة تصميم موقع إلكتروني في السعودية؟
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 6 * s, marginTop: 12 * s}}>
          <Line w="92%" h={10 * s} />
          <Line w="70%" h={10 * s} />
        </div>
        {sections.map((t, i) => {
          const p = sp(frame, fps, swapAt + 16 + i * 10, springs.smooth);
          return (
            <div key={t} style={{marginTop: 22 * s, opacity: Math.min(1, p * 1.5), transform: `translateX(${(1 - p) * 24}px)`}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12 * s}}>
                <div style={{fontFamily: fonts.latin, fontSize: 15 * s, fontWeight: 700, color: colors.gold, background: colors.goldSoft, padding: `${3 * s}px ${8 * s}px`, borderRadius: 8 * s, direction: 'ltr'}}>H2</div>
                <div style={{fontSize: 23 * s, fontWeight: 700, color: colors.ink}}>{t}</div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 6 * s, marginTop: 10 * s}}>
                <Line w={`${88 - i * 6}%`} h={9 * s} />
                <Line w={`${60 + i * 8}%`} h={9 * s} color={i === 1 ? colors.blueSoft : colors.line} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
