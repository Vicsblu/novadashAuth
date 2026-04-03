# NovaDash Auth

Authentication UI for NovaDash — built with React + Vite. Includes a login form, a 3-step signup flow with plan selection, animated left panel with social proof, and a matching dark theme.

## Tech Stack

| Tool | Role |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Lucide React | Icon set |
| Tailwind CSS | Utility CSS (available for extension) |
| Vercel | Deployment target |

## Project Structure

```
novadash-auth/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   ├── theme.js          # Single source of truth for all colour tokens
│   │   └── content.js        # STATS, TESTIMONIALS, PLANS, ORBS, METRIC_CARDS
│   ├── hooks/
│   │   └── index.js          # useTestimonialRotation, useLoginForm, useSignupForm
│   ├── components/
│   │   ├── GridBackground.jsx # Animated grid + glow + floating orbs
│   │   ├── PreviewCards.jsx   # DashboardPreviewCard, MetricMiniCard
│   │   ├── UI.jsx             # Field, PasswordStrength, PrimaryBtn, SocialBtn,
│   │   │                      # Divider, PlanCard, SuccessScreen
│   │   └── LeftPanel.jsx      # Hero, floating cards, stats row, testimonial carousel
│   ├── forms/
│   │   ├── LoginForm.jsx      # Email + password login with success state
│   │   └── SignupForm.jsx     # 3-step signup: info → password → plan
│   ├── NovaDashAuth.jsx       # Root shell — manages login/signup view
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles, fonts, keyframe animations
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── vercel.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Deploy to Vercel

Push to GitHub, then import at [vercel.com](https://vercel.com) — the `vercel.json` handles the SPA rewrite automatically.

Or via CLI:

```bash
npm i -g vercel
vercel
```

## Customisation Guide

| What to change | File |
|---|---|
| All colours / tokens | `src/data/theme.js` |
| Stats, testimonials, plans | `src/data/content.js` |
| Login validation rules | `src/hooks/index.js` → `useLoginForm` |
| Signup steps / validation | `src/hooks/index.js` → `useSignupForm` |
| Left panel visuals | `src/components/LeftPanel.jsx` |
| Form fields & buttons | `src/components/UI.jsx` |
| Keyframe animations | `src/index.css` |

## Connecting to NovaDash Dashboard

This project pairs with the **NovaDash dashboard** (`novadash.zip`). After a successful login/signup the `success` state fires — swap the `setTimeout` mock in `useLoginForm` / `useSignupForm` for a real API call and redirect to the dashboard route.
