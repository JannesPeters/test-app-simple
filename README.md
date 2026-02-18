# agent-boilerplate

Starter template for AI-assisted web projects with Vite, React, Tailwind, Shadcn UI, and Supabase. Designed to keep setup fast and token-light while still supporting local vs production database workflows.

## Stack
- Vite + React + TypeScript
- Tailwind CSS + Shadcn UI primitives
- Supabase (auth + data)
- Vitest + Testing Library
- ESLint + Prettier

## Local vs production mode
This template uses Vite modes to switch environments.

1. Copy the env templates:
	- .env.development.example -> .env.development
	- .env.production.example -> .env.production
2. Local dev (default):
	- `npm run dev`
3. Dev against production:
	- Ensure `VITE_ALLOW_PROD=true` in .env.production
	- `npm run dev:prod`

## Supabase local dev + migrations
Local database keeps your testing data off production and lets you evolve schema safely.

- Local stack: `npm run supabase:start`
- Reset local DB (apply migrations): `npm run supabase:db:reset`
- Push migrations to production: `ALLOW_PROD_DB_PUSH=true npm run supabase:db:push`

See [supabase/README.md](supabase/README.md) for details.

## Example API wrapper
The template includes a tiny data layer to keep Supabase queries out of components:
- [src/lib/api/projects.ts](src/lib/api/projects.ts)

## Getting started
1. Install deps: `npm install`
2. Configure env files
3. Start dev server: `npm run dev`

## Scripts
- `npm run dev` - local dev mode
- `npm run dev:prod` - dev mode using production Supabase env
- `npm run build` - production build
- `npm run test` - run tests
- `npm run lint` - lint code
- `npm run format` - format code