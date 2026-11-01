import React from 'react';
import {Headline, Body, StepNumber} from '../components/Type';
import {colors, SAFE} from '../theme';
import {useLang} from '../i18n';

/** Shared header for tip scenes: big gold step number + headline + optional supporting line */
export const TipHeader: React.FC<{
  n: string;
  title: string;
  body?: string;
  delay?: number;
  titleSize?: number;
  bodySize?: number;
  top?: number;
  exit?: number;
}> = ({n, title, body, delay = 0, titleSize = 62, bodySize = 38, top = SAFE.top, exit}) => {
  const {dir, k} = useLang();
  return (
    <div
      dir={dir}
      style={{
        position: 'absolute',
        top,
        right: 1080 - SAFE.right,
        left: SAFE.left,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div dir={dir} style={{display: 'flex', alignItems: 'flex-start', gap: 24}}>
        <StepNumber n={n} delay={delay} size={130} />
        <div style={{flex: 1, paddingTop: 10}}>
          <Headline text={title} delay={delay + 6} size={titleSize * k} exit={exit} lineHeight={1.32} />
        </div>
      </div>
      {body ? <Body text={body} delay={delay + 20} size={bodySize * k} exit={exit} style={{paddingInlineStart: 8}} /> : null}
      <div
        style={{
          height: 4,
          width: 120,
          background: colors.gold,
          borderRadius: 99,
          alignSelf: 'flex-start',
          marginTop: 2,
          opacity: 0.9,
        }}
      />
    </div>
  );
};
