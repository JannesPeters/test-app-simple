# Supabase local dev

## Setup
1. Install the Supabase CLI.
2. Run `supabase init` at the repo root.
3. Run `supabase start` to boot the local stack.

## Migrations workflow
- Create a new migration: `supabase migration new <name>`
- Apply migrations locally: `supabase db reset`
- Push migrations to production: `ALLOW_PROD_DB_PUSH=true supabase db push`

## Local keys
After `supabase start`, copy the local URL and anon key into your .env.development file.
