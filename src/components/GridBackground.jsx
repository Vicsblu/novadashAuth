import { ORBS } from "../data/content";

/**
 * Animated grid + glows + floating orbs.
 * Used as absolute-positioned background in the left panel.
 */
export default function GridBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Subtle grid lines */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#6366f1" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Radial glow — top-left */}
      <div style={{
        position: "absolute", top: -120, left: -120,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
        animation: "breathe 6s ease-in-out infinite",
      }} />

      {/* Radial glow — bottom-right */}
      <div style={{
        position: "absolute", bottom: -100, right: -100,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        animation: "breathe 8s ease-in-out infinite reverse",
      }} />

      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute", left: orb.x, top: orb.y,
            width: orb.size, height: orb.size, borderRadius: "50%",
            background: orb.color, opacity: 0.7,
            animation: `floatOrb 4s ease-in-out ${orb.delay}s infinite alternate`,
            boxShadow: `0 0 ${orb.size * 4}px ${orb.color}`,
          }}
        />
      ))}

      {/* Diagonal accent line */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="#6366f1" strokeWidth="1" />
      </svg>
    </div>
  );
}
