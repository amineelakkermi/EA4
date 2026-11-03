import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {palette, font, shadow, H} from '../config';
import {COPY} from '../copy';
import {clamp, ease} from '../../anim';

const F = font.family;
const ST = COPY.store;
export const PAGE_W = 1080;

/* ---------- small pieces ---------- */

export const Shimmer: React.FC<{style?: React.CSSProperties; speed?: number}> = ({style, speed = 1}) => {
  const frame = useCurrentFrame();
  const x = ((frame * 2.2 * speed) % 160) - 80;
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', ...style}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateX(${x}%)`,
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)',
        }}
      />
    </div>
  );
};

export const Spinner: React.FC<{size?: number; color?: string; speed?: number; thickness?: number}> = ({size = 72, color = palette.slate, speed = 1, thickness = 6}) => {
  const frame = useCurrentFrame();
  const rot = frame * 7 * speed;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{transform: `rotate(${rot}deg)`}}>
      <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeOpacity="0.18" strokeWidth={thickness} />
      <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" strokeDasharray="70 194" />
    </svg>
  );
};

const Bone: React.FC<{w: number | string; h: number; r?: number; style?: React.CSSProperties}> = ({w, h, r = h / 2, style}) => (
  <div style={{width: w, height: h, borderRadius: r, background: palette.skeleton, position: 'relative', overflow: 'hidden', ...style}}>
    <Shimmer />
  </div>
);

/** Product artwork: wireless headphones built from shapes in logo colours */
export const Headphones: React.FC<{size?: number; color?: string; accent?: string}> = ({size = 300, color = palette.navy, accent = palette.blue}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <path d="M38 118 V100 a62 62 0 0 1 124 0 v18" stroke={color} strokeWidth="12" strokeLinecap="round" />
    <rect x="24" y="110" width="36" height="62" rx="14" fill={color} />
    <rect x="140" y="110" width="36" height="62" rx="14" fill={color} />
    <rect x="30" y="118" width="12" height="46" rx="6" fill={accent} opacity="0.9" />
    <rect x="158" y="118" width="12" height="46" rx="6" fill={accent} opacity="0.9" />
    <circle cx="100" cy="46" r="4" fill={accent} />
  </svg>
);

const Watch: React.FC<{size?: number}> = ({size = 120}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <rect x="64" y="20" width="72" height="40" rx="10" fill={palette.slate} />
    <rect x="64" y="140" width="72" height="40" rx="10" fill={palette.slate} />
    <rect x="46" y="52" width="108" height="96" rx="26" fill={palette.navy} />
    <rect x="60" y="66" width="80" height="68" rx="16" fill={palette.blue} />
    <path d="M78 104 L94 90 L110 108 L124 84" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Speaker: React.FC<{size?: number}> = ({size = 120}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <rect x="40" y="36" width="120" height="128" rx="30" fill={palette.navy} />
    <circle cx="100" cy="92" r="30" fill={palette.blue} />
    <circle cx="100" cy="92" r="12" fill={palette.navy} />
    <rect x="70" y="138" width="60" height="10" rx="5" fill={palette.slate} />
  </svg>
);
const Charger: React.FC<{size?: number}> = ({size = 120}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <rect x="56" y="48" width="88" height="104" rx="22" fill={palette.navy} />
    <rect x="80" y="20" width="12" height="34" rx="6" fill={palette.slate} />
    <rect x="108" y="20" width="12" height="34" rx="6" fill={palette.slate} />
    <path d="M104 72 L84 108 H100 L96 132 L118 94 H102 Z" fill={palette.blue} />
  </svg>
);
const ART = [Headphones, Watch, Speaker, Charger];

const Header: React.FC<{compact?: boolean; back?: boolean}> = ({back}) => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '30px 52px 0'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 52, height: 52, borderRadius: 16, background: palette.navy, display: 'grid', placeItems: 'center'}}>
        <div style={{width: 22, height: 22, borderRadius: 6, background: palette.blue, transform: 'rotate(45deg)'}} />
      </div>
      <span style={{fontSize: 34, color: palette.navy}}>{ST.brand}</span>
    </div>
    {back ? (
      <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 26, color: palette.grey}}>
        <span>{ST.back}</span>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={palette.grey} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    ) : (
      <div style={{display: 'flex', gap: 30, fontSize: 24, color: palette.grey}}>
        {ST.nav.map((n, i) => (
          <span key={n} style={{color: i === 1 ? palette.blue : undefined, borderBottom: i === 1 ? `2px solid ${palette.blue}` : '2px solid transparent', paddingBottom: 4}}>
            {n}
          </span>
        ))}
      </div>
    )}
  </div>
);

/** The online store listing (full-width sheet). `press` 0..1 presses the first card. */
export const StorePage: React.FC<{press?: number}> = ({press = 0}) => (
  <div dir="rtl" style={{width: PAGE_W, background: '#fff', fontFamily: F, color: palette.navy, overflow: 'hidden', minHeight: H}}>
    <Header />
    <div style={{margin: '34px 52px 0', borderRadius: 30, background: `linear-gradient(135deg, ${palette.navy} 0%, ${palette.deep} 60%, ${palette.blue} 100%)`, color: '#fff', padding: '38px 44px', position: 'relative', overflow: 'hidden'}}>
      <div style={{position: 'absolute', width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.16)', left: -150, top: -220}} />
      <div style={{fontSize: 44, lineHeight: 1.3}}>{ST.banner}</div>
      <div style={{fontSize: 26, opacity: 0.8, marginTop: 8}}>{ST.bannerSub}</div>
    </div>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, padding: '34px 52px 0'}}>
      {ST.products.map((p, i) => {
        const Art = ART[i];
        const s = i === 0 ? 1 - press * 0.04 : 1;
        return (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 28,
              boxShadow: i === 0 && press > 0 ? `0 0 0 ${2 + press * 2}px ${palette.blue}, ${shadow.soft}` : shadow.soft,
              padding: 22,
              transform: `scale(${s})`,
            }}
          >
            <div style={{height: 250, borderRadius: 20, background: palette.skeleton2, display: 'grid', placeItems: 'center'}}>
              <Art size={200} />
            </div>
            <div style={{fontSize: 30, marginTop: 18}}>{p.name}</div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8}}>
              <span style={{fontSize: 30, color: palette.blue}}>{p.price}</span>
              <div style={{width: 46, height: 46, borderRadius: 14, background: palette.tint, display: 'grid', placeItems: 'center'}}>
                <Cart color={palette.blue} size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export const Cart: React.FC<{color?: string; size?: number}> = ({color = palette.navy, size = 26}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
);

/** Product page while it loads: skeleton blocks + spinner. `dim` greys it out further. */
export const ProductSkeleton: React.FC<{spinner?: boolean; dim?: number}> = ({spinner = true, dim = 0}) => (
  <div dir="rtl" style={{width: PAGE_W, background: '#fff', fontFamily: F, overflow: 'hidden', minHeight: H, filter: `saturate(${1 - dim})`, opacity: 1 - dim * 0.4}}>
    <Header back />
    <div style={{margin: '34px 52px 0', height: 620, borderRadius: 30, background: palette.skeleton, position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center'}}>
      <Shimmer speed={0.6} />
      {spinner && <Spinner size={96} />}
    </div>
    <div style={{padding: '36px 52px 0', display: 'flex', flexDirection: 'column', gap: 22}}>
      <Bone w="62%" h={40} />
      <Bone w="30%" h={36} />
      <Bone w="92%" h={22} style={{marginTop: 14}} />
      <Bone w="84%" h={22} />
      <Bone w="56%" h={22} />
      <Bone w="100%" h={92} r={26} style={{marginTop: 24}} />
    </div>
  </div>
);

/** Loaded product page */
export const ProductPage: React.FC<{reveal?: number}> = ({reveal = 1}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 14) * 6;
  const r = (i: number) => interpolate(reveal, [i * 0.12, 0.5 + i * 0.12], [0, 1], {...clamp, easing: ease.out});
  const item = (i: number): React.CSSProperties => ({opacity: r(i), transform: `translateY(${(1 - r(i)) * 24}px)`});
  return (
    <div dir="rtl" style={{width: PAGE_W, background: '#fff', fontFamily: F, color: palette.navy, overflow: 'hidden', minHeight: H}}>
      <Header back />
      <div style={{margin: '34px 52px 0', height: 620, borderRadius: 30, background: `linear-gradient(160deg, #F7F8FB 0%, ${palette.skeleton} 100%)`, display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden', ...item(0)}}>
        <div style={{position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: palette.tint, filter: 'blur(2px)'}} />
        <div style={{transform: `translateY(${bob}px)`, position: 'relative'}}>
          <Headphones size={440} />
        </div>
        <div style={{position: 'absolute', top: 26, right: 26, background: palette.blue, color: '#fff', fontSize: 24, padding: '8px 22px', borderRadius: 999}}>{ST.product.stock}</div>
      </div>
      <div style={{padding: '34px 52px 0'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', ...item(1)}}>
          <div style={{fontSize: 46}}>{ST.product.name}</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 28, color: palette.grey}}>
            <Star />
            <span>{ST.product.rating}</span>
          </div>
        </div>
        <div style={{fontSize: 44, color: palette.blue, marginTop: 10, ...item(2)}}>{ST.product.price}</div>
        <div style={{fontSize: 28, color: palette.grey, marginTop: 18, lineHeight: 1.6, ...item(3)}}>{ST.product.desc}</div>
        <div style={{marginTop: 34, background: palette.navy, color: '#fff', fontSize: 34, padding: '26px 0', borderRadius: 24, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, boxShadow: '0 24px 40px -22px rgba(7,19,39,0.5)', ...item(4)}}>
          <Cart color="#fff" size={32} />
          {ST.product.cta}
        </div>
      </div>
    </div>
  );
};

const Star: React.FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill={palette.blue}>
    <path d="M12 2l3 6.6 7 .8-5.2 4.8 1.4 7L12 17.7 5.8 21.2l1.4-7L2 9.4l7-.8z" />
  </svg>
);

/**
 * Full-bleed sheet holding a page: fills the width, runs to the bottom edge; `scroll`/`zoom`
 * move the camera. No device frames (brand preference).
 */
export const Sheet: React.FC<{
  top?: number;
  scroll?: number;
  zoom?: number;
  originY?: number;
  radius?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}> = ({top = 0, scroll = 0, zoom = 1, originY = 0, radius = 44, style, children, overlay}) => (
  <div style={{position: 'absolute', top, left: 0, width: PAGE_W, height: H - top, overflow: 'hidden', borderRadius: `${radius}px ${radius}px 0 0`, background: '#fff', boxShadow: shadow.float, ...style}}>
    <div style={{transform: `translateY(${-scroll}px) scale(${zoom})`, transformOrigin: `50% ${originY}px`}}>{children}</div>
    {overlay}
  </div>
);

/** Tap ripple (touch) at x/y inside its parent */
export const Tap: React.FC<{x: number; y: number; at: number; size?: number}> = ({x, y, at, size = 120}) => {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < -8 || t > 30) return null;
  const pre = interpolate(t, [-8, 0], [0, 1], {...clamp, easing: ease.out});
  const ring = interpolate(t, [0, 26], [0, 1], {...clamp, easing: ease.out});
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, pointerEvents: 'none'}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid ${palette.blue}`, transform: `scale(${0.4 + ring * 1.4})`, opacity: (1 - ring) * 0.8}} />
      <div style={{position: 'absolute', inset: size * 0.3, borderRadius: '50%', background: palette.blue, opacity: 0.85 * pre * (1 - ring), transform: `scale(${t < 0 ? 1 : 1 - ring * 0.5})`}} />
    </div>
  );
};
