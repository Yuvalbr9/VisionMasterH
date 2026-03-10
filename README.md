# VisionMasterH

## Project Overview
VisionMasterH is a radar-and-navigation workstation simulator built with React, TypeScript, and Vite.

For a preview, enter this link: https://vision-master-h.vercel.app/

It provides a ship-bridge style UI with:
- A live radar canvas (rings, sweep, EBL, VRM, ARPA layer)
- Navigation readouts (HDG, COG, STW, SOG, position, time)
- Operational controls (orientation mode, trails, range stepping, marker tools)

This project is useful for developing and validating radar UI behavior, interaction logic, and navigation math without requiring a live vessel backend.

## Key Features
- Live radar rendering with layered canvas drawing.
- `N UP` and `Head Up` orientation switching.
- EBL/VRM controls with editable numeric inputs and safety clamps.
- Range stepping with synchronized ring spacing and radar scaling.
- Radar point picker workflow:
	- Add multiple markers
	- Drag markers to move
	- Right-click marker context menu (`Replace` / `Delete`)
	- Session-level `Undo`
	- `Cancel` (revert all changes made in current picker session)
	- `x` close (keep current changes)
- Left panel with navigation and time/position formatting.
- Docking tab UI with pre-filled controls and gauges.
- Mock API provider with simulated network delay; optional HTTP provider.

## System Concepts
### Radar / Navigation Terms
- `HDG` (Heading): vessel heading reference.
- `COG` (Course Over Ground): motion direction over ground.
- `STW` (Speed Through Water): through-water speed.
- `SOG` (Speed Over Ground): ground speed.
- `EBL` (Electronic Bearing Line): radial line from center to selected bearing.
- `VRM` (Variable Range Marker): circle at selected range.
- `ARPA`: target boxes, vectors, and optional trails.

### Orientation Modes
- `N UP`: world bearings draw as-is (0 degree points north).
- `Head Up`: all world bearings are rotated by own-ship `HDG`.

### Range and Rings
- Radar uses 6 range rings.
- Ring spacing is `selectedRangeNm / 6`.
- Range steps are discrete: `0.5, 1, 2, 3, 6, 12, 24, 48, 96 NM`.

## How the System Works
### Top-Level State (`src/App.tsx`)
- Owns `navData` and `radarControls`.
- Wires left panel data loading and right/radar controls.
- Owns radar marker state and picker history (`undo`, `cancel session`, `close keep state`).

### Data Flow
- Hooks fetch sidebar resources through a provider abstraction:
	- `useShipCourse`
	- `useShipPosition`
	- `useCurrentDateTime`
- When course data is available, both `HDG` and `COG` are updated from the fetched ship course value.
- Default provider mode is `mock` with ~900ms simulated delay.
- Provider interface supports `mock` and `http` modes.

### Radar Rendering Pipeline
Inside `useRadarCanvas`, the draw order is:
1. Radar background circle
2. Range rings
3. VRM circles
4. Radial lines
5. Echo layer
6. ARPA targets (+ vectors, + trails when enabled)
7. Heading line
8. EBL lines
9. Degree ring labels/ticks
10. User markers (if any)
11. Picker assist ring (when picker active)
12. Rotating sweep beam + trail

## Getting Started
### Prerequisites
- Node.js 18+
- npm 9+

### Install and Run
From project root:

```bash
npm install
npm run dev
```

Open the Vite URL shown in terminal (usually `http://localhost:5173`).

### Build and Preview
```bash
npm run build
npm run preview
```

## How to Use the Main Components
### Left Panel (`Default` tab)
- Displays heading, speed, position, course, SOG decomposition, and UTC time.
- If course API is unavailable, app enters manual navigation mode:
	- HDG and COG become editable via mouse wheel and typed digits (`Enter` to commit).

### Left Panel Tabs
- Tab labels: `Default`, `Docking`, `Environment`, `Route`.
- Implemented content:
	- `Default` -> full navigation view
	- `Docking` -> docking UI view
- Current non-obvious behavior:
	- `Environment` and `Route` currently fall back to `Default` content.

### Radar Display
- Shows HDG/STW/COG/SOG in top info strip.
- Bottom console includes sliders (`Gain/Rain/Sea/Tune`) with wheel, drag, and keyboard support.
- EBL and VRM visuals always map to current range/orientation mode.

### Right Panel
- Functional controls:
	- Orientation toggle (`N UP` / `Head Up`)
	- Trails toggle
	- AIS toggle
	- Chart overlay toggle (state only)
	- Range step arrows
	- Editable EBL1/EBL2/VRM1/VRM2 (bottom corner)
	- MOB card bearing fields update EBL values
- Mostly presentational controls currently (no state effect yet):
	- Several matrix buttons (`Ground Stabilised`, `R Vectors`, `AIS Priority`, `Print`, etc.)
	- Green info panel rows/tabs are static display in current implementation.

### Radar Marker Picker Workflow
- Click `Radar` button in right panel to enter picker mode.
- Left-click radar: add marker.
- Drag marker: move marker.
- Right-click marker: open context menu with `Replace` / `Delete`.
- `Replace`: next left-click sets new location for that marker.
- `Undo`: revert only the last marker-state snapshot.
- `Cancel`: restore marker state from picker-session start, then close.
- `x`: close picker and keep current marker state.

## Important Implementation Details
### Numeric and Input Guardrails
- Bearing normalization handles negative/large values safely and stabilizes near wrap-around.
- Signed-angle normalization avoids JS modulo pitfalls.
- Clamps:
	- EBL: `0..359` degrees
	- VRM: `0..100` NM
- Transient numeric text states are ignored while typing (`''`, `+`, `-`, `.`, `+.` , `-.`).
- Manual HDG/COG typed-entry buffer accepts up to 3 digits, then commits on `Enter`.

### Radar Precision Rules
- EBL line end is projected beyond radius and clipped to circle so visual endpoint lands cleanly on radar edge.
- Range-to-pixel conversion guards invalid or non-finite values.
- Heading line follows `COG` display direction.

### Position and Time Formatting
- Position accepts both decimal and DDM-like formats (for example `4027.269`).
- Display format is DDM with zero padding and direction suffix.
- Time display always renders UTC time text and separately shows source offset badge parsed from ISO string.

### Undo Behavior (non-obvious)
- Marker drag pushes history at drag start, not every frame.
- Result: one `Undo` reverts an entire drag operation.
- Range arrows step through discrete configured values by nearest-step index.

### Input Parsing Rules (non-obvious)
- Elapsed time parsing expects `HH:mm:ss`; invalid values are ignored until corrected.
- Position API can provide decimal degrees or DDM-style numeric values (for example `4027.269`).

## Notes for Developers
### Project Structure
- `src/App.tsx`: app composition and global state wiring.
- `src/components/`: visual modules by area (`LeftPanel`, `RadarDisplay`, `RightPanel`).
- `src/hooks/`: async resource hooks and data adapters.
- `src/api/`: provider abstraction + mock data.
- `src/util/`: pure math/format/parsing functions.
- `src/constants/`: text, units, and numeric configuration.
- `src/types/`: shared domain and API types.

### Recommended Development Pattern
- Keep calculations in `src/util` pure and framework-agnostic.
- Keep UI components focused on rendering + event wiring.
- Introduce shared interactive primitives (for example `GenericSlider`) rather than duplicating control logic.

### Switching to HTTP Data
Default is mock mode. To use real endpoints, set active provider early in app bootstrap:

```ts
import { createShipSidebarDataProvider, setShipSidebarDataProvider } from './api/shipSidebarService';

setShipSidebarDataProvider(
	createShipSidebarDataProvider({ mode: 'http' })
);
```

Expected endpoint paths:
- `/api/ship/course`
- `/api/ship/pos`
- `/api/ship/wave`
- `/api/ship/time`

### Known Gaps
- No test suite is configured yet.
- Some right-panel controls are currently visual-only.
- ARPA targets are empty by default (`defaultArpaTargets = []` in `App.tsx`).
- `useRelativeWaveDirection` hook exists, but wave direction is not currently rendered in UI.
- `STW` is currently static in app state unless you add a real upstream data source.
