import React from 'react';
import {useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Caption, Center, Tag} from '../components/Caption';
import {Headphones, Cart} from '../components/Store';
import {Visitor, ExitIcon} from '../components/Visitor';
import {Fade} from '../components/Fade';
import {COPY} from '../copy';
import {palette, shadow, scene, font} from '../config';
import {clamp, ease, sp, springs} from '../../anim';

const SC = scene('impact');
export const IMPACT = {leave: 34, breakAt: 58, items: [76, 104, 132]} as const;

/** 24–30 s: the visitor walks out, the sale that was one tap away fades with him */
export const Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const leave = interpolate(frame, [IMPACT.leave, IMPACT.leave + 26], [0, 1], {...clamp, easing: ease.in});
  const brk = interpolate(frame, [IMPACT.breakAt, IMPACT.breakAt + 14], [0, 1], {...clamp, easing: ease.out});
  const cardIn = interpolate(frame, [6, 28], [0, 1], {...clamp, easing: ease.out});
  const dash = 1 - brk;
  return (
    <Fade duration={SC.duration}>
      <Center y={200}>
        <Caption text={COPY.impact.q} delay={2} size={120} mode="pop" lineHeight={1.2} />
      </Center>
      <div
        dir="rtl"
        style={{
          position: 'absolute',
          top: 480,
          left: 70,
          right: 70,
          height: 470,
          borderRadius: 40,
          background: '#fff',
          boxShadow: shadow.card,
          opacity: cardIn,
          transform: `translateY(${(1 - cardIn) * 40}px)`,
          overflow: 'hidden',
        }}
      >
        {/* product mini-card (right, RTL start) */}
        <div style={{position: 'absolute', right: 52, top: 60, width: 300, textAlign: 'center', fontFamily: font.family, filter: `saturate(${1 - brk})`, opacity: 1 - brk * 0.45}}>
          <div style={{height: 220, borderRadius: 26, background: palette.skeleton2, display: 'grid', placeItems: 'center'}}>
            <Headphones size={180} />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, padding: '0 8px'}}>
            <span style={{fontSize: 30, color: palette.navy}}>{COPY.store.product.name}</span>
            <span style={{fontSize: 30, color: palette.blue}}>{COPY.store.product.price}</span>
          </div>
        </div>
        {/* sale tag hanging on the link */}
        <div style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center', pointerEvents: 'none'}}>
          <div style={{transform: `translateY(${brk * 30}px) rotate(${brk * -6}deg)`, opacity: 1 - brk * 0.6, filter: `grayscale(${brk})`}}>
            <Tag text={COPY.impact.sale} delay={16} size={28} color="#fff" bg={palette.blue} icon={<Cart color="#fff" size={26} />} />
          </div>
        </div>
        {/* link */}
        <svg style={{position: 'absolute', left: 0, top: 0}} width="940" height="470">
          <line x1="380" y1="230" x2="560" y2="230" stroke={palette.slate} strokeWidth="4" strokeDasharray={`${14 * dash + 1} ${12 + brk * 30}`} strokeLinecap="round" opacity={0.6 + 0.4 * (1 - brk)} />
        </svg>
        {/* visitor (left) */}
        <div style={{position: 'absolute', left: 90, top: 120, transform: `translateX(${-leave * 420}px)`, opacity: 1 - leave}}>
          <Visitor size={150} label={COPY.impact.visitor} />
        </div>
        <div style={{position: 'absolute', left: 130, top: 170, opacity: interpolate(frame, [IMPACT.leave + 10, IMPACT.leave + 24], [0, 1], {...clamp}) * (1 - brk * 0.3)}}>
          <ExitIcon size={80} color={palette.muted} />
        </div>
      </div>
      {COPY.impact.items.map((txt, i) => {
        const at = IMPACT.items[i];
        const p = sp(frame, fps, at, springs.snappy);
        return (
          <div
            key={i}
            dir="rtl"
            style={{
              position: 'absolute',
              top: 1030 + i * 150,
              left: 70,
              right: 70,
              height: 120,
              borderRadius: 30,
              background: '#fff',
              boxShadow: shadow.soft,
              display: 'flex',
              alignItems: 'center',
              gap: 26,
              padding: '0 30px',
              fontFamily: font.family,
              opacity: Math.min(1, p * 1.6),
              transform: `translateX(${(1 - p) * 60}px)`,
            }}
          >
            <div style={{width: 60, height: 60, borderRadius: 20, background: i === 2 ? palette.navy : palette.tint, color: i === 2 ? '#fff' : palette.blue, display: 'grid', placeItems: 'center', fontSize: 32, flexShrink: 0}}>{i + 1}</div>
            <div style={{fontSize: 44, color: palette.navy}}>{txt}</div>
          </div>
        );
      })}
    </Fade>
  );
};
