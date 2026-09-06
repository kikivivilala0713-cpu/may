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

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  content text not null,
  author text not null default '익명',
  created_at timestamptz not null default now()
);

alter table comments enable row level security;

create policy "Public read access"
  on comments for select
  to anon
  using (true);

create policy "Public insert access"
  on comments for insert
  to anon
  with check (true);
