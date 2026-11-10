"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

type Doctor = {
  id: string;
  specialty: string;
  qualification: string;
  fee: number;
  schedule: string;
  user: { name: string; email: string };
};

const empty = { name: "", email: "", password: "", specialty: "", qualification: "", fee: "", schedule: "" };

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/doctors");
    const data = await res.json();
    setDoctors(data.doctors || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() {
    setEditing(null);
    setForm(empty);
    setError("");
    setShowModal(true);
  }

  function openEdit(d: Doctor) {
    setEditing(d);
    setForm({ name: d.user.name, email: d.user.email, password: "", specialty: d.specialty, qualification: d.qualification, fee: String(d.fee), schedule: d.schedule });
    setError("");
    setShowModal(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const url = editing ? `/api/doctors/${editing.id}` : "/api/doctors";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to save.");
      return;
    }
    setShowModal(false);
    load();
  }

  async function onDelete(id: string, name: string) {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    await fetch(`/api/doctors/${id}`, { method: "DELETE" });
    load();
  }

  const filtered = doctors.filter(
    (d) =>
      d.user.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <h2>Doctors ({filtered.length})</h2>
          <div className="toolbar">
            <input className="search-input" placeholder="Search doctors…" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="btn btn-primary btn-sm" onClick={openAdd}><Icon name="plus" size={14} /> Add Doctor</button>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Specialty</th><th>Qualification</th><th>Fee (Rs.)</th><th>Schedule</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td><b>{d.user.name}</b></td>
                  <td>{d.user.email}</td>
                  <td><span className="badge badge-teal">{d.specialty}</span></td>
                  <td>{d.qualification}</td>
                  <td>{d.fee.toLocaleString()}</td>
                  <td>{d.schedule}</td>
                  <td>
                    <button className="icon-btn-sm" onClick={() => openEdit(d)}><Icon name="edit" size={14} /> Edit</button>
                    <button className="icon-btn-sm danger" onClick={() => onDelete(d.id, d.user.name)} aria-label="Delete"><Icon name="trash" size={14} /></button>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--muted)" }}>No doctors found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{editing ? "Edit Doctor" : "Add New Doctor"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close"><Icon name="x" size={16} /></button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="modal-body">
                {error && <div className="form-alert error">{error}</div>}
                <div className="form-grid">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-field">
                    <label>Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required disabled={!!editing} />
                  </div>
                </div>
                {!editing && (
                  <div className="form-field">
                    <label>Password *</label>
                    <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Min 6 characters" />
                  </div>
                )}
                <div className="form-grid">
                  <div className="form-field">
                    <label>Specialty *</label>
                    <input value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} required placeholder="e.g. Cardiology" />
                  </div>
                  <div className="form-field">
                    <label>Consultation Fee (Rs.)</label>
                    <input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} placeholder="2500" />
                  </div>
                </div>
                <div className="form-field">
                  <label>Qualification</label>
                  <input value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} placeholder="MBBS, FCPS" />
                </div>
                <div className="form-field">
                  <label>Schedule</label>
                  <input value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} placeholder="Mon–Fri, 9am–2pm" />
                </div>
              </div>
              <div className="modal-foot">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editing ? "Save Changes" : "Add Doctor"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
