import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Fade} from '../components/Fade';
import {palette, scene} from '../config';
import {clamp, sp, springs} from '../../anim';

const SC = scene('outro');

/** 37.5–39.5 s: official Webnest Studio logo, untouched, centred on the bright stage */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, 2, springs.gentle);
  const halo = interpolate(frame, [4, 40], [0, 1], {...clamp});
  return (
    <Fade duration={SC.duration} inF={6} outF={1}>
      <AbsoluteFill style={{display: 'grid', placeItems: 'center'}}>
        <div style={{position: 'absolute', width: 900, height: 900, borderRadius: '50%', background: `radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0) 70%)`, opacity: halo}} />
        <div style={{position: 'absolute', width: 760 + 60 * halo, height: 760 + 60 * halo, borderRadius: '50%', border: `1px solid ${palette.line}`, opacity: halo}} />
        <Img src={staticFile('img/webnest-logo.png')} style={{width: 660, transform: `scale(${0.86 + 0.14 * p})`, opacity: Math.min(1, p * 1.5), filter: 'drop-shadow(0 30px 50px rgba(7,19,39,0.18))'}} />
      </AbsoluteFill>
    </Fade>
  );
};
