import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {TransitionSeries, linearTiming, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {fade} from '@remotion/transitions/fade';
import {Scene01Hook} from './scenes/Scene01Hook';
import {Scene02Solution} from './scenes/Scene02Solution';
import {Scene03Keywords} from './scenes/Scene03Keywords';
import {Scene04Index} from './scenes/Scene04Index';
import {Scene05Speed} from './scenes/Scene05Speed';
import {Scene06Content} from './scenes/Scene06Content';
import {Scene07Brand} from './scenes/Scene07Brand';
import {loadFonts} from './fonts';
import {iris} from './transitions/iris';

export const T = 14;
/** visible scene boundaries in frames (30fps): 4s 7s 11s 15s 19s 24s, end 32s */
export const B = [120, 210, 330, 450, 570, 720, 960];
export const DUR = [B[0] + T / 2, B[1] - B[0] + T, B[2] - B[1] + T, B[3] - B[2] + T, B[4] - B[3] + T, B[5] - B[4] + T, B[6] - B[5] + T / 2];
export const TOTAL = DUR.reduce((a, b) => a + b, 0) - 6 * T; // 960

const SFX_GAIN = 1.35;

type Cue = {file: string; at: number; vol?: number};
const typing = (start: number, count: number, every: number): Cue[] =>
  Array.from({length: count}, (_, i) => ({file: 'key.wav', at: start + i * every, vol: 0.35}));

const cues: Cue[] = [
  // Scene 01
  {file: 'pop.wav', at: 4, vol: 0.6},
  ...typing(18, 12, 3),
  {file: 'pop.wav', at: 52, vol: 0.5},
  {file: 'pop.wav', at: 57, vol: 0.5},
  {file: 'pop.wav', at: 62, vol: 0.5},
  {file: 'impact.wav', at: 66, vol: 0.9},
  {file: 'pop.wav', at: 78, vol: 0.7},
  // transitions
  ...B.slice(0, 5).map((b) => ({file: 'whoosh.wav', at: b - 8, vol: 0.7})),
  // Scene 02 (starts 120)
  {file: 'pop.wav', at: 126, vol: 0.5},
  ...[0, 1, 2, 3, 4].map((i) => ({file: 'click.wav', at: 160 + i * 4, vol: 0.45})),
  // Scene 03 (starts 210)
  {file: 'impact.wav', at: 214, vol: 0.5},
  ...typing(228, 10, 3),
  ...[0, 1, 2].map((i) => ({file: 'click.wav', at: 284 + i * 6, vol: 0.6})),
  // Scene 04 (starts 330)
  {file: 'impact.wav', at: 334, vol: 0.5},
  ...typing(352, 12, 2),
  {file: 'ding.wav', at: 330 + 16 + 6 + 27 + 8 + 20, vol: 0.8},
  // Scene 05 (starts 450)
  {file: 'impact.wav', at: 454, vol: 0.5},
  {file: 'whoosh.wav', at: 450 + 56, vol: 0.9},
  {file: 'ding.wav', at: 450 + 56 + 22, vol: 0.6},
  // Scene 06 (starts 570)
  {file: 'impact.wav', at: 574, vol: 0.5},
  ...typing(592, 10, 3),
  {file: 'click.wav', at: 570 + 62, vol: 0.8},
  {file: 'pop.wav', at: 570 + 70, vol: 0.6},
  {file: 'impact.wav', at: 570 + 80, vol: 0.5},
  ...[0, 1, 2, 3].map((i) => ({file: 'pop.wav', at: 570 + 94 + 20 + i * 7, vol: 0.5})),
  // Scene 07 (starts 720)
  {file: 'riser.wav', at: 720 - 30, vol: 0.7},
  {file: 'impact.wav', at: 722, vol: 0.8},
  {file: 'riser.wav', at: 720 + 112 - 34, vol: 0.8},
  {file: 'brand.wav', at: 720 + 112 + 10, vol: 0.9},
  {file: 'pop.wav', at: 720 + 112 + 46, vol: 0.6},
  {file: 'click.wav', at: 720 + 112 + 64, vol: 0.7},
];

export const SeoReel: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{backgroundColor: '#F3F4F6'}}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={DUR[0]}>
          <Scene01Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({direction: 'from-bottom'})} timing={linearTiming({durationInFrames: T, easing: (t) => 1 - Math.pow(1 - t, 3)})} />
        <TransitionSeries.Sequence durationInFrames={DUR[1]}>
          <Scene02Solution />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-left'})} timing={springTiming({config: {damping: 200}, durationInFrames: T})} />
        <TransitionSeries.Sequence durationInFrames={DUR[2]}>
          <Scene03Keywords />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={springTiming({config: {damping: 200}, durationInFrames: T})} />
        <TransitionSeries.Sequence durationInFrames={DUR[3]}>
          <Scene04Index />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({direction: 'from-top-left'})} timing={linearTiming({durationInFrames: T, easing: (t) => 1 - Math.pow(1 - t, 3)})} />
        <TransitionSeries.Sequence durationInFrames={DUR[4]}>
          <Scene05Speed />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={springTiming({config: {damping: 200}, durationInFrames: T})} />
        <TransitionSeries.Sequence durationInFrames={DUR[5]}>
          <Scene06Content />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={iris()} timing={linearTiming({durationInFrames: T, easing: (t) => 1 - Math.pow(1 - t, 3)})} />
        <TransitionSeries.Sequence durationInFrames={DUR[6]}>
          <Scene07Brand />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Audio src={staticFile('audio/music.wav')} volume={0.85} />
      {cues.map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={90} layout="none">
          <Audio src={staticFile(`audio/${c.file}`)} volume={(c.vol ?? 0.6) * SFX_GAIN} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
