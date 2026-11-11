import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, interpolate} from 'remotion';
import {Stage, Shot} from './components';
import {Intro, Site, Cards, Mobile, Outro, SITE_CLICK, OUTRO_BRAND} from './scenes';
import {loadFonts} from '../fonts';
import {scene, TOTAL, OVERLAP, C, SceneId} from './config';

const order: Array<[SceneId, React.FC]> = [
  ['intro', Intro],
  ['site', Site],
  ['cards', Cards],
  ['mobile', Mobile],
  ['outro', Outro],
];

const SFX_GAIN = 0.5;
type Cue = {file: string; at: number; vol?: number};
const s = (id: SceneId) => scene(id).from - (id === 'intro' ? 0 : OVERLAP);
export const cues: Cue[] = [
  {file: 'swell.wav', at: 0, vol: 0.45},
  {file: 'pop.wav', at: 5, vol: 0.5},
  ...[50, 66, 74].map((at) => ({file: 'pop.wav', at, vol: 0.34})),
  ...order.slice(1).map(([id]) => ({file: 'whoosh.wav', at: s(id) - 2, vol: 0.34})),
  {file: 'click.wav', at: s('site') + SITE_CLICK, vol: 0.9},
  ...[110, 178, 240, 292, 338].map((at) => ({file: 'whoosh.wav', at: s('site') + at, vol: 0.14})),
  ...[0, 1, 2, 3].map((k) => ({file: 'pop.wav', at: s('cards') + 20 + k * 6, vol: 0.28})),
  {file: 'ding.wav', at: s('cards') + 64, vol: 0.25},
  ...[0, 1, 2].map((k) => ({file: 'pop.wav', at: s('mobile') + 40 + k * 6, vol: 0.32})),
  {file: 'brand.wav', at: s('outro') + OUTRO_BRAND, vol: 0.55},
  {file: 'pop.wav', at: s('outro') + 58, vol: 0.4},
  {file: 'success.wav', at: s('outro') + 74, vol: 0.32},
];

const musicVolume = (f: number) => interpolate(f, [0, 6, TOTAL - 40, TOTAL], [0.55, 0.75, 0.75, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const JayekReel: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{backgroundColor: C.navy, fontSynthesis: 'none'}}>
      <Stage>
        {order.map(([id, Comp], k) => {
          const sc = scene(id);
          const from = k === 0 ? 0 : sc.from - OVERLAP;
          const duration = sc.duration + (k === 0 ? 0 : OVERLAP);
          return (
            <Sequence key={id} from={from} durationInFrames={duration} layout="none">
              <Shot duration={duration} inF={k === 0 ? 0 : 12} outF={k === order.length - 1 ? 0 : 10} push={id === 'site' ? 0 : 0.03}>
                <Comp />
              </Shot>
            </Sequence>
          );
        })}
      </Stage>
      <Audio src={staticFile('audio/music.wav')} volume={musicVolume} />
      {cues.filter((c) => c.at >= 0).map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={90} layout="none">
          <Audio src={staticFile(`audio/${c.file}`)} volume={(c.vol ?? 0.7) * SFX_GAIN} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
