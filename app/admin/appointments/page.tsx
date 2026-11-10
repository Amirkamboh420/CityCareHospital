"use client";

import { useEffect, useState } from "react";

type Appt = {
  id: string;
  date: string;
  time: string;
  reason: string;
  status: string;
  patient: { user: { name: string } };
  doctor: { user: { name: string } };
};

const STATUSES = ["Scheduled", "Completed", "Cancelled"];

export default function AdminAppointmentsPage() {
  const [appts, setAppts] = useState<Appt[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  async function load() {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppts(data.appointments || []);
  }

  useEffect(() => { load(); }, []);

  async function setApptStatus(id: string, s: string) {
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: s }),
    });
    load();
  }

  const filtered = appts.filter(
    (a) =>
      (!status || a.status === status) &&
      (a.patient.user.name.toLowerCase().includes(search.toLowerCase()) ||
        a.doctor.user.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Appointments ({filtered.length})</h2>
        <div className="toolbar">
          <input className="search-input" placeholder="Search patient/doctor…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="select-input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Reason</th><th>Status</th><th>Change</th></tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td><b>{a.patient.user.name}</b></td>
                <td>{a.doctor.user.name}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td style={{ whiteSpace: "normal", minWidth: 180 }}>{a.reason}</td>
                <td>
                  <span className={`badge ${a.status === "Completed" ? "badge-completed" : a.status === "Cancelled" ? "badge-cancelled" : "badge-scheduled"}`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <select
                    className="select-input"
                    value={a.status}
                    onChange={(e) => setApptStatus(a.id, e.target.value)}
                    style={{ padding: "6px 10px", fontSize: 13 }}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--muted)" }}>No appointments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
