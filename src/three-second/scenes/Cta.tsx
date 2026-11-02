import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Center} from '../components/Layout';
import {Caption} from '../components/Caption';
import {S, palette, scene, font, shadow} from '../config';
import {clamp, sp, springs} from '../../anim';

const SC = scene('cta');
export const CHIP_AT = [8, 20, 32];
export const BUBBLE_AT = 56;
export const PROMPT_AT = 64;
export const SECONDARY_AT = 88;
export const BRAND_AT = 100;

/** 31–36 s: the clarity formula, an animated comment bubble and the invitation to comment */
export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const C = S.cta;
  const bubble = sp(frame, fps, BUBBLE_AT, springs.bouncy);
  const brand = sp(frame, fps, BRAND_AT, springs.smooth);
  const typed = Math.max(0, Math.min(C.bubblePlaceholder.length, Math.floor((frame - BUBBLE_AT - 10) / 2)));
  const caret = Math.floor(frame / 15) % 2 === 0;
  return (
    <Stage offset={SC.from} tint="navy" glow={0.5}>
      {/* formula */}
      <Center y={300}>
        <div dir="rtl" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', columnGap: 20, rowGap: 24, maxWidth: 960, fontFamily: font.family, fontWeight: 900, fontSize: 58, color: palette.text, lineHeight: 1.3}}>
          <Word text={C.formulaPrefix} delay={0} />
          <Chip text={C.formulaService} delay={CHIP_AT[0]} bg={palette.navy} />
          <span style={{display: 'inline-flex', alignItems: 'center', columnGap: 20, whiteSpace: 'nowrap'}}>
            <Word text={C.formulaFor} delay={CHIP_AT[0] + 6} />
            <Chip text={C.formulaClient} delay={CHIP_AT[1]} bg={palette.blue} />
          </span>
          <span style={{display: 'inline-flex', alignItems: 'center', columnGap: 20, whiteSpace: 'nowrap'}}>
            <Word text={C.formulaIn} delay={CHIP_AT[1] + 6} />
            <Chip text={C.formulaPlace} delay={CHIP_AT[2]} bg={palette.green} />
          </span>
        </div>
      </Center>
      {/* comment bubble */}
      <Center y={690}>
        <div
          dir="rtl"
          style={{
            width: 900,
            background: palette.surface,
            borderRadius: 34,
            boxShadow: shadow.float,
            padding: '26px 30px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            transform: `scale(${0.7 + 0.3 * bubble}) translateY(${(1 - bubble) * 40}px)`,
            opacity: Math.min(1, bubble * 1.6),
            position: 'relative',
          }}
        >
          <div style={{width: 76, height: 76, borderRadius: 99, background: 'linear-gradient(135deg,#2563EB,#172554)', flexShrink: 0, display: 'grid', placeItems: 'center'}}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
          </div>
          <div style={{flex: 1, height: 78, borderRadius: 999, border: `2px solid ${palette.gray}`, display: 'flex', alignItems: 'center', padding: '0 28px', fontFamily: font.family, fontWeight: 700, fontSize: 32, color: typed > 0 ? palette.text : palette.muted}}>
            {C.bubblePlaceholder.slice(0, typed)}
            <span style={{width: 3, height: 40, background: palette.blue, marginRight: 4, opacity: caret ? 1 : 0, borderRadius: 2}} />
          </div>
          <div style={{width: 76, height: 76, borderRadius: 99, background: palette.red, display: 'grid', placeItems: 'center', flexShrink: 0}}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
          <div style={{position: 'absolute', bottom: -18, right: 90, width: 36, height: 36, background: palette.surface, transform: 'rotate(45deg)', borderRadius: 6}} />
        </div>
      </Center>
      <div style={{position: 'absolute', top: 880, left: 70, right: 70}}>
        <Caption text={C.commentPrompt} delay={PROMPT_AT} size={78} highlight={C.commentHighlight} accent={palette.red} mode="pop" lineHeight={1.5} />
        <Caption text={C.secondary} delay={SECONDARY_AT} size={40} weight={700} color={palette.navy} lineHeight={1.6} style={{marginTop: 26}} highlight={['3', 'ثوانٍ!']} accent={palette.green} />
      </div>
      {/* brand */}
      <Center y={1290} style={{transform: `translateY(${(1 - brand) * 30}px)`, opacity: brand}}>
        <Img src={staticFile('img/ea4-logo-full.png')} style={{width: 300, height: 300 * (574 / 790)}} />
      </Center>
    </Stage>
  );
};

const Word: React.FC<{text: string; delay: number}> = ({text, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.smooth);
  return <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 30}px)`, opacity: p}}>{text}</span>;
};

const Chip: React.FC<{text: string; delay: number; bg: string}> = ({text, delay, bg}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.bouncy);
  const shine = interpolate(frame, [delay + 8, delay + 30], [-120, 120], {...clamp});
  return (
    <span
      style={{
        display: 'inline-block',
        background: bg,
        color: '#fff',
        padding: '2px 30px 8px',
        borderRadius: 22,
        transform: `scale(${p}) rotate(${(1 - p) * -6}deg)`,
        opacity: Math.min(1, p * 2),
        boxShadow: `0 20px 40px -18px ${bg}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span style={{position: 'absolute', top: 0, bottom: 0, width: 60, left: `${shine}%`, background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.35), rgba(255,255,255,0))', transform: 'skewX(-20deg)'}} />
      {text}
    </span>
  );
};
