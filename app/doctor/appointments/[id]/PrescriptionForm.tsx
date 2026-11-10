"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";

export default function PrescriptionForm({
  appointmentId,
  existing,
}: {
  appointmentId: string;
  existing: { diagnosis: string; medicines: string; notes: string } | null;
}) {
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState(existing?.diagnosis || "");
  const [medicines, setMedicines] = useState(existing?.medicines || "");
  const [notes, setNotes] = useState(existing?.notes || "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    if (!diagnosis.trim() || !medicines.trim()) {
      setError("Diagnosis and medicines are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, diagnosis, medicines, notes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save.");
        setLoading(false);
        return;
      }
      setSaved(true);
      setLoading(false);
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2><Icon name="pill" size={20} /> {existing ? "Edit Prescription" : "Write Prescription"}</h2>
        {existing && <span className="badge badge-completed">Saved</span>}
      </div>
      <div className="panel-body">
        {error && <div className="form-alert error">{error}</div>}
        {saved && <div className="form-alert success">Prescription saved! Appointment marked as Completed.</div>}
        <form onSubmit={onSubmit}>
          <div className="form-field">
            <label>Diagnosis *</label>
            <input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="e.g. Acute viral fever" />
          </div>
          <div className="form-field">
            <label>Medicines * <span style={{ fontWeight: 400, color: "var(--muted)" }}>(one per line)</span></label>
            <textarea rows={5} value={medicines} onChange={(e) => setMedicines(e.target.value)} placeholder={"Paracetamol 500mg — 1 tablet twice daily\nAzithromycin 250mg — 1 daily for 3 days"} />
          </div>
          <div className="form-field">
            <label>Notes / Advice</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Rest, plenty of fluids, follow up in 3 days…" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving…" : existing ? "Update Prescription" : "Save Prescription"}
          </button>
        </form>
      </div>
    </div>
  );
}
