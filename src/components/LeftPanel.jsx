import { Zap, Sparkles } from "lucide-react";
import GridBackground from "./GridBackground";
import { DashboardPreviewCard, MetricMiniCard } from "./PreviewCards";
import { STATS, TESTIMONIALS, METRIC_CARDS } from "../data/content";
import T from "../data/theme";

export default function LeftPanel({ activeTestimonial }) {
  const testimonial = TESTIMONIALS[activeTestimonial];

  return (
    <div style={{
      flex: "0 0 52%", position: "relative", overflow: "hidden",
      background: T.bg, display: "flex", flexDirection: "column",
      padding: "48px 56px", justifyContent: "space-between",
    }}>
      <GridBackground />

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 2 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 20px rgba(99,102,241,0.4)",
        }}>
          <Zap size={18} color="#fff" fill="#fff" />
        </div>
        <span style={{ fontSize: 20, fontWeight: 800, color: T.text, letterSpacing: "-0.04em" }}>NovaDash</span>
      </div>

      {/* Hero content */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 32 }}>

        {/* Headline */}
        <div style={{ animation: "fadeUp 0.7s ease-out 0.1s both" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 99,
            background: T.accentSoft, border: "1px solid rgba(99,102,241,0.25)",
            marginBottom: 16,
          }}>
            <Sparkles size={11} color={T.accent} />
            <span style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: "0.06em" }}>REAL-TIME ANALYTICS</span>
          </div>

          <h1 style={{ fontSize: 38, fontWeight: 800, color: T.text, letterSpacing: "-0.04em", lineHeight: 1.15, fontFamily: "'Syne', sans-serif" }}>
            Turn your data into<br />
            <span style={{ background: "linear-gradient(90deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              decisions that win.
            </span>
          </h1>

          <p style={{ fontSize: 15, color: T.textSub, marginTop: 14, lineHeight: 1.7, maxWidth: 380 }}>
            Join over 12,000 SaaS teams who replaced spreadsheets with NovaDash's live, interactive dashboards.
          </p>
        </div>

        {/* Floating dashboard preview cards */}
        <div style={{ position: "relative", height: 180, animation: "fadeUp 0.7s ease-out 0.25s both" }}>
          <DashboardPreviewCard delay={0} style={{ position: "absolute", left: 0, top: 0, width: 200 }} />
          {METRIC_CARDS.map((card, i) => (
            <MetricMiniCard key={i} {...card} />
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 32, animation: "fadeUp 0.7s ease-out 0.35s both" }}>
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.text, fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial carousel */}
      <div style={{
        position: "relative", zIndex: 2,
        background: T.surfaceAlt, border: `1px solid ${T.border}`,
        borderRadius: 14, padding: "18px 20px",
        animation: "fadeUp 0.7s ease-out 0.45s both",
        transition: "all 0.4s ease",
      }}>
        <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.65, marginBottom: 12, fontStyle: "italic" }}>
          "{testimonial.quote}"
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: `${testimonial.color}22`,
            border: `1.5px solid ${testimonial.color}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 800, color: testimonial.color,
          }}>
            {testimonial.avatar}
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{testimonial.name}</div>
            <div style={{ fontSize: 11, color: T.textMuted }}>{testimonial.role}</div>
          </div>

          {/* Pagination dots */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
            {TESTIMONIALS.map((_, i) => (
              <div key={i} style={{
                width: i === activeTestimonial ? 16 : 5, height: 5, borderRadius: 99,
                background: i === activeTestimonial ? T.accent : T.border,
                transition: "all 0.4s",
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
