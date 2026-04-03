import { useState, useCallback } from "react";
import LeftPanel from "./components/LeftPanel";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import { useTestimonialRotation } from "./hooks";
import T from "./data/theme";

export default function NovaDashAuth() {
  const [view, setView] = useState("login"); // "login" | "signup"
  const { active: activeTestimonial } = useTestimonialRotation(5000);

  const switchToSignup = useCallback(() => setView("signup"), []);
  const switchToLogin  = useCallback(() => setView("login"),  []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg }}>

      {/* Left panel — hero, social proof, testimonials */}
      <div style={{ flex: "0 0 52%", display: "flex" }}>
        <LeftPanel activeTestimonial={activeTestimonial} />
      </div>

      {/* Right panel — auth forms */}
      <div style={{
        flex: 1,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        background: T.surface,
        borderLeft: `1px solid ${T.border}`,
        padding: "40px 24px",
        minHeight: "100vh",
        position: "relative",
        overflowY: "auto",
      }}>
        {/* Top accent gradient line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, #6366f1, transparent)",
        }} />

        {/* Form container — re-animates on view switch via key */}
        <div
          key={view}
          style={{ width: "100%", maxWidth: 400, animation: "slideInRight 0.4s ease-out" }}
        >
          {view === "login"
            ? <LoginForm  onSwitch={switchToSignup} />
            : <SignupForm onSwitch={switchToLogin}  />
          }
        </div>

        {/* Footer */}
        <div style={{
          position: "absolute", bottom: 20,
          fontSize: 11, color: T.textMuted,
          display: "flex", gap: 20,
        }}>
          <span style={{ cursor: "pointer" }}>© 2025 NovaDash</span>
          <span style={{ cursor: "pointer", textDecoration: "underline" }}>Privacy</span>
          <span style={{ cursor: "pointer", textDecoration: "underline" }}>Terms</span>
          <span style={{ cursor: "pointer", textDecoration: "underline" }}>Status</span>
        </div>
      </div>
    </div>
  );
}
