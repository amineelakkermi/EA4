import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Card} from '../components/Card';
import {Headline, StepNumber} from '../components/Type';
import {ContentEditor} from '../components/ui/ContentEditor';
import {BacklinkNetwork} from '../components/ui/BacklinkNetwork';
import {SAFE, colors} from '../theme';
import {clamp, ease} from '../anim';

const TIP5_AT = 78;

export const Scene06Content: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();
  // when tip 05 arrives, tip 04 recedes slightly
  const recede = interpolate(frame, [TIP5_AT, TIP5_AT + 20], [0, 1], {...clamp, easing: ease.inOut});
  return (
    <Stage>
      <Camera keys={[{frame: 0, scale: 1.0, y: 0}, {frame: TIP5_AT, scale: 1.0, y: 0}, {frame: TIP5_AT + 30, scale: 1.0, y: -40}, {frame: 164, scale: 1.03, y: -60}]}>
        <div
          style={{
            position: 'absolute',
            top: SAFE.top - 10,
            left: SAFE.left,
            right: 1080 - SAFE.right,
            opacity: 1 - recede * 0.35,
            transform: `translateY(${(1 - recede) * 170}px) scale(${1 - recede * 0.04})`,
            transformOrigin: '50% 0%',
          }}
        >
          <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <StepNumber n="04" delay={2} size={120} />
            <Headline text="قدّم محتوى مفيد" delay={8} size={72} />
          </div>
          <div style={{marginTop: 22, perspective: 2000}}>
            <Card delay={14} width={820} radius={30} elevation="card" style={{transform: 'rotateX(3deg)'}}>
              <ContentEditor start={18} width={820} publishAt={62} />
            </Card>
          </div>
        </div>
        <div style={{position: 'absolute', top: 905, left: SAFE.left, right: 1080 - SAFE.right}}>
          <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <StepNumber n="05" delay={TIP5_AT} size={110} />
            <Headline text="احرص على روابط من مواقع موثوقة" delay={TIP5_AT + 6} size={56} color={colors.navy} />
          </div>
          <div style={{marginTop: 20}}>
            <Card delay={TIP5_AT + 12} width={820} radius={30} elevation="float" from="bottom">
              <BacklinkNetwork start={TIP5_AT + 16} width={820} height={440} />
            </Card>
          </div>
        </div>
      </Camera>
    </Stage>
  );
};
