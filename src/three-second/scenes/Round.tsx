import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Center} from '../components/Layout';
import {Countdown} from '../components/Countdown';
import {Caption, Tag} from '../components/Caption';
import {CheckMark} from '../components/Marks';
import {PhoneFrame, BrowserFrame, Scaled, phoneOuter, DESKTOP} from '../components/Frames';
import {SiteVague, SiteClear, SiteConfusing} from '../components/Sites';
import {S, palette, scene, ROUND, font} from '../config';
import {clamp, ease, sp, springs} from '../../anim';

export type SiteKey = 'vague' | 'clear' | 'confusing';
const sceneOf: Record<SiteKey, 'round1' | 'round2' | 'round3'> = {vague: 'round1', clear: 'round2', confusing: 'round3'};

export const Mockup: React.FC<{site: SiteKey; scale: number}> = ({site, scale}) => {
  const {w, h} = phoneOuter();
  if (site === 'clear') {
    return (
      <Scaled w={DESKTOP.w} h={DESKTOP.h + 56} scale={scale}>
        <BrowserFrame url={S.sites.clear.url}>
          <SiteClear />
        </BrowserFrame>
      </Scaled>
    );
  }
  return (
    <Scaled w={w} h={h} scale={scale}>
      <PhoneFrame>{site === 'vague' ? <SiteVague /> : <SiteConfusing />}</PhoneFrame>
    </Scaled>
  );
};

/**
 * One 5 s round: site enters (0–12), the website is fully visible for exactly
 * 90 frames while the timer runs (12–102), then a fast blur + whoosh and the
 * question caption (108–150).
 */
export const Round: React.FC<{site: SiteKey}> = ({site}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const SC = scene(sceneOf[site]);
  const R = S.rounds[site];
  const isClear = site === 'clear';
  const enter = sp(frame, fps, 0, springs.smooth);
  const blur = interpolate(frame, [ROUND.blurAt, ROUND.blurAt + 7], [0, 1], {...clamp, easing: ease.in});
  const push = interpolate(frame, [ROUND.challengeStart, ROUND.challengeEnd], [1, 1.035], {...clamp});
  const tilt = interpolate(frame, [0, ROUND.challengeEnd], [1, 0], {...clamp, easing: ease.out});
  const glow = interpolate(frame, [ROUND.questionAt, ROUND.questionAt + 16], [0, 1], {...clamp});
  const outro = interpolate(frame, [SC.duration - 8, SC.duration - 1], [0, 1], {...clamp});
  const accent = isClear ? palette.green : palette.red;
  const top = isClear ? 560 : 430;
  return (
    <Stage offset={SC.from} tint={isClear ? 'green' : site === 'confusing' ? 'red' : 'navy'} glow={glow * 0.9}>
      <Center y={165}>
        <Tag text={R.label} delay={1} exit={ROUND.blurAt} />
      </Center>
      <Center y={238}>
        <Countdown start={ROUND.challengeStart} size={300} variant="pill" exit={ROUND.blurAt + 2} />
      </Center>
      <AbsoluteFill style={{perspective: 2400}}>
        <Center
          y={top}
          style={{
            transform: `translateY(${(1 - enter) * 160}px) scale(${push * (1 + blur * 0.08)}) rotateX(${tilt * 5}deg) rotateY(${tilt * -4}deg)`,
            transformOrigin: '50% 40%',
            opacity: Math.min(1, enter * 1.4) * (1 - blur * 0.72),
            filter: `blur(${blur * 18}px)`,
          }}
        >
          <Mockup site={site} scale={isClear ? 0.98 : 0.97} />
        </Center>
      </AbsoluteFill>
      {/* question overlay */}
      <AbsoluteFill style={{opacity: 1 - outro}}>
        <Center y={isClear ? 560 : 600}>
          {isClear ? (
            <CheckMark delay={ROUND.questionAt + 2} size={170} />
          ) : (
            <QBadge delay={ROUND.questionAt} color={accent} />
          )}
        </Center>
        <div style={{position: 'absolute', top: isClear ? 770 : 790, left: 70, right: 70}}>
          <Caption text={R.question} delay={ROUND.questionAt + 4} size={86} highlight={R.questionHighlight} accent={accent} mode="pop" stagger={3} lineHeight={1.5} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};

/** Pulsing "؟" badge used on the two unclear rounds */
const QBadge: React.FC<{delay: number; color: string}> = ({delay, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.bouncy);
  const pulse = 1 + 0.04 * Math.sin((frame - delay) / 3);
  return (
    <div
      style={{
        width: 170,
        height: 170,
        borderRadius: '50%',
        background: color,
        color: '#fff',
        display: 'grid',
        placeItems: 'center',
        fontFamily: font.family,
        fontWeight: 900,
        fontSize: 118,
        lineHeight: 1,
        transform: `scale(${p * pulse})`,
        opacity: Math.min(1, p * 2),
        boxShadow: `0 30px 60px -20px ${color}99`,
      }}
    >
      <span style={{transform: 'translateY(-8px)'}}>؟</span>
    </div>
  );
};
