import { User, Mail, Building2, Lock, Github, Chrome, ArrowRight, Sparkles, ChevronLeft } from "lucide-react";
import {
  Field, PasswordStrength, PasswordRequirements,
  PrimaryBtn, SocialBtn, Divider, PlanCard, SuccessScreen,
} from "../components/UI";
import { useSignupForm } from "../hooks";
import { PLANS } from "../data/content";
import T from "../data/theme";

const TOTAL_STEPS = 3;

export default function SignupForm({ onSwitch }) {
  const {
    step, nextStep, prevStep,
    form, setField, selectPlan,
    errors, loading, success,
  } = useSignupForm();

  if (success) {
    return (
      <SuccessScreen
        icon={Sparkles}
        iconColor={T.accent}
        iconBg={T.accentSoft}
        title="Your workspace is ready 🎉"
        subtitle={
          <>
            Welcome to NovaDash, <strong style={{ color: T.text }}>{form.name.split(" ")[0]}</strong>.<br />
            Redirecting you to your dashboard…
          </>
        }
        badge={`${PLANS.find(p => p.id === form.plan)?.name} plan · ${form.company}`}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeUp 0.5s ease-out" }}>

      {/* Step header */}
      <div>
        {/* Progress bar + step counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          {step > 1 && (
            <button
              onClick={prevStep}
              style={{
                background: T.surfaceAlt, border: `1px solid ${T.border}`,
                borderRadius: 7, padding: "4px 8px", cursor: "pointer",
                color: T.textMuted, display: "flex", alignItems: "center",
              }}
            >
              <ChevronLeft size={14} />
            </button>
          )}
          <div style={{ flex: 1, display: "flex", gap: 4 }}>
            {[1, 2, 3].map(s => (
              <div
                key={s}
                style={{
                  flex: 1, height: 3, borderRadius: 99,
                  background: s <= step ? T.accent : T.border,
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 11, color: T.textMuted, fontWeight: 600 }}>
            {step} / {TOTAL_STEPS}
          </span>
        </div>

        {/* Step title */}
        <h2 style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.03em" }}>
          {step === 1 && "Create your account"}
          {step === 2 && "Secure your account"}
          {step === 3 && "Choose your plan"}
        </h2>

        {/* Step subtitle */}
        <p style={{ fontSize: 13, color: T.textMuted, marginTop: 5 }}>
          {step === 1 && (
            <>
              Already have one?{" "}
              <button
                onClick={onSwitch}
                style={{ background: "none", border: "none", color: T.accent, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "'Syne', sans-serif" }}
              >
                Sign in →
              </button>
            </>
          )}
          {step === 2 && "Create a strong password to protect your workspace."}
          {step === 3 && "You can upgrade or downgrade anytime. No credit card required for Starter."}
        </p>
      </div>

      {/* ── Step 1: Basic info ── */}
      {step === 1 && (
        <>
          <div style={{ display: "flex", gap: 8 }}>
            <SocialBtn icon={Github} label="GitHub" iconColor={T.text} />
            <SocialBtn icon={Chrome} label="Google" iconColor="#ea4335" />
          </div>

          <Divider label="or sign up with email" />

          <Field icon={User}      label="FULL NAME"     value={form.name}    onChange={setField("name")}    placeholder="Jane Doe"         error={errors.name}    />
          <Field icon={Mail}      label="WORK EMAIL"    type="email"  value={form.email}   onChange={setField("email")}   placeholder="you@company.com"  error={errors.email}   />
          <Field icon={Building2} label="COMPANY NAME"  value={form.company} onChange={setField("company")} placeholder="Acme Corp"        error={errors.company} />

          <PrimaryBtn onClick={nextStep}>
            Continue <ArrowRight size={14} />
          </PrimaryBtn>
        </>
      )}

      {/* ── Step 2: Password ── */}
      {step === 2 && (
        <>
          <Field
            icon={Lock}
            label="CREATE PASSWORD"
            type="password"
            value={form.password}
            onChange={setField("password")}
            placeholder="Min. 8 characters"
            error={errors.password}
            hint="Use uppercase, numbers, and symbols for a stronger password."
          />

          <PasswordStrength password={form.password} />
          <PasswordRequirements password={form.password} />

          <PrimaryBtn onClick={nextStep}>
            Continue <ArrowRight size={14} />
          </PrimaryBtn>
        </>
      )}

      {/* ── Step 3: Plan selection ── */}
      {step === 3 && (
        <>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            {PLANS.map(p => (
              <PlanCard
                key={p.id}
                plan={p}
                selected={form.plan}
                onSelect={selectPlan}
              />
            ))}
          </div>

          <PrimaryBtn loading={loading} onClick={nextStep}>
            Start with {PLANS.find(p => p.id === form.plan)?.name} <ArrowRight size={14} />
          </PrimaryBtn>
        </>
      )}

      <p style={{ fontSize: 11, color: T.textMuted, textAlign: "center", lineHeight: 1.6 }}>
        By creating an account you agree to our{" "}
        <span style={{ color: T.textSub, cursor: "pointer", textDecoration: "underline" }}>Terms</span>{" "}
        and{" "}
        <span style={{ color: T.textSub, cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</span>.
      </p>
    </div>
  );
}
