import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile} from 'remotion';
import {palette, font, LAYOUT, W} from './config';
import {COPY} from './copy';
import {Words, Pill, Mark, Cursor, Sheet, ModernSite, OldSite, Skeleton, Header, CtaButton} from './components';
import {sp, springs, clamp, ease, prog, lerp} from '../anim';

const S = COPY.site;

/** marks timing per reason (local frames) */
export const MARKS: Array<{x: number; ok?: number}> = [{x: 100}, {x: 50, ok: 92}, {x: 55, ok: 98}, {x: 50, ok: 92}, {x: 50, ok: 104}];

const Progress: React.FC<{i: number}> = ({i}) => (
  <div style={{position: 'absolute', top: 236, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 12}}>
    {[0, 1, 2, 3, 4].map((k) => (
      <div key={k} style={{width: k === i ? 70 : 34, height: 10, borderRadius: 10, background: k <= i ? palette.blue : palette.line}} />
    ))}
  </div>
);

const ReasonText: React.FC<{i: number}> = ({i}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const r = COPY.reasons[i];
  const p = sp(frame, fps, 0, springs.bouncy);
  return (
    <>
      <Progress i={i} />
      <div style={{position: 'absolute', top: LAYOUT.textTop, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
        <div style={{width: 104, height: 104, borderRadius: 104, background: palette.blue, color: '#fff', fontFamily: font.family, fontSize: 58, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p})`, boxShadow: `0 16px 34px -12px ${palette.blue}AA`}}>
          {r.n}
        </div>
        <Words text={r.title} size={80} hi={r.hi} delay={2} />
        <Words text={r.line} size={44} weight={400} color={palette.muted} delay={10} stagger={1.2} lineHeight={1.3} style={{maxWidth: 900}} />
      </div>
    </>
  );
};

const markPos: React.CSSProperties = {top: LAYOUT.sheetTop + LAYOUT.sheetH - 66, left: (W - 132) / 2};

const Dim: React.FC<{at: number; until?: number; color?: string}> = ({at, until = 9999, color = 'rgba(11,27,58,0.35)'}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 8, until, until + 6], [0, 1, 1, 0], clamp);
  return <div style={{position: 'absolute', inset: 0, background: color, opacity: o, zIndex: 5}} />;
};

/** wipe from old to new content */
const Wipe: React.FC<{at: number; from: React.ReactNode; to: React.ReactNode}> = ({at, from, to}) => {
  const frame = useCurrentFrame();
  const w = prog(frame, at, at + 16, ease.inOut);
  return (
    <>
      <div style={{position: 'absolute', inset: 0}}>{from}</div>
      <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 ${(1 - w) * 100}% 0 0)`}}>{to}</div>
      {w > 0 && w < 1 ? <div style={{position: 'absolute', top: 0, bottom: 0, left: `${w * 100}%`, width: 8, background: palette.blue, boxShadow: `0 0 30px ${palette.blue}`}} /> : null}
    </>
  );
};

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const H = COPY.hook;
  const z = interpolate(frame, [0, 105], [1.04, 1], clamp);
  const n = Math.max(7, 24 - Math.floor(Math.max(0, frame - 6) / 5));
  const drop = interpolate(frame, [0, 90], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 260, left: 50, right: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, transform: `scale(${z})`}}>
        <Pill text={H.tag} bg={palette.red} delay={-1} size={38} />
        <Words text={H.a} size={100} hi={H.hiA} accent={palette.red} animate={false} lineHeight={1.08} />
        <Words text={H.b} size={52} weight={500} color={palette.muted} animate={false} />
      </div>
      <div style={{position: 'absolute', top: 1010, left: 120, right: 120, height: 420, borderRadius: 36, background: '#fff', boxShadow: '0 30px 60px -20px rgba(11,27,58,0.22)', padding: 44, fontFamily: font.family, display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{fontSize: 32, color: palette.muted, fontWeight: 500}}>{H.counter}</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
          <div style={{fontSize: 150, fontWeight: 700, color: palette.navy, lineHeight: 1, fontVariantNumeric: 'tabular-nums', width: 200}}>{n}</div>
          <svg width={90} height={90} viewBox="0 0 24 24" fill="none" stroke={palette.red} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6l7 7 4-4 7 7" />
            <path d="M15 16h6v-6" />
          </svg>
          <svg width={320} height={110} viewBox="0 0 320 110" style={{overflow: 'visible'}}>
            <polyline points="0,10 60,22 110,30 160,52 210,60 260,84 320,100" fill="none" stroke={palette.red} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={420} strokeDashoffset={420 * (1 - drop)} />
          </svg>
        </div>
        <div style={{display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap'}}>
          {Array.from({length: 24}).map((_, k) => (
            <div key={k} style={{width: 26, height: 26, borderRadius: 26, background: k < n ? palette.blue : palette.redSoft, border: k < n ? 'none' : `2px solid ${palette.red}66`}} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const R1: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [8, 100], [0, 3.4], clamp);
  return (
    <AbsoluteFill>
      <ReasonText i={0} />
      <Sheet>
        <Skeleton />
        <div style={{position: 'absolute', left: 0, right: 0, top: 250, display: 'flex', justifyContent: 'center', zIndex: 6}}>
          <div style={{background: '#fff', borderRadius: 28, boxShadow: '0 30px 60px -20px rgba(11,27,58,0.35)', padding: '30px 44px', width: 560, fontFamily: font.family}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
              <span style={{fontSize: 32, color: palette.muted}}>{S.loading}</span>
              <span style={{fontSize: 64, fontWeight: 700, color: t > 3 ? palette.red : palette.navy, fontVariantNumeric: 'tabular-nums'}}>{t.toFixed(1).replace('.', ',')}{'\u202F'}s</span>
            </div>
            <div style={{height: 14, borderRadius: 14, background: palette.skeleton, marginTop: 18, overflow: 'hidden'}}>
              <div style={{height: '100%', width: `${Math.min(1, t / 3.4) * 38}%`, background: t > 3 ? palette.red : palette.blue, borderRadius: 14}} />
            </div>
          </div>
        </div>
        <Dim at={100} />
        {frame >= 102 ? (
          <div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center', zIndex: 7}}>
            <Pill text={S.left} bg={palette.red} delay={102} size={36} />
          </div>
        ) : null}
      </Sheet>
      <Mark kind="x" at={MARKS[0].x} style={markPos} />
    </AbsoluteFill>
  );
};

const R2: React.FC = () => (
  <AbsoluteFill>
    <ReasonText i={1} />
    <Sheet>
      <Wipe at={70} from={<OldSite />} to={<div style={{background: '#fff', width: '100%', height: '100%'}}><ModernSite /></div>} />
    </Sheet>
    <Mark kind="x" at={MARKS[1].x} style={{...markPos, opacity: useCurrentFrame() < 70 ? 1 : 0}} />
    <Mark kind="ok" at={MARKS[1].ok!} style={markPos} />
  </AbsoluteFill>
);

const path: Array<[number, number, number]> = [
  [0, 700, 560],
  [22, 860, 170],
  [40, 560, 260],
  [58, 300, 600],
  [76, 820, 420],
  [100, 260, 400],
];
const cursorAt = (f: number) => {
  const fs = path.map((p) => p[0]);
  return [interpolate(f, fs, path.map((p) => p[1]), {...clamp, easing: ease.inOut}), interpolate(f, fs, path.map((p) => p[2]), {...clamp, easing: ease.inOut})];
};

const R3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cta = frame < 78 ? 0 : sp(frame, fps, 78, springs.bouncy);
  const glow = frame < 104 ? 0 : interpolate(frame, [104, 124], [0, 1], clamp);
  const press = interpolate(frame, [102, 105, 110], [0, 1, 0], clamp);
  const [x, y] = cursorAt(frame);
  const q = frame >= 20 && frame < 80 ? sp(frame, fps, 20, springs.bouncy) : 0;
  return (
    <AbsoluteFill>
      <ReasonText i={2} />
      <Sheet>
        <ModernSite cta={cta} glow={glow} />
        <Cursor x={x} y={y} press={press} />
        {q > 0 ? (
          <div style={{position: 'absolute', left: 540, top: 470, transform: `scale(${q})`, transformOrigin: 'left bottom', zIndex: 31}}>
            <Pill text={S.where} bg={palette.navy} size={32} delay={-1} />
          </div>
        ) : null}
      </Sheet>
      <Mark kind="x" at={MARKS[2].x} style={{...markPos, opacity: frame < 78 ? 1 : 0}} />
      <Mark kind="ok" at={MARKS[2].ok!} style={markPos} />
    </AbsoluteFill>
  );
};

const TinySite: React.FC = () => {
  const k = 0.34;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#E9EBEF'}}>
      <div style={{position: 'absolute', left: (W - W * k) / 2, top: 40, width: W, height: 2000, transform: `scale(${k})`, transformOrigin: '0 0', background: '#fff'}}>
        <ModernSite />
        <ModernSite />
      </div>
      <div style={{position: 'absolute', left: 40, top: 150}}><Pill text={S.tiny} bg={palette.red} size={30} delay={14} /></div>
      <div style={{position: 'absolute', right: 40, top: 360}}><Pill text={S.tinyBtn} bg={palette.red} size={30} delay={26} /></div>
    </div>
  );
};

const MobileSite: React.FC = () => (
  <div style={{position: 'absolute', inset: 0, background: '#fff'}}>
    <Header burger />
    <div style={{padding: '56px 60px', background: 'linear-gradient(180deg, #EEF1FF 0%, #FFFFFF 100%)', display: 'flex', flexDirection: 'column', gap: 24}}>
      <div style={{fontSize: 76, fontWeight: 700, color: palette.navy, lineHeight: 1.08, letterSpacing: '-0.02em'}}>{S.hero}</div>
      <div style={{fontSize: 34, color: palette.muted}}>{S.heroSub}</div>
      <CtaButton size={36} style={{justifyContent: 'center', marginTop: 14}} />
    </div>
    <div style={{padding: '0 60px', display: 'flex', gap: 18}}>
      {S.services.slice(0, 2).map((s) => (
        <div key={s} style={{flex: 1, border: `1px solid ${palette.line}`, borderRadius: 20, padding: 24, fontSize: 30, fontWeight: 600, color: palette.navy}}>{s}</div>
      ))}
    </div>
  </div>
);

const R4: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ReasonText i={3} />
      <Sheet>
        <Wipe at={72} from={<TinySite />} to={<MobileSite />} />
      </Sheet>
      <Mark kind="x" at={MARKS[3].x} style={{...markPos, opacity: frame < 72 ? 1 : 0}} />
      <Mark kind="ok" at={MARKS[3].ok!} style={markPos} />
    </AbsoluteFill>
  );
};

const Star: React.FC<{s?: number}> = ({s = 34}) => (
  <svg width={s} height={s} viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill={palette.gold} /></svg>
);

const R5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const filled = (k: number) => (frame < 72 ? 0 : sp(frame, fps, 72 + k * 5, springs.snappy));
  const rv = frame < 88 ? 0 : sp(frame, fps, 88, springs.bouncy);
  const tiles = ['linear-gradient(150deg,#C9D2FF,#1E2CFB)', 'linear-gradient(150deg,#F6EDD6,#C9A34A)', 'linear-gradient(150deg,#D7DCE5,#243553)'];
  const empty: React.CSSProperties = {border: `3px dashed ${palette.faint}`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.faint, fontSize: 24};
  return (
    <AbsoluteFill>
      <ReasonText i={4} />
      <Sheet>
        <Header />
        <div style={{padding: '34px 54px 0', fontSize: 36, fontWeight: 700, color: palette.navy}}>{S.works}</div>
        <div style={{display: 'flex', gap: 22, padding: '22px 54px'}}>
          {tiles.map((g, k) => (
            <div key={k} style={{flex: 1, height: 200, position: 'relative', ...empty}}>
              {S.empty}
              <div style={{position: 'absolute', inset: -3, borderRadius: 20, background: g, opacity: filled(k), transform: `scale(${0.85 + 0.15 * filled(k)})`}}>
                <div style={{position: 'absolute', left: 24, bottom: 24, width: 90, height: 64, background: 'rgba(255,255,255,0.85)', clipPath: 'polygon(0 40%, 50% 0, 100% 40%, 100% 100%, 0 100%)'}} />
              </div>
            </div>
          ))}
        </div>
        <div style={{padding: '10px 54px 0', fontSize: 36, fontWeight: 700, color: palette.navy}}>{S.reviews}</div>
        <div style={{margin: '22px 54px', height: 200, position: 'relative', ...empty}}>
          {S.empty}
          <div style={{position: 'absolute', inset: -3, borderRadius: 20, background: '#fff', boxShadow: '0 20px 40px -18px rgba(11,27,58,0.3), 0 0 0 1px rgba(11,27,58,0.06)', padding: '28px 34px', opacity: Math.min(1, rv * 1.5), transform: `scale(${0.9 + 0.1 * rv})`, display: 'flex', flexDirection: 'column', gap: 12}}>
            <div style={{display: 'flex', gap: 6}}>{[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}</div>
            <div style={{fontSize: 32, color: palette.navy, fontWeight: 500}}>{S.review}</div>
            <div style={{fontSize: 24, color: palette.muted}}>{S.client}</div>
          </div>
        </div>
      </Sheet>
      <Mark kind="x" at={MARKS[4].x} style={{...markPos, opacity: frame < 72 ? 1 : 0}} />
      <Mark kind="ok" at={MARKS[4].ok!} style={markPos} />
    </AbsoluteFill>
  );
};

export const REASONS = [R1, R2, R3, R4, R5];

export const Statement: React.FC = () => {
  const s = COPY.statement;
  return (
    <AbsoluteFill style={{background: palette.navy, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 40, padding: '0 70px', marginTop: -120}}>
        <Words text={s.a} size={62} weight={400} color="#C7CCE0" />
        <Words text={s.b} size={92} color="#fff" hi={s.hiB} accent="#FF6B5E" delay={22} stagger={2.5} lineHeight={1.12} />
      </div>
    </AbsoluteFill>
  );
};

export const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = COPY.cta;
  const lp = sp(frame, fps, 0, springs.smooth);
  const wp = sp(frame, fps, 12, springs.bouncy);
  const pulse = 1 + 0.03 * Math.sin(Math.max(0, frame - 30) / 5);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 290, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: lp, transform: `translateY(${(1 - lp) * 30}px)`}}>
        <Img src={staticFile('img/ea4-logo-full.png')} style={{width: 380}} />
      </div>
      <div style={{position: 'absolute', top: 700, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34}}>
        <Words text={c.a} size={78} delay={6} />
        <div style={{fontFamily: font.family, fontSize: 96, fontWeight: 700, color: '#fff', background: palette.blue, padding: '18px 54px', borderRadius: 28, transform: `scale(${wp * pulse}) rotate(-2deg)`, boxShadow: `0 30px 60px -20px ${palette.blue}CC`, whiteSpace: 'nowrap'}}>{c.word}</div>
        <Words text={c.b} size={54} weight={500} color={palette.navy} hi={c.hiB} delay={22} stagger={1.5} />
      </div>
      <div style={{position: 'absolute', top: 1380, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: prog(frame, 40, 54), fontFamily: font.family, fontSize: 36, color: palette.muted}}>
        <svg width={38} height={38} viewBox="0 0 24 24" fill="none" stroke={palette.muted} strokeWidth={2.2} strokeLinejoin="round"><path d="M6 3h12v18l-6-4.5L6 21z" /></svg>
        {c.save}
      </div>
    </AbsoluteFill>
  );
};
