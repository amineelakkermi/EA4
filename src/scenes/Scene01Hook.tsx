import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Card} from '../components/Card';
import {Headline} from '../components/Type';
import {BrowserFrame} from '../components/Devices';
import {SearchPage} from '../components/ui/SearchPage';
import {SAFE, colors} from '../theme';
import {clamp, ease} from '../anim';

export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  // dramatic push-in once the ghost slot appears
  const punch = interpolate(frame, [70, 100], [0, 1], {...clamp, easing: ease.inOut});
  return (
    <Stage>
      <Camera
        keys={[
          {frame: 0, scale: 1.0, y: 0, rotX: 0},
          {frame: 70, scale: 1.04, y: -10, rotX: 0},
          {frame: 127, scale: 1.12, y: -70, rotX: 0},
        ]}
      >
        <div style={{position: 'absolute', top: SAFE.top, left: SAFE.left, right: 1080 - SAFE.right}}>
          <Headline text="عندك موقع إلكتروني؟" delay={2} size={86} />
          <div style={{height: 22}} />
          <Headline
            text="لكن ما يظهر في نتائج قوقل؟"
            delay={64}
            size={74}
            color={colors.navySoft}
            highlight={['قوقل']}
            accent={colors.blue}
          />
        </div>
        <AbsoluteFill style={{perspective: 2000}}>
          <div
            style={{
              position: 'absolute',
              top: 700,
              left: 100,
              transform: `rotateX(${8 - punch * 4}deg) rotateY(${-6 + punch * 3}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <Card delay={6} width={880} radius={34} elevation="float">
              <BrowserFrame url="google.com/search?q=تصميم+مواقع+الرياض">
                <SearchPage typeStart={18} query="تصميم مواقع الرياض" resultsAt={50} ghostAt={76} width={880} />
              </BrowserFrame>
            </Card>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};
