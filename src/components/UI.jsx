import { useState } from "react";
import {
  Eye, EyeOff, AlertCircle, Loader2, Check, Github, Chrome,
} from "lucide-react";
import T from "../data/theme";

/* ─── Field ────────────────────────────────────────────── */
export function Field({ icon: Icon, label, type = "text", value, onChange, placeholder, error, hint, rightEl }) {
  const [focused,  setFocused]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";
  const actualType = isPassword ? (showPass ? "text" : "password") : type;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: T.textSub, letterSpacing: "0.04em" }}>
        {label}
      </label>

      <div style={{
        display: "flex", alignItems: "center",
        background: T.surfaceAlt,
        border: `1.5px solid ${error ? T.danger : focused ? T.borderFocus : T.border}`,
        borderRadius: 10, overflow: "hidden",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: focused ? `0 0 0 3px ${error ? T.dangerSoft : T.accentSoft}` : "none",
      }}>
        {/* Left icon */}
        <div style={{ padding: "0 12px", color: focused ? T.accent : T.textMuted, flexShrink: 0, display: "flex", alignItems: "center", transition: "color 0.2s" }}>
          <Icon size={15} />
        </div>

        <input
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, padding: "11px 0",
            background: "transparent", border: "none", outline: "none",
            fontSize: 14, color: T.text,
            fontFamily: "'Syne', sans-serif",
          }}
        />

        {/* Show/hide toggle for password fields */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            style={{ padding: "0 12px", background: "none", border: "none", cursor: "pointer", color: T.textMuted, display: "flex", alignItems: "center" }}
          >
            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}

        {rightEl && <div style={{ padding: "0 10px" }}>{rightEl}</div>}
      </div>

      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: T.danger }}>
          <AlertCircle size={11} /> {error}
        </div>
      )}
      {hint && !error && <div style={{ fontSize: 11, color: T.textMuted }}>{hint}</div>}
    </div>
  );
}

/* ─── PasswordStrength ──────────────────────────────────── */
export function PasswordStrength({ password }) {
  const score = (() => {
    let s = 0;
    if (password.length >= 8)       s++;
    if (/[A-Z]/.test(password))     s++;
    if (/[0-9]/.test(password))     s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", T.danger, T.warning, "#60a5fa", T.success];

  if (!password) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= score ? colors[score] : T.border, transition: "background 0.3s" }} />
        ))}
      </div>
      {score > 0 && (
        <div style={{ fontSize: 10, fontWeight: 700, color: colors[score] }}>{labels[score]} password</div>
      )}
    </div>
  );
}

/* ─── PasswordRequirements ──────────────────────────────── */
export function PasswordRequirements({ password }) {
  const rules = [
    { label: "At least 8 characters",  ok: password.length >= 8 },
    { label: "One uppercase letter",   ok: /[A-Z]/.test(password) },
    { label: "One number",             ok: /[0-9]/.test(password) },
    { label: "One special character",  ok: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "12px 14px", background: T.surfaceAlt, borderRadius: 10, border: `1px solid ${T.border}` }}>
      {rules.map(r => (
        <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: r.ok ? T.success : T.textMuted, transition: "color 0.2s" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: r.ok ? T.successSoft : T.border, border: `1px solid ${r.ok ? T.success : T.border}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            {r.ok && <Check size={8} color={T.success} strokeWidth={3} />}
          </div>
          {r.label}
        </div>
      ))}
    </div>
  );
}

/* ─── PrimaryBtn ────────────────────────────────────────── */
export function PrimaryBtn({ children, loading, onClick, type = "button" }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={loading}
      style={{
        width: "100%", padding: "12px 20px",
        background: loading ? T.accentSoft : hov ? T.accentHover : T.accent,
        border: "none", borderRadius: 10,
        cursor: loading ? "not-allowed" : "pointer",
        color: loading ? T.accent : "#fff",
        fontSize: 14, fontWeight: 700, letterSpacing: "0.01em",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        transition: "all 0.2s",
        boxShadow: hov && !loading ? "0 0 24px rgba(99,102,241,0.35)" : "none",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      {loading
        ? <><Loader2 size={15} style={{ animation: "spin 0.8s linear infinite" }} /> Processing…</>
        : children
      }
    </button>
  );
}

/* ─── SocialBtn ─────────────────────────────────────────── */
export function SocialBtn({ icon: Icon, label, iconColor, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        padding: "10px 16px",
        background: hov ? T.surfaceHover : T.surfaceAlt,
        border: `1.5px solid ${T.border}`,
        borderRadius: 10, cursor: "pointer", color: T.text,
        fontSize: 13, fontWeight: 600, transition: "all 0.15s",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <Icon size={15} color={iconColor} />
      {label}
    </button>
  );
}

/* ─── Divider ───────────────────────────────────────────── */
export function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: T.border }} />
      <span style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: T.border }} />
    </div>
  );
}

/* ─── PlanCard ──────────────────────────────────────────── */
export function PlanCard({ plan, selected, onSelect }) {
  const [hov, setHov] = useState(false);
  const isActive = selected === plan.id;

  return (
    <div
      onClick={() => onSelect(plan.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1, padding: 16, borderRadius: 12, cursor: "pointer",
        border: `1.5px solid ${isActive ? plan.color : hov ? T.borderFocus : T.border}`,
        background: isActive ? `${plan.color}0a` : hov ? T.surfaceHover : T.surfaceAlt,
        transition: "all 0.2s", position: "relative",
      }}
    >
      {plan.popular && (
        <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", padding: "2px 10px", borderRadius: 99, background: plan.color, fontSize: 10, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>
          POPULAR
        </div>
      )}

      <div style={{ fontSize: 13, fontWeight: 800, color: T.text }}>{plan.name}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: plan.color, fontFamily: "'DM Mono', monospace", marginTop: 4 }}>
        {plan.price}
        <span style={{ fontSize: 11, fontWeight: 500, color: T.textMuted }}>/mo</span>
      </div>
      <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4, marginBottom: 10 }}>{plan.desc}</div>

      {plan.features.map(f => (
        <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: T.textSub, marginBottom: 4 }}>
          <Check size={10} color={isActive ? plan.color : T.textMuted} /> {f}
        </div>
      ))}

      {isActive && (
        <div style={{ position: "absolute", top: 12, right: 12, width: 18, height: 18, borderRadius: "50%", background: plan.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Check size={10} color="#fff" strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

/* ─── SuccessScreen ─────────────────────────────────────── */
export function SuccessScreen({ icon: Icon, iconColor, iconBg, title, subtitle, badge }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "40px 0", animation: "fadeUp 0.4s ease-out" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: iconBg, border: `2px solid ${iconColor}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={28} color={iconColor} strokeWidth={2.5} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>{title}</div>
        <div style={{ fontSize: 13, color: T.textMuted, marginTop: 6, lineHeight: 1.7 }}>{subtitle}</div>
      </div>
      {badge && (
        <div style={{ padding: "10px 20px", background: T.accentSoft, border: `1px solid ${T.accent}30`, borderRadius: 10, fontSize: 12, color: T.accent, fontWeight: 600 }}>
          {badge}
        </div>
      )}
      {/* Progress bar */}
      <div style={{ width: 200, height: 3, borderRadius: 99, background: T.border, overflow: "hidden" }}>
        <div style={{ height: "100%", background: T.accent, animation: "progress 1.5s ease-out forwards" }} />
      </div>
    </div>
  );
}
