# EA4 — "The 3-Second Test" Instagram Reel

Remotion composition `EA4ThreeSecondTest`: 1080×1920, 30 fps, 36 s (1080 frames), H.264 MP4.
Arabic (RTL) text only — background music + synthesised SFX, **no voice-over**.

## Install

```bash
npm install          # Node 18+ (tested on Node 24), downloads Chrome Headless Shell on first render
```

## Render

```bash
npx remotion render EA4ThreeSecondTest out/final.mp4 --codec h264 --crf 18 --audio-codec aac
```

Preview in the browser: `npm run studio` and pick `EA4ThreeSecondTest`.
QA stills: `COMP=EA4ThreeSecondTest node scripts/stills.mjs 30 120 270 420 600 810 1020` → `out/stills/`.

## Editing the content

- `src/three-second/scenes.json` — every Arabic string, the three fictional websites (brand, nav, headline,
  sub-headline, CTA…), scene start/end seconds and the 3-second challenge length.
- `src/three-second/config.ts` — palette (#F4F5F7 / #111827 / #172554 / #EF4444 / #16A34A / #E5E7EB), Cairo
  typography, safe zones (150 top / 380 bottom / 60 sides) and the round structure (`ROUND`).
- `src/three-second/ThreeSecondReel.tsx` — scene sequencing and the SFX cue list / music ducking.

## Structure

```
src/three-second/
  scenes.json            editable copy + timings
  config.ts              palette, fonts, safe zones, frame helpers
  ThreeSecondReel.tsx    composition: 7 scenes + audio cues
  components/
    Stage.tsx            light stage with grid, drift and coloured glow
    Caption.tsx          animated Cairo captions (Caption, Tag) with red/green highlights
    Countdown.tsx        deterministic 3.00 → 0.00 timer (ring / pill)
    Marks.tsx            animated red X / green check
    Frames.tsx           PhoneFrame, BrowserFrame, MobileChrome, Scaled
    Sites.tsx            the three fictional websites (SVG/CSS only)
  scenes/
    Hook.tsx  Round.tsx  Results.tsx  Transformation.tsx  Cta.tsx
```

## Assets

- Fonts: Cairo Bold (700) & Black (900), OFL, bundled in `public/fonts/Cairo-*.ttf`.
- Music: Kevin MacLeod — "Pamgaea" (incompetech.com, CC BY 4.0), trimmed and loudness-normalised to
  `public/audio/music-3s.wav`.
- SFX: synthesised with numpy/ffmpeg (`tick`, `zero`, `success`, `wrong`, `notify`, `swell`, `morph`,
  plus `impact`, `whoosh`, `pop`, `brand` from the shared library) in `public/audio/`.
- Logo: official EA4 lockup `public/img/ea4-logo-full.png`.
