import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Card} from '../components/Card';
import {Headline, Body} from '../components/Type';
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
          {frame: 70, scale: 1.03, y: -10, rotX: 0},
          {frame: 127, scale: 1.1, y: -60, rotX: 0},
        ]}
      >
        <div style={{position: 'absolute', top: SAFE.top - 20, left: SAFE.left, right: 1080 - SAFE.right}}>
          <Headline text="عندك موقع إلكتروني،" delay={2} size={78} />
          <div style={{height: 14}} />
          <Headline
            text="لكن ما يطلع في نتائج قوقل؟"
            delay={14}
            size={70}
            color={colors.navySoft}
            highlight={['قوقل']}
            accent={colors.blue}
          />
          <Body text="خلّني أوضح لك وش ممكن يكون السبب." delay={84} size={42} style={{marginTop: 22}} />
        </div>
        <AbsoluteFill style={{perspective: 2000}}>
          <div
            style={{
              position: 'absolute',
              top: 690,
              left: 100,
              transform: `rotateX(${8 - punch * 4}deg) rotateY(${-6 + punch * 3}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <Card delay={6} width={880} radius={34} elevation="float">
              <BrowserFrame url="google.com/search?q=تصميم+مواقع+الرياض">
                <SearchPage typeStart={18} query="تصميم مواقع الرياض" resultsAt={50} ghostAt={74} width={880} />
              </BrowserFrame>
            </Card>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};
