import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Caption, Center, TopCopy} from '../components/Caption';
import {Sheet, StorePage, ProductSkeleton, Tap} from '../components/Store';
import {Fade} from '../components/Fade';
import {COPY} from '../copy';
import {palette, scene} from '../config';
import {clamp, ease, sp, springs} from '../../anim';

const SC = scene('hook');
export const HOOK = {tap: 40, switch: 52, leave: 128, why: 140} as const;
const SHEET_TOP = 640;

/** 0–6 s: the shopper taps a product, the page never finishes loading, the shopper leaves — "لماذا؟" */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = interpolate(frame, [0, 26], [0, 1], {...clamp, easing: ease.out});
  const press = interpolate(frame, [HOOK.tap - 2, HOOK.tap + 4, HOOK.tap + 12], [0, 1, 0], {...clamp});
  const sw = interpolate(frame, [HOOK.switch, HOOK.switch + 14], [0, 1], {...clamp, easing: ease.inOut});
  const leave = interpolate(frame, [HOOK.leave, HOOK.leave + 22], [0, 1], {...clamp, easing: ease.in});
  const why = sp(frame, fps, HOOK.why, springs.bouncy);
  const scroll = interpolate(frame, [0, HOOK.switch], [0, 70], {...clamp, easing: ease.soft});
  return (
    <Fade duration={SC.duration} inF={1} outF={12}>
      <TopCopy y={220}>
        <Caption text={COPY.hook.a} delay={6} size={60} exit={98} />
        {frame >= 100 && <Caption text={COPY.hook.b} delay={102} size={62} highlight={['غادر']} />}
      </TopCopy>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${(1 - enter) * 320 + leave * 420}px)`,
          opacity: Math.min(1, enter * 1.4) * (1 - leave),
          filter: `grayscale(${leave})`,
        }}
      >
        <Sheet top={SHEET_TOP} scroll={scroll} overlay={<Tap x={790} y={470 - scroll} at={HOOK.tap} />} style={{opacity: 1 - sw}}>
          <StorePage press={press} />
        </Sheet>
        <Sheet top={SHEET_TOP} style={{opacity: sw, transform: `translateY(${(1 - sw) * 80}px)`}}>
          <ProductSkeleton />
        </Sheet>
      </div>
      <Center y={820}>
        <div
          dir="rtl"
          style={{
            fontFamily: "'The Year of Handicrafts'",
            fontSize: 150,
            color: palette.blue,
            lineHeight: 1,
            transform: `scale(${0.6 + 0.4 * why}) translateY(${(1 - why) * 40}px)`,
            opacity: Math.min(1, why * 2),
          }}
        >
          {COPY.hook.why}
        </div>
      </Center>
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(frame, [0, 10], [0.6, 0], {...clamp}), pointerEvents: 'none'}} />
    </Fade>
  );
};
