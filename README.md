# Shubhang Mishra — Portfolio

> Full Stack Developer · AI Engineer Enthusiast · UI/UX Designer

A cinematic, Spider-verse inspired developer portfolio built with Next.js 14, Tailwind CSS, and Framer Motion. Designed to feel alive — every interaction is intentional.

**Live:** [shubhang.vercel.app](https://shubhang.vercel.app)

---

## What's inside

**Pages**
- `/` — Main portfolio (Hero, About, Skills, Projects, Journey, Testimonials, Contact)
- `/projects/[slug]` — Individual project case studies
- `/admin/messages` — Admin view for contact messages

**Features**
- Cinematic entry animation with logo + video sequence
- Spider-verse themed design system (red, dark blue, neon cyan)
- Custom GPU-accelerated cursor with ring trail
- Swinging spider decoration that responds to scroll
- Command palette (`⌘K`) for quick navigation
- 3D tilt cards with glare effect on projects
- CarbonChain APK direct download with confirmation modal
- Contact form → saves to Supabase + sends email notification to Gmail
- Reviews section — submit, edit, delete your own review (token-based, no login)
- Fully responsive, mobile-optimised

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Email | Nodemailer + Gmail |
| UI Components | Radix UI + shadcn/ui |
| Icons | Lucide React |
| Fonts | Russo One, Orbitron, Inter |
| Deployment | Vercel |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `GMAIL_USER` | Gmail address for sending notifications |
| `GMAIL_APP_PASSWORD` | Gmail App Password (not your login password) |
| `NOTIFY_EMAIL` | Email address to receive contact form messages |
| `ADMIN_KEY` | Secret key for `/admin/messages` access |
| `NEXT_PUBLIC_BASE_URL` | Production URL of the site |

---

## Database Schema (Supabase)

```sql
-- Contact messages
create table contact_messages (
  id text primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Reviews
create table reviews (
  id text primary key,
  token text not null,
  name text not null,
  place text not null,
  review text not null,
  rating int default 5,
  approved boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz
);
```

---

## Projects Featured

| Project | Stack | Status |
|---------|-------|--------|
| ECOMON | React, Node.js, Gemini API, MongoDB | Prototype · SIH |
| EcoInnovate | React, Node.js, OpenAI, TensorFlow | In Development |
| CarbonChain | Flutter, Supabase, Vertex AI | Hackathon Build |
| Pulse Analytics | Next.js, ClickHouse, GPT-4o | Internal tool |
| Motion Kit | React, Framer Motion | Open source |
| Codex Agent | Python, Anthropic, LangGraph | Research → Prod |

---

## Contact

- **Email** — [mishrashanu233@gmail.com](mailto:mishrashanu233@gmail.com)
- **LinkedIn** — [shubhang-mishra](https://www.linkedin.com/in/shubhang-mishra/)
- **GitHub** — [shubhang1022](https://github.com/shubhang1022)

---

*Built with obsession for motion, systems and soul.*
