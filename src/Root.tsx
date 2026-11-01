import React from 'react';
import {Composition} from 'remotion';
import {SeoReel, TOTAL} from './SeoReel';
import {FPS, W, H} from './theme';

export const Root: React.FC = () => (
  <>
    <Composition id="EA4SeoReel" component={SeoReel} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
  </>
);
