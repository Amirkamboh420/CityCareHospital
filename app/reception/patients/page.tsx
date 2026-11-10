"use client";

import { useEffect, useState } from "react";

type Patient = {
  id: string; phone: string; gender: string; bloodGroup: string | null;
  user: { name: string; email: string };
};

export default function ReceptionPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/patients").then((r) => r.json()).then((d) => setPatients(d.patients || []));
  }, []);

  const filtered = patients.filter(
    (p) =>
      p.user.name.toLowerCase().includes(search.toLowerCase()) ||
      p.user.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Patient Search ({filtered.length})</h2>
        <input
          className="search-input"
          placeholder="Search by name, email or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Gender</th><th>Blood Group</th></tr></thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td><b>{p.user.name}</b></td>
                <td>{p.user.email}</td>
                <td>{p.phone || "—"}</td>
                <td>{p.gender}</td>
                <td>{p.bloodGroup || "—"}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--muted)" }}>No patients found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
