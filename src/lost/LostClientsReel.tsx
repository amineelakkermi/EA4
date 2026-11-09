import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, interpolate} from 'remotion';
import {Stage, Fade} from './components';
import {Hook, REASONS, MARKS, Statement, Cta} from './scenes';
import {loadFonts} from '../fonts';
import {scene, palette, TOTAL} from './config';

type Cue = {file: string; at: number; vol?: number};
const ids = ['r1', 'r2', 'r3', 'r4', 'r5'] as const;
const hook = scene('hook');
const st = scene('statement');
const cta = scene('cta');

export const cues: Cue[] = [
  {file: 'impact.wav', at: 0, vol: 0.55},
  ...ids.flatMap((id, i) => {
    const s = scene(id);
    const m = MARKS[i];
    return [
      {file: 'whoosh.wav', at: s.from - 4, vol: 0.55},
      {file: 'pop.wav', at: s.from + 3, vol: 0.6},
      ...(i === 0 ? [38, 68, 98].map((f) => ({file: 'tick.wav', at: s.from + f, vol: 0.4})) : []),
      {file: 'wrong.wav', at: s.from + m.x, vol: 0.6},
      ...(m.ok ? [{file: 'whoosh.wav', at: s.from + m.ok - 22, vol: 0.4}, {file: 'success.wav', at: s.from + m.ok, vol: 0.7}] : []),
    ];
  }),
  {file: 'swell.wav', at: st.from - 10, vol: 0.6},
  {file: 'impact.wav', at: st.from + 24, vol: 0.85},
  {file: 'brand.wav', at: cta.from, vol: 0.8},
  {file: 'pop.wav', at: cta.from + 12, vol: 0.6},
];

const musicVolume = (f: number) => interpolate(f, [0, 6, TOTAL - 36, TOTAL], [0.6, 0.85, 0.85, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const LostClientsReel: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{backgroundColor: palette.bg, fontSynthesis: 'none'}}>
      <Stage>
        <Sequence from={hook.from} durationInFrames={hook.duration} layout="none">
          <Fade duration={hook.duration} inF={0}><Hook /></Fade>
        </Sequence>
        {ids.map((id, i) => {
          const s = scene(id);
          const C = REASONS[i];
          return (
            <Sequence key={id} from={s.from} durationInFrames={s.duration} layout="none">
              <Fade duration={s.duration}><C /></Fade>
            </Sequence>
          );
        })}
        <Sequence from={st.from} durationInFrames={st.duration} layout="none">
          <Fade duration={st.duration}><Statement /></Fade>
        </Sequence>
        <Sequence from={cta.from} durationInFrames={cta.duration} layout="none">
          <Fade duration={cta.duration} outF={1}><Cta /></Fade>
        </Sequence>
      </Stage>
      <Audio src={staticFile('audio/music-lost.wav')} volume={musicVolume} />
      {cues.filter((c) => c.at >= 0).map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={90} layout="none">
          <Audio src={staticFile(`audio/${c.file}`)} volume={c.vol ?? 0.7} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
