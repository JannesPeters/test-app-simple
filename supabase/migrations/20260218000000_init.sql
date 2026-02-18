create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Public read" on public.projects
  for select
  using (true);
