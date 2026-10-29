-- Optional future persistence for employer-side preflight records.
-- The public Week 12 demo does not execute this migration or write user data.

create table if not exists public.venture_preflights (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  opening_reference text not null check (char_length(opening_reference) between 3 and 80),
  commitment_state text not null check (commitment_state in ('draft', 'accepted', 'withdrawn')),
  created_at timestamptz not null default now()
);

alter table public.venture_preflights enable row level security;

create policy "owners read their preflights"
on public.venture_preflights for select
to authenticated
using ((select auth.uid()) = owner_id);

create policy "owners create their preflights"
on public.venture_preflights for insert
to authenticated
with check ((select auth.uid()) = owner_id);

create policy "owners update their preflights"
on public.venture_preflights for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "owners delete their preflights"
on public.venture_preflights for delete
to authenticated
using ((select auth.uid()) = owner_id);
