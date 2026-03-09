# VisionMasterH

VisionMasterH is a marine radar/navigation interface simulator built with React, TypeScript, and Vite.

It is designed for a desktop-like control experience with a live radar view, navigation panels, and operational controls.

## What This App Does

VisionMasterH simulates a ship radar workstation UI.

- Displays radar visualization with synchronized range/ring behavior.
- Shows live-style navigation information (heading, speed, position, course, SOG, date/time).
- Provides operator controls for radar mode, overlays, range stepping, and MOB workflows.
- Supports a docking-focused operational view via tab switching.

## Highlights

- Radar display with orientation and range behavior.
- Left-side navigation panel (heading, speed, position, course, SOG, date/time).
- Right-side operational panel (mode, trails, range stepping, MOB tools).
- Clean modular architecture with reusable components and utility modules.

## Tech Stack

- React 18
- TypeScript 5
- Vite 5
- Axios
- unitsnet-js

## Quick Start

Run from the project root:

```bash
npm install
npm run dev
```

## Available Scripts

```bash
npm run dev      # Start local development server
npm run build    # Create production build
npm run preview  # Preview production build locally
```

## How to Use

### Main Layout

- **Top bar**: application header and window-style controls.
- **Left panel**: navigation data and status information.
- **Center**: radar canvas and radar overlays.
- **Right panel**: radar mode and operation controls.

### Left Panel Tabs

- **Default tab**: main navigation and ship-state displays.
- **Docking tab**: docking-focused controls and indicators.

### Range & Rings

Range control and ring visualization are synchronized.

- Changing range updates ring spacing and visible ring data consistently.
- The UI values in control sections and radar view stay aligned.

## Responsiveness

The UI uses fluid layout techniques (Grid/Flex, relative units, breakpoints) to stay readable across desktop, tablet, and smaller windows.

## Project Structure

- `src/App.tsx` – top-level app composition.
- `src/components` – UI components and panel/radar modules.
- `src/hooks` – reusable app logic hooks.
- `src/util` – pure calculations, formatting, and parsing.
- `src/constants` – static labels, values, and shared config.
- `src/types` – shared TypeScript contracts.

## Troubleshooting

- If styles look stale after edits, restart the dev server.
- If TypeScript errors appear unexpectedly, run a clean build with `npm run build`.

## Notes for Integrators

- Data access is abstracted behind provider/service interfaces.
- Mock-based development mode is supported out of the box.
- The UI is organized for maintainability, with clear separation between rendering and business logic.
