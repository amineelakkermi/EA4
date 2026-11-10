import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, interpolate} from 'remotion';
import {Stage, Shot, LogoBadge} from './components';
import {Hook, Gallery, Details, Contact, Search, Trust, Mobile, Analytics, Cta, CLICK_CONTACT, SEARCH_CLICKS, CTA_CLICK} from './scenes';
import {loadFonts} from '../fonts';
import {scene, TOTAL, OVERLAP, C, SceneId} from './config';

const order: Array<[SceneId, React.FC]> = [
  ['hook', Hook],
  ['gallery', Gallery],
  ['details', Details],
  ['contact', Contact],
  ['search', Search],
  ['trust', Trust],
  ['mobile', Mobile],
  ['analytics', Analytics],
  ['cta', Cta],
];

const SFX_GAIN = 0.5;
type Cue = {file: string; at: number; vol?: number};
/** local frame 0 of a scene (its Sequence starts OVERLAP frames early) */
const s = (id: SceneId) => scene(id).from - (id === 'hook' ? 0 : OVERLAP);
export const cues: Cue[] = [
  {file: 'swell.wav', at: 0, vol: 0.45},
  {file: 'pop.wav', at: 4, vol: 0.5},
  {file: 'whoosh.wav', at: 56, vol: 0.4},
  ...order.slice(1).map(([id]) => ({file: 'whoosh.wav', at: s(id) - 2, vol: 0.32})),
  ...[0, 1, 2].map((k) => ({file: 'pop.wav', at: s('gallery') + 8 + k * 10, vol: 0.32})),
  ...[0, 1, 2, 3].map((k) => ({file: 'pop.wav', at: s('details') + 36 + k * 10, vol: 0.38})),
  {file: 'click.wav', at: s('contact') + CLICK_CONTACT, vol: 0.9},
  {file: 'notify.wav', at: s('contact') + CLICK_CONTACT + 30, vol: 0.45},
  {file: 'notify.wav', at: s('contact') + CLICK_CONTACT + 76, vol: 0.5},
  {file: 'pop.wav', at: s('contact') + CLICK_CONTACT + 108, vol: 0.4},
  ...SEARCH_CLICKS.map((c) => ({file: 'click.wav', at: s('search') + c, vol: 0.8})),
  {file: 'success.wav', at: s('search') + SEARCH_CLICKS[3] + 8, vol: 0.4},
  ...[0, 1].map((k) => ({file: 'pop.wav', at: s('trust') + 20 + k * 14, vol: 0.38})),
  {file: 'ding.wav', at: s('trust') + 68, vol: 0.35},
  ...[0, 1, 2].map((k) => ({file: 'pop.wav', at: s('mobile') + 16 + k * 9, vol: 0.32})),
  ...[0, 1, 2, 3].map((k) => ({file: 'pop.wav', at: s('analytics') + 6 + k * 5, vol: 0.28})),
  {file: 'success.wav', at: s('analytics') + 104, vol: 0.4},
  {file: 'swell.wav', at: s('cta') + 18, vol: 0.4},
  {file: 'brand.wav', at: s('cta') + 42, vol: 0.55},
  {file: 'whoosh.wav', at: s('cta') + 80, vol: 0.3},
  {file: 'click.wav', at: s('cta') + CTA_CLICK, vol: 0.9},
];

const musicVolume = (f: number) => interpolate(f, [0, 6, TOTAL - 45, TOTAL], [0.55, 0.75, 0.75, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const RealEstateReel: React.FC = () => {
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
        <LogoBadge />
      </Stage>
      <Audio src={staticFile('audio/music-realestate.wav')} volume={musicVolume} />
      {cues.filter((c) => c.at >= 0).map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={90} layout="none">
          <Audio src={staticFile(`audio/${c.file}`)} volume={(c.vol ?? 0.7) * SFX_GAIN} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
