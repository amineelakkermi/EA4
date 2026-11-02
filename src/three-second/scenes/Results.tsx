import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Center} from '../components/Layout';
import {Caption, Tag} from '../components/Caption';
import {XMark, CheckMark} from '../components/Marks';
import {SiteThumb, SiteKey} from '../components/Showcase';
import {S, palette, scene, font, shadow} from '../config';
import {clamp, ease, sp, springs} from '../../anim';

const SC = scene('results');
export const RESULT_AT = [10, 40, 70]; // card entrances (local frames)
export const MARK_AT = RESULT_AT.map((f) => f + 16);
export const COMPRESS_AT = 118;
export const STATEMENT_AT = 130;

const rows: Array<{site: SiteKey; ok: boolean}> = [
  {site: 'vague', ok: false},
  {site: 'clear', ok: true},
  {site: 'confusing', ok: false},
];

/** 18–25 s: the three website screenshots as cards with X / check reveals, then the "1 of 3" statement */
export const Results: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const compress = interpolate(frame, [COMPRESS_AT, COMPRESS_AT + 22], [0, 1], {...clamp, easing: ease.inOut});
  const glow = interpolate(frame, [STATEMENT_AT, STATEMENT_AT + 20], [0, 1], {...clamp});
  const rowH = 330;
  const gap = 26;
  const topY = 250;
  const scale = 1 - compress * 0.3; // rows shrink to make room for the statement
  return (
    <Stage offset={SC.from} tint="green" glow={glow * 0.8}>
      <Center y={160}>
        <Tag text={S.results.title} delay={0} size={32} color="#fff" bg={palette.navy} />
      </Center>
      <div style={{position: 'absolute', top: topY, left: 60, right: 60, transformOrigin: '50% 0%', transform: `scale(${scale})`}}>
        {rows.map((r, i) => {
          const p = sp(frame, fps, RESULT_AT[i], springs.smooth);
          return (
            <div
              key={r.site}
              dir="rtl"
              style={{
                height: rowH,
                marginBottom: gap,
                background: palette.surface,
                borderRadius: 30,
                boxShadow: shadow.card,
                display: 'flex',
                alignItems: 'center',
                padding: '0 36px',
                gap: 30,
                transform: `translateY(${(1 - p) * 120}px) scale(${0.94 + 0.06 * p})`,
                opacity: Math.min(1, p * 1.5),
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{position: 'absolute', inset: 0, background: r.ok ? `linear-gradient(90deg, ${palette.greenSoft}00, ${palette.greenSoft})` : `linear-gradient(90deg, ${palette.redSoft}00, ${palette.redSoft})`, opacity: interpolate(frame, [MARK_AT[i], MARK_AT[i] + 14], [0, 1], {...clamp})}} />
              <div style={{width: 300, height: rowH - 40, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0}}>
                <div style={{position: 'absolute', top: 0}}>
                  <SiteThumb site={r.site} scale={0.278} h={rowH - 40} />
                </div>
              </div>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 26, position: 'relative'}}>
                {r.ok ? <CheckMark delay={MARK_AT[i]} size={120} /> : <XMark delay={MARK_AT[i]} size={120} />}
                <div style={{flex: 1}}>
                  <div style={{fontFamily: font.family, fontWeight: 700, fontSize: 26, color: palette.muted}}>{S.rounds[r.site].label}</div>
                  <Caption text={r.ok ? S.results.clear : S.results.unclear} delay={MARK_AT[i] + 4} size={r.ok ? 46 : 54} color={r.ok ? palette.green : palette.red} align="start" mode="pop" lineHeight={1.4} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* statement */}
      <div style={{position: 'absolute', top: 1010, left: 70, right: 70, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <BigRatio delay={STATEMENT_AT} />
        <Caption
          text={`${S.results.statementBefore} ${S.results.statementNumber} ${S.results.statementAfter}`}
          delay={STATEMENT_AT + 10}
          size={70}
          highlight={[S.results.statementNumber]}
          accent={palette.green}
          lineHeight={1.5}
          style={{marginTop: 8}}
        />
        <Caption text={S.results.note} delay={STATEMENT_AT + 40} size={27} weight={700} color={palette.muted} lineHeight={1.5} style={{marginTop: 18}} />
      </div>
    </Stage>
  );
};

/** "1 / 3" numeral with the 1 punched in green */
const BigRatio: React.FC<{delay: number}> = ({delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, delay, springs.bouncy);
  const p2 = sp(frame, fps, delay + 6, springs.smooth);
  return (
    <div dir="ltr" style={{display: 'flex', alignItems: 'baseline', fontFamily: font.family, fontWeight: 900, lineHeight: 1, gap: 6}}>
      <span style={{fontSize: 150, color: palette.green, display: 'inline-block', transform: `scale(${p})`, opacity: Math.min(1, p * 2), textShadow: '0 20px 40px rgba(22,163,74,0.35)'}}>1</span>
      <span style={{fontSize: 84, color: palette.gray, display: 'inline-block', transform: `translateY(${(1 - p2) * 20}px)`, opacity: p2}}>/3</span>
    </div>
  );
};
