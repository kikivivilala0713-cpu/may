create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('qna', 'board')),
  title text not null,
  content text not null,
  author text not null default '익명',
  created_at timestamptz not null default now()
);

alter table posts enable row level security;

create policy "Public read access"
  on posts for select
  to anon
  using (true);

create policy "Public insert access"
  on posts for insert
  to anon
  with check (true);
