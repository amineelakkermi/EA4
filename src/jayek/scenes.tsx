import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, F, PAGE, MPAGE, scene} from './config';
import {COPY} from './copy';
import {Words, Pill, NextIcon, TailwindIcon, FigmaIcon, TechChip, Cursor} from './components';
import {sp, springs, clamp, ease, prog} from '../anim';

const img = (f: string) => staticFile(`img/jayek/${f}`);

/* ================= 1. intro: Figma -> Next.js + Tailwind ================= */
export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logo = sp(f, fps, 4, springs.bouncy);
  const ring = prog(f, 6, 40, ease.out);
  const arrow = prog(f, 62, 80, ease.out);
  return (
    <AbsoluteFill style={{alignItems: 'center'}}>
      <div style={{position: 'absolute', top: 120, width: 170, height: 170, left: 960 - 85}}>
        <div style={{position: 'absolute', inset: -30 * ring, borderRadius: 999, border: `2px solid ${C.gold}`, opacity: 0.5 * (1 - ring)}} />
        <div style={{width: 170, height: 170, borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: `1.5px solid rgba(225,189,128,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${logo})`, boxShadow: '0 30px 60px -24px rgba(0,0,0,0.7), inset 0 0 40px rgba(225,189,128,0.08)'}}>
          <Img src={img('logo.png')} style={{width: 84, height: 91}} />
        </div>
      </div>
      <div style={{position: 'absolute', top: 340, width: 1600}}>
        <Words text={COPY.intro1} size={104} delay={14} />
        <Words text={COPY.intro2} size={104} delay={24} color={C.gold} />
      </div>
      <div style={{position: 'absolute', top: 690, width: 1600}}>
        <Words text={COPY.introTag} size={36} delay={44} color={C.mute} stagger={1.5} />
      </div>
      <div dir="ltr" style={{position: 'absolute', top: 780, display: 'flex', alignItems: 'center', gap: 34}}>
        <TechChip icon={<FigmaIcon size={42} />} label="Figma" p={sp(f, fps, 50, springs.smooth)} />
        <svg width={90} height={30} viewBox="0 0 90 30" style={{opacity: arrow}}>
          <path d={`M4 15 H${4 + 74 * arrow}`} stroke={C.gold} strokeWidth={3} strokeLinecap="round" strokeDasharray="2 9" />
          <path d="M70 6 L82 15 L70 24" stroke={C.gold} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={arrow} />
        </svg>
        <TechChip icon={<NextIcon size={42} />} label="Next.js" p={sp(f, fps, 66, springs.smooth)} />
        <TechChip icon={<TailwindIcon size={44} />} label="Tailwind CSS" p={sp(f, fps, 74, springs.smooth)} />
      </div>
    </AbsoluteFill>
  );
};

/* ================= 2. the live site: hero zoom-out, click, full scroll ================= */
const SCROLL_F = [0, 110, 150, 178, 215, 240, 272, 292, 320, 338, 368];
const SCROLL_Y = [0, 0, 1200, 1200, 2400, 2400, 3370, 3370, 4160, 4160, 4720];
const scrollAt = (f: number) => interpolate(f, SCROLL_F, SCROLL_Y, {...clamp, easing: ease.inOut});
const chipFor = (y: number) => (y < 600 ? 'hero' : y < 1800 ? 'client' : y < 2900 ? 'barber' : y < 3800 ? 'download' : 'faq') as keyof typeof COPY.chips;
export const SITE_CLICK = 92;

export const Site: React.FC = () => {
  const f = useCurrentFrame();
  const y = scrollAt(f);
  const pageH = (PAGE.srcH / PAGE.srcW) * 1920;
  const z = interpolate(f, [0, 84], [1.32, 1], {...clamp, easing: ease.inOut});
  const sharp = prog(f, 0, 18, ease.out);
  const header = prog(y, 40, 220, ease.out);
  // cursor: glides onto the App Store button, clicks, then leaves as the page scrolls
  const cp = prog(f, 48, 90, ease.inOut);
  const cx = interpolate(cp, [0, 1], [1180, 1652]);
  const cy = interpolate(cp, [0, 1], [760, 884]) - 26 * Math.sin(Math.PI * cp);
  const cOp = Math.min(prog(f, 44, 54), 1 - prog(f, 112, 124));
  const btnPress = 1 - 0.05 * Math.sin(Math.PI * prog(f, SITE_CLICK - 3, SITE_CLICK + 7, ease.inOut));
  // caption chip, re-animates whenever the visible section changes
  const key = chipFor(y);
  let since = f;
  while (since > 0 && chipFor(scrollAt(since - 1)) === key) since--;
  const chip = prog(f, since + (since === 0 ? 30 : 4), since + (since === 0 ? 46 : 18), ease.out);
  return (
    <AbsoluteFill style={{background: '#fff', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: '1600px 500px', filter: sharp < 1 ? `blur(${(1 - sharp) * 8}px)` : undefined}}>
        <Img src={img('d-full.png')} style={{position: 'absolute', left: 0, top: -y, width: 1920, height: pageH}} />
        {/* App Store button press feedback */}
        <div style={{position: 'absolute', left: 1555, top: 853 - y, width: 215, height: 69, borderRadius: 10, transform: `scale(${btnPress})`, boxShadow: f > SITE_CLICK - 4 && f < SITE_CLICK + 24 ? `0 0 0 ${4 * (1 - prog(f, SITE_CLICK, SITE_CLICK + 24))}px ${C.gold}` : undefined}} />
        <Img src={img('header.png')} style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 128, opacity: header, boxShadow: '0 12px 30px -12px rgba(0,0,0,0.35)'}} />
      </AbsoluteFill>
      <Cursor x={cx} y={cy} click={SITE_CLICK} opacity={cOp} />
      <div style={{position: 'absolute', bottom: 56, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <div style={{opacity: chip, transform: `translateY(${(1 - chip) * 26}px) scale(${0.92 + 0.08 * chip})`, filter: chip < 0.97 ? `blur(${(1 - chip) * 8}px)` : undefined}}>
          <Pill>{COPY.chips[key]}</Pill>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ================= 3. pixel-perfect cards + app mockups ================= */
const CARD_W = 560;
const cardSrc = (i: number) => ({w: i < 4 ? 1258 : 1226, h: 378});

const Card: React.FC<{i: number; x: number; y: number; delay: number; dir: 1 | -1; lift: number}> = ({i, x, y, delay, dir, lift}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = sp(f, fps, delay, springs.smooth);
  const src = cardSrc(i);
  const s = CARD_W / (src.w - 160);
  const h = (src.h - 160) * s;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: CARD_W, height: h, perspective: 1400, opacity: Math.min(1, p * 1.4)}}>
      <div style={{width: '100%', height: '100%', borderRadius: 32 * s * 2, overflow: 'hidden', background: '#fff', transform: `translateX(${(1 - p) * 160 * dir}px) translateY(${-lift * 10}px) rotateY(${(1 - p) * 28 * dir}deg) scale(${1 + lift * 0.035})`, filter: p < 0.97 ? `blur(${(1 - p) * 10}px)` : undefined, boxShadow: `0 30px 60px -26px rgba(0,0,0,0.75), 0 0 0 ${2.5 * lift}px ${C.gold}, 0 0 ${40 * lift}px rgba(225,189,128,${0.35 * lift})`}}>
        <Img src={img(`card${i}.png`)} style={{position: 'absolute', left: -80 * s, top: -80 * s, width: src.w * s, height: src.h * s}} />
      </div>
    </div>
  );
};

export const Cards: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dur = scene('cards').duration;
  const top = 330;
  const gap = 22;
  const ch = (378 - 160) * (CARD_W / (1258 - 160));
  // highlight sweeps through the cards one after another
  const liftOf = (i: number) => {
    const order = [0, 4, 1, 5, 2, 6, 3, 7].indexOf(i);
    const t0 = 64 + order * 11;
    return Math.sin(Math.PI * prog(f, t0, t0 + 22, ease.inOut));
  };
  const ph = 600;
  const pw = ph * (445 / 826);
  const phone = (k: number) => sp(f, fps, 14 + k * 6, springs.gentle);
  const bob = (k: number) => Math.sin((f + k * 30) / 22) * 8;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 70, left: 0, right: 0}}>
        <Words text={COPY.cards} size={72} hi={['بدقة']} delay={2} />
        <Words text={COPY.cardsSub} size={34} color={C.mute} delay={12} stagger={1.4} style={{marginTop: 8}} />
      </div>
      {[0, 1, 2, 3].map((k) => <Card key={k} i={k} x={1920 - 90 - CARD_W} y={top + k * (ch + gap)} delay={18 + k * 6} dir={1} lift={liftOf(k)} />)}
      {[4, 5, 6, 7].map((k) => <Card key={k} i={k} x={90} y={top + (k - 4) * (ch + gap)} delay={22 + (k - 4) * 6} dir={-1} lift={liftOf(k)} />)}
      {[['mockup4.png', 960 - pw + 40, -7], ['mockup3.png', 960 - 40, 7]].map(([src, x, rot], k) => (
        <Img key={k} src={img(src as string)} style={{position: 'absolute', left: x as number, top: 345 + bob(k) + (1 - phone(k)) * 260, width: pw, height: ph, opacity: Math.min(1, phone(k) * 1.5), transform: `rotate(${(rot as number) * phone(k)}deg) scale(${interpolate(f, [0, dur], [1, 1.04])})`, filter: 'drop-shadow(0 40px 50px rgba(0,0,0,0.55))'}} />
      ))}
    </AbsoluteFill>
  );
};

/* ================= 4. responsive: tilted wall of mobile pages ================= */
const COL_W = 330;
const colH = (MPAGE.srcH / MPAGE.srcW) * COL_W;

export const Mobile: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const wall = sp(f, fps, 0, springs.gentle);
  const cols = [
    {start: 0, speed: 3.2, delay: 0},
    {start: 1250, speed: -2.6, delay: 5},
    {start: 2500, speed: 3.6, delay: 10},
    {start: 3700, speed: -2.2, delay: 15},
  ];
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: -160, top: -300, width: 1300, height: 1700, perspective: 2600}}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', gap: 36, transform: `rotateX(22deg) rotateY(-14deg) rotateZ(10deg) translateX(${(1 - wall) * -200}px)`, transformStyle: 'preserve-3d'}}>
          {cols.map((c, k) => {
            const p = sp(f, fps, c.delay, springs.smooth);
            const off = Math.max(0, Math.min(colH - 1700, c.start + c.speed * f));
            return (
              <div key={k} style={{width: COL_W, height: 1700, borderRadius: 36, overflow: 'hidden', position: 'relative', background: '#fff', opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * (k % 2 ? -300 : 300)}px)`, boxShadow: '0 50px 80px -30px rgba(0,0,0,0.75), 0 0 0 1.5px rgba(255,255,255,0.12)'}}>
                <Img src={img('m-full.png')} style={{position: 'absolute', left: 0, top: -off, width: COL_W, height: colH}} />
              </div>
            );
          })}
        </div>
      </div>
      <AbsoluteFill style={{background: `linear-gradient(270deg, rgba(32,38,65,0.97) 0%, rgba(32,38,65,0.94) 30%, rgba(32,38,65,0.6) 44%, rgba(32,38,65,0) 62%)`}} />
      <div dir="rtl" style={{position: 'absolute', right: 130, top: 300, width: 720}}>
        <Words text={COPY.mobile1} size={96} delay={8} justify="flex-start" />
        <Words text={COPY.mobile2} size={96} delay={16} justify="flex-start" color={C.gold} />
        <Words text={COPY.mobileSub} size={34} delay={28} justify="flex-start" color={C.mute} stagger={1.4} style={{marginTop: 18}} />
        <div style={{display: 'flex', gap: 18, marginTop: 44}}>
          {COPY.devices.map((d, k) => {
            const p = sp(f, fps, 40 + k * 6, springs.snappy);
            return (
              <div key={d} style={{opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 30}px)`}}>
                <Pill size={30}>{d}</Pill>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ================= 5. outro: stack + designer ================= */
export const OUTRO_BRAND = 18;
export const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const site = sp(f, fps, 4, springs.smooth);
  const me = sp(f, fps, OUTRO_BRAND, springs.bouncy);
  const shine = interpolate(f % 150, [20, 70], [-1, 2], clamp);
  const link = sp(f, fps, 58, springs.snappy);
  return (
    <AbsoluteFill style={{alignItems: 'center'}}>
      {/* site thumbnail card */}
      <div style={{position: 'absolute', left: 130, top: 250, width: 760, height: 475, borderRadius: 28, overflow: 'hidden', opacity: Math.min(1, site * 1.4), transform: `perspective(1800px) rotateY(${(1 - site) * 25 + 8}deg) translateY(${(1 - site) * 60}px)`, boxShadow: '0 60px 100px -40px rgba(0,0,0,0.85), 0 0 0 1.5px rgba(225,189,128,0.35)'}}>
        <Img src={img('d-hero.png')} style={{width: 760, height: 475, objectFit: 'cover'}} />
      </div>
      <div style={{position: 'absolute', left: 130, top: 760, width: 760, display: 'flex', justifyContent: 'center', gap: 16}} dir="ltr">
        <TechChip icon={<FigmaIcon size={34} />} label="Figma" p={sp(f, fps, 24, springs.smooth)} style={{padding: '10px 22px 10px 12px'}} />
        <TechChip icon={<NextIcon size={34} />} label="Next.js" p={sp(f, fps, 30, springs.smooth)} style={{padding: '10px 22px 10px 12px'}} />
        <TechChip icon={<TailwindIcon size={36} />} label="Tailwind" p={sp(f, fps, 36, springs.smooth)} style={{padding: '10px 22px 10px 12px'}} />
      </div>
      {/* designer */}
      <div dir="rtl" style={{position: 'absolute', right: 130, top: 215, width: 780, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Words text={COPY.outroKicker} size={38} color={C.gold} delay={10} />
        <div style={{marginTop: 26, width: 210, height: 210, borderRadius: 999, padding: 6, background: `linear-gradient(145deg, ${C.goldHi}, ${C.gold})`, transform: `scale(${me})`, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7)'}}>
          <div style={{width: '100%', height: '100%', borderRadius: 999, overflow: 'hidden', position: 'relative'}}>
            <Img src={staticFile('img/ea-amine-logo.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            <div style={{position: 'absolute', inset: 0, background: `linear-gradient(115deg, transparent ${shine * 100 - 20}%, rgba(255,255,255,0.45) ${shine * 100}%, transparent ${shine * 100 + 20}%)`}} />
          </div>
        </div>
        <Words text={COPY.name} size={76} delay={26} style={{marginTop: 26}} />
        <Words text={COPY.role} size={34} color={C.mute} delay={32} stagger={1.4} />
        <div dir="ltr" style={{marginTop: 30, display: 'flex', alignItems: 'center', gap: 14, padding: '14px 30px', borderRadius: 999, background: 'rgba(255,255,255,0.07)', border: `1.5px solid ${C.line}`, opacity: Math.min(1, link * 1.5), transform: `translateY(${(1 - link) * 30}px)`}}>
          <svg width={30} height={30} viewBox="0 0 24 24"><path fill="#fff" d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" /></svg>
          <span style={{fontFamily: F.lat, fontWeight: 600, fontSize: 32, color: C.white}}>@ElakkermiAmine2</span>
        </div>
        <Words text={COPY.cta} size={40} color={C.gold} delay={72} stagger={2} style={{marginTop: 40}} />
      </div>
    </AbsoluteFill>
  );
};
