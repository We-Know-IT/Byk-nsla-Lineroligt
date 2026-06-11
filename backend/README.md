# Bykänsla Backend

Simple TypeScript + Express backend with adapter-based integration boundaries.

## Run

1. Copy `.env.example` to `.env`.
2. Install dependencies:
   - `npm install`
3. Start dev server:
   - `npm run dev`

Server default: `http://localhost:4000`

## Available endpoints

- `GET /health`
- `GET /api/events`
- `GET /api/weather`

## Adapter structure

- `src/adapters/contracts/` — interfaces (ports) consumed by modules
- `src/adapters/providers/` — concrete providers (mock implementations ship with the template)
- `src/adapters/registry/` — wires providers for use by routes/modules

Modules only depend on contracts, not provider internals.

## Providers (shipped defaults)

- **Events:** mock data via `MockEventsAdapter` (`src/adapters/providers/mock-events-adapter.ts`). This demonstrates the pattern without calling external APIs.
- **Weather:** `WEATHER_PROVIDER=mock` (default) — `MockWeatherAdapter`.

## Adding a real provider or new integration

1. Add a class in `src/adapters/providers/` implementing the relevant contract in `src/adapters/contracts/`.
2. Extend `src/config/env.ts` if you need new environment variables or provider names.
3. Update the matching file under `src/adapters/registry/` to construct your provider (e.g. switch on `env` or always return your adapter while developing).
4. Route handlers in `src/routes/` usually stay unchanged if the service API is stable.

No secrets are required for the default mock setup.
