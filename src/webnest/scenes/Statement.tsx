import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Caption, Center} from '../components/Caption';
import {Spinner} from '../components/Store';
import {Fade} from '../components/Fade';
import {COPY} from '../copy';
import {palette, scene} from '../config';
import {clamp, ease} from '../../anim';

const SC = scene('statement');
export const STATEMENT = {rule: 38, b: 44} as const;

/** 30–33.5 s: the central line — you may lose the customer to the wait, not the product */
export const Statement: React.FC = () => {
  const frame = useCurrentFrame();
  const rule = interpolate(frame, [STATEMENT.rule, STATEMENT.rule + 16], [0, 1], {...clamp, easing: ease.out});
  const glow = interpolate(frame, [STATEMENT.b, STATEMENT.b + 30], [0, 1], {...clamp});
  return (
    <Fade duration={SC.duration} inF={8}>
      <AbsoluteFill style={{display: 'grid', placeItems: 'center', opacity: 0.07}}>
        <Spinner size={1100} color={palette.blue} speed={0.25} thickness={2} />
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: glow * 0.9, background: `radial-gradient(60% 30% at 50% 58%, ${palette.tint} 0%, rgba(22,64,123,0) 70%)`}} />
      <Center y={600}>
        <div style={{padding: '0 90px'}}>
          <Caption text={COPY.statement.a} delay={2} size={64} color={palette.grey} />
        </div>
      </Center>
      <Center y={880}>
        <div style={{width: 300 * rule, height: 6, borderRadius: 3, background: palette.blue}} />
      </Center>
      <Center y={940}>
        <div style={{padding: '0 80px'}}>
          <Caption text={COPY.statement.b} delay={STATEMENT.b} size={100} mode="pop" stagger={3} highlight={COPY.statement.hiB} lineHeight={1.45} />
        </div>
      </Center>
    </Fade>
  );
};
