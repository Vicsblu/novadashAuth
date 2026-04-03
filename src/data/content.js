import { Users, TrendingUp, BarChart3, Shield } from "lucide-react";
import T from "./theme";

// ── Social proof stats shown in the left panel
export const STATS = [
  { icon: Users,     label: "Teams onboarded",    value: "12,400+" },
  { icon: TrendingUp,label: "Avg revenue lift",   value: "34%"     },
  { icon: BarChart3, label: "Events tracked daily",value: "2.1B"   },
];

// ── Rotating testimonials in the left panel
export const TESTIMONIALS = [
  {
    quote:  "NovaDash replaced four separate tools for us. The clarity it brings to our data is unmatched.",
    name:   "Sarah Kim",
    role:   "Head of Growth · Luma",
    avatar: "SK",
    color:  "#6366f1",
  },
  {
    quote:  "We shipped faster because we finally understood what our users were actually doing.",
    name:   "Marcus Webb",
    role:   "CTO · Stackline",
    avatar: "MW",
    color:  "#22d3a4",
  },
  {
    quote:  "The real-time dashboard alone saved us 6 hours of reporting per week.",
    name:   "Priya Nair",
    role:   "PM · Vessel",
    avatar: "PN",
    color:  "#f59e0b",
  },
];

// ── Floating metric mini-cards config (left panel visual)
export const METRIC_CARDS = [
  { icon: Users,     label: "Active Users", value: "17,203", color: "#6366f1", delay: 1,   style: { position: "absolute", right: 20, top: 10 } },
  { icon: TrendingUp,label: "Conv. Rate",   value: "3.87%",  color: T.success, delay: 2,   style: { position: "absolute", right: 20, top: 74, width: 160 } },
  { icon: Shield,    label: "Uptime",       value: "99.99%", color: T.warning, delay: 1.5, style: { position: "absolute", left: 20, bottom: 0, width: 150 } },
];

// ── Floating orb decorations
export const ORBS = [
  { x: "20%", y: "30%", size: 6, delay: 0,   color: "#6366f1" },
  { x: "70%", y: "60%", size: 4, delay: 1.5, color: "#22d3a4" },
  { x: "45%", y: "80%", size: 5, delay: 3,   color: "#8b5cf6" },
  { x: "85%", y: "20%", size: 3, delay: 2,   color: "#6366f1" },
  { x: "10%", y: "70%", size: 4, delay: 4,   color: "#22d3a4" },
];

// ── Pricing plans used in signup step 3
export const PLANS = [
  {
    id:       "starter",
    name:     "Starter",
    price:    "$0",
    desc:     "Up to 5,000 events/mo",
    color:    T.textMuted,
    features: ["1 workspace", "7-day history", "Basic charts"],
  },
  {
    id:       "pro",
    name:     "Pro",
    price:    "$29",
    desc:     "Up to 500K events/mo",
    color:    "#8b5cf6",
    popular:  true,
    features: ["5 workspaces", "90-day history", "All charts", "CSV export"],
  },
  {
    id:       "enterprise",
    name:     "Enterprise",
    price:    "$99",
    desc:     "Unlimited events",
    color:    T.accent,
    features: ["Unlimited workspaces", "Unlimited history", "API access", "SSO"],
  },
];
