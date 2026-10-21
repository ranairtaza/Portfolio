# RANA.OS — Interactive Developer Portfolio

> **Digital Universe & Systems Engineering Portfolio** for **Rana Irtaza Ali Khan** — Full-Stack Software Engineer & AI Solutions Architect.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?logo=three.js)](https://threejs.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

---

## 🌌 Overview

**RANA.OS** is a personal portfolio experience engineered to present the technical background, production contributions, and architecture depth of **Rana Irtaza Ali Khan** to international engineering recruiters and prospective clients.

Rather than relying on generic templates, **RANA.OS** is built as an interactive software system with a persistent, non-blocking 3D particle constellation background, responsive glass panels, real-time telemetry, a keyboard command palette, and dedicated technical case studies.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router, Server Components & Dynamic Prerendering)
- **Language**: [TypeScript](https://www.typescriptlang.org) (Strict typing across content, state, and components)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with custom dark tokens, subtle grids, and glassmorphism
- **3D Graphics**: [Three.js](https://threejs.org) with [React Three Fiber (`@react-three/fiber`)](https://github.com/pmndrs/react-three-fiber) & [Drei](https://github.com/pmndrs/drei)
- **Animations & Transitions**: [Motion for React](https://motion.dev)
- **Icons**: [Lucide Icons](https://lucide.dev) + Optimized Native SVG brand marks
- **Deployment**: [Vercel](https://vercel.com) (Edge-ready, automatic sitemap, robots, OpenGraph metadata)

---

## ⚡ Architectural Highlights

1. **Persistent 3D / 2D Background Engine**:
   - Shared across the entire viewport via `pointer-events: none` without intercepting clicks or scroll flow.
   - Interactive mouse pointer parallax and scroll-driven camera rotation.
   - **Performance Optimized**: Restrained node count (140 on High, 70 on Eco), lazy-loaded via `next/dynamic` (`ssr: false`), rendering pauses on tab blur (`document.hidden`).
   - **Adaptive Fallback**: Features an ultralight 2D Canvas engine that triggers automatically for low-power mode, WebGL-disabled environments, or `prefers-reduced-motion`.

2. **System Sections**:
   - **Hero**: Name, status beacon, professional positioning, live PKT telemetry clock (UTC+5), and primary actions.
   - **About & System Inspector**: Narrative, engineering ethos (Type Safety, RLS Isolation, Deterministic AI, Hardware Resilience), and interactive inspector tabs (*Principles*, *Education*, *Stack*).
   - **Featured Projects**:
     - **LeadMachine**: Multi-tenant AI-assisted business SaaS prototype with Supabase RLS and prompt-engineered lead scoring.
     - **KeyAbroad 2.0**: Internal operations platform & student application tracking engine for KeyAbroad Consultants.
     - **Biometric Attendance & HR Integration Engine**: Production hardware-to-cloud bridge syncing biometric fingerprint/face recognition devices to PostgreSQL.
   - **Skills Constellation**: Interactive technology matrix with node inspector showing real-world project links.
   - **Timeline**: Verified professional software engineering at KeyAbroad Consultants & BS Information Technology degree (Completed June 2026, CGPA 3.10 / 4.00).
   - **Tech Radar**: Active explorations across AI agents, SaaS models, cybersecurity, networking, and cloud architectures.
   - **Communications Gateway**: Validated contact form, direct one-click email copy, and operational parameters.

3. **Command Palette (`Ctrl + K` / `Cmd + K`)**:
   - Fully keyboard-accessible dialog for quick navigation, project switching, graphics engine toggling, and copying contact info.

4. **Technical Case Study Routes (`/projects/[slug]`)**:
   - Dedicated routes for `/projects/leadmachine`, `/projects/keyabroad`, and `/projects/biometric-attendance`.
   - Comprehensive breakdowns covering Problem Statement, Architecture Blueprint, End-to-End Data Flow, Engineering Challenges, and Roadmaps.

5. **SEO & Accessibility**:
   - Dynamic `sitemap.xml` and `robots.txt` generation.
   - Full OpenGraph and Twitter card defaults.
   - `Person` & `WebSite` JSON-LD structured data embedded.
   - Accessible ARIA dialog semantics, high contrast ratios, and keyboard focus states.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18.18+` or `v20+` (tested on Node v24)
- npm `v9+` or `v10+`

### Installation

```bash
# Clone the repository
git clone https://github.com/rana-irtaza/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Verification & Production Build

```bash
# Run ESLint checks
npm run lint

# Compile production bundle and typecheck
npm run build

# Start production server locally
npm run start
```

---

## 🌐 Deploy to Vercel

The application is pre-configured for instant zero-configuration deployment on Vercel:

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial release of RANA.OS interactive developer portfolio"
   git remote add origin https://github.com/rana-irtaza/portfolio.git
   git push -u origin master
   ```
2. Import the repository in your [Vercel Dashboard](https://vercel.com/new).
3. Framework Preset: **Next.js**.
4. Click **Deploy**.

---

## 📄 License & Content Integrity

All architectural diagrams, project details, and educational credentials reflect authentic work by **Rana Irtaza Ali Khan** (BS IT, June 2026, CGPA 3.10 / 4.00). Content is maintained in `src/data/portfolio.ts`.
