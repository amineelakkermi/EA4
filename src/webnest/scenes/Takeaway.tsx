import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {Caption, TopCopy} from '../components/Caption';
import {Sheet, ProductSkeleton, ProductPage} from '../components/Store';
import {Fade} from '../components/Fade';
import {COPY} from '../copy';
import {palette, scene} from '../config';
import {clamp, ease} from '../../anim';

const SC = scene('takeaway');
export const TAKEAWAY = {wipe: 24, b: 64} as const;
const SHEET_TOP = 640;

/** 33.5–37.5 s: a slow page wipes into a fast, finished one */
export const Takeaway: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 22], [0, 1], {...clamp, easing: ease.out});
  const wipe = interpolate(frame, [TAKEAWAY.wipe, TAKEAWAY.wipe + 26], [0, 1], {...clamp, easing: ease.inOut});
  const reveal = interpolate(frame, [TAKEAWAY.wipe + 4, TAKEAWAY.wipe + 50], [0, 1], {...clamp});
  const zoom = interpolate(frame, [TAKEAWAY.wipe, SC.duration], [1, 1.05], {...clamp, easing: ease.soft});
  const out = interpolate(frame, [SC.duration - 14, SC.duration], [0, 1], {...clamp, easing: ease.in});
  const edge = 1080 * (1 - wipe);
  return (
    <Fade duration={SC.duration} outF={12}>
      <TopCopy y={200}>
        <Caption text={COPY.takeaway.a} delay={4} size={54} highlight={COPY.takeaway.hiA} exit={TAKEAWAY.b - 6} />
        {frame >= TAKEAWAY.b - 2 && <Caption text={COPY.takeaway.b} delay={TAKEAWAY.b} size={54} highlight={COPY.takeaway.hiB} />}
      </TopCopy>
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${(1 - enter) * 300 + out * 300}px)`, opacity: Math.min(1, enter * 1.4)}}>
        <Sheet top={SHEET_TOP} zoom={zoom} originY={300} style={{filter: `grayscale(${0.6 * (1 - wipe)})`}}>
          <ProductSkeleton />
        </Sheet>
        <Sheet top={SHEET_TOP} zoom={zoom} originY={300} style={{clipPath: `inset(0 ${edge}px 0 0)`, boxShadow: 'none'}}>
          <ProductPage reveal={reveal} />
        </Sheet>
        {wipe > 0 && wipe < 1 && (
          <div style={{position: 'absolute', top: SHEET_TOP, bottom: 0, left: 1080 - edge - 3, width: 6, background: palette.blue, boxShadow: `0 0 40px 8px rgba(22,64,123,0.35)`}} />
        )}
      </div>
    </Fade>
  );
};
