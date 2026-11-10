"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
    phone: "", dob: "", gender: "Male", bloodGroup: "", address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed.");
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="form-card auth-card" style={{ maxWidth: 620 }}>
        <h1>Patient Registration</h1>
        <p className="form-sub">Create your account to book appointments online.</p>
        {error && <div className="form-alert error">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label>Full Name *</label>
              <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" required />
            </div>
            <div className="form-field">
              <label>Email *</label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" required />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label>Password *</label>
              <input type="password" value={form.password} onChange={(e) => set("password", e.target.value)} placeholder="Min 6 characters" required />
            </div>
            <div className="form-field">
              <label>Confirm Password *</label>
              <input type="password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} placeholder="Repeat password" required />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="03xx-xxxxxxx" />
            </div>
            <div className="form-field">
              <label>Date of Birth</label>
              <input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label>Gender</label>
              <select value={form.gender} onChange={(e) => set("gender", e.target.value)}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-field">
              <label>Blood Group</label>
              <select value={form.bloodGroup} onChange={(e) => set("bloodGroup", e.target.value)}>
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-field">
            <label>Address</label>
            <input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Home address" />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
            {loading ? "Creating account…" : "Register"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
