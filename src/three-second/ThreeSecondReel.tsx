import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, interpolate} from 'remotion';
import {Hook} from './scenes/Hook';
import {Round} from './scenes/Round';
import {Results, RESULT_AT, MARK_AT, STATEMENT_AT} from './scenes/Results';
import {Transformation, LABEL_AT, MORPH_AT, CAPTION_AT} from './scenes/Transformation';
import {Cta, CHIP_AT, BUBBLE_AT, PROMPT_AT, SECONDARY_AT, BRAND_AT} from './scenes/Cta';
import {loadFonts} from '../fonts';
import {scene, ROUND, FPS, palette} from './config';

type Cue = {file: string; at: number; vol?: number};

const hook = scene('hook');
const r1 = scene('round1');
const r2 = scene('round2');
const r3 = scene('round3');
const res = scene('results');
const tr = scene('transformation');
const cta = scene('cta');

const roundCues = (from: number, kind: 'vague' | 'clear' | 'confusing'): Cue[] => [
  {file: 'whoosh.wav', at: from - 2, vol: 0.8},
  {file: 'pop.wav', at: from + 3, vol: 0.6},
  ...[0, 1, 2].map((i) => ({file: 'tick.wav', at: from + ROUND.challengeStart + i * FPS, vol: 0.9})),
  {file: 'zero.wav', at: from + ROUND.challengeEnd, vol: 0.9},
  {file: 'whoosh.wav', at: from + ROUND.blurAt + 1, vol: 0.9},
  {file: 'pop.wav', at: from + ROUND.questionAt + 1, vol: 0.8},
  kind === 'clear'
    ? {file: 'success.wav', at: from + ROUND.questionAt + 3, vol: 1}
    : kind === 'confusing'
      ? {file: 'swell.wav', at: from + ROUND.blurAt - 20, vol: 0.5}
      : {file: 'notify.wav', at: from + ROUND.questionAt + 6, vol: 0.5},
];

export const cues: Cue[] = [
  // hook
  {file: 'impact.wav', at: 0, vol: 1},
  ...[0, 1, 2].map((i) => ({file: 'tick.wav', at: i * FPS, vol: 0.8})),
  {file: 'zero.wav', at: 88, vol: 0.9},
  // rounds
  ...roundCues(r1.from, 'vague'),
  ...roundCues(r2.from, 'clear'),
  ...roundCues(r3.from, 'confusing'),
  // results
  {file: 'swell.wav', at: res.from - 30, vol: 0.9},
  {file: 'impact.wav', at: res.from, vol: 0.6},
  ...RESULT_AT.map((f) => ({file: 'whoosh.wav', at: res.from + f, vol: 0.5})),
  {file: 'wrong.wav', at: res.from + MARK_AT[0], vol: 0.9},
  {file: 'success.wav', at: res.from + MARK_AT[1], vol: 1},
  {file: 'wrong.wav', at: res.from + MARK_AT[2], vol: 0.9},
  {file: 'impact.wav', at: res.from + STATEMENT_AT, vol: 0.8},
  {file: 'pop.wav', at: res.from + STATEMENT_AT + 10, vol: 0.7},
  {file: 'pop.wav', at: res.from + STATEMENT_AT + 40, vol: 0.4},
  // transformation
  {file: 'whoosh.wav', at: tr.from - 2, vol: 0.7},
  {file: 'pop.wav', at: tr.from + LABEL_AT, vol: 0.7},
  {file: 'morph.wav', at: tr.from + MORPH_AT, vol: 0.9},
  {file: 'success.wav', at: tr.from + CAPTION_AT, vol: 1},
  {file: 'pop.wav', at: tr.from + CAPTION_AT + 6, vol: 0.6},
  // cta
  {file: 'impact.wav', at: cta.from, vol: 0.55},
  ...CHIP_AT.map((f) => ({file: 'pop.wav', at: cta.from + f, vol: 0.8})),
  {file: 'notify.wav', at: cta.from + BUBBLE_AT, vol: 0.9},
  {file: 'pop.wav', at: cta.from + PROMPT_AT, vol: 0.6},
  {file: 'pop.wav', at: cta.from + SECONDARY_AT, vol: 0.45},
  {file: 'brand.wav', at: cta.from + BRAND_AT, vol: 0.7},
];

/** music: steady, a short dip (near-silence) right before the CTA to make it land */
const musicVolume = (f: number) =>
  interpolate(f, [0, 20, cta.from - 14, cta.from - 2, cta.from + 10, cta.from + 36], [0, 1, 1, 0.08, 0.08, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const ThreeSecondReel: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{backgroundColor: palette.bg}}>
      <Sequence from={hook.from} durationInFrames={hook.duration} layout="none">
        <Hook />
      </Sequence>
      <Sequence from={r1.from} durationInFrames={r1.duration} layout="none">
        <Round site="vague" />
      </Sequence>
      <Sequence from={r2.from} durationInFrames={r2.duration} layout="none">
        <Round site="clear" />
      </Sequence>
      <Sequence from={r3.from} durationInFrames={r3.duration} layout="none">
        <Round site="confusing" />
      </Sequence>
      <Sequence from={res.from} durationInFrames={res.duration} layout="none">
        <Results />
      </Sequence>
      <Sequence from={tr.from} durationInFrames={tr.duration} layout="none">
        <Transformation />
      </Sequence>
      <Sequence from={cta.from} durationInFrames={cta.duration} layout="none">
        <Cta />
      </Sequence>

      <Audio src={staticFile('audio/music-3s.wav')} volume={musicVolume} />
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
