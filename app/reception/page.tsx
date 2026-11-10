"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/Toast";
import { SkeletonTable } from "@/components/Skeleton";
import BillModal from "./BillModal";
import { Icon } from "@/components/icons";

type Appt = {
  id: string; date: string; time: string; reason: string; status: string;
  patient: { user: { name: string } };
  doctor: { user: { name: string }; fee: number };
  invoice: { id: string; status: string } | null;
};

const STATUSES = ["Scheduled", "Completed", "No-Show", "Cancelled"];

export default function ReceptionDashboard() {
  const [appts, setAppts] = useState<Appt[]>([]);
  const [loading, setLoading] = useState(true);
  const [billFor, setBillFor] = useState<Appt | null>(null);
  const { toast } = useToast();
  const today = new Date().toISOString().slice(0, 10);

  async function load() {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppts((data.appointments || []).filter((a: Appt) => a.date === today));
    } catch {
      toast("Failed to load appointments.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed.");
      toast(`Appointment marked as ${status}.`, status === "Cancelled" ? "info" : "success");
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Update failed.", "error");
    }
  }

  if (loading) return <SkeletonTable cols={7} rows={5} />;

  return (
    <>
      <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-card">
          <span className="stat-icon" style={{ background: "#ccfbf1", color: "#0d9488" }}><Icon name="calendar" size={26} /></span>
          <div><b>{appts.length}</b><span>Today&apos;s Appointments</span></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ background: "#fef3c7", color: "#f59e0b" }}><Icon name="clock" size={26} /></span>
          <div><b>{appts.filter((a) => a.status === "Scheduled").length}</b><span>Waiting</span></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ background: "#ecfdf5", color: "#059669" }}><Icon name="check-circle" size={26} /></span>
          <div><b>{appts.filter((a) => a.status === "Completed").length}</b><span>Completed Today</span></div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Today&apos;s Appointments ({today})</h2>
          <Link href="/reception/book" className="btn btn-primary btn-sm"><Icon name="plus" size={14} /> Book New</Link>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Time</th><th>Patient</th><th>Doctor</th><th>Reason</th><th>Status</th><th>Update</th><th>Bill</th></tr></thead>
            <tbody>
              {appts.map((a) => (
                <tr key={a.id}>
                  <td><b>{a.time}</b></td>
                  <td>{a.patient.user.name}</td>
                  <td>{a.doctor.user.name}</td>
                  <td style={{ whiteSpace: "normal", minWidth: 160 }}>{a.reason}</td>
                  <td>
                    <span className={`badge ${a.status === "Completed" ? "badge-completed" : a.status === "Cancelled" ? "badge-cancelled" : a.status === "No-Show" ? "badge-noshow" : "badge-scheduled"}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <select className="select-input" value={a.status} onChange={(e) => setStatus(a.id, e.target.value)} style={{ padding: "6px 10px", fontSize: 13 }}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    {a.invoice ? (
                      <span className={`badge ${a.invoice.status === "Paid" ? "badge-completed" : "badge-noshow"}`}>
                        {a.invoice.status === "Paid" ? "Paid" : "Billed"}
                      </span>
                    ) : (
                      <button className="btn btn-outline btn-sm" onClick={() => setBillFor(a)}><Icon name="receipt" size={14} /> Bill</button>
                    )}
                  </td>
                </tr>
              ))}
              {appts.length === 0 && (
                <tr><td colSpan={7}>
                  <div className="empty-state"><div className="big"><Icon name="calendar" size={48} /></div><h2>No appointments for today</h2><p>Book one to get started.</p></div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {billFor && (
        <BillModal
          appointmentId={billFor.id}
          doctorFee={billFor.doctor.fee}
          patientName={billFor.patient.user.name}
          onClose={() => setBillFor(null)}
          onDone={load}
        />
      )}
    </>
  );
}
