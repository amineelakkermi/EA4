import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, staticFile, interpolate, useCurrentFrame} from 'remotion';
import {Stage, Shot} from './components';
import {Hook} from './s1';
import {What} from './s2';
import {Arch, SUB} from './s3';
import {Ai} from './s4';
import {Final, Q_AT, LOGO_AT} from './s5';
import {loadFonts} from '../fonts';
import {scene, sec, TOTAL, OVERLAP, C, SceneId, T} from './config';
import {prog} from '../anim';

const order: Array<[SceneId, React.FC]> = [
  ['hook', Hook],
  ['what', What],
  ['arch', Arch],
  ['ai', Ai],
  ['final', Final],
];

const A = (id: SceneId, s: number) => T[id][0] + s;
type Cue = {file: string; at: number; vol?: number};
export const cues: Cue[] = [
  {file: 'swell.wav', at: 0, vol: 0.3},
  ...[0.2, 0.37, 0.53, 0.73].map((t) => ({file: 'pop.wav', at: t, vol: 0.22})),
  {file: 'whoosh.wav', at: 3.1, vol: 0.22},
  {file: 'morph.wav', at: 3.45, vol: 0.25},
  {file: 'impact.wav', at: 4.2, vol: 0.3},
  ...order.slice(1).map(([id]) => ({file: 'whoosh.wav', at: T[id][0] - 0.33, vol: 0.26})),
  // what
  {file: 'morph.wav', at: A('what', 2.4), vol: 0.22},
  {file: 'click.wav', at: A('what', 3.6), vol: 0.4},
  {file: 'click.wav', at: A('what', 5.6), vol: 0.4},
  {file: 'pop.wav', at: A('what', 7.0), vol: 0.24},
  // arch: flow
  ...[0, 1, 2, 3].map((i) => ({file: 'pop.wav', at: A('arch', 1.2 + i * 0.2), vol: 0.18})),
  {file: 'click.wav', at: A('arch', 2.9), vol: 0.5},
  ...[0, 1, 2].map((i) => ({file: 'notify.wav', at: A('arch', 3.45 + i * 0.65), vol: 0.14})),
  {file: 'success.wav', at: A('arch', 6.0), vol: 0.26},
  // auth
  {file: 'whoosh.wav', at: A('arch', SUB.auth[0] - 0.3), vol: 0.2},
  {file: 'click.wav', at: A('arch', 8.15), vol: 0.5},
  {file: 'ding.wav', at: A('arch', 8.3), vol: 0.18},
  {file: 'wrong.wav', at: A('arch', 10.3), vol: 0.28},
  // tenancy
  {file: 'whoosh.wav', at: A('arch', SUB.tenancy[0] - 0.3), vol: 0.2},
  {file: 'pulse.wav', at: A('arch', 12.95), vol: 0.22},
  {file: 'success.wav', at: A('arch', 13.75), vol: 0.22},
  {file: 'wrong.wav', at: A('arch', 14.75), vol: 0.3},
  {file: 'impact.wav', at: A('arch', 15.0), vol: 0.18},
  // billing
  {file: 'whoosh.wav', at: A('arch', SUB.billing[0] - 0.3), vol: 0.2},
  {file: 'click.wav', at: A('arch', 17.45), vol: 0.5},
  {file: 'notify.wav', at: A('arch', 18.1), vol: 0.18},
  {file: 'success.wav', at: A('arch', 18.7), vol: 0.26},
  // ai
  {file: 'impact.wav', at: A('ai', 0.05), vol: 0.26},
  {file: 'riser.wav', at: A('ai', 2.0), vol: 0.16},
  ...[3.2, 4.0, 4.8, 5.6, 6.5].map((t) => ({file: 'pop.wav', at: A('ai', t), vol: 0.24})),
  {file: 'success.wav', at: A('ai', 7.6), vol: 0.2},
  {file: 'glitch.wav', at: A('ai', 9.4), vol: 0.14},
  ...[0, 1, 2, 3].map((i) => ({file: 'notify.wav', at: A('ai', 10.0 + i * 0.23), vol: 0.13})),
  // final
  ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({file: 'pop.wav', at: A('final', 0.07 + i * 0.1), vol: 0.12})),
  {file: 'impact.wav', at: A('final', 1.95), vol: 0.24},
  {file: 'swell.wav', at: A('final', Q_AT - 0.2), vol: 0.24},
  {file: 'brand.wav', at: A('final', LOGO_AT), vol: 0.32},
];

const musicVolume = (f: number) => interpolate(f, [0, 20, TOTAL - 75, TOTAL], [0, 0.42, 0.42, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/** small logo signature (hidden on the final scene, which shows the full logo) */
const Signature: React.FC = () => {
  const f = useCurrentFrame();
  const vis = prog(f, 10, 30) * (1 - prog(f, scene('final').from - 20, scene('final').from));
  return <Img src={staticFile('img/ea4-logo-v2.png')} style={{position: 'absolute', left: 56, top: 118, width: 110, opacity: 0.9 * vis, zIndex: 20}} />;
};

export const SaasReel: React.FC = () => {
  loadFonts();
  return (
    <AbsoluteFill style={{backgroundColor: C.bg, fontSynthesis: 'none'}}>
      <Stage>
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
        <Signature />
      </Stage>
      <Audio src={staticFile('audio/music-cyber.wav')} volume={musicVolume} />
      {cues.map((c, i) => (
        <Sequence key={i} from={Math.max(0, sec(c.at))} durationInFrames={90} layout="none">
          <Audio src={staticFile(`audio/${c.file}`)} volume={c.vol ?? 0.5} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
