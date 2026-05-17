# Modern Snake Game

A responsive, visually polished remake of the classic Snake arcade game. Built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

Browser-based — no install required. Targets smooth 60 FPS gameplay on desktop and mobile.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

## Tech Stack

| Technology   | Purpose              | Status   |
| ------------ | -------------------- | -------- |
| Next.js 16   | Framework            | In place |
| React 19     | UI                   | In place |
| TypeScript   | Type safety          | In place |
| Tailwind CSS | Styling              | In place |
| Zustand      | State management     | Done     |
| Framer Motion| UI animations        | Done     |
| Howler.js    | Audio                | Planned  |
| HTML5 Canvas | Game rendering       | Done     |

## Architecture

```
Presentation Layer  →  screens, HUD, settings
Game Engine Layer →  grid, snake, food, collisions (pure TS, testable)
State Management  →  Zustand + game FSM
Persistence Layer →  localStorage → API/DB (later)
```

### Target Folder Structure

```
src/
├── app/
├── components/
│   ├── game/       # GameBoard, Snake, Food, Controls
│   ├── ui/
│   └── layouts/
├── hooks/
├── lib/game/       # pure engine (no React)
├── store/
├── types/
├── constants/
├── utils/
└── assets/
```

## Project Roadmap

**Current status:** Phase 0 and Phase 1 (MVP) are implemented — playable game with canvas rendering, keyboard/touch controls, local scores, settings, and three game modes.

### North Star

| Goal              | Definition of done                                              |
| ----------------- | --------------------------------------------------------------- |
| Playable MVP      | Classic snake on canvas, keyboard, score + local high score     |
| Polished product  | Themes, audio, mobile controls, multiple modes & food types     |
| Platform-ready    | Online leaderboards, accounts, optional multiplayer             |

---

### Phase 0 — Foundation (≈ 3–5 days)

Lock structure and conventions before gameplay.

| #   | Task                         | Deliverable                          |
| --- | ---------------------------- | ------------------------------------ |
| 0.1 | Restructure folders + aliases| `src/` layout, `@/` imports          |
| 0.2 | Add core dependencies        | Zustand, Framer Motion; plan Howler  |
| 0.3 | Design tokens & theme        | Neon/cyberpunk palette, dark mode    |
| 0.4 | Game types & constants       | `Direction`, `GameState`, grid, ticks|
| 0.5 | Routing shell                | splash → menu → play → settings      |
| 0.6 | Metadata & branding          | Title, favicon, OG image             |

**Exit:** Placeholder screens navigate correctly; empty testable `GameEngine` module exists.

---

### Phase 1 — MVP (≈ 2–3 weeks)

Core gameplay, desktop controls, local scores.

#### Milestone 1.1 — Game Engine

- Grid-based snake movement; prevent reverse direction
- Wall and self collision
- Food spawn (never on snake); grow snake; +1 score
- Gradual speed increase
- FSM: `Idle → Starting → Playing → Paused → GameOver`

**Exit:** Engine runs in isolation with unit tests.

#### Milestone 1.2 — Canvas Gameplay

- `GameBoard` canvas + game loop (~60 FPS)
- Render snake and food
- Keyboard: Arrow keys + WASD
- Pause (P / Esc)

**Exit:** Playable classic mode on desktop; game over on wall/self collision.

#### Milestone 1.3 — UI Screens (MVP)

| Screen      | Priority |
| ----------- | -------- |
| Main menu   | P0       |
| Gameplay HUD| P0       |
| Pause menu  | P0       |
| Game over   | P0       |
| Splash      | P1       |
| Settings    | P1       |
| Leaderboard | P1 (local only) |

#### Milestone 1.4 — Score & Persistence

- Real-time score HUD
- High score in `localStorage`
- Difficulty presets: Easy, Medium, Hard, Insane

**Phase 1 ship:** Open site → play classic snake → score/high score → pause/restart (desktop OK).

---

### Phase 2 — Enhanced Experience (≈ 3–4 weeks)

Visual polish, audio, mobile, gameplay depth.

#### Milestone 2.1 — Visual Polish

- Neon / glassmorphism UI, dark mode
- Framer Motion: menus, game over, food pop, score bump
- Snake movement interpolation between grid cells
- Theme system (2+ themes, colorblind-friendly option)

#### Milestone 2.2 — Audio

- Howler.js: eat, collision, UI sounds, background music
- Settings: mute, SFX/music volume

#### Milestone 2.3 — Mobile & Responsive

- Responsive canvas scaling; full-screen mobile; landscape
- Swipe gestures and virtual D-pad
- Touch input latency tuning

#### Milestone 2.4 — Gameplay Depth

**Food variants:**

| Food        | Effect                    |
| ----------- | ------------------------- |
| Normal      | +1 score                  |
| Speed       | Temporary speed boost     |
| Slow        | Slows snake               |
| Bonus       | Extra points              |
| Shrink      | Reduces snake size        |

**Game modes:** Classic, Endless (wrap or no walls), Timed.

**Also:** Combo scoring and multipliers.

**Phase 2 ship:** Modern arcade feel on phone and desktop; settings persist.

---

### Phase 3 — Online & Competitive (≈ 4–6 weeks)

#### Milestone 3.1 — Backend

- Supabase/Firebase or Next API + PostgreSQL
- `GET /api/leaderboard`, `POST /api/score`
- Leaderboard screen; rate limiting and input validation

#### Milestone 3.2 — Accounts

- Auth (`login` / `register`)
- Username on score rows; filter by game mode

#### Milestone 3.3 — Multiplayer / AI (post-launch)

- Local hot-seat 2P (medium priority)
- Real-time multiplayer via WebSocket (low priority)
- AI opponent (backlog)

**Phase 3 ship:** Global leaderboard; cloud personal bests.

---

### Phase 4 — Growth (backlog)

- Achievements and daily challenges
- Replay / spectator mode
- Social sharing
- Maze, Survival, AI Battle modes
- Analytics (session duration, retention)

---

## Dependencies (build order)

```
Phase 0 (Foundation)
    → Engine Core
        → Canvas + Loop
            → Menus + HUD
                → Local Scores
                    → Food Variants + Modes
                    → Audio + Themes
                    → Mobile Controls
                        → Backend APIs
                            → Online Leaderboard
```

## Quality Gates

| Area           | Target                                      |
| -------------- | ------------------------------------------- |
| Performance    | ~60 FPS on mid-range mobile                 |
| Input          | &lt; 50 ms perceived input lag              |
| Testing        | Unit tests for engine; smoke play-through   |
| Browsers       | Chrome, Firefox, Safari, Edge               |
| Accessibility  | Keyboard nav, focus states, contrast themes |

## Risks & Mitigations

| Risk                 | Mitigation                                      |
| -------------------- | ----------------------------------------------- |
| Performance lag      | Separate simulation tick from render            |
| Mobile input delay   | Dedicated touch path; light move handlers       |
| State bugs           | Single Zustand store + pure reducers            |
| Browser quirks       | Cross-browser pass at end of each phase           |

## Out of Scope (initial releases)

- Native mobile apps
- VR/AR
- Blockchain / NFT
- In-app purchases

## Immediate Next Steps

1. Phase 0: `src/lib/game/` types + stub engine; Zustand store with `GameState`
2. Phase 1.1: Grid snake, collisions, one food type, tests
3. Phase 1.2: `GameBoard` client component + keyboard hook
4. Phase 1.3: Main menu → play → game over flow

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Deploy on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)
