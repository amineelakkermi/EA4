# EA4 promo videos (Remotion)

Remotion 4 project for EA4 brand videos.

## Compositions
- `EA4SeoReel` — 1080×1920 @30fps, 32 s Instagram Reel: "عندك موقع إلكتروني، لكن ما يظهر في نتائج قوقل؟" (5 SEO tips + brand reveal). No voiceover: music + SFX only.

## Commands
```bash
npm install
npm run studio                                   # preview
npx remotion render EA4SeoReel out/reel.mp4      # render
node scripts/stills.mjs 15 120 300               # QA stills -> out/stills/
```

## Assets
- Fonts: IBM Plex Sans Arabic (OFL), Alexandria (OFL) in `public/fonts`.
- Music: Kevin MacLeod — "Inspired" (incompetech.com, CC BY 4.0), trimmed/normalised to `public/audio/music.wav`.
- SFX: synthesised with ffmpeg (`public/audio/*.wav`).
- Logo: `public/img/ea4-logo.png` (from the EA4 repo).

## Structure
- `src/components` — Stage (grey stage + grid), Camera, Card, Type (Headline/Body/StepNumber), Devices (Browser/Phone/Laptop), Logo, Icons.
- `src/components/ui` — SEO interfaces: SearchPage, Dashboard, KeywordPanel, TargetTray, SearchConsole, SiteMockup, ContentEditor, BacklinkNetwork.
- `src/scenes` — one file per scene; `src/SeoReel.tsx` sequences them with `@remotion/transitions` and places the audio cues.
