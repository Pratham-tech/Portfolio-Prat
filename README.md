# Pratham Dang — Personal Portfolio

A personal portfolio website built with **Next.js 14**, **Tailwind CSS**, and **Supabase** — designed to communicate technical skills and projects clearly to recruiters and hiring managers.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Animations | CSS + Intersection Observer |
| Contact Form | Supabase (PostgreSQL) |
| Deployment | Vercel |
| Fonts | Syne (display) · DM Sans (body) · DM Mono (code) |

## Design System

| Token | Value |
|-------|-------|
| Background | `#0B0E14` (Deep Obsidian) |
| Card surfaces | `#161B22` (Graphite Layer) |
| Primary accent | `#00BAC2` (Deep Cyan) |
| Complementary | `#0AFF99` (Electric Seafoam) |
| Typography | `#E6EDF3` (Vapor White) |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

Create a project at [supabase.com](https://supabase.com), then run this SQL in the Supabase SQL editor:

```sql
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Optional: enable Row Level Security
alter table contact_messages enable row level security;

-- Allow inserts from anonymous users (for the contact form)
create policy "Allow anonymous inserts" on contact_messages
  for insert with check (true);
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # optional, for server-side ops
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Main page assembling all sections
│   ├── globals.css         # Global styles, animations, utilities
│   └── api/
│       └── contact/
│           └── route.ts    # Contact form API endpoint (Supabase)
├── components/
│   ├── Navbar.tsx          # Sticky navbar with active section tracking
│   ├── Hero.tsx            # Landing hero with animated skill tags
│   ├── About.tsx           # Bio + skills grid
│   ├── Experience.tsx      # Timeline of roles + volunteering
│   ├── Projects.tsx        # Detailed project cards
│   ├── Achievements.tsx    # Awards, certifications, competitions
│   ├── Contact.tsx         # Contact form + social links
│   ├── Footer.tsx          # Minimal footer
│   └── ScrollObserver.tsx  # Intersection Observer for scroll animations
├── .env.example            # Environment variable template
├── tailwind.config.js      # Custom design tokens
└── next.config.js
```

## Deployment to Vercel

1. Push this repo to GitHub
2. Import into [vercel.com](https://vercel.com)
3. Add environment variables in the Vercel dashboard (Settings → Environment Variables)
4. Deploy — Vercel auto-detects Next.js

## Personalisation Checklist

Before going live, update the following:

- [ ] Replace `YOUR_PHONE_NUMBER` in `Contact.tsx` if you want to add a phone number
- [ ] Update GitHub repo links in `Projects.tsx` once projects are published
- [ ] Add a real profile photo (place in `/public/avatar.jpg` and update `Hero.tsx`)
- [ ] Set up Supabase table and add `.env.local` credentials
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` and keys to Vercel environment variables

## Sections

| # | Section | Purpose |
|---|---------|---------|
| 01 | Hero | First impression — name, title, value statement, CTAs |
| 02 | About | Bio, academic background, skills grid |
| 03 | Experience | Timeline: mentoring, robotics club, GIIS Tech Club |
| 04 | Projects | Stock prediction, churn prediction, robotics competition |
| 05 | Achievements | Awards, scholarships, certifications |
| 06 | Contact | Form (Supabase) + social links |
