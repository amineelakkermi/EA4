import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Center} from '../components/Layout';
import {Countdown} from '../components/Countdown';
import {Caption} from '../components/Caption';
import {Showcase} from '../components/Showcase';
import {S, palette, scene} from '../config';
import {clamp, ease, sp, springs} from '../../anim';

const SC = scene('hook');

/** 0–3 s: impact, blurred full-bleed website behind a big 3.00 -> 0.00 timer and the red challenge banner */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const flash = interpolate(frame, [0, 10], [0.7, 0], {...clamp, easing: ease.out});
  const punch = interpolate(frame, [0, 26], [1.12, 1], {...clamp, easing: ease.out});
  const drift = interpolate(frame, [0, SC.duration], [0, 140]);
  const banner = sp(frame, fps, 5, springs.snappy);
  const zeroFlash = interpolate(frame, [84, 86, SC.duration], [0, 0.35, 0.2], {...clamp});
  return (
    <Stage offset={SC.from} tint="red" glow={zeroFlash}>
      <AbsoluteFill style={{transform: `scale(${punch})`}}>
        <Showcase site="vague" top={0} radius={0} scroll={drift} zoom={1.06} originY={500} style={{filter: 'blur(14px)', opacity: 0.55, boxShadow: 'none'}} />
        <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(244,245,247,0.25) 0%, rgba(244,245,247,0.6) 45%, rgba(244,245,247,0.92) 100%)'}} />
        <Center y={470}>
          <Countdown start={0} seconds={3} size={460} />
        </Center>
        <div
          style={{
            position: 'absolute',
            top: 1040,
            left: 60,
            right: 60,
            transform: `translateX(${(1 - banner) * 160}px) rotate(${-2.2 + (1 - banner) * 4}deg)`,
            opacity: Math.min(1, banner * 1.6),
          }}
        >
          <div
            style={{
              background: palette.red,
              borderRadius: 34,
              padding: '34px 44px 40px',
              boxShadow: '0 40px 80px -30px rgba(239,68,68,0.6), 0 0 0 1px rgba(255,255,255,0.3) inset',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0) 50%)'}} />
            <Caption text={S.hook.challenge} delay={10} size={62} color="#fff" highlight={S.hook.highlight} accent="#FDE047" stagger={2} lineHeight={1.5} />
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{background: '#fff', opacity: flash, pointerEvents: 'none'}} />
    </Stage>
  );
};
