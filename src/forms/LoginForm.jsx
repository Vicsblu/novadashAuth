import { Mail, Lock, Github, Chrome, ArrowRight, Check } from "lucide-react";
import { Field, PrimaryBtn, SocialBtn, Divider, SuccessScreen } from "../components/UI";
import { useLoginForm } from "../hooks";
import T from "../data/theme";

export default function LoginForm({ onSwitch }) {
  const {
    email, setEmail,
    password, setPassword,
    errors, loading, success,
    clearError, submit,
  } = useLoginForm();

  if (success) {
    return (
      <SuccessScreen
        icon={Check}
        iconColor={T.success}
        iconBg={T.successSoft}
        title="Welcome back!"
        subtitle="Redirecting to your dashboard…"
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeUp 0.5s ease-out" }}>
      {/* Heading */}
      <div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>
          Sign in to NovaDash
        </h2>
        <p style={{ fontSize: 13, color: T.textMuted, marginTop: 6 }}>
          No account yet?{" "}
          <button
            onClick={onSwitch}
            style={{ background: "none", border: "none", color: T.accent, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "'Syne', sans-serif" }}
          >
            Create one free →
          </button>
        </p>
      </div>

      {/* Social login */}
      <div style={{ display: "flex", gap: 8 }}>
        <SocialBtn icon={Github} label="GitHub" iconColor={T.text} />
        <SocialBtn icon={Chrome} label="Google" iconColor="#ea4335" />
      </div>

      <Divider label="or continue with email" />

      {/* Email */}
      <Field
        icon={Mail}
        label="EMAIL ADDRESS"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value); clearError("email"); }}
        placeholder="you@company.com"
        error={errors.email}
      />

      {/* Password */}
      <Field
        icon={Lock}
        label="PASSWORD"
        type="password"
        value={password}
        onChange={e => { setPassword(e.target.value); clearError("password"); }}
        placeholder="Your password"
        error={errors.password}
        rightEl={
          <button
            type="button"
            style={{ fontSize: 11, color: T.accent, background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap" }}
          >
            Forgot?
          </button>
        }
      />

      <PrimaryBtn loading={loading} onClick={submit}>
        Sign in <ArrowRight size={14} />
      </PrimaryBtn>

      <p style={{ fontSize: 11, color: T.textMuted, textAlign: "center", lineHeight: 1.6 }}>
        By signing in you agree to our{" "}
        <span style={{ color: T.textSub, cursor: "pointer", textDecoration: "underline" }}>Terms of Service</span>{" "}
        and{" "}
        <span style={{ color: T.textSub, cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</span>.
      </p>
    </div>
  );
}
