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
import {DevinReel} from './devin/DevinReel';
import {TOTAL as DV_TOTAL} from './devin/config';
import {RealEstateReel} from './realestate/RealEstateReel';
import {TOTAL as RE_TOTAL} from './realestate/config';
import {JayekReel} from './jayek/JayekReel';
import {TOTAL as JK_TOTAL, W as JK_W, H as JK_H} from './jayek/config';
import {CyberReel} from './cyber/CyberReel';
import {TOTAL as CY_TOTAL} from './cyber/config';

export const Root: React.FC = () => (
  <>
    <Composition id="EA4SeoReel" component={SeoReel} durationInFrames={TOTAL} fps={FPS} width={W} height={H} defaultProps={{lang: 'ar' as const}} />
    <Composition id="EA4SeoReelFR" component={SeoReel} durationInFrames={TOTAL} fps={FPS} width={W} height={H} defaultProps={{lang: 'fr' as const}} />
    <Composition id="EA4ThreeSecondTest" component={ThreeSecondReel} durationInFrames={TST_TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="WebnestSpeedReel" component={WebnestReel} durationInFrames={WN_TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="EA4LostClientsFR" component={LostClientsReel} durationInFrames={LC_TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="DevinCreatorsReel" component={DevinReel} durationInFrames={DV_TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="EA4RealEstateLeadsReel" component={RealEstateReel} durationInFrames={RE_TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="EA4CyberSecurityReel" component={CyberReel} durationInFrames={CY_TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="JayekShowcaseX" component={JayekReel} durationInFrames={JK_TOTAL} fps={FPS} width={JK_W} height={JK_H} />
  </>
);
