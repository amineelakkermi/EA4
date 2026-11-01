import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Card} from '../components/Card';
import {BrowserFrame} from '../components/Devices';
import {SearchConsole} from '../components/ui/SearchConsole';
import {TipHeader} from './TipHeader';

export const SC_START = 16;
export const SC_REQUEST_AT = 130;

export const Scene02Indexing: React.FC = () => (
  <Stage>
    <Camera keys={[{frame: 0, scale: 1.0}, {frame: 194, scale: 1.06, y: -30}]}>
      <TipHeader
        n="01"
        title="تأكد إن قوقل فهرس صفحات موقعك."
        body="استخدم Google Search Console، وافحص الصفحات اللي ما ظهرت في نتائج البحث."
        delay={4}
      />
      <AbsoluteFill style={{perspective: 2200}}>
        <div style={{position: 'absolute', top: 690, left: 90, transform: 'rotateY(-5deg) rotateX(3deg)', transformStyle: 'preserve-3d'}}>
          <Card delay={12} width={900} radius={34} elevation="float" from="left">
            <BrowserFrame url="search.google.com/search-console" barHeight={60}>
              <SearchConsole start={SC_START} width={900} requestAt={SC_REQUEST_AT} />
            </BrowserFrame>
          </Card>
        </div>
      </AbsoluteFill>
    </Camera>
  </Stage>
);
