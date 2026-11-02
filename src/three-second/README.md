# EA4 — "The 3-Second Test" Instagram Reel

Remotion composition `EA4ThreeSecondTest`: 1080×1920, 30 fps, 36 s (1080 frames), H.264 MP4.
Arabic (RTL) text only — background music + synthesised SFX, **no voice-over**.

## Install

```bash
npm install          # Node 18+ (tested on Node 24), downloads Chrome Headless Shell on first render
```

## Render

```bash
npx remotion render EA4ThreeSecondTest out/final-v3.mp4 --codec h264 --crf 18 --audio-codec aac
```

Preview in the browser: `npm run studio` and pick `EA4ThreeSecondTest`.
QA stills: `COMP=EA4ThreeSecondTest node scripts/stills.mjs 30 120 270 420 600 810 1020` → `out/stills/`.

## Editing the content

- `src/three-second/scenes.json` — every Arabic string, the three fictional websites (brand, nav, headline,
  sub-headline, CTA…), scene start/end seconds and the 3-second challenge length.
- `src/three-second/config.ts` — palette (#F4F5F7 / #111827 / #172554 / #EF4444 / #16A34A / #E5E7EB), Cairo
  typography (single-weight font, hierarchy by size), safe zones (150 top / 380 bottom / 60 sides) and the round structure (`ROUND`).
- `src/three-second/ThreeSecondReel.tsx` — scene sequencing and the SFX cue list / music ducking.

## Structure

```
src/three-second/
  scenes.json            editable copy + timings
  config.ts              palette, fonts, safe zones, frame helpers
  ThreeSecondReel.tsx    composition: 7 scenes + audio cues
  components/
    Stage.tsx            light stage with grid, drift and coloured glow
    Caption.tsx          animated Arabic captions (Caption, Tag) with red/green highlights
    Countdown.tsx        deterministic 3.00 → 0.00 timer (ring / pill)
    Marks.tsx            animated red X / green check
    Frames.tsx           Scaled helper
    Showcase.tsx         full-bleed website sheet (scroll/zoom camera) + SiteThumb crops
    Sites.tsx            the three fictional full-width websites (SVG/CSS only, no device frames)
  scenes/
    Hook.tsx  Round.tsx  Results.tsx  Transformation.tsx  Cta.tsx
```

## Assets

- Font: The Year of Handicrafts Regular (client-supplied, single weight) bundled in `public/fonts/TheYearofHandicrafts-Regular.otf`; `font-synthesis: none` keeps it un-bolded, IBM Plex Sans Arabic is only the fallback for Latin URLs/digits it lacks.
- Music: Kevin MacLeod — "Pamgaea" (incompetech.com, CC BY 4.0), trimmed and loudness-normalised to
  `public/audio/music-3s.wav`.
- SFX: synthesised with numpy/ffmpeg (`tick`, `zero`, `success`, `wrong`, `notify`, `swell`, `morph`,
  plus `impact`, `whoosh`, `pop`, `brand` from the shared library) in `public/audio/`.
- Logo: official EA4 lockup `public/img/ea4-logo-full.png`.
