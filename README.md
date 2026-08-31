# KAIZEN VANCE // Lead Video Editor & Colorist Portfolio

A modern, high-performance, cinematic video editor portfolio built with **Vite + React (pure JSX)**, **Tailwind CSS**, **Vitest**, and **Playwright**, featuring design patterns and micro-interactions inspired by [originkit.dev](https://www.originkit.dev/).

---

## 🎬 Features & Components

1. **Cinematic Hero & Master Showreel Player**
   - Live 24.00 FPS studio timecode counter (`TC: 01:24:18:04`)
   - Pulsing `[REC]` live recording indicator
   - Ambient soundscape generator (synthesizes subtle warm studio room tone via Web Audio API)
   - Interactive Showreel Modal with scrubber, custom timecode readout, playback speeds (0.5x, 1x, 1.25x, 1.5x, 2x), 16:9 widescreen vs 9:16 vertical shorts aspect ratio switcher, and timestamped chapter markers.

2. **Interactive DaVinci Resolve Color Grading & LUT Suite**
   - Split-screen comparison slider (Flat RAW LOG sensor footage vs. Master ACES Graded look) with mouse drag and touch support.
   - Preset Switcher: *Kodak 2383 35mm Print Film*, *Neo-Tokyo Teal & Amber*, *Bleach Bypass 90s Thriller*, and *Golden Hour Luxury*.
   - Live Scopes Visualizer: Real-time animated **Waveform Monitor**, **RGB Parade**, and **Vectorscope**.
   - DaVinci Node Graph visualizer: Serial & parallel node breakdown (Exposure, CST, Qualifier, Film Halation & Grain).
   - One-click RAW Bypass toggle.

3. **Filterable Bento Project Showcase & Case Studies**
   - Category filtering: Commercial, Music Video, Narrative, Documentary, Vertical / Reels.
   - Hover video preview streams on each project card with runtime and metric badges.
   - In-depth **Case Study Modal** featuring NLE multitrack blueprint (V1-V4, A1-A4), director quotes, and format specs.

4. **Interactive NLE Multitrack Timeline**
   - Simulates video tracks (V1 Primary Narrative, V2 B-roll, V3 Motion Titles, V4 VFX Passes) and audio tracks (A1 Dialogue, A2 Foley, A3 Music).
   - Draggable playhead with transport Play/Pause controls.
   - Interactive Clip Inspector showing resolution, codec, color space, and effect chain for any clicked clip.

5. **Interactive 5.1 / Dolby Atmos Stems Audio Mixer**
   - 4-Stem audio console: Dialogue & ADR, Foley & Tactical SFX, Atmosphere & Room Tone, Hybrid Cinematic Score.
   - Solo & Mute toggles for each stem.
   - Real-time animated audio frequency visualizers.
   - Volume gain faders and DSP plugin chain descriptions.

6. **Post-Production Gear & Software Specs**
   - DaVinci Resolve Studio 19, Adobe Premiere & After Effects, Avid Media Composer, Pro Tools.
   - Flanders Scientific QD-OLED calibrated monitoring, Tangent color panels, and 120TB SAN storage.

7. **Director & Producer Testimonials**
   - Client endorsements with star ratings from Sony Music, Neon Pictures, Red Bull Media House, and BBC.

8. **Interactive Rate & Project Scope Calculator**
   - Dynamic budget range projector with deliverable selectors, turnaround speed tiers (Rush 48h, Standard 1-2 weeks, Retainer), and finishing add-ons.
   - Seamless transition into the **Editorial Inquiry Booking Modal** with pre-filled scope, validation, confetti celebration (`canvas-confetti`), and toast notifications.

---

## 🛠️ Tech Stack

- **Framework**: Vite 6 + React 18 (JSX)
- **Styling**: Tailwind CSS + Custom origin-kit obsidian dark palette, glowing borders, film grain utilities
- **Icons**: Lucide React
- **Audio & FX**: Web Audio API, Canvas Confetti
- **Unit & Component Testing**: Vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- **End-to-End Testing**: Playwright (Chromium)

---

## 🚀 Quick Start & Scripts

Inside the `video-editor-portfolio` directory:

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:5173)
npm run dev

# Run Vitest unit & component tests
npm run test

# Run Playwright End-to-End tests
npm run test:e2e

# Run production build
npm run build

# Run comprehensive verification suite (Tests + E2E + Build)
npm run verify:all
```

---

## 🧪 Verification Results

- **Vitest**: 19 / 19 tests passed (100%)
- **Playwright**: 6 / 6 E2E flows passed (100%)
- **Vite Build**: 0 errors, 0 warnings

