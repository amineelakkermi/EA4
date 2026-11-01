import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {TechSeoPanel} from '../components/ui/TechSeoPanel';
import {TipHeader} from './TipHeader';

export const TECH_START = 16;
export const TECH_FIX_AT = 166;

export const Scene04Technical: React.FC = () => (
  <Stage>
    <Camera keys={[{frame: 0, scale: 1.0}, {frame: 120, scale: 1.02, y: -10}, {frame: 194, scale: 1.06, y: -50}]}>
      <TipHeader
        n="03"
        title="اكتب عنوان واضح لكل صفحة، واستخدم وصف مناسب."
        body="وتأكد إن موقعك ما يمنع محركات البحث من الوصول لصفحاتك."
        delay={4}
      />
      <AbsoluteFill style={{perspective: 2200}}>
        <div style={{position: 'absolute', top: 700, left: 90, width: 900}}>
          <TechSeoPanel start={TECH_START} fixAt={TECH_FIX_AT} width={900} />
        </div>
      </AbsoluteFill>
    </Camera>
  </Stage>
);
