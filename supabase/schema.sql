-- Uruchom ten skrypt w Supabase: SQL Editor > New query.
-- Następnie w Authentication > Providers włącz "Anonymous sign-ins".

create table if not exists public.memories (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  author text not null check (char_length(author) between 1 and 30),
  message text not null check (char_length(message) between 1 and 360),
  photo_path text,
  approved boolean not null default false
);

alter table public.memories enable row level security;

create policy "Odwiedzający widzą zatwierdzone wpisy"
on public.memories for select
to anon, authenticated
using (approved = true or user_id = auth.uid());

create policy "Zalogowany anonimowo gość tworzy własny wpis"
on public.memories for insert
to authenticated
with check (user_id = auth.uid() and approved = false);

create policy "Autor usuwa swój niezatwierdzony wpis"
on public.memories for delete
to authenticated
using (user_id = auth.uid() and approved = false);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lucky-wheat-photos',
  'lucky-wheat-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Każdy widzi opublikowane pliki zdjęć"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'lucky-wheat-photos');

create policy "Gość dodaje zdjęcie tylko do swojego katalogu"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'lucky-wheat-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Gość usuwa swoje zdjęcie"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'lucky-wheat-photos'
  and owner_id = (select auth.uid()::text)
);

-- Zatwierdzanie wpisu odbywa się ręcznie w Table Editor: memories > approved = true.
