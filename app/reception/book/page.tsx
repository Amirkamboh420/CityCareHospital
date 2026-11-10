"use client";

import { Icon } from "@/components/icons";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Doctor = { id: string; specialty: string; fee: number; user: { name: string } };
type Patient = { id: string; user: { name: string; email: string } };

const TIMES = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

export default function ReceptionBookPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(TIMES[0]);
  const [reason, setReason] = useState("");
  const [newPat, setNewPat] = useState({ name: "", email: "", phone: "", gender: "Male", dob: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/doctors").then((r) => r.json()).then((d) => setDoctors(d.doctors || []));
    fetch("/api/patients").then((r) => r.json()).then((d) => setPatients(d.patients || []));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let pid = patientId;
      if (mode === "new") {
        if (!newPat.name || !newPat.email) {
          setError("New patient name and email are required.");
          setLoading(false);
          return;
        }
        const rr = await fetch("/api/reception/quick-patient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newPat, password: "pat123" }),
        });
        const rd = await rr.json();
        if (!rr.ok) {
          setError(rd.error || "Failed to register patient.");
          setLoading(false);
          return;
        }
        pid = rd.patientId;
      }
      if (!pid) {
        setError("Please select a patient.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId: pid, doctorId, date, time, reason }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Booking failed.");
        setLoading(false);
        return;
      }
      router.push("/reception");
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  const selDoc = doctors.find((d) => d.id === doctorId);

  return (
    <div className="panel" style={{ maxWidth: 720 }}>
      <div className="panel-head"><h2><Icon name="calendar" size={20} /> Book Appointment</h2></div>
      <div className="panel-body">
        {error && <div className="form-alert error">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="tab-bar">
            <button type="button" className={`tab-btn ${mode === "existing" ? "active" : ""}`} onClick={() => setMode("existing")}>
              Existing Patient
            </button>
            <button type="button" className={`tab-btn ${mode === "new" ? "active" : ""}`} onClick={() => setMode("new")}>
              Quick Register
            </button>
          </div>

          {mode === "existing" ? (
            <div className="form-field">
              <label>Select Patient *</label>
              <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required={mode === "existing"}>
                <option value="">— Choose patient —</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.user.name} ({p.user.email})</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="form-grid">
              <div className="form-field">
                <label>Full Name *</label>
                <input value={newPat.name} onChange={(e) => setNewPat({ ...newPat, name: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Email *</label>
                <input type="email" value={newPat.email} onChange={(e) => setNewPat({ ...newPat, email: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Phone</label>
                <input value={newPat.phone} onChange={(e) => setNewPat({ ...newPat, phone: e.target.value })} />
              </div>
              <div className="form-field">
                <label>Gender</label>
                <select value={newPat.gender} onChange={(e) => setNewPat({ ...newPat, gender: e.target.value })}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
          )}

          <div className="form-grid">
            <div className="form-field">
              <label>Doctor *</label>
              <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
                <option value="">— Choose doctor —</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.user.name} — {d.specialty} (Rs. {d.fee})</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required min={new Date().toISOString().slice(0, 10)} />
            </div>
          </div>

          <div className="form-field">
            <label>Time Slot *</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TIMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className="btn btn-sm"
                  style={{
                    background: time === t ? "var(--teal)" : "#fff",
                    color: time === t ? "#fff" : "var(--ink)",
                    border: "1px solid var(--line)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label>Reason for Visit</label>
            <textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Briefly describe the problem…" />
          </div>

          {selDoc && (
            <div className="form-alert success">Consultation fee: <b>Rs. {selDoc.fee.toLocaleString()}</b> — {selDoc.user.name}</div>
          )}

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
            {loading ? "Booking…" : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
