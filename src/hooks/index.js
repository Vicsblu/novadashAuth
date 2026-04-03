import { useState, useEffect, useCallback } from "react";
import { TESTIMONIALS } from "../data/content";

/**
 * Rotates through testimonials on an interval.
 * Returns the current index and a manual setter.
 */
export function useTestimonialRotation(intervalMs = 5000) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive(i => (i + 1) % TESTIMONIALS.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [intervalMs]);

  return { active, setActive };
}

/**
 * Login form state + validation.
 */
export function useLoginForm() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const clearError = useCallback((key) => {
    setErrors(prev => ({ ...prev, [key]: "" }));
  }, []);

  const validate = useCallback(() => {
    const e = {};
    if (!email.includes("@"))   e.email    = "Enter a valid email address";
    if (password.length < 6)    e.password = "Password must be at least 6 characters";
    return e;
  }, [email, password]);

  const submit = useCallback(async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  }, [validate]);

  return {
    email, setEmail,
    password, setPassword,
    errors, loading, success,
    clearError, submit,
  };
}

/**
 * Multi-step signup form state + validation.
 */
export function useSignupForm() {
  const [step,    setStep]    = useState(1);
  const [form,    setForm]    = useState({ name: "", email: "", company: "", password: "", plan: "pro" });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = useCallback((key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    setErrors(er => ({ ...er, [key]: "" }));
  }, []);

  const selectPlan = useCallback((plan) => {
    setForm(f => ({ ...f, plan }));
  }, []);

  const validateStep1 = useCallback(() => {
    const e = {};
    if (!form.name.trim())          e.name    = "Full name is required";
    if (!form.email.includes("@"))  e.email   = "Enter a valid email";
    if (!form.company.trim())       e.company = "Company name is required";
    return e;
  }, [form.name, form.email, form.company]);

  const validateStep2 = useCallback(() => {
    const e = {};
    if (form.password.length < 8)   e.password = "Password must be at least 8 characters";
    return e;
  }, [form.password]);

  const nextStep = useCallback(() => {
    const e = validateStep1();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep(2);
  }, [validateStep1]);

  const prevStep = useCallback(() => {
    setStep(s => Math.max(1, s - 1));
  }, []);

  const submit = useCallback(async () => {
    if (step === 2) {
      const e = validateStep2();
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
  }, [step, validateStep2]);

  return {
    step, setStep, nextStep, prevStep,
    form, setField, selectPlan,
    errors, loading, success,
  };
}
