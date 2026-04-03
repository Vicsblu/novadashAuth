import T from "../data/theme";

const BAR_HEIGHTS = [60, 40, 75, 55, 90, 65, 82, 70];

/**
 * Floating mini chart card — shows a bar sparkline + revenue stat.
 */
export function DashboardPreviewCard({ delay = 0, style = {} }) {
  return (
    <div style={{
      background: "rgba(17,17,24,0.85)",
      border: "1px solid rgba(99,102,241,0.2)",
      borderRadius: 12,
      backdropFilter: "blur(12px)",
      padding: "14px 16px",
      animation: `floatCard 5s ease-in-out ${delay}s infinite alternate`,
      ...style,
    }}>
      {/* Bar sparkline */}
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 36 }}>
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            style={{
              width: 6, height: `${h}%`, borderRadius: 3,
              background: i === 6 ? "#6366f1" : `rgba(99,102,241,${0.2 + i * 0.06})`,
              animation: `barGrow 0.6s ease-out ${i * 0.05}s both`,
            }}
          />
        ))}
      </div>

      {/* Revenue stat row */}
      <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 600 }}>MONTHLY REVENUE</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: "'DM Mono', monospace" }}>$84,392</div>
        </div>
        <div style={{
          padding: "3px 8px", borderRadius: 99,
          background: T.successSoft, fontSize: 10, fontWeight: 700, color: T.success,
        }}>
          ↑ 21.3%
        </div>
      </div>
    </div>
  );
}

/**
 * Small floating metric tile with icon + value.
 */
export function MetricMiniCard({ icon: Icon, label, value, color, delay, style = {} }) {
  return (
    <div style={{
      background: "rgba(17,17,24,0.9)",
      border: `1px solid ${color}30`,
      borderRadius: 10,
      padding: "10px 14px",
      display: "flex", alignItems: "center", gap: 10,
      backdropFilter: "blur(12px)",
      animation: `floatCard 6s ease-in-out ${delay}s infinite alternate`,
      ...style,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: `${color}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={13} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {label}
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: T.text, fontFamily: "'DM Mono', monospace" }}>
          {value}
        </div>
      </div>
    </div>
  );
}
