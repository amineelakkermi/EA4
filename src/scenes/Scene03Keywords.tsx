import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Card} from '../components/Card';
import {KeywordPanel} from '../components/ui/KeywordPanel';
import {TargetTray} from '../components/ui/TargetTray';
import {TipHeader} from './TipHeader';

const START = 14;

export const Scene03Keywords: React.FC = () => (
  <Stage>
    <Camera keys={[{frame: 0, scale: 1.0, x: 0}, {frame: 134, scale: 1.05, x: -16, y: -20}]}>
      <TipHeader n="01" title="استخدم الكلمات المناسبة" body="استهدف الكلمات اللي يبحث عنها عملاؤك فعلًا." delay={4} />
      <AbsoluteFill style={{perspective: 2200}}>
        <div style={{position: 'absolute', top: 680, left: 90, transform: 'rotateY(6deg) rotateX(3deg)', transformStyle: 'preserve-3d'}}>
          <Card delay={12} width={900} radius={34} elevation="float" from="right">
            <KeywordPanel start={START} width={900} />
          </Card>
        </div>
        <div style={{position: 'absolute', top: 1310, left: 150, transform: 'rotateY(6deg) rotateX(3deg) translateZ(60px)', transformStyle: 'preserve-3d'}}>
          <Card delay={START + 58} width={780} radius={28} elevation="float" from="top">
            <TargetTray start={START + 64} items={['تصميم مواقع الرياض', 'شركة تصميم مواقع', 'تصميم متجر إلكتروني']} width={780} />
          </Card>
        </div>
      </AbsoluteFill>
    </Camera>
  </Stage>
);
