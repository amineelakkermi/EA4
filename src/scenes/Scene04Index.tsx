import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Card} from '../components/Card';
import {BrowserFrame} from '../components/Devices';
import {SearchConsole} from '../components/ui/SearchConsole';
import {TipHeader} from './TipHeader';

export const Scene04Index: React.FC = () => (
  <Stage>
    <Camera keys={[{frame: 0, scale: 1.0}, {frame: 134, scale: 1.06, y: -30}]}>
      <TipHeader n="02" title="تأكد من فهرسة موقعك" body="استخدم Google Search Console وتحقق من صفحات موقعك." delay={4} />
      <AbsoluteFill style={{perspective: 2200}}>
        <div style={{position: 'absolute', top: 700, left: 90, transform: 'rotateY(-5deg) rotateX(3deg)', transformStyle: 'preserve-3d'}}>
          <Card delay={12} width={900} radius={34} elevation="float" from="left">
            <BrowserFrame url="search.google.com/search-console" barHeight={60}>
              <SearchConsole start={16} width={900} />
            </BrowserFrame>
          </Card>
        </div>
      </AbsoluteFill>
    </Camera>
  </Stage>
);
