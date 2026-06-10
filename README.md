<div align="center">

<img src="src/assets/logos/logo.png" alt="TradeFlink Logo" width="200" />

# TradeFlink

**Global Trade Finance Platform for SMEs**

A modern, fully animated trade finance web application built with React 19 and Vite — connecting exporters, importers, and investors across 70+ countries.

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38-EF0082?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![React Router](https://img.shields.io/badge/React_Router-7.15-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com)

</div>

---

## Overview

TradeFlink is a B2B fintech platform that solves one of the most pressing challenges for global SMEs — **cash flow gaps caused by delayed payments**. By digitising trade finance instruments such as export factoring, invoice financing, supply chain finance, and open account trade, TradeFlink gives businesses instant access to working capital against their receivables.

The platform serves three core audiences:

| Audience | Problem Solved |
|---|---|
| **Exporters** | Unlock cash tied up in unpaid export invoices |
| **Importers / Manufacturers** | Optimise working capital and extend supplier payment terms |
| **Investors** | Access short-duration, credit-insured trade receivable assets with 12%+ target returns |

---

## Key Stats

| Metric | Value |
|---|---|
| Trade Financed | $250M+ |
| SMEs Served | 500+ |
| Countries Covered | 70+ |
| Global Offices | 6 |
| Customer Satisfaction | 98% |
| Average Advance Rate | 90%+ |
| Average Funding Speed | 3 days |

---

## Features

### Products
- **Export Factoring** — Finance export invoices, transfer buyer default risk, and receive up to 90%+ of invoice value within days
- **Invoice Financing** — Convert unpaid domestic or international invoices into immediate cash (95% advance rate, 24-hour disbursement)
- **Supply Chain Finance** — Let importers extend payment terms while suppliers get paid early
- **Open Account Trade** — Risk management, buyer credit assessment, and payment guarantee facilities for open account transactions

### Platform Capabilities
- AI-powered risk scoring and instant invoice verification
- Real-time investor dashboard with portfolio analytics
- Multi-currency support (USD, EUR, GBP, AED, INR, and more)
- Automated buyer collection and reconciliation
- Off-balance-sheet, non-recourse financing options
- Confidential facilities — buyers are not notified

### UI & UX
- Premium motion design powered by Framer Motion (entrance animations, parallax, 3-D tilt cards, shimmer sweeps)
- Glassmorphic modals and cards
- Responsive layout — mobile-first, works across all screen sizes
- Animated contact form with 30-country phone code selector and WhatsApp integration
- Particle and ambient glow effects for immersive hero sections

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Full landing page — hero, stats, services, solutions, testimonials, FAQ, CTA |
| `/about` | About | Company story, core values, milestones timeline, and global offices |
| `/exporters` | Exporters | Dedicated hub for export businesses with how-it-works and benefits |
| `/export-factoring` | Export Factoring | Product deep-dive for export factoring |
| `/invoice-financing` | Invoice Financing | Detailed invoice financing product page with visual flow |
| `/supply-chain-finance` | Supply Chain Finance | Supply chain financing for importers and suppliers |
| `/open-account-trade` | Open Account Trade | Open account trade risk and payment solutions |
| `/investors` | Investors | Investment opportunity, products, returns, and investor stories |
| `/case-studies` | Case Studies | Real SME stories across 4 product categories with filterable cards |
| `/contact` | Contact | Animated form, office map, FAQs, WhatsApp quick-connect |
| `/privacy-policy` | Privacy Policy | Legal |
| `/terms-and-conditions` | Terms & Conditions | Legal |
| `/cookie-policy` | Cookie Policy | Legal |
| `*` | 404 | Branded not-found page |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 12 |
| Routing | React Router DOM 7 |
| Icons | Lucide React |
| Font | Clash Display (custom), system-ui |
| Linting | ESLint 10 + react-hooks + react-refresh |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **yarn** / **pnpm**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/tradeflink.git
cd tradeflink

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | Bundle for production (`dist/`) |
| Preview | `npm run preview` | Serve the production build locally |
| Lint | `npm run lint` | Run ESLint across the source tree |

---

## Project Structure

```
tradeflink/
├── public/                         # Static assets served as-is
├── src/
│   ├── assets/
│   │   ├── images/                 # Page banners and section images (WebP/JPG)
│   │   └── logos/                  # Brand and partner logos
│   │
│   ├── components/
│   │   ├── Navbar/                 # Global navigation bar
│   │   ├── Footer/                 # Global footer
│   │   ├── ContactModal/           # Navbar "Contact Us" popup form
│   │   ├── Partners/               # Partner logo carousel
│   │   └── ScrollToTop/            # Floating scroll-to-top button
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx          # Navbar + main content + Footer wrapper
│   │
│   ├── Pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Sections/           # Hero, Stats, About, Vision, Mission,
│   │   │                           # Values, Services, Solutions, Testimonials,
│   │   │                           # FAQ, CTA, Footer
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Investors/
│   │   ├── CaseStudies/
│   │   ├── Exporters/
│   │   ├── ExportFactoring/
│   │   ├── SupplyChainFinance/
│   │   ├── OpenAccountTrade/
│   │   ├── InvoiceFinancing/
│   │   ├── PrivacyPolicy/
│   │   ├── TermsAndConditions/
│   │   ├── CookiePolicy/
│   │   └── NotFound/
│   │
│   ├── routes/
│   │   └── index.jsx               # Centralised route definitions
│   │
│   ├── App.jsx
│   ├── index.css                   # Global styles, design tokens, animations
│   └── main.jsx
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## Design System

### Brand Colours

| Token | Hex | Usage |
|---|---|---|
| Primary | `#1C96BF` | Buttons, links, highlights, gradients |
| Secondary | `#0ea5e9` | Gradient partner, hover accents |
| Dark | `#0f172a` | Body text, dark section backgrounds |
| Slate | `#64748b` | Secondary text |
| Muted | `#94a3b8` | Placeholder text, borders |

### Global CSS Utilities

| Class | Description |
|---|---|
| `.btn-brand` | Primary CTA button with gradient and pill shape |
| `.text-gradient` | Teal-to-sky inline gradient text fill |
| `.section` | Consistent vertical padding for page sections |
| `.container-xl` | Max-width centred content wrapper |
| `.glass` | Glassmorphic card style |
| `.bg-dots` | Radial dot-grid decorative background |

---

## Global Offices

| City | Country | Role |
|---|---|---|
| Dubai | UAE | MENA Headquarters |
| New Delhi | India | South Asia Hub |
| Kolkata | India | Operations Centre |
| Wilmington, Delaware | USA | Americas |
| London | UK | Europe |
| Istanbul | Turkey | EMEA Bridge |

---

## Contact

- **General enquiries:** info@tradeflink.com
- **Support:** support@tradeflink.com
- **Phone / WhatsApp:** +91 70036 34890
- **Website:** [tradeflink.com](https://tradeflink.com)

---

## License

This project is proprietary. All rights reserved © TradeFlink. Unauthorised copying, distribution, or modification is strictly prohibited.
