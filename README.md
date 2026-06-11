# Bykänsla

Bykänsla är en öppen kodbas för en **digital lokal plattform** för byar och andra lokala sammanhang - en gemensam kärna som ska kunna återanvändas och anpassas utan att skrivas om från grunden. Det här repot är avsett som **startpunkt**: gör en fork, sätt egen identitet och konfiguration för din plats och koppla lokala datakällor via tydliga backend-adapters.

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (ships with Node)
- **Docker** (for running the Postgres database)

## Quick start

Run the API and the web app in **two terminals** from the repository root.

### 1. Database & Backend API

```bash
cd backend
cp .env.example .env
npm install
docker compose up -d
npx prisma migrate dev
npm run dev
```

Default URL: [http://localhost:4000](http://localhost:4000). Health check: [http://localhost:4000/health](http://localhost:4000/health).

### 2. Web app

```bash
cd web
cp .env.example .env
npm install
npm run dev
```

Default URL: [http://localhost:3000](http://localhost:3000).

The Next.js app proxies data through **App Router API routes** (`web/app/api/...`), which call the backend using `BACKEND_URL` (default `http://localhost:4000`). Start the backend first if you use features that depend on it.

### Environment variables

| App | File | Purpose |
| --- | --- | --- |
| Backend | `backend/.env` | `PORT`, `WEATHER_PROVIDER` — see `backend/.env.example` and [backend/README.md](backend/README.md). |
| Web | `web/.env` | `NEXT_PUBLIC_MAPBOX_TOKEN` for the map on the start page. Optional: `BACKEND_URL` (default `http://localhost:4000`), `APP_URL` (default `http://localhost:3000`) for server-side fetches to your own API routes. |

Never commit real secrets; keep them in local `.env` files (they are gitignored where applicable).

## Repository layout

```text
Bykänsla/
├── backend/          # Express API (adapters, modules, routes)
├── web/              # Next.js App Router UI + BFF-style API routes
├── temp-docs/        # Scratch / internal docs (optional)
└── README.md         # This file
```

### Backend (`backend/`)

TypeScript **Express** server with an **adapter** pattern: domain modules depend on contracts (ports); concrete providers (mocks first) are wired through registries and environment variables where switching makes sense.

| Path | Role |
| --- | --- |
| `src/server.ts` | HTTP server entry |
| `src/app.ts` | Express app wiring (middleware, routers) |
| `src/routes/` | HTTP route handlers |
| `src/modules/` | Domain services used by routes |
| `src/adapters/contracts/` | Port interfaces |
| `src/adapters/providers/` | Provider implementations |
| `src/adapters/registry/` | Maps `env` → provider instance |
| `src/config/env.ts` | Typed environment configuration |
| `src/shared/` | Shared HTTP helpers |

**Useful scripts:** `npm run dev`, `npm run dev:watch`, `npm run build`, `npm start`, `npm run lint`.

**HTTP API (current):**

- `GET /health`
- `GET /api/events`
- `GET /api/weather`

Events use a mock provider out of the box; weather uses a mock provider. See [backend/README.md](backend/README.md) for how to add real integrations.

### Forking and adding a backend feature

1. Define a port in `backend/src/adapters/contracts/`.
2. Implement one or more providers under `backend/src/adapters/providers/` (start from `mock-*` as a template).
3. Select the implementation in `backend/src/adapters/registry/` (and extend `backend/src/config/env.ts` if you need env-based switching).
4. Add a route in `backend/src/routes/` and register it in `backend/src/app.ts`.

### Updating the database (Prisma)

When you make changes to the database schema (`backend/prisma/schema.prisma`), you need to create a new migration and apply it:

```bash
cd backend
npx prisma migrate dev --name <migration_name>
```

This will also automatically run `npx prisma generate` to update the generated Prisma Client.

### Web (`web/`)

**Next.js 16** App Router, **React 19**, **Tailwind CSS 4**, **Mapbox GL** where maps are used.

| Path | Role |
| --- | --- |
| `app/page.tsx` | Home / start route |
| `app/layout.tsx` | Root layout |
| `app/*/page.tsx` | Top-level routes (e.g. `event`, `utforska`, `trafik`, `vader`) |
| `app/api/` | Next.js route handlers that forward to the backend |
| `app/modules/` | Feature UI and data hooks per module |
| `app/shared/` | Shared UI, `site.config.ts`, module nav config |
| `app/adapters/` | Client-side adapters (e.g. map provider) |
| `public/` | Static assets |

**Useful scripts:** `npm run dev`, `npm run build`, `npm start`, `npm run lint`.

## Customization & Theming

The web app is built as a generic functional template that can be easily forked and tailored to specific villages or local areas. 

All primary project updates and customizations should be done directly in **`web/app/shared/config/site.config.ts`**. This configuration file controls:
- **Theme & Styling**: Application colors (background, surface, border, buttons, text) and default fonts.
- **Branding & Copy**: Site name, document titles, logos, and default interface text.
- **Geography Settings**: Target area boundaries, map center coordinates, and filtering keywords.

Navigation modules can be ordered and toggled in `web/app/shared/config/modules.ts`.

## Production builds

Backend:

```bash
cd backend
npm run build
npm start
```

Web:

```bash
cd web
npm run build
npm start
```

Set `BACKEND_URL`, `APP_URL`, and any provider keys appropriately for your deployment environment.
