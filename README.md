# VisionMasterH

VisionMasterH is a radar/navigation UI simulation built with React, TypeScript, and Vite.

The app includes:
- A radar canvas with N-UP/H-UP orientation.
- Right panel controls for range, overlays, and MOB fields.
- Left panel navigation data and status blocks.
- Utility-first calculation modules (`src/util`) with SOLID-focused structure.

## Tech Stack

- React 18
- TypeScript 5
- Vite 5
- Axios
- unitsnet-js

## Getting Started

Run all commands from the repository root.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Radar Range and RM Behavior

Range display is now tied to the radar circles (range rings) instead of being an isolated UI value.

- Source of truth: `radarControls.selectedRangeNm`
- Ring count: `RADAR_RANGE_RING_COUNT` in `src/util/radarCalculations.ts`
- Ring spacing formula: `selectedRangeNm / RADAR_RANGE_RING_COUNT`
- Right-panel arrows step range using `UI_VALUES.RANGE_CONTROLS.RANGE_STEPS_NM`

This means:
- Radar ring geometry, RM text, and rings text are synchronized.
- Changing range through arrows immediately updates the radar circles and displayed RM/rings values together.

## Data Mode (Mock vs HTTP)

Sidebar data is provided via a provider abstraction in `src/api/shipSidebarService.ts`.

- Default mode is `mock`.
- HTTP mode is available through the same interface.

Example setup:

```ts
import { createShipSidebarDataProvider, setShipSidebarDataProvider } from './api/shipSidebarService';

setShipSidebarDataProvider(createShipSidebarDataProvider({ mode: 'http' }));
```

Expected HTTP endpoints:
- `GET /api/ship/course`
- `GET /api/ship/pos`
- `GET /api/ship/wave`
- `GET /api/ship/time`

## Project Structure

- `src/App.tsx`: top-level composition and shared state.
- `src/components/`: UI components and radar drawing layers.
- `src/hooks/`: async/resource and domain hooks.
- `src/api/`: API client and provider abstraction.
- `src/util/`: pure calculations/parsing/formatting utilities.
- `src/constants/`: static UI text and values.
- `src/types/`: shared TypeScript models.

## Architecture Notes

- Calculation logic is centralized in `src/util`.
- Components focus on rendering and event wiring.
- Async fetch lifecycle is reused through `useAsyncResource`.
- API access follows dependency inversion through provider interfaces.
