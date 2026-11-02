import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Center} from '../components/Layout';
import {Caption} from '../components/Caption';
import {CheckMark} from '../components/Marks';
import {Showcase} from '../components/Showcase';
import {S, palette, scene, font} from '../config';
import {clamp, ease, sp, springs} from '../../anim';

const SC = scene('transformation');
export const LABEL_AT = 34;
export const MORPH_AT = 52;
export const CAPTION_AT = 104;

/** 25–31 s: back to website A full-screen, the camera glides onto the headline and it morphs into a clear one */
export const Transformation: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = sp(frame, fps, 0, springs.smooth);
  const zoom = interpolate(frame, [16, MORPH_AT + 30], [1, 1.16], {...clamp, easing: ease.inOut});
  const settle = interpolate(frame, [CAPTION_AT - 12, CAPTION_AT + 18], [0, 1], {...clamp, easing: ease.inOut});
  const glow = interpolate(frame, [MORPH_AT + 36, MORPH_AT + 60], [0, 1], {...clamp});
  const camScale = zoom - settle * 0.2;
  const scroll = 120 + settle * 150;
  return (
    <Stage offset={SC.from} tint="green" glow={glow}>
      <Showcase
        site="vague"
        top={0}
        radius={0}
        scroll={scroll}
        zoom={camScale}
        originY={640}
        aboveHeadline={<MiniLabel />}
        headlineNode={<Morph />}
        style={{transform: `translateY(${(1 - enter) * 1500}px)`}}
      >
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(244,245,247,0) 46%, rgba(244,245,247,0.92) 60%, ${palette.bg} 72%)`, opacity: settle}} />
        <div style={{position: 'absolute', inset: 0, boxShadow: `inset 0 0 ${140 * glow}px 0 rgba(22,163,74,${0.28 * glow})`}} />
      </Showcase>
      <div style={{position: 'absolute', top: 1180, left: 70, right: 70, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: settle, transform: `translateY(${(1 - settle) * 40}px)`}}>
        <CheckMark delay={CAPTION_AT} size={120} />
        <Caption text={S.transformation.caption} delay={CAPTION_AT + 6} size={78} highlight={S.transformation.captionHighlight} accent={palette.green} mode="pop" lineHeight={1.5} />
      </div>
    </Stage>
  );
};

/** "نفس الشركة. تغيير واحد فقط." pill inside the mockup, above the headline */
const MiniLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, LABEL_AT, springs.bouncy);
  return (
    <div style={{display: 'flex', justifyContent: 'center', height: 64, marginBottom: 8}}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          color: palette.green,
          fontFamily: font.family,
          fontSize: 28,
          padding: '8px 26px',
          borderRadius: 999,
          transform: `scale(${p})`,
          opacity: Math.min(1, p * 2),
          boxShadow: '0 10px 24px -10px rgba(0,0,0,0.3)',
        }}
      >
        <span style={{width: 14, height: 14, borderRadius: 99, background: palette.green, display: 'inline-block'}} />
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
    <div style={{position: 'relative', minHeight: 200}}>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - out, filter: `blur(${out * 10}px)`, transform: `translateY(${-out * 26}px) scale(${1 - out * 0.08})`}}>{S.transformation.before}</div>
      <div style={{opacity: frame >= MORPH_AT + 10 ? 1 : 0}}>
        <Caption text={S.transformation.after} delay={MORPH_AT + 12} size={54} color="#fff" stagger={2} lineHeight={1.45} highlight={['احترافية']} accent="#BBF7D0" />
      </div>
    </div>
  );
};
