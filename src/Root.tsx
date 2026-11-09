import React from 'react';
import {Composition} from 'remotion';
import {SeoReel, TOTAL} from './SeoReel';
import {FPS, W, H} from './theme';
import {ThreeSecondReel} from './three-second/ThreeSecondReel';
import {TOTAL as TST_TOTAL} from './three-second/config';
import {WebnestReel} from './webnest/WebnestReel';
import {TOTAL as WN_TOTAL} from './webnest/config';
import {LostClientsReel} from './lost/LostClientsReel';
import {TOTAL as LC_TOTAL} from './lost/config';

export const Root: React.FC = () => (
  <>
    <Composition id="EA4SeoReel" component={SeoReel} durationInFrames={TOTAL} fps={FPS} width={W} height={H} defaultProps={{lang: 'ar' as const}} />
    <Composition id="EA4SeoReelFR" component={SeoReel} durationInFrames={TOTAL} fps={FPS} width={W} height={H} defaultProps={{lang: 'fr' as const}} />
    <Composition id="EA4ThreeSecondTest" component={ThreeSecondReel} durationInFrames={TST_TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="WebnestSpeedReel" component={WebnestReel} durationInFrames={WN_TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="EA4LostClientsFR" component={LostClientsReel} durationInFrames={LC_TOTAL} fps={FPS} width={W} height={H} />
  </>
);
