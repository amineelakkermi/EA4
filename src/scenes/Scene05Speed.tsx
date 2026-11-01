import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Laptop, Phone, BrowserFrame} from '../components/Devices';
import {SiteMockup} from '../components/ui/SiteMockup';
import {TipHeader} from './TipHeader';
import {colors, fonts} from '../theme';
import {clamp, ease, sp, springs} from '../anim';
import {BoltIcon} from '../components/Icons';
import {useLang} from '../i18n';

export const WIPE_AT = 64;

/** Slow (skeleton + spinner) devices get swept by a blue light wipe into the fast, loaded version */
export const Scene05Speed: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {t, dir, k} = useLang();
  const enter = sp(frame, fps, 10, springs.smooth);
  const wipe = interpolate(frame, [WIPE_AT, WIPE_AT + 26], [0, 1], {
    ...clamp,
    easing: ease.inOut,
  });
  const lapW = 700;
  const lapH = lapW * 0.62 - lapW * 0.018 * 2.2;
  const phoneW = 250;
  const slowBar = interpolate(frame, [12, WIPE_AT], [0.04, 0.32], {...clamp});
  const fastBar = interpolate(frame, [WIPE_AT + 4, WIPE_AT + 20], [0, 1], {
    ...clamp,
    easing: ease.out,
  });

  const Devices: React.FC<{fast: boolean}> = ({fast}) => (
    <div
      style={{
        position: 'absolute',
        top: 700,
        left: 80,
        width: 1000,
        height: 760,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 40,
          transform: 'rotateY(10deg) rotateX(3deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <Laptop width={lapW}>
          <BrowserFrame url="ea-4.vercel.app" barHeight={40}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: colors.line,
              }}
            >
              <div
                style={{
                  width: `${(fast ? fastBar : slowBar) * 100}%`,
                  height: '100%',
                  background: fast ? colors.green : colors.red,
                }}
              />
            </div>
            <SiteMockup width={lapW - 28} height={lapH} loadedAt={fast ? WIPE_AT + 2 : Infinity} stagger={2} />
          </BrowserFrame>
        </Laptop>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 690,
          top: 200,
          transform: 'rotateY(-8deg) rotateX(2deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <Phone width={phoneW}>
          <div style={{paddingTop: phoneW * 0.16}}>
            <SiteMockup width={phoneW - phoneW * 0.07} height={phoneW * 1.75} mobile loadedAt={fast ? WIPE_AT + 6 : Infinity} stagger={2} />
          </div>
        </Phone>
      </div>
      {/* status badge */}
      <div
        dir={dir}
        style={{
          position: 'absolute',
          left: 60,
          top: -40,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: fonts.arabic,
          fontSize: 30 * k,
          fontWeight: 700,
          color: fast ? colors.green : colors.red,
          background: fast ? colors.greenSoft : colors.redSoft,
          padding: '12px 26px',
          borderRadius: 99,
          boxShadow: '0 14px 30px -14px rgba(11,27,58,0.25)',
        }}
      >
        {fast ? (
          <BoltIcon size={30} color={colors.green} />
        ) : (
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 99,
              border: `3px solid ${colors.redSoft}`,
              borderTopColor: colors.red,
              transform: `rotate(${frame * 18}deg)`,
            }}
          />
        )}
        {fast ? t.spFast : t.spSlow}
      </div>
    </div>
  );

  return (
    <Stage>
      <Camera
        keys={[
          {frame: 0, scale: 1.0},
          {frame: WIPE_AT, scale: 1.02},
          {frame: 164, scale: 1.08, y: -30},
        ]}
      >
        <TipHeader n="04" title={t.t4Title} delay={4} titleSize={58} />
        <AbsoluteFill
          style={{
            perspective: 2400,
            opacity: Math.min(1, enter * 1.5),
            transform: `translateY(${(1 - enter) * 80}px)`,
          }}
        >
          <Devices fast={false} />
          <AbsoluteFill style={{clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`}}>
            <Devices fast />
          </AbsoluteFill>
          {/* light edge */}
          {wipe > 0 && wipe < 1 && (
            <div
              style={{
                position: 'absolute',
                top: 680,
                bottom: 300,
                left: `${wipe * 100}%`,
                width: 6,
                marginLeft: -3,
                background: `linear-gradient(180deg, transparent, ${colors.blue}, ${colors.gold}, transparent)`,
                boxShadow: `0 0 40px 10px rgba(30,44,251,0.25)`,
              }}
            />
          )}
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};
