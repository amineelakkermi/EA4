import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Caption, TopCopy} from '../components/Caption';
import {CauseCard} from '../components/Causes';
import {Fade} from '../components/Fade';
import {COPY} from '../copy';
import {scene} from '../config';

const SC = scene('causes');
export const CAUSES = {b: 82, cards: [88, 172, 256]} as const;
const Y = [700, 980, 1260];

/** 13–24 s: it's rarely the design — one giant image, unoptimised code, a slow server */
export const Causes: React.FC = () => {
  const frame = useCurrentFrame();
  const active = CAUSES.cards.filter((f) => frame >= f).length - 1;
  return (
    <Fade duration={SC.duration}>
      <TopCopy y={210}>
        <Caption text={COPY.causes.a} delay={4} size={58} exit={74} />
        {frame >= 78 && (
          <Caption
            text={COPY.causes.b}
            delay={CAUSES.b}
            size={52}
            stagger={1.6}
            groups={COPY.causes.groups.map((words, i) => ({words, at: CAUSES.cards[i] + 4}))}
          />
        )}
      </TopCopy>
      {CAUSES.cards.map((at, i) => frame >= at - 2 && <CauseCard key={i} index={i} at={at} active={active === i} y={Y[i]} />)}
    </Fade>
  );
};
