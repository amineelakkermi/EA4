import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {ShieldIcon, LinkIcon} from '../Icons';

const nodes = [
  {x: 0.14, y: 0.22, label: 'موقع إخباري'},
  {x: 0.84, y: 0.18, label: 'دليل أعمال'},
  {x: 0.1, y: 0.78, label: 'مدونة متخصصة'},
  {x: 0.88, y: 0.8, label: 'شريك موثوق'},
];

/**
 * Backlink network: trusted sites draw animated links into the owner's site,
 * which gains a gold authority ring as each connection lands.
 */
export const BacklinkNetwork: React.FC<{start: number; width?: number; height?: number}> = ({start, width = 900, height = 520}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = width / 900;
  const cx = width / 2;
  const cy = height / 2;
  const center = sp(frame, fps, start, springs.smooth);
  const linked = nodes.map((_, i) => interpolate(frame, [start + 16 + i * 7, start + 36 + i * 7], [0, 1], {...clamp, easing: ease.inOut}));
  const authority = linked.reduce((a, b) => a + b, 0) / nodes.length;
  return (
    <div dir="rtl" style={{width, height, position: 'relative', fontFamily: fonts.arabic}}>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        <defs>
          <linearGradient id="lk" x1="0" x2="1">
            <stop offset="0" stopColor={colors.blue} />
            <stop offset="1" stopColor={colors.gold} />
          </linearGradient>
        </defs>
        {nodes.map((n, i) => {
          const x = n.x * width;
          const y = n.y * height;
          const mx = (x + cx) / 2 + (cy - y) * 0.25;
          const my = (y + cy) / 2 + (x - cx) * 0.25;
          const d = `M ${x} ${y} Q ${mx} ${my} ${cx} ${cy}`;
          const len = Math.hypot(cx - x, cy - y) * 1.15;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={colors.line} strokeWidth={3} />
              <path
                d={d}
                fill="none"
                stroke={colors.blue}
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray={len}
                strokeDashoffset={len * (1 - linked[i])}
              />
              {linked[i] > 0 && linked[i] < 1 && (
                <circle
                  r={8}
                  fill={colors.gold}
                  cx={x + (cx - x) * linked[i] + (mx - (x + cx) / 2) * 4 * linked[i] * (1 - linked[i])}
                  cy={y + (cy - y) * linked[i] + (my - (y + cy) / 2) * 4 * linked[i] * (1 - linked[i])}
                />
              )}
            </g>
          );
        })}
        {/* authority ring */}
        <circle cx={cx} cy={cy} r={92 * s} fill="none" stroke={colors.goldSoft} strokeWidth={10 * s} opacity={center} />
        <circle
          cx={cx}
          cy={cy}
          r={92 * s}
          fill="none"
          stroke={colors.gold}
          strokeWidth={10 * s}
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 92 * s}
          strokeDashoffset={2 * Math.PI * 92 * s * (1 - authority)}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
      {/* center node */}
      <div
        style={{
          position: 'absolute',
          left: cx - 70 * s,
          top: cy - 70 * s,
          width: 140 * s,
          height: 140 * s,
          borderRadius: 99,
          background: colors.surface,
          boxShadow: '0 20px 40px -16px rgba(11,27,58,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6 * s,
          transform: `scale(${center})`,
        }}
      >
        <div style={{fontFamily: fonts.latin, fontWeight: 600, fontSize: 30 * s, color: colors.navy}}>EA4</div>
        <div style={{fontSize: 16 * s, fontWeight: 600, color: colors.muted}}>موقعك</div>
      </div>
      {nodes.map((n, i) => {
        const p = sp(frame, fps, start + 6 + i * 4, springs.smooth);
        const lit = linked[i] > 0.95;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: n.x * width - 100 * s,
              top: n.y * height - 40 * s,
              width: 200 * s,
              height: 80 * s,
              borderRadius: 20 * s,
              background: colors.surface,
              border: `1.5px solid ${lit ? colors.gold : colors.line}`,
              boxShadow: '0 14px 30px -14px rgba(11,27,58,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 12 * s,
              padding: `0 ${16 * s}px`,
              opacity: Math.min(1, p * 1.5),
              transform: `scale(${0.85 + p * 0.15})`,
            }}
          >
            <div
              style={{
                width: 44 * s,
                height: 44 * s,
                borderRadius: 12 * s,
                background: lit ? colors.goldSoft : colors.blueSoft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldIcon size={26 * s} color={lit ? colors.gold : colors.blue} />
            </div>
            <div style={{fontSize: 19 * s, fontWeight: 700, color: colors.navy, lineHeight: 1.3}}>{n.label}</div>
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: authority > 0.95 ? sp(frame, fps, start + 62, springs.snappy) : 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10 * s,
            fontSize: 22 * s,
            fontWeight: 700,
            color: colors.gold,
            background: colors.goldSoft,
            padding: `${10 * s}px ${22 * s}px`,
            borderRadius: 99,
          }}
        >
          <LinkIcon size={24 * s} color={colors.gold} /> موثوقية أعلى في قوقل
        </div>
      </div>
    </div>
  );
};
