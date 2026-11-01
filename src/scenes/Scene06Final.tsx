import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Stage} from '../components/Stage';
import {Camera} from '../components/Camera';
import {Headline, Body} from '../components/Type';
import {colors, fonts, SAFE, shadow} from '../theme';
import {clamp, ease, sp, springs} from '../anim';

export const LOGO_AT = 96;

/** Gentle upward curve: visibility improves gradually, no "#1" promise */
const PatienceChart: React.FC<{start: number; width: number}> = ({start, width}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(frame, fps, start, springs.smooth);
  const draw = interpolate(frame, [start + 10, start + 70], [0, 1], {...clamp, easing: ease.inOut});
  const w = width - 68;
  const h = 300;
  const pts = Array.from({length: 7}, (_, i) => {
    const x = (i / 6) * w;
    const t = i / 6;
    const y = h - 30 - Math.pow(t, 1.6) * (h - 80) - Math.sin(t * 9) * 8;
    return [x, y];
  });
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const L = 1400;
  const months = ['الشهر 1', '2', '3', '4', '5', '6'];
  return (
    <div
      dir="rtl"
      style={{
        width,
        borderRadius: 30,
        background: colors.surface,
        boxShadow: shadow.float,
        padding: '28px 34px',
        fontFamily: fonts.arabic,
        opacity: Math.min(1, p * 1.5),
        transform: `translateY(${(1 - p) * 70}px)`,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{fontSize: 24, fontWeight: 700, color: colors.navy}}>الظهور يتحسّن تدريجيًا مع الاستمرار</div>
        <div style={{fontSize: 18, fontWeight: 600, color: colors.gold, background: colors.goldSoft, padding: '6px 14px', borderRadius: 99}}>بدون ضمان للمركز الأول</div>
      </div>
      <div style={{position: 'relative', height: h, marginTop: 16, direction: 'ltr'}}>
        <svg width={w} height={h} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          {[0.25, 0.5, 0.75, 1].map((g) => (
            <line key={g} x1={0} x2={w} y1={h - 30 - g * (h - 80)} y2={h - 30 - g * (h - 80)} stroke={colors.line} strokeDasharray="4 8" />
          ))}
          <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#fill)" opacity={draw * 0.9} />
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.blue} stopOpacity="0.18" />
              <stop offset="100%" stopColor={colors.blue} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={d} fill="none" stroke={colors.blue} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${L * draw} ${L}`} />
          {draw > 0.98 && <circle cx={pts[6][0]} cy={pts[6][1]} r={10} fill={colors.gold} stroke="#fff" strokeWidth={4} />}
        </svg>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: -4, display: 'flex', justifyContent: 'space-between', fontSize: 17, color: colors.muted, fontFamily: fonts.arabic}}>
          {months.map((m) => (
            <div key={m}>{m}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Scene06Final: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const leave = interpolate(frame, [LOGO_AT - 14, LOGO_AT + 6], [0, 1], {...clamp, easing: ease.in});
  const logoReveal = interpolate(frame, [LOGO_AT + 14, LOGO_AT + 48], [0, 1], {...clamp, easing: ease.inOut});
  const logoRise = sp(frame, fps, LOGO_AT + 14, springs.gentle);
  const url = sp(frame, fps, LOGO_AT + 58, springs.smooth);
  const lines = interpolate(frame, [LOGO_AT + 40, LOGO_AT + 80], [0, 1], {...clamp, easing: ease.inOut});
  const logoW = 760;
  const logoH = logoW * (574 / 790);
  return (
    <Stage>
      <Camera keys={[{frame: 0, scale: 1.0}, {frame: LOGO_AT, scale: 1.0}, {frame: 187, scale: 1.03}]}>
        {/* Part A: honest reminder */}
        <div style={{position: 'absolute', top: SAFE.top, left: SAFE.left, right: 1080 - SAFE.right, opacity: 1 - leave, transform: `translateY(${-leave * 60}px)`}}>
          <Headline text="تذكّر: تحسين SEO يحتاج وقت واستمرار،" delay={4} size={66} highlight={['SEO']} accent={colors.blue} />
          <Headline text="وما فيه ضمان للظهور في المركز الأول." delay={22} size={58} color={colors.navySoft} style={{marginTop: 12}} />
        </div>
        <div style={{position: 'absolute', top: 760, left: 90, opacity: 1 - leave, transform: `translateY(${leave * 120}px) scale(${1 - leave * 0.06})`}}>
          <PatienceChart start={26} width={900} />
        </div>

        {/* Part B: brand reveal */}
        <AbsoluteFill style={{alignItems: 'center', pointerEvents: 'none'}}>
          <div style={{position: 'absolute', top: 400, left: SAFE.left, right: SAFE.left}}>
            <Headline text="خلّ حضورك الرقمي يعكس احترافك." delay={LOGO_AT + 2} size={64} align="center" />
          </div>
          {[-1, 1].map((side) => (
            <div
              key={side}
              style={{
                position: 'absolute',
                top: 975 + side * 445,
                left: side < 0 ? 0 : undefined,
                right: side > 0 ? 0 : undefined,
                width: `${lines * 100}%`,
                height: 3,
                background: side < 0 ? `linear-gradient(90deg, transparent, ${colors.blue})` : `linear-gradient(270deg, transparent, ${colors.gold})`,
                opacity: 0.75,
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              top: 975 - logoH / 2,
              width: logoW,
              height: logoH,
              transform: `translateY(${(1 - logoRise) * 50}px)`,
              clipPath: `inset(-5% ${(1 - logoReveal) * 100}% -5% -5%)`,
              filter: `drop-shadow(0 30px 40px rgba(11,27,58,${0.18 * logoReveal}))`,
            }}
          >
            <Img src={staticFile('img/ea4-logo-full.png')} style={{width: logoW, height: logoH, display: 'block'}} />
            {/* light sweep following the reveal edge */}
            <div
              style={{
                position: 'absolute',
                top: -20,
                bottom: -20,
                right: `${(1 - logoReveal) * 100}%`,
                width: 60,
                marginRight: -30,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
                opacity: logoReveal > 0 && logoReveal < 1 ? 1 : 0,
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              top: 975 + logoH / 2 + 60,
              fontFamily: fonts.latin,
              fontSize: 34,
              fontWeight: 600,
              color: '#fff',
              background: colors.blue,
              padding: '18px 46px',
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
