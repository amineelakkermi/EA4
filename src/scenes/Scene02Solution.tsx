import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Card} from '../components/Card';
import {Headline} from '../components/Type';
import {Dashboard} from '../components/ui/Dashboard';
import {SAFE, colors, fonts} from '../theme';
import {sp, springs} from '../anim';

export const Scene02Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <Stage>
      <Camera keys={[{frame: 0, scale: 1.06, y: 20}, {frame: 104, scale: 1.0, y: 0}]}>
        <div style={{position: 'absolute', top: SAFE.top, left: SAFE.left, right: 1080 - SAFE.right}}>
          <Headline
            text="خلّني أعطيك 5 نصائح تساعدك تحسّن ظهوره!"
            delay={4}
            size={82}
            highlight={['5']}
            accent={colors.gold}
          />
          <div dir="rtl" style={{display: 'flex', gap: 14, marginTop: 36}}>
            {['01', '02', '03', '04', '05'].map((n, i) => {
              const p = sp(frame, fps, 40 + i * 4, springs.snappy);
              return (
                <div
                  key={n}
                  style={{
                    fontFamily: fonts.latin,
                    fontWeight: 700,
                    fontSize: 30,
                    color: i === 0 ? '#fff' : colors.navy,
                    background: i === 0 ? colors.navy : colors.surface,
                    boxShadow: '0 10px 24px -12px rgba(11,27,58,0.25), 0 0 0 1px rgba(11,27,58,0.05)',
                    width: 92,
                    height: 72,
                    borderRadius: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: Math.min(1, p * 1.5),
                    transform: `translateY(${(1 - p) * 30}px)`,
                  }}
                >
                  {n}
                </div>
              );
            })}
          </div>
        </div>
        <AbsoluteFill style={{perspective: 2200}}>
          <div style={{position: 'absolute', top: 690, left: 90, transformStyle: 'preserve-3d', transform: 'rotateY(-7deg) rotateX(4deg)'}}>
            <Card delay={10} width={900} radius={34} elevation="float">
              <Dashboard start={16} width={900} />
            </Card>
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};
