import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Center} from '../components/Layout';
import {Countdown} from '../components/Countdown';
import {Caption, Tag} from '../components/Caption';
import {CheckMark} from '../components/Marks';
import {Showcase, SiteKey} from '../components/Showcase';
import {S, palette, scene, ROUND, font} from '../config';
import {clamp, ease, sp, springs} from '../../anim';

export type {SiteKey};
const sceneOf: Record<SiteKey, 'round1' | 'round2' | 'round3'> = {vague: 'round1', clear: 'round2', confusing: 'round3'};
/** how far the camera scrolls down each page during the 3 s challenge (hero stays visible) */
const SCROLL: Record<SiteKey, number> = {vague: 360, clear: 230, confusing: 320};
export const SHEET_TOP = 424;

/**
 * One 5 s round: the website sheet slides up (0–12), stays fully visible for
 * exactly 90 frames while the timer runs and the camera glides down the page
 * (12–102), then a fast blur + whoosh and the question caption (108–150).
 */
export const Round: React.FC<{site: SiteKey}> = ({site}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const SC = scene(sceneOf[site]);
  const R = S.rounds[site];
  const isClear = site === 'clear';
  const enter = sp(frame, fps, 0, springs.snappy);
  const blur = interpolate(frame, [ROUND.blurAt, ROUND.blurAt + 7], [0, 1], {...clamp, easing: ease.in});
  const scroll = interpolate(frame, [ROUND.challengeStart + 26, ROUND.challengeEnd], [0, SCROLL[site]], {...clamp, easing: ease.inOut});
  const zoom = interpolate(frame, [ROUND.challengeStart, ROUND.challengeEnd], [1, 1.03], {...clamp});
  const glow = interpolate(frame, [ROUND.questionAt, ROUND.questionAt + 16], [0, 1], {...clamp});
  const outro = interpolate(frame, [SC.duration - 8, SC.duration - 1], [0, 1], {...clamp});
  const accent = isClear ? palette.green : palette.red;
  return (
    <Stage offset={SC.from} tint={isClear ? 'green' : site === 'confusing' ? 'red' : 'navy'} glow={glow * 0.9}>
      <Center y={165}>
        <Tag text={R.label} delay={1} exit={ROUND.blurAt} />
      </Center>
      <Center y={238}>
        <Countdown start={ROUND.challengeStart} size={300} variant="pill" exit={ROUND.blurAt + 2} />
      </Center>
      <Showcase
        site={site}
        top={SHEET_TOP}
        scroll={scroll}
        zoom={zoom * (1 + blur * 0.05)}
        originY={scroll + 300}
        style={{
          transform: `translateY(${(1 - enter) * 1500}px)`,
          opacity: 1 - blur * 0.75,
          filter: `blur(${blur * 18}px)`,
        }}
      >
        <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: blur * 0.45}} />
      </Showcase>
      {/* question overlay */}
      <AbsoluteFill style={{opacity: 1 - outro}}>
        <Center y={isClear ? 560 : 600}>{isClear ? <CheckMark delay={ROUND.questionAt + 2} size={170} /> : <QBadge delay={ROUND.questionAt} color={accent} />}</Center>
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
