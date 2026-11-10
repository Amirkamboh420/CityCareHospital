"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";

const POSITIONS = [
  "Staff Nurse",
  "Lab Technologist",
  "Front Desk Officer",
  "Pharmacist",
  "Ambulance Driver",
  "Medical Officer",
];

export default function CareerForm() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.position) {
      toast("Please fill in name, email, phone and position.", "error");
      return;
    }
    setForm({ name: "", email: "", phone: "", position: "", message: "" });
    toast("Application submitted! HR will contact you.", "success");
  }

  return (
    <form className="form-card" onSubmit={submit} style={{ margin: 0 }}>
      <h1 style={{ fontSize: 24 }}>Apply Online</h1>
      <p style={{ color: "var(--muted)", marginBottom: 24 }}>
        Fill in the form and our HR team will reach out within 5 working days.
      </p>
      <div className="form-grid">
        <div className="form-field">
          <label>Full Name *</label>
          <input value={form.name} onChange={set("name")} placeholder="Your full name" />
        </div>
        <div className="form-field">
          <label>Email *</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label>Phone *</label>
          <input value={form.phone} onChange={set("phone")} placeholder="03xx xxxxxxx" />
        </div>
        <div className="form-field">
          <label>Position *</label>
          <select value={form.position} onChange={set("position")}>
            <option value="">Select a position</option>
            {POSITIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-field">
        <label>Cover Message</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={set("message")}
          placeholder="Briefly tell us about your experience and why you want to join CityCare..."
        />
      </div>
      <button type="submit" className="btn btn-primary btn-lg btn-block">
        Submit Application
      </button>
    </form>
  );
}
