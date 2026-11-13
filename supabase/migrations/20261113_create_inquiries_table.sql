-- HimYatra Supabase Backend Schema
-- Creates the 'inquiries' table to store tour and travel inquiries with Row Level Security

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  departure_city text default 'Delhi NCR',
  travel_date text,
  travelers text default '2 Travelers',
  notes text,
  tour_name text not null,
  price_display text,
  state_region text default 'Himachal Pradesh & Uttarakhand',
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;

-- Policy 1: Allow public visitors (anon users) to submit inquiries from the website form
create policy "Allow anonymous website inquiry submissions"
  on public.inquiries
  for insert
  to anon
  with check (true);

-- Policy 2: Allow authenticated admins / team members to view all inquiries
create policy "Allow authenticated team members to read all inquiries"
  on public.inquiries
  for select
  to authenticated
  using (true);

-- Create helpful indices for dashboard sorting & searching
create index if not exists idx_inquiries_created_at on public.inquiries (created_at desc);
create index if not exists idx_inquiries_phone on public.inquiries (phone);
create index if not exists idx_inquiries_status on public.inquiries (status);
