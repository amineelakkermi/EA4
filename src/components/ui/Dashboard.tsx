import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {TrendIcon, SearchIcon, GlobeIcon} from '../Icons';

const pts = [12, 18, 15, 24, 22, 31, 29, 38, 44, 41, 52, 60];

/** SEO analytics dashboard: KPI tiles + drawn line chart + keyword rows */
export const Dashboard: React.FC<{start: number; width?: number}> = ({start, width = 900}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = width / 900;
  const draw = interpolate(frame, [start + 8, start + 50], [0, 1], {...clamp, easing: ease.inOut});
  const cw = 820;
  const ch = 220;
  const path = pts
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * cw} ${ch - (v / 64) * ch}`)
    .join(' ');
  const tiles = [
    {label: 'الظهور في البحث', icon: <SearchIcon size={28 * s} color={colors.blue} />},
    {label: 'ترتيب الكلمات', icon: <TrendIcon size={28 * s} />},
    {label: 'الصفحات المفهرسة', icon: <GlobeIcon size={28 * s} color={colors.gold} />},
  ];
  const kws = ['تصميم مواقع', 'برمجة متجر إلكتروني', 'شركة تطوير مواقع'];
  return (
    <div dir="rtl" style={{width, padding: 40 * s, fontFamily: fonts.arabic}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{fontSize: 30 * s, fontWeight: 700, color: colors.navy}}>لوحة الأداء</div>
        <div style={{display: 'flex', gap: 10 * s}}>
          {['7 أيام', '28 يوم', '3 أشهر'].map((t, i) => (
            <div
              key={t}
              style={{
                fontSize: 20 * s,
                fontWeight: 600,
                padding: `${8 * s}px ${16 * s}px`,
                borderRadius: 99,
                background: i === 1 ? colors.navy : colors.surfaceAlt,
                color: i === 1 ? '#fff' : colors.muted,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <div style={{display: 'flex', gap: 20 * s, marginTop: 30 * s}}>
        {tiles.map((t, i) => {
          const p = sp(frame, fps, start + 4 + i * 4, springs.smooth);
          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: colors.surfaceAlt,
                border: `1px solid ${colors.line}`,
                borderRadius: 24 * s,
                padding: 22 * s,
                opacity: Math.min(1, p * 1.5),
                transform: `translateY(${(1 - p) * 30}px)`,
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 12 * s}}>
                {t.icon}
                <div style={{fontSize: 21 * s, color: colors.muted, fontWeight: 600}}>{t.label}</div>
              </div>
              <div style={{marginTop: 16 * s, display: 'flex', alignItems: 'flex-end', gap: 6 * s, height: 46 * s}}>
                {[0.4, 0.55, 0.5, 0.7, 0.65, 0.85, 1].map((h, j) => {
                  const bp = interpolate(frame, [start + 12 + j * 2 + i * 3, start + 26 + j * 2 + i * 3], [0, 1], {
                    ...clamp,
                    easing: ease.out,
                  });
                  return (
                    <div
                      key={j}
                      style={{
                        flex: 1,
                        height: `${h * 100 * bp}%`,
                        borderRadius: 4,
                        background: j === 6 ? colors.blue : colors.blueSoft,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 24 * s,
          background: colors.surfaceAlt,
          border: `1px solid ${colors.line}`,
          borderRadius: 24 * s,
          padding: 26 * s,
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontSize: 22 * s, fontWeight: 700, color: colors.navy}}>النقرات من قوقل</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8 * s,
              color: colors.green,
              fontWeight: 700,
              fontSize: 20 * s,
              background: colors.greenSoft,
              padding: `${6 * s}px ${14 * s}px`,
              borderRadius: 99,
            }}
          >
            <TrendIcon size={20 * s} /> في ارتفاع
          </div>
        </div>
        <svg width={cw * s} height={ch * s} viewBox={`0 -10 ${cw} ${ch + 20}`} style={{marginTop: 18 * s, direction: 'ltr'}}>
          <defs>
            <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={colors.blue} stopOpacity="0.22" />
              <stop offset="1" stopColor={colors.blue} stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip">
              <rect x="0" y="-10" width={cw * draw} height={ch + 20} />
            </clipPath>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="0" x2={cw} y1={(i / 3) * ch} y2={(i / 3) * ch} stroke={colors.line} strokeWidth="1.5" />
          ))}
          <g clipPath="url(#clip)">
            <path d={`${path} L ${cw} ${ch} L 0 ${ch} Z`} fill="url(#fill)" />
            <path d={path} fill="none" stroke={colors.blue} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
          </g>
          {draw > 0.98 && (
            <>
              <circle cx={cw} cy={ch - (60 / 64) * ch} r="11" fill={colors.blue} opacity="0.2" />
              <circle cx={cw} cy={ch - (60 / 64) * ch} r="6" fill={colors.blue} />
            </>
          )}
        </svg>
      </div>
      <div style={{marginTop: 24 * s, display: 'flex', flexDirection: 'column', gap: 12 * s}}>
        {kws.map((k, i) => {
          const p = sp(frame, fps, start + 30 + i * 5, springs.smooth);
          return (
            <div
              key={k}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16 * s,
                opacity: Math.min(1, p * 1.5),
                transform: `translateX(${(1 - p) * 40}px)`,
              }}
            >
              <div style={{fontSize: 22 * s, fontWeight: 600, color: colors.ink, width: 300 * s}}>{k}</div>
              <div style={{flex: 1, height: 12 * s, borderRadius: 99, background: colors.line, overflow: 'hidden'}}>
                <div
                  style={{
                    width: `${[78, 62, 48][i] * Math.min(1, p)}%`,
                    height: '100%',
                    borderRadius: 99,
                    background: i === 0 ? colors.gold : colors.blue,
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: fonts.latin,
                  fontSize: 20 * s,
                  fontWeight: 700,
                  color: colors.green,
                  background: colors.greenSoft,
                  padding: `${4 * s}px ${12 * s}px`,
                  borderRadius: 99,
                  direction: 'ltr',
                }}
              >
                ▲
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
