import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, interpolate, useCurrentFrame} from 'remotion';
import {Stage, Shot} from './components';
import {Hook, Passwords, Updates, Permissions, Backups, Solution, L, POINT_AT, FINAL_AT} from './scenes';
import {loadFonts} from '../fonts';
import {scene, sec, TOTAL, OVERLAP, C, SceneId, VO} from './config';

const order: Array<[SceneId, React.FC]> = [
  ['hook', Hook],
  ['passwords', Passwords],
  ['updates', Updates],
  ['permissions', Permissions],
  ['backups', Backups],
  ['solution', Solution],
];

/** absolute-second cue list */
type Cue = {file: string; at: number; vol?: number};
export const cues: Cue[] = [
  {file: 'swell.wav', at: 0, vol: 0.35},
  {file: 'pop.wav', at: 0.1, vol: 0.3},
  {file: 'impact.wav', at: 3.75, vol: 0.35},
  {file: 'glitch.wav', at: 4.1, vol: 0.22},
  {file: 'pulse.wav', at: 4.2, vol: 0.35},
  ...order.slice(1).map(([id]) => ({file: 'whoosh.wav', at: (scene(id).from - OVERLAP - 2) / 30, vol: 0.28})),
  ...(['passwords', 'updates', 'permissions', 'backups'] as SceneId[]).map((id) => ({file: 'impact.wav', at: scene(id).from / 30 + 0.05, vol: 0.28})),
  // passwords
  {file: 'click.wav', at: 9.2, vol: 0.45},
  {file: 'click.wav', at: 11.1, vol: 0.4},
  {file: 'glitch.wav', at: 12.95, vol: 0.22},
  {file: 'pulse.wav', at: 13.0, vol: 0.4},
  {file: 'pulse.wav', at: 14.6, vol: 0.32},
  // updates
  {file: 'pop.wav', at: 18.8, vol: 0.22},
  {file: 'glitch.wav', at: 22.65, vol: 0.22},
  {file: 'pulse.wav', at: 22.7, vol: 0.38},
  {file: 'click.wav', at: 24.35, vol: 0.5},
  {file: 'success.wav', at: 25.85, vol: 0.3},
  // permissions
  {file: 'pulse.wav', at: 30.3, vol: 0.4},
  {file: 'glitch.wav', at: 32.65, vol: 0.2},
  // backups
  {file: 'glitch.wav', at: 36.75, vol: 0.22},
  {file: 'pulse.wav', at: 36.8, vol: 0.38},
  {file: 'click.wav', at: 39.25, vol: 0.4},
  {file: 'success.wav', at: 41.6, vol: 0.32},
  {file: 'ding.wav', at: 43.2, vol: 0.25},
  // tension before the solution
  {file: 'riser.wav', at: 45.0, vol: 0.32},
  {file: 'impact.wav', at: 46.35, vol: 0.32},
  ...POINT_AT.map((t) => ({file: 'pop.wav', at: t, vol: 0.26})),
  {file: 'swell.wav', at: FINAL_AT - 0.2, vol: 0.32},
  {file: 'brand.wav', at: FINAL_AT + 0.5, vol: 0.32},
];

const voWindows = VO.map((v, i) => [sec(v.at), sec(v.at) + [183, 299, 248, 250, 312, 360, 99][i]] as const);
const DUCK = 10;
const musicVolume = (f: number) => {
  let duck = 0;
  for (const [a, b] of voWindows) {
    duck = Math.max(duck, interpolate(f, [a - DUCK, a, b, b + DUCK * 2], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  }
  const env = interpolate(f, [0, 30, TOTAL - 60, TOTAL], [0.0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return env * (0.5 - 0.32 * duck);
};

/** red ambient tint: rises with the first warning, clears for the solution */
const alarm = (f: number) => interpolate(f, [sec(4), sec(5), sec(45.6), sec(46.8)], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Scenes: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Stage alarm={alarm(f)}>
      {order.map(([id, Comp], k) => {
        const sc = scene(id);
        const from = k === 0 ? 0 : sc.from - OVERLAP;
        const duration = sc.duration + (k === 0 ? 0 : OVERLAP);
        return (
          <Sequence key={id} from={from} durationInFrames={duration} layout="none">
            <Shot duration={duration} inF={k === 0 ? 0 : 14} outF={k === order.length - 1 ? 0 : 12}>
              <Comp />
            </Shot>
          </Sequence>
        );
      })}
    </Stage>
  );
};

export const CyberReel: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{backgroundColor: C.bg, fontSynthesis: 'none'}}>
      <Scenes />
      <Audio src={staticFile('audio/music-cyber.wav')} volume={musicVolume} />
      {VO.map((v) => (
        <Sequence key={v.file} from={sec(v.at)} durationInFrames={420} layout="none">
          <Audio src={staticFile(`audio/${v.file}`)} volume={1} />
        </Sequence>
      ))}
      {cues.map((c, i) => (
        <Sequence key={i} from={Math.max(0, sec(c.at))} durationInFrames={90} layout="none">
          <Audio src={staticFile(`audio/${c.file}`)} volume={c.vol ?? 0.5} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export {L};
