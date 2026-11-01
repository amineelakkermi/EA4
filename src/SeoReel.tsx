import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {TransitionSeries, linearTiming, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {Scene01Hook} from './scenes/Scene01Hook';
import {Scene02Indexing, SC_START, SC_REQUEST_AT} from './scenes/Scene02Indexing';
import {Scene03Intent} from './scenes/Scene03Intent';
import {Scene04Technical, TECH_START, TECH_FIX_AT} from './scenes/Scene04Technical';
import {Scene05Speed, WIPE_AT} from './scenes/Scene05Speed';
import {Scene06Final, LOGO_AT} from './scenes/Scene06Final';
import {loadFonts} from './fonts';
import {iris} from './transitions/iris';
import {Lang, LangContext} from './i18n';

export const T = 14;
/** visible scene boundaries in frames (30fps): 4s 10s 16s 22s 27s, end 33s */
export const B = [120, 300, 480, 660, 810, 990];
export const DUR = [B[0] + T / 2, B[1] - B[0] + T, B[2] - B[1] + T, B[3] - B[2] + T, B[4] - B[3] + T, B[5] - B[4] + T / 2];
export const TOTAL = DUR.reduce((a, b) => a + b, 0) - 5 * T; // 990

const SFX_GAIN = 1.35;

type Cue = {file: string; at: number; vol?: number};
/** global frame of a scene-local frame (scene 0 starts at 0, scene k at B[k-1] - T/2) */
const g = (scene: number, local: number) => (scene === 0 ? local : B[scene - 1] - T / 2 + local);
const typing = (start: number, count: number, every: number, vol = 0.35): Cue[] =>
  Array.from({length: count}, (_, i) => ({
    file: 'key.wav',
    at: start + i * every,
    vol,
  }));

const cues: Cue[] = [
  // Scene 01 — hook
  {file: 'pop.wav', at: g(0, 4), vol: 0.6},
  ...typing(g(0, 18), 12, 3),
  {file: 'pop.wav', at: g(0, 52), vol: 0.5},
  {file: 'pop.wav', at: g(0, 57), vol: 0.5},
  {file: 'pop.wav', at: g(0, 62), vol: 0.5},
  {file: 'impact.wav', at: g(0, 76), vol: 0.9},
  {file: 'pop.wav', at: g(0, 86), vol: 0.6},
  // transitions
  ...B.slice(0, 5).map((b) => ({file: 'whoosh.wav', at: b - 8, vol: 0.7})),
  // Scene 02 — indexing
  {file: 'impact.wav', at: g(1, 4), vol: 0.5},
  ...typing(g(1, SC_START + 6), 12, 2),
  {file: 'click.wav', at: g(1, SC_START + 42), vol: 0.6},
  {file: 'impact.wav', at: g(1, SC_START + 60), vol: 0.45},
  ...[0, 1, 2].map((i) => ({
    file: 'pop.wav',
    at: g(1, SC_START + 72 + i * 4),
    vol: 0.4,
  })),
  {file: 'click.wav', at: g(1, SC_REQUEST_AT), vol: 0.8},
  {file: 'ding.wav', at: g(1, SC_REQUEST_AT + 8), vol: 0.7},
  // Scene 03 — intent & content
  {file: 'impact.wav', at: g(2, 4), vol: 0.5},
  ...typing(g(2, 22), 10, 3),
  {file: 'pop.wav', at: g(2, 54), vol: 0.5},
  {file: 'whoosh.wav', at: g(2, 76), vol: 0.5},
  {file: 'impact.wav', at: g(2, 92), vol: 0.6},
  ...[0, 1, 2].map((i) => ({
    file: 'pop.wav',
    at: g(2, 108 + i * 10),
    vol: 0.45,
  })),
  // Scene 04 — technical
  {file: 'impact.wav', at: g(3, 4), vol: 0.5},
  ...typing(g(3, TECH_START + 8), 12, 3),
  ...typing(g(3, TECH_START + 52), 10, 4, 0.25),
  ...[0, 1, 2].map((i) => ({
    file: 'pop.wav',
    at: g(3, TECH_START + 100 + i * 10),
    vol: 0.45,
  })),
  {file: 'impact.wav', at: g(3, TECH_START + 132), vol: 0.6},
  {file: 'ding.wav', at: g(3, TECH_FIX_AT), vol: 0.8},
  // Scene 05 — speed
  {file: 'impact.wav', at: g(4, 4), vol: 0.5},
  {file: 'whoosh.wav', at: g(4, WIPE_AT), vol: 0.9},
  {file: 'ding.wav', at: g(4, WIPE_AT + 22), vol: 0.6},
  // Scene 06 — final
  {file: 'impact.wav', at: g(5, 4), vol: 0.5},
  {file: 'pop.wav', at: g(5, 28), vol: 0.5},
  {file: 'riser.wav', at: g(5, LOGO_AT - 30), vol: 0.8},
  {file: 'brand.wav', at: g(5, LOGO_AT + 14), vol: 0.9},
  {file: 'pop.wav', at: g(5, LOGO_AT + 58), vol: 0.6},
];

export const SeoReel: React.FC<{lang: Lang}> = ({lang}) => {
  loadFonts();
  const soft = linearTiming({
    durationInFrames: T,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const springy = springTiming({
    config: {damping: 200},
    durationInFrames: T,
  });
  return (
    <LangContext.Provider value={lang}>
      <AbsoluteFill style={{backgroundColor: '#F3F4F6'}}>
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={DUR[0]}>
            <Scene01Hook />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={wipe({direction: 'from-bottom'})} timing={soft} />
          <TransitionSeries.Sequence durationInFrames={DUR[1]}>
            <Scene02Indexing />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={slide({direction: 'from-left'})} timing={springy} />
          <TransitionSeries.Sequence durationInFrames={DUR[2]}>
            <Scene03Intent />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={springy} />
          <TransitionSeries.Sequence durationInFrames={DUR[3]}>
            <Scene04Technical />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={wipe({direction: 'from-top-left'})} timing={soft} />
          <TransitionSeries.Sequence durationInFrames={DUR[4]}>
            <Scene05Speed />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={iris()} timing={soft} />
          <TransitionSeries.Sequence durationInFrames={DUR[5]}>
            <Scene06Final />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        <Audio src={staticFile('audio/music.wav')} volume={0.85} />
        {cues.map((c, i) => (
          <Sequence key={i} from={c.at} durationInFrames={90} layout="none">
            <Audio src={staticFile(`audio/${c.file}`)} volume={(c.vol ?? 0.6) * SFX_GAIN} />
          </Sequence>
        ))}
      </AbsoluteFill>
    </LangContext.Provider>
  );
};
