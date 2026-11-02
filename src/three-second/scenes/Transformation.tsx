import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Center} from '../components/Layout';
import {Caption} from '../components/Caption';
import {CheckMark} from '../components/Marks';
import {PhoneFrame, Scaled, phoneOuter} from '../components/Frames';
import {SiteVague} from '../components/Sites';
import {S, palette, scene, font} from '../config';
import {clamp, ease, sp, springs} from '../../anim';

const SC = scene('transformation');
export const LABEL_AT = 34;
export const MORPH_AT = 52;
export const CAPTION_AT = 104;

/** 25–31 s: back to website A, the headline morphs into a clear one */
export const Transformation: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = sp(frame, fps, 0, springs.smooth);
  const zoom = interpolate(frame, [20, MORPH_AT + 30], [1, 1.22], {...clamp, easing: ease.inOut});
  const settle = interpolate(frame, [CAPTION_AT - 10, CAPTION_AT + 20], [0, 1], {...clamp, easing: ease.inOut});
  const glow = interpolate(frame, [MORPH_AT + 36, MORPH_AT + 60], [0, 1], {...clamp});
  const {w, h} = phoneOuter();
  const camScale = zoom - settle * 0.3;
  const camY = -settle * 60;
  return (
    <Stage offset={SC.from} tint="green" glow={glow}>
      <AbsoluteFill style={{perspective: 2400}}>
        <Center
          y={250}
          style={{
            transform: `translateY(${(1 - enter) * 140 + camY}px) scale(${camScale})`,
            transformOrigin: '50% 30%',
            opacity: Math.min(1, enter * 1.4),
          }}
        >
          <div style={{position: 'relative'}}>
            <Glow glow={glow} w={w * 0.82} h={h * 0.82} />
            <Scaled w={w} h={h} scale={0.82}>
              <PhoneFrame>
                <SiteVague aboveHeadline={<MiniLabel />} headlineNode={<Morph />} />
              </PhoneFrame>
            </Scaled>
          </div>
        </Center>
      </AbsoluteFill>
      <div style={{position: 'absolute', top: 1150, left: 70, right: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
        <CheckMark delay={CAPTION_AT} size={120} />
        <Caption text={S.transformation.caption} delay={CAPTION_AT + 6} size={78} highlight={S.transformation.captionHighlight} accent={palette.green} mode="pop" lineHeight={1.5} />
      </div>
    </Stage>
  );
};

const Glow: React.FC<{glow: number; w: number; h: number}> = ({glow, w, h}) => (
  <div
    style={{
      position: 'absolute',
      left: -30,
      top: -30,
      width: w + 60,
      height: h + 60,
      borderRadius: 90,
      boxShadow: `0 0 ${60 + glow * 40}px ${10 + glow * 20}px rgba(22,163,74,${0.35 * glow})`,
      opacity: glow,
    }}
  />
);

/** "نفس الشركة. تغيير واحد فقط." pill inside the mockup, above the headline */
const MiniLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, LABEL_AT, springs.bouncy);
  return (
    <div style={{display: 'flex', justifyContent: 'center', height: 44, marginBottom: 6}}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          color: palette.green,
          fontFamily: font.family,
          fontWeight: 900,
          fontSize: 19,
          padding: '6px 18px',
          borderRadius: 999,
          transform: `scale(${p})`,
          opacity: Math.min(1, p * 2),
          boxShadow: '0 10px 24px -10px rgba(0,0,0,0.3)',
        }}
      >
        <span style={{width: 10, height: 10, borderRadius: 99, background: palette.green, display: 'inline-block'}} />
        {S.transformation.tag}
      </div>
    </div>
  );
};

/** Old headline blurs/fades out, the new one rises in word by word */
const Morph: React.FC = () => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [MORPH_AT, MORPH_AT + 16], [0, 1], {...clamp, easing: ease.in});
  return (
    <div style={{position: 'relative', minHeight: 112}}>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - out, filter: `blur(${out * 10}px)`, transform: `translateY(${-out * 26}px) scale(${1 - out * 0.08})`}}>{S.transformation.before}</div>
      <div style={{opacity: frame >= MORPH_AT + 10 ? 1 : 0}}>
        <Caption text={S.transformation.after} delay={MORPH_AT + 12} size={33} color="#fff" stagger={2} lineHeight={1.5} highlight={['احترافية']} accent="#BBF7D0" />
      </div>
    </div>
  );
};
