import React from 'react';
import {AbsoluteFill} from 'remotion';
import type {TransitionPresentation, TransitionPresentationComponentProps} from '@remotion/transitions';

type Props = Record<string, never>;

const Iris: React.FC<TransitionPresentationComponentProps<Props>> = ({children, presentationDirection, presentationProgress}) => {
  const isEntering = presentationDirection === 'entering';
  const r = presentationProgress * 120;
  return (
    <AbsoluteFill style={isEntering ? {clipPath: `circle(${r}% at 50% 50%)`} : undefined}>
      {children}
    </AbsoluteFill>
  );
};

/** Circular mask growing from the centre: used for the brand reveal */
export const iris = (): TransitionPresentation<Props> => ({component: Iris, props: {} as Props});
