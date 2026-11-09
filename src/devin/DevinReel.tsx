import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, interpolate} from 'remotion';
import {Backdrop, Shot} from './components';
import {Hook, Problem, Reveal, Brief, Build, Result, Benefits, Cta} from './scenes';
import {loadFonts} from '../fonts';
import {scene, TOTAL, C, SceneId} from './config';

const order: Array<[SceneId, React.FC]> = [
  ['hook', Hook],
  ['problem', Problem],
  ['reveal', Reveal],
  ['brief', Brief],
  ['build', Build],
  ['result', Result],
  ['benefits', Benefits],
  ['cta', Cta],
];

const SFX_GAIN = 0.5;
type Cue = {file: string; at: number; vol?: number};
const s = (id: SceneId) => scene(id).from;
export const cues: Cue[] = [
  {file: 'impact.wav', at: 0, vol: 0.6},
  ...order.slice(1).map(([id]) => ({file: 'whoosh.wav', at: s(id) - 6, vol: 0.5})),
  {file: 'swell.wav', at: s('reveal') - 24, vol: 0.6},
  {file: 'impact.wav', at: s('reveal'), vol: 0.9},
  {file: 'notify.wav', at: s('brief') + 128, vol: 0.55},
  ...[0, 1, 2, 3, 4].map((k) => ({file: 'pop.wav', at: s('build') + 32 + k * 24, vol: 0.45})),
  {file: 'success.wav', at: s('build') + 192, vol: 0.7},
  {file: 'pop.wav', at: s('result') + 80, vol: 0.55},
  {file: 'success.wav', at: s('result') + 112, vol: 0.6},
  ...[0, 1, 2].map((k) => ({file: 'pop.wav', at: s('benefits') + 16 + k * 12, vol: 0.5})),
  {file: 'brand.wav', at: s('cta'), vol: 0.8},
];

const musicVolume = (f: number) => interpolate(f, [0, 4, TOTAL - 20, TOTAL], [0.8, 0.9, 0.9, 0.5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const DevinReel: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{backgroundColor: C.bg, fontSynthesis: 'none'}}>
      <Backdrop>
        {order.map(([id, Comp], k) => {
          const sc = scene(id);
          return (
            <Sequence key={id} from={sc.from} durationInFrames={sc.duration} layout="none">
              <Shot duration={sc.duration} noIn={k === 0} outF={k === order.length - 1 ? 14 : 10}>
                <Comp />
              </Shot>
            </Sequence>
          );
        })}
      </Backdrop>
      <Audio src={staticFile('audio/music-devin-calm.wav')} volume={musicVolume} />
      {cues.filter((c) => c.at >= 0).map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={90} layout="none">
          <Audio src={staticFile(`audio/${c.file}`)} volume={(c.vol ?? 0.7) * SFX_GAIN} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
