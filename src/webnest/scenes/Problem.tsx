import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {Caption, Tag, TopCopy} from '../components/Caption';
import {RingLoader, slowProgress, Dots, Bar} from '../components/Loader';
import {Visitor, ExitIcon} from '../components/Visitor';
import {Fade} from '../components/Fade';
import {COPY} from '../copy';
import {palette, shadow, scene, font} from '../config';
import {clamp, ease} from '../../anim';

const SC = scene('problem');
export const PROBLEM = {leave: 150, loadEnd: 165} as const;

/** 6–13 s: the loader crawls, seconds pile up, the visitor stops waiting and leaves */
export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [6, PROBLEM.loadEnd], [0, 1], {...clamp});
  const p = slowProgress(t);
  const seconds = interpolate(frame, [6, PROBLEM.loadEnd], [0, 6.8], {...clamp});
  const leave = interpolate(frame, [PROBLEM.leave, PROBLEM.leave + 20], [0, 1], {...clamp, easing: ease.in});
  const dim = interpolate(frame, [PROBLEM.leave + 8, PROBLEM.leave + 24], [0, 1], {...clamp});
  const cardIn = interpolate(frame, [0, 22], [0, 1], {...clamp, easing: ease.out});
  return (
    <Fade duration={SC.duration}>
      <TopCopy y={210}>
        <Caption text={COPY.problem.a} delay={4} size={58} exit={86} />
        {frame >= 90 && <Caption text={COPY.problem.b} delay={94} size={54} stagger={1.8} groups={[{words: COPY.problem.hiB, at: 128}]} />}
      </TopCopy>
      <div
        style={{
          position: 'absolute',
          top: 700,
          left: 110,
          right: 110,
          height: 690,
          borderRadius: 44,
          background: '#fff',
          boxShadow: shadow.card,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 44,
          opacity: cardIn,
          transform: `translateY(${(1 - cardIn) * 50}px)`,
          filter: `saturate(${1 - dim})`,
        }}
      >
        <RingLoader p={p} seconds={seconds} unit={COPY.problem.sec} size={360} dim={dim} />
        <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 10, fontFamily: font.family, fontSize: 30, color: palette.grey}}>
          <span>{COPY.problem.loading}</span>
          <Dots color={dim > 0 ? palette.muted : palette.slate} size={10} />
        </div>
        <div style={{marginTop: 26}}>
          <Bar p={p} w={520} color={dim > 0 ? palette.muted : palette.blue} />
        </div>
        <div style={{position: 'absolute', bottom: 34, left: 0, right: 0, height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{transform: `translateX(${-leave * 520}px)`, opacity: 1 - leave, display: 'flex', alignItems: 'center', gap: 22}}>
            <Visitor size={84} label={undefined} />
            <span dir="rtl" style={{fontFamily: font.family, fontSize: 30, color: palette.grey}}>{COPY.problem.visitor}</span>
          </div>
          <div style={{position: 'absolute', opacity: leave, transform: `translateX(${(1 - leave) * 40}px)`}}>
            <Tag text={COPY.problem.left} delay={PROBLEM.leave + 6} color={palette.grey} bg={palette.skeleton2} size={30} icon={<ExitIcon size={34} color={palette.grey} />} />
          </div>
        </div>
      </div>
    </Fade>
  );
};
