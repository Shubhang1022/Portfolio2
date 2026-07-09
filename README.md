# Shubhang Mishra — Portfolio

> Full Stack Developer · AI Engineer · UI/UX Designer

A cinematic, Spider-verse inspired developer portfolio built with Next.js 14, Tailwind CSS, and Framer Motion. Designed to feel alive — every interaction is intentional.

**Live:** [shubhang.vercel.app](https://shubhang.vercel.app)

---

## What's inside

**Pages**
- `/` — Main portfolio (Hero, About, Skills, Projects, Journey, Testimonials, Contact)
- `/projects/[slug]` — Individual project case studies with metrics, highlights, and stack breakdown
- `/admin/messages` — Admin view for contact form submissions

**Features**
- Cinematic entry animation with logo + video sequence
- Spider-verse themed design system (red, dark blue, neon cyan)
- Custom GPU-accelerated cursor with ring trail
- Swinging spider decoration that responds to scroll
- Command palette (`⌘K`) for quick navigation
- 3D tilt cards with glare effect on projects — mouse and touch supported
- CarbonChain APK direct download with confirmation modal
- Contact form → saves to Supabase + sends email notification via Gmail
- Reviews section — submit, edit, delete your own review (token-based, no login needed)
- Coming Soon locked cards for ongoing projects (Nexora)
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

## Tools of the Trade

`React` `Next.js` `Tailwind` `JavaScript` `TypeScript` `Python` `Node.js` `FastAPI` `Flutter` `Dart` `Java` `Figma` `Supabase` `Docker` `AWS` `Vercel` `Git` `FAISS` `LangChain` `RAG` `Framer Motion`

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

| Project | Tagline | Stack | Role | Status |
|---------|---------|-------|------|--------|
| **ECOMON** | Gamified Environmental Education Platform | React.js, Node.js, Gemini API, MongoDB, Tailwind | Full Stack · AI Integration | Prototype · SIH Submission |
| **EcoInnovate** | Turn e-waste into smart innovation | React.js, Node.js, OpenAI API, TensorFlow, Redis | Full Stack AI Developer | Live |
| **CarbonChain** | AI-Powered Carbon Tracking for Supply Chains | Flutter, Node.js, Supabase, Google Maps API, Vertex AI | Founding Engineer · Full Stack · AI | Prototype · Hackathon Build |
| **Drugify** | Smart AI-driven drug safety companion | Next.js, OpenAI API, Tailwind CSS | Full Stack | Live |
| **HireMind AI** | AI Recruiter Copilot — Automate screening, rank smarter | React.js, FastAPI, Supabase, FAISS, Sentence Transformers, Docker | Full Stack · AI/ML Engineer | Live |
| **Nexora** | Peer-to-Peer Internet Relay Platform | Flutter, Dart, Riverpod, Supabase, Node.js, Socket.IO, WebRTC | Full Stack · Mobile · System Architect | 🔒 Coming Soon |

### Links
- ECOMON — [Live](https://ecomon-ten.vercel.app)
- EcoInnovate — [Live](https://ecoinnovate.lovable.app)
- CarbonChain — APK Download (available on portfolio)
- Drugify — [Live](https://drugify.netlify.app)
- HireMind AI — [Live](https://hiremind-gilt.vercel.app)
- Nexora — Under Active Development

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Fill in your Supabase and Gmail credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

---

## Contact

- **Email** — [mishrashanu233@gmail.com](mailto:mishrashanu233@gmail.com)
- **LinkedIn** — [shubhang-mishra](https://www.linkedin.com/in/shubhang-mishra/)
- **GitHub** — [shubhang1022](https://github.com/shubhang1022)

---

*Built with obsession for motion, systems and soul.*
