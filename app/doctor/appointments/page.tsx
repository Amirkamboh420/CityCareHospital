"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SkeletonTable } from "@/components/Skeleton";

type Appt = {
  id: string; date: string; time: string; reason: string; status: string;
  patient: { user: { name: string } };
};

export default function DoctorAppointmentsPage() {
  const [appts, setAppts] = useState<Appt[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/doctor/appointments");
      const data = await res.json();
      setAppts(data.appointments || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = appts.filter((a) => !filter || a.status === filter);

  if (loading) return <SkeletonTable cols={6} rows={6} />;

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>My Appointments ({filtered.length})</h2>
        <select className="select-input" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="No-Show">No-Show</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr><th>Date</th><th>Time</th><th>Patient</th><th>Reason</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td>{a.date}</td>
                <td><b>{a.time}</b></td>
                <td>{a.patient.user.name}</td>
                <td style={{ whiteSpace: "normal", minWidth: 180 }}>{a.reason}</td>
                <td>
                  <span className={`badge ${a.status === "Completed" ? "badge-completed" : a.status === "Cancelled" ? "badge-cancelled" : "badge-scheduled"}`}>
                    {a.status}
                  </span>
                </td>
                <td><Link href={`/doctor/appointments/${a.id}`} className="btn btn-primary btn-sm">Open →</Link></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--muted)" }}>No appointments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
