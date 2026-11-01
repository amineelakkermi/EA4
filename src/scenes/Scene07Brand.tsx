import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Headline, Body} from '../components/Type';
import {Laptop, Phone, BrowserFrame} from '../components/Devices';
import {SiteMockup} from '../components/ui/SiteMockup';
import {colors, fonts, SAFE} from '../theme';
import {clamp, ease, sp, springs} from '../anim';

const LOGO_AT = 112;

export const Scene07Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const devices = sp(frame, fps, 12, springs.smooth);
  // devices sink and text leaves to make room for the brand moment
  const leave = interpolate(frame, [LOGO_AT - 16, LOGO_AT + 6], [0, 1], {...clamp, easing: ease.in});
  const ring = interpolate(frame, [LOGO_AT, LOGO_AT + 36], [0, 1], {...clamp, easing: ease.inOut});
  const logoClip = interpolate(frame, [LOGO_AT + 10, LOGO_AT + 40], [0, 1], {...clamp, easing: ease.out});
  const tag = sp(frame, fps, LOGO_AT + 44, springs.smooth);
  const url = sp(frame, fps, LOGO_AT + 62, springs.smooth);
  const lines = interpolate(frame, [LOGO_AT + 30, LOGO_AT + 70], [0, 1], {...clamp, easing: ease.inOut});
  const lapW = 720;
  const lapH = lapW * 0.62 - lapW * 0.018 * 2.2;
  const phoneW = 270;
  const R = 2 * Math.PI * 190;
  const logoSize = 460;
  const disc = sp(frame, fps, LOGO_AT - 4, springs.smooth);
  return (
    <Stage>
      <Camera keys={[{frame: 0, scale: 1.0}, {frame: LOGO_AT, scale: 1.0}, {frame: 247, scale: 1.04}]}>
        {/* Part A: closing message + mockup */}
        <div style={{position: 'absolute', top: SAFE.top + 20, left: SAFE.left, right: 1080 - SAFE.right, opacity: 1 - leave, transform: `translateY(${-leave * 60}px)`}}>
          <Headline text="خلّ عملاءك يلقونك بسهولة." delay={4} size={92} align="right" />
          <Body text="اهتم بظهور موقعك، وابدأ طوّر حضورك الرقمي." delay={26} size={42} style={{marginTop: 18}} />
        </div>
        <AbsoluteFill
          style={{
            perspective: 2400,
            opacity: Math.min(1, devices * 1.5) * (1 - leave),
            transform: `translateY(${(1 - devices) * 120 + leave * 160}px) scale(${1 - leave * 0.08})`,
          }}
        >
          <div style={{position: 'absolute', top: 820, left: 90, transform: 'rotateY(12deg) rotateX(4deg)', transformStyle: 'preserve-3d'}}>
            <Laptop width={lapW}>
              <BrowserFrame url="ea-4.vercel.app" barHeight={38}>
                <SiteMockup width={lapW - 26} height={lapH} loadedAt={20} stagger={3} skeleton={false} />
              </BrowserFrame>
            </Laptop>
          </div>
          <div style={{position: 'absolute', top: 960, left: 650, transform: 'rotateY(-10deg) rotateX(2deg)', transformStyle: 'preserve-3d'}}>
            <Phone width={phoneW}>
              <div style={{paddingTop: phoneW * 0.16}}>
                <SiteMockup width={phoneW - phoneW * 0.07} height={phoneW * 1.75} mobile loadedAt={30} stagger={3} skeleton={false} />
              </div>
            </Phone>
          </div>
        </AbsoluteFill>

        {/* Part B: brand reveal */}
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
          {/* blue & gold sweeping lines */}
          {[-1, 1].map((side) => (
            <div
              key={side}
              style={{
                position: 'absolute',
                top: 740 + side * 430,
                left: side < 0 ? 0 : undefined,
                right: side > 0 ? 0 : undefined,
                width: `${lines * 100}%`,
                height: 3,
                background: side < 0 ? `linear-gradient(90deg, transparent, ${colors.blue})` : `linear-gradient(270deg, transparent, ${colors.gold})`,
                opacity: 0.8,
              }}
            />
          ))}
          <div style={{position: 'relative', width: logoSize, height: logoSize, marginTop: -220}}>
            {/* white disc rises behind the mark */}
            <div
              style={{
                position: 'absolute',
                inset: logoSize * 0.09,
                borderRadius: 999,
                background: colors.surface,
                boxShadow: '0 40px 80px -30px rgba(11,27,58,0.35), 0 0 0 1px rgba(11,27,58,0.04)',
                transform: `scale(${disc})`,
              }}
            />
            <svg width={logoSize} height={logoSize} viewBox="0 0 400 400" style={{position: 'absolute', inset: 0}}>
              <circle
                cx="200"
                cy="200"
                r="190"
                fill="none"
                stroke={colors.gold}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${R * ring} ${R}`}
                transform="rotate(-90 200 200)"
                opacity={ring > 0 ? 1 : 0}
              />
              <circle cx="200" cy="200" r="190" fill="none" stroke={colors.blue} strokeWidth="1.5" opacity={0.25 * ring} />
            </svg>
            <Img
              src={staticFile('img/ea4-logo.png')}
              style={{
                position: 'absolute',
                inset: 0,
                width: logoSize,
                height: logoSize,
                clipPath: `circle(${logoClip * 44}% at 50% 50%)`,
                filter: 'invert(10%) sepia(40%) saturate(900%) hue-rotate(195deg) brightness(70%)',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: fonts.latin,
              fontSize: 34,
              fontWeight: 500,
              letterSpacing: 6,
              color: colors.navySoft,
              marginTop: -10,
              opacity: Math.min(1, tag * 1.5),
              transform: `translateY(${(1 - tag) * 24}px)`,
              textTransform: 'uppercase',
            }}
          >
            Web Developer &amp; Designer
          </div>
          <div
            style={{
              marginTop: 44,
              fontFamily: fonts.latin,
              fontSize: 34,
              fontWeight: 600,
              color: '#fff',
              background: colors.blue,
              padding: '18px 44px',
              borderRadius: 99,
              boxShadow: '0 24px 50px -20px rgba(30,44,251,0.55)',
              opacity: Math.min(1, url * 1.5),
              transform: `translateY(${(1 - url) * 30}px) scale(${0.9 + url * 0.1})`,
              direction: 'ltr',
            }}
          >
            ea-4.vercel.app
          </div>
        </AbsoluteFill>
      </Camera>
    </Stage>
  );
};
