"use client";

import { Suspense, useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";

type Doctor = { id: string; specialty: string; fee: number; schedule: string; user: { name: string } };

const TIMES = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

function PatientBookForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(TIMES[0]);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/doctors").then((r) => r.json()).then((d) => {
      const list: Doctor[] = d.doctors || [];
      setDoctors(list);
      const pre = searchParams.get("doctor");
      if (pre && list.some((x) => x.id === pre)) setDoctorId(pre);
    });
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId, date, time, reason }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Booking failed.");
        setLoading(false);
        return;
      }
      router.push("/patient");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  const selDoc = doctors.find((d) => d.id === doctorId);

  return (
    <div className="panel" style={{ maxWidth: 720 }}>
      <div className="panel-head"><h2><Icon name="calendar" size={20} /> Book an Appointment</h2></div>
      <div className="panel-body">
        {error && <div className="form-alert error">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label>Choose Doctor *</label>
            <div style={{ display: "grid", gap: 10 }}>
              {doctors.map((d) => (
                <label
                  key={d.id}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, border: doctorId === d.id ? "2px solid var(--teal)" : "1px solid var(--line)",
                    borderRadius: 12, padding: 14, cursor: "pointer", background: doctorId === d.id ? "var(--teal-bg)" : "#fff",
                  }}
                >
                  <input type="radio" name="doctor" checked={doctorId === d.id} onChange={() => setDoctorId(d.id)} style={{ accentColor: "var(--teal)" }} />
                  <span className="svc-icon" style={{ width: 48, height: 48, marginBottom: 0 }}><Icon name="stethoscope" size={24} /></span>
                  <div style={{ flex: 1 }}>
                    <b>{d.user.name}</b>
                    <div style={{ fontSize: 13, color: "var(--teal-dark)", fontWeight: 700 }}>{d.specialty}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}><Icon name="clock" size={12} /> {d.schedule}</div>
                  </div>
                  <b style={{ color: "var(--navy)" }}>Rs. {d.fee.toLocaleString()}</b>
                </label>
              ))}
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Preferred Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required min={new Date().toISOString().slice(0, 10)} />
            </div>
            <div className="form-field">
              <label>Reason for Visit</label>
              <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Fever, checkup…" />
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

          {selDoc && (
            <div className="form-alert success">
              {selDoc.user.name} • {date} at {time} • Fee <b>Rs. {selDoc.fee.toLocaleString()}</b>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading || !doctorId}>
            {loading ? "Booking…" : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PatientBookPage() {
  return (
    <Suspense fallback={<div className="panel" style={{ maxWidth: 720 }}><div className="panel-body">Loading…</div></div>}>
      <PatientBookForm />
    </Suspense>
  );
}
