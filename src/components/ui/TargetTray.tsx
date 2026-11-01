import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from '../../theme';
import {sp, springs} from '../../anim';
import {CheckIcon} from '../Icons';

/** Tray that collects the chosen keywords as chips flying in from above */
export const TargetTray: React.FC<{start: number; items: string[]; width?: number}> = ({start, items, width = 760}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div dir="rtl" style={{width, padding: '26px 30px', fontFamily: fonts.arabic}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18}}>
        <div style={{width: 12, height: 12, borderRadius: 99, background: colors.gold}} />
        <div style={{fontSize: 24, fontWeight: 700, color: colors.navy}}>الكلمات المستهدفة</div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 14}}>
        {items.map((k, i) => {
          const p = sp(frame, fps, start + i * 6, springs.snappy);
          return (
            <div
              key={k}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 24,
                fontWeight: 600,
                color: colors.navy,
                background: colors.goldSoft,
                border: `1.5px solid ${colors.gold}`,
                padding: '10px 20px',
                borderRadius: 99,
                opacity: Math.min(1, p * 1.5),
                transform: `translateY(${(1 - p) * -60}px) scale(${0.85 + 0.15 * p})`,
              }}
            >
              <CheckIcon size={22} color={colors.gold} progress={p} />
              {k}
            </div>
          );
        })}
      </div>
    </div>
  );
};
