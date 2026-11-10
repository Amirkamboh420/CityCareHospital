"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedNext = searchParams.get("next");
  const next =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="form-card auth-card">
        <h1>Welcome Back</h1>
        <p className="form-sub">Login to access your CityCare dashboard.</p>
        {error && <div className="form-alert error">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
        <p className="auth-switch">
          New patient? <Link href="/register">Create an account</Link>
        </p>
        <div className="form-card" style={{ padding: 16, marginTop: 20, background: "var(--bg-soft)" }}>
          <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Demo accounts:</p>
          <p style={{ fontSize: 13 }}>Admin: admin@citycare.com / admin123</p>
          <p style={{ fontSize: 13 }}>Doctor: doctor1@citycare.com / doc123</p>
          <p style={{ fontSize: 13 }}>Reception: recep@citycare.com / recep123</p>
          <p style={{ fontSize: 13 }}>Patient: patient1@citycare.com / pat123</p>
        </div>
      </div>
    </div>
  );
}
