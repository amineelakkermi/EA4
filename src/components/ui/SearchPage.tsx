import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {GMark, SearchIcon} from '../Icons';
import {Typed, Line} from './Typed';
import {useLang} from '../../i18n';

/**
 * Google-style results page. The query types in, results populate, and the
 * owner's site is conspicuously absent — a ghosted "موقعك؟" slot shows where
 * it should have been.
 */
export const SearchPage: React.FC<{
  typeStart: number;
  query: string;
  resultsAt: number;
  ghostAt: number;
  width?: number;
}> = ({typeStart, query, resultsAt, ghostAt, width = 880}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {t, dir, k} = useLang();
  const results = t.spResults;
  const ghost = sp(frame, fps, ghostAt, springs.smooth);
  const ghostPulse = 0.5 + 0.5 * Math.sin((frame - ghostAt) / 6);
  const scale = width / 880;
  return (
    <div
      dir={dir}
      style={{
        width,
        padding: 44 * scale,
        fontFamily: fonts.arabic,
        transform: `scale(1)`,
      }}
    >
      {/* search bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22 * scale,
          height: 92 * scale,
          borderRadius: 99,
          border: `1.5px solid ${colors.line}`,
          boxShadow: '0 10px 30px -12px rgba(11,27,58,0.2)',
          padding: `0 ${28 * scale}px`,
          background: colors.surface,
        }}
      >
        <GMark size={44 * scale} />
        <div style={{flex: 1}}>
          <Typed text={query} start={typeStart} cps={0.55 / k} size={36 * scale * k} />
        </div>
        <div
          style={{
            width: 56 * scale,
            height: 56 * scale,
            borderRadius: 99,
            background: colors.blue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SearchIcon size={30 * scale} color="#fff" />
        </div>
      </div>
      {/* tabs */}
      <div
        style={{
          display: 'flex',
          gap: 34 * scale,
          marginTop: 30 * scale,
          paddingInlineStart: 24 * scale,
        }}
      >
        {t.spTabs.map((t, i) => (
          <div
            key={t}
            style={{
              fontSize: 24 * scale,
              fontWeight: 600,
              color: i === 0 ? colors.blue : colors.muted,
              paddingBottom: 10 * scale,
              borderBottom: i === 0 ? `3px solid ${colors.blue}` : '3px solid transparent',
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <div style={{height: 1, background: colors.line, marginTop: -1}} />
      {/* results */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 30 * scale,
          marginTop: 34 * scale,
        }}
      >
        {results.map((r, i) => {
          const p = sp(frame, fps, resultsAt + i * 5, springs.smooth);
          return (
            <div
              key={i}
              style={{
                opacity: Math.min(1, p * 1.5),
                transform: `translateY(${(1 - p) * 26}px)`,
                paddingInlineStart: 24 * scale,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14 * scale,
                }}
              >
                <div
                  style={{
                    width: 36 * scale,
                    height: 36 * scale,
                    borderRadius: 99,
                    background: colors.surfaceAlt,
                    border: `1px solid ${colors.line}`,
                  }}
                />
                <div
                  style={{
                    fontFamily: fonts.latin,
                    fontSize: 20 * scale,
                    color: colors.muted,
                    direction: 'ltr',
                  }}
                >
                  {r.url}
                </div>
              </div>
              <div
                style={{
                  fontSize: 30 * scale * k,
                  fontWeight: 600,
                  color: '#1A0DAB',
                  marginTop: 10 * scale,
                }}
              >
                {r.title}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10 * scale,
                  marginTop: 14 * scale,
                }}
              >
                <Line w="92%" h={11 * scale} />
                <Line w="68%" h={11 * scale} />
              </div>
            </div>
          );
        })}
        {/* ghost slot for the owner's site */}
        <div
          style={{
            opacity: ghost,
            transform: `translateY(${(1 - ghost) * 26}px)`,
            border: `2px dashed ${colors.red}`,
            borderRadius: 24 * scale,
            padding: `${22 * scale}px ${24 * scale}px`,
            background: `rgba(216,70,60,${0.04 + ghostPulse * 0.04})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 30 * scale,
                fontWeight: 700,
                color: colors.red,
              }}
            >
              {t.spGhost}
            </div>
            <div
              style={{
                fontSize: 22 * scale,
                color: colors.muted,
                marginTop: 6 * scale,
              }}
            >
              {t.spGhostSub}
            </div>
          </div>
          <div
            style={{
              fontFamily: fonts.latin,
              fontSize: 22 * scale,
              fontWeight: 600,
              color: colors.red,
              background: colors.redSoft,
              padding: `${8 * scale}px ${16 * scale}px`,
              borderRadius: 99,
              whiteSpace: 'nowrap',
            }}
          >
            {t.spPage}
          </div>
        </div>
      </div>
    </div>
  );
};
