# Finland Doesn't Exist — Slideshow Design

## Overview

An animated presentation at `/finland` debunking the existence of Finland, to be delivered live with Swedish Fish as a prop. Click-to-advance, 10 slides, built with Framer Motion.

## Architecture

- Route: `app/finland/page.tsx` with `'use client'` directive
- Slide data: `app/finland/slides.ts` — array of slide objects (id, label, headline, body, variant)
- Components:
  - `<SlideShow>` — manages current index, keyboard/click handlers, progress bar
  - `<Slide>` — receives slide data + `isActive`, handles its own Framer Motion entrance animations
  - Special variants for slides 9 and 10 (dramatic zoom and curtain reveal)
- Navigation: click anywhere, spacebar, left/right arrow keys

## Visual Design

**Palette** (Swedish Fish box):
- Background: `#CC0000` (deep red)
- Accent / progress bar: `#FFD700` (golden yellow)
- Text: `#FFF8F0` (off-white)

**Typography:**
- Headlines: Bebas Neue (already in project)
- Body: Inter

**Layout:** Full-screen slides, content centered, lots of whitespace. Consistent structure per slide: small label at top, big headline, supporting text or visual below.

**Progress bar:** Thin golden yellow bar fixed to the bottom, animates width from 0% to 100% as slides advance.

## Slide Content

| # | Label | Headline | Notes |
|---|-------|----------|-------|
| 1 | — | FINLAND DOES NOT EXIST | Fish swims in on entrance |
| 2 | THE BRIEFING | You've been lied to your whole life. | Staggered text reveal |
| 3 | POST-WWII, 1945 | Japan needs fish. Russia needs money. A deal is struck. | |
| 4 | THE PLAN | They invent a country. They call it Finland. | "What do fish have? Fins." animates in last |
| 5 | NOKIA | Japan's biggest Nokia importer. No one in Japan owns a Nokia. Where does it go? | "The fish." slams in |
| 6 | THE RAILWAY | The Trans-Siberian Railway: 9,289km. Built to move "Nokia products" from the Baltic to Japan. | |
| 7 | THE NAME | "Suomi" means swamp land. Because that's what Sweden's eastern wetlands actually are. | |
| 8 | TOO PERFECT | #1 happiness. #1 education. #1 coffee consumption. | Stats stagger in one by one |
| 9 | THE TRUTH | THE TRUTH IS FINNLY VEILED | Dramatic zoom entrance |
| 10 | WAKE UP | The Swedish Fish in your hand is the only Finland that's real. | Slow red curtain reveal |

## Animations

- **Slide transition:** horizontal slide + fade via Framer Motion `AnimatePresence`
- **Within-slide:** headline enters first, body staggers in after (100-150ms delay)
- **Title slide fish:** wiggles/swims in using keyframe animation
- **Slide 8 stats:** each stat line staggered with 200ms between
- **Slide 9:** zoom from 80% scale with fade
- **Slide 10:** red curtain wipes down to reveal content
- **Progress bar:** Framer Motion `motion.div` width animated on slide change
