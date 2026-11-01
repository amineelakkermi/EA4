import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {QueryToArticle} from '../components/ui/QueryToArticle';
import {TipHeader} from './TipHeader';

export const Scene03Intent: React.FC = () => (
  <Stage>
    <Camera keys={[{frame: 0, scale: 1.0}, {frame: 80, scale: 1.0}, {frame: 194, scale: 1.05, y: -40}]}>
      <TipHeader
        n="02"
        title="اكتب محتوى يجاوب فعلًا على أسئلة عملائك."
        body="لا تكتفي بتكرار الكلمات المفتاحية؛ قدّم معلومات مفيدة وواضحة."
        delay={4}
      />
      <AbsoluteFill style={{perspective: 2200}}>
        <div style={{position: 'absolute', top: 690, left: 90, width: 900}}>
          <QueryToArticle start={14} width={900} />
        </div>
      </AbsoluteFill>
    </Camera>
  </Stage>
);
