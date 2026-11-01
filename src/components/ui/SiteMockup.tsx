import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {colors, fonts} from '../../theme';
import {sp, springs, clamp, ease} from '../../anim';
import {Line} from './Typed';

/**
 * Stylised EA4 website in the navy / blue / gold palette.
 * `loadedAt` controls a staged content load (hero → cards), so the same
 * component can act as "slow" (skeleton + spinner) or "fast" (instant).
 */
export const SiteMockup: React.FC<{
  width: number;
  height: number;
  mobile?: boolean;
  loadedAt?: number; // frame at which content appears; Infinity = never
  stagger?: number;
  skeleton?: boolean;
}> = ({width, height, mobile = false, loadedAt = 0, stagger = 3, skeleton = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = width / (mobile ? 360 : 900);
  const loaded = (d = 0) => (Number.isFinite(loadedAt) ? sp(frame, fps, loadedAt + d, springs.smooth) : 0);
  const hero = loaded(0);
  const block = (i: number) => loaded(stagger * (i + 2));
  const pad = (mobile ? 22 : 40) * s;
  const spin = (frame * 20) % 360;
  return (
    <div
      dir="rtl"
      style={{
        width,
        height,
        background: colors.surface,
        fontFamily: fonts.arabic,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* nav */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `${pad * 0.7}px ${pad}px`,
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 10 * s}}>
          <div
            style={{
              width: 34 * s,
              height: 34 * s,
              borderRadius: 99,
              border: `${2.5 * s}px solid ${colors.navy}`,
              borderLeftColor: 'transparent',
            }}
          />
          <div style={{fontFamily: fonts.latin, fontWeight: 600, fontSize: 22 * s, color: colors.navy, letterSpacing: 1}}>EA4</div>
        </div>
        {!mobile && (
          <div style={{display: 'flex', gap: 28 * s}}>
            {['الرئيسية', 'خدماتنا', 'أعمالنا', 'تواصل'].map((t) => (
              <div key={t} style={{fontSize: 18 * s, fontWeight: 600, color: colors.muted}}>
                {t}
              </div>
            ))}
          </div>
        )}
        <div
          style={{
            fontSize: 17 * s,
            fontWeight: 700,
            color: '#fff',
            background: colors.blue,
            padding: `${8 * s}px ${18 * s}px`,
            borderRadius: 99,
          }}
        >
          ابدأ مشروعك
        </div>
      </div>
      {/* hero */}
      <div style={{padding: pad, paddingTop: pad * 1.1, position: 'relative'}}>
        {hero > 0.05 ? (
          <div style={{opacity: Math.min(1, hero * 1.5), transform: `translateY(${(1 - hero) * 20}px)`}}>
            <div
              style={{
                display: 'inline-block',
                fontSize: 15 * s,
                fontWeight: 700,
                color: colors.gold,
                background: colors.goldSoft,
                padding: `${6 * s}px ${14 * s}px`,
                borderRadius: 99,
              }}
            >
              تطوير وتصميم مواقع
            </div>
            <div
              style={{
                fontSize: (mobile ? 34 : 46) * s,
                fontWeight: 700,
                color: colors.navy,
                lineHeight: 1.35,
                marginTop: 16 * s,
                maxWidth: mobile ? '100%' : '56%',
              }}
            >
              موقع يعكس احترافية شركتك ويظهر في قوقل
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 10 * s, marginTop: 18 * s, maxWidth: mobile ? '90%' : '48%'}}>
              <Line w="100%" h={10 * s} color={colors.line} />
              <Line w="72%" h={10 * s} color={colors.line} />
            </div>
            <div style={{display: 'flex', gap: 12 * s, marginTop: 22 * s}}>
              <div style={{fontSize: 16 * s, fontWeight: 700, color: '#fff', background: colors.navy, padding: `${10 * s}px ${22 * s}px`, borderRadius: 12 * s}}>
                اطلب عرض سعر
              </div>
              <div style={{fontSize: 16 * s, fontWeight: 700, color: colors.navy, border: `1.5px solid ${colors.line}`, padding: `${10 * s}px ${22 * s}px`, borderRadius: 12 * s}}>
                شاهد أعمالنا
              </div>
            </div>
          </div>
        ) : (
          skeleton && (
            <div>
              <Line w="30%" h={22 * s} color={colors.bgDeep} />
              <Line w="75%" h={36 * s} color={colors.bgDeep} style={{marginTop: 18 * s}} />
              <Line w="55%" h={36 * s} color={colors.bgDeep} style={{marginTop: 12 * s}} />
              <Line w="45%" h={12 * s} color={colors.line} style={{marginTop: 20 * s}} />
              <Line w="35%" h={12 * s} color={colors.line} style={{marginTop: 10 * s}} />
            </div>
          )
        )}
        {!mobile && hero > 0.05 && (
          <div
            style={{
              position: 'absolute',
              left: pad,
              top: pad * 1.5,
              width: 230 * s,
              height: 190 * s,
              borderRadius: 22 * s,
              background: `linear-gradient(145deg, ${colors.blue}, ${colors.blueDeep})`,
              opacity: Math.min(1, hero * 1.5),
              transform: `translateY(${(1 - hero) * 30}px) rotate(-3deg)`,
              boxShadow: '0 30px 50px -20px rgba(18,32,184,0.5)',
            }}
          >
            <div style={{position: 'absolute', right: 22 * s, bottom: 22 * s, width: 70 * s, height: 6 * s, background: colors.gold, borderRadius: 99}} />
            <div style={{position: 'absolute', right: 22 * s, bottom: 40 * s, width: 120 * s, height: 10 * s, background: 'rgba(255,255,255,0.7)', borderRadius: 99}} />
          </div>
        )}
      </div>
      {/* cards */}
      <div style={{display: 'flex', gap: 16 * s, padding: `0 ${pad}px`, flexWrap: 'wrap'}}>
        {[0, 1, 2].map((i) => {
          const p = block(i);
          const w = mobile ? '100%' : `calc(33.33% - ${11 * s}px)`;
          return (
            <div
              key={i}
              style={{
                width: w,
                height: (mobile ? 90 : 150) * s,
                borderRadius: 18 * s,
                background: p > 0.05 ? colors.surfaceAlt : skeleton ? colors.bgDeep : 'transparent',
                border: p > 0.05 ? `1px solid ${colors.line}` : 'none',
                padding: 18 * s,
                opacity: p > 0.05 ? Math.min(1, p * 1.5) : skeleton ? 1 : 0,
                transform: `translateY(${(1 - p) * 16}px)`,
                display: mobile && i > 0 ? 'none' : 'block',
              }}
            >
              {p > 0.05 && (
                <>
                  <div style={{width: 34 * s, height: 34 * s, borderRadius: 10 * s, background: i === 1 ? colors.gold : colors.blue, opacity: 0.9}} />
                  <div style={{fontSize: 17 * s, fontWeight: 700, color: colors.navy, marginTop: 14 * s}}>
                    {['تصميم UI/UX', 'تطوير مواقع', 'تحسين SEO'][i]}
                  </div>
                  {!mobile && <Line w="80%" h={8 * s} style={{marginTop: 10 * s}} />}
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* loading spinner when nothing loaded */}
      {hero < 0.05 && skeleton && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 54 * s,
            height: 54 * s,
            marginLeft: -27 * s,
            marginTop: -27 * s,
            borderRadius: 99,
            border: `${5 * s}px solid ${colors.line}`,
            borderTopColor: colors.muted,
            transform: `rotate(${spin}deg)`,
          }}
        />
      )}
    </div>
  );
};
