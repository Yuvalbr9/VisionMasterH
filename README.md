# VisionMasterH

## React app (Vite + React)

A minimal React app scaffolded with Vite is included in the repository root.

- Install dependencies:

```bash
npm install
```

- Start dev server:

```bash
npm run dev
```

The app entry is `src/main.tsx` and the main component is `src/App.tsx`. Build for production with `npm run build`.


REST API (axios)
-----------------

This app uses `axios` to communicate with a REST API server. The scaffold includes a simple axios instance at `src/services/api.ts` and a hook `src/hooks/useApi.ts`.

- `useApi()` exposes `{ get(url), post(url,payload), loading, error, data }`.
- Example endpoints used in the UI: `POST /navigation/update`, `POST /radar/config`, `POST /radar/ping`, `GET /status`.

Set your API base URL with the `REACT_APP_API_URL` env variable (defaults to `http://localhost:4000`).


