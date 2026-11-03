import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, interpolate} from 'remotion';
import {Stage} from './components/Stage';
import {Hook, HOOK} from './scenes/Hook';
import {Problem, PROBLEM} from './scenes/Problem';
import {Causes, CAUSES} from './scenes/Causes';
import {Impact, IMPACT} from './scenes/Impact';
import {Statement, STATEMENT} from './scenes/Statement';
import {Takeaway, TAKEAWAY} from './scenes/Takeaway';
import {Outro} from './scenes/Outro';
import {loadFonts} from '../fonts';
import {scene, palette} from './config';

type Cue = {file: string; at: number; vol?: number};

const hook = scene('hook');
const problem = scene('problem');
const causes = scene('causes');
const impact = scene('impact');
const statement = scene('statement');
const takeaway = scene('takeaway');
const outro = scene('outro');

export const cues: Cue[] = [
  {file: 'whoosh.wav', at: 0, vol: 0.5},
  {file: 'click.wav', at: hook.from + HOOK.tap, vol: 0.9},
  {file: 'whoosh.wav', at: hook.from + HOOK.switch, vol: 0.5},
  {file: 'tick.wav', at: hook.from + HOOK.switch + 30, vol: 0.4},
  {file: 'tick.wav', at: hook.from + HOOK.switch + 60, vol: 0.4},
  {file: 'whoosh.wav', at: hook.from + HOOK.leave, vol: 0.7},
  {file: 'impact.wav', at: hook.from + HOOK.why, vol: 0.8},
  {file: 'pop.wav', at: problem.from + 4, vol: 0.5},
  ...[30, 60, 90, 120].map((f) => ({file: 'tick.wav', at: problem.from + f, vol: 0.45})),
  {file: 'whoosh.wav', at: problem.from + PROBLEM.leave, vol: 0.7},
  {file: 'notify.wav', at: problem.from + PROBLEM.leave + 8, vol: 0.5},
  {file: 'whoosh.wav', at: causes.from, vol: 0.5},
  ...CAUSES.cards.map((f) => ({file: 'pop.wav', at: causes.from + f, vol: 0.75})),
  {file: 'impact.wav', at: impact.from + 2, vol: 0.6},
  {file: 'whoosh.wav', at: impact.from + IMPACT.leave, vol: 0.6},
  {file: 'notify.wav', at: impact.from + IMPACT.breakAt, vol: 0.5},
  ...IMPACT.items.map((f) => ({file: 'pop.wav', at: impact.from + f, vol: 0.7})),
  {file: 'swell.wav', at: statement.from - 24, vol: 0.7},
  {file: 'impact.wav', at: statement.from + STATEMENT.b, vol: 0.9},
  {file: 'pop.wav', at: statement.from + STATEMENT.b + 8, vol: 0.5},
  {file: 'whoosh.wav', at: takeaway.from + TAKEAWAY.wipe, vol: 0.7},
  {file: 'success.wav', at: takeaway.from + TAKEAWAY.wipe + 8, vol: 0.9},
  {file: 'pop.wav', at: takeaway.from + TAKEAWAY.b, vol: 0.5},
  {file: 'brand.wav', at: outro.from, vol: 0.8},
];

/** music: steady, a short dip right before the central statement lands */
const musicVolume = (f: number) => {
  const b = statement.from + STATEMENT.b;
  return interpolate(f, [0, 20, b - 16, b - 4, b + 8, b + 40], [0, 0.9, 0.9, 0.25, 0.25, 0.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

export const WebnestReel: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{backgroundColor: palette.bg, fontSynthesis: 'none'}}>
      <Stage>
        <Sequence from={hook.from} durationInFrames={hook.duration} layout="none">
          <Hook />
        </Sequence>
        <Sequence from={problem.from} durationInFrames={problem.duration} layout="none">
          <Problem />
        </Sequence>
        <Sequence from={causes.from} durationInFrames={causes.duration} layout="none">
          <Causes />
        </Sequence>
        <Sequence from={impact.from} durationInFrames={impact.duration} layout="none">
          <Impact />
        </Sequence>
        <Sequence from={statement.from} durationInFrames={statement.duration} layout="none">
          <Statement />
        </Sequence>
        <Sequence from={takeaway.from} durationInFrames={takeaway.duration} layout="none">
          <Takeaway />
        </Sequence>
        <Sequence from={outro.from} durationInFrames={outro.duration} layout="none">
          <Outro />
        </Sequence>
      </Stage>
      <Audio src={staticFile('audio/music-webnest.wav')} volume={musicVolume} />
      {cues
        .filter((c) => c.at >= 0)
        .map((c, i) => (
          <Sequence key={i} from={c.at} durationInFrames={90} layout="none">
            <Audio src={staticFile(`audio/${c.file}`)} volume={c.vol ?? 0.7} />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};
