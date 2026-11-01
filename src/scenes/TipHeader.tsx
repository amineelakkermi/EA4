import React from 'react';
import {Headline, Body, StepNumber} from '../components/Type';
import {colors, SAFE} from '../theme';

/** Shared header for tip scenes: big gold step number + headline + supporting line */
export const TipHeader: React.FC<{
  n: string;
  title: string;
  body: string;
  delay?: number;
  titleSize?: number;
  top?: number;
  exit?: number;
}> = ({n, title, body, delay = 0, titleSize = 78, top = SAFE.top, exit}) => (
  <div
    dir="rtl"
    style={{
      position: 'absolute',
      top,
      right: SAFE.right === 900 ? 180 : 1080 - SAFE.right,
      left: SAFE.left,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}
  >
    <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 28}}>
      <StepNumber n={n} delay={delay} size={150} />
      <div style={{flex: 1}}>
        <Headline text={title} delay={delay + 6} size={titleSize} exit={exit} />
      </div>
    </div>
    <Body text={body} delay={delay + 18} size={40} exit={exit} style={{paddingRight: 8}} />
    <div
      style={{
        height: 4,
        width: 120,
        background: colors.gold,
        borderRadius: 99,
        alignSelf: 'flex-start',
        marginTop: 4,
        opacity: 0.9,
      }}
    />
  </div>
);
