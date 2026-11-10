"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";
import { Icon } from "@/components/icons";
import { InvoiceBadge } from "@/components/ui";
import { SkeletonTable } from "@/components/Skeleton";

type Item = { desc: string; amount: number };
type Invoice = {
  id: string;
  items: Item[];
  total: number;
  status: string;
  createdAt: string;
  appointment: { date: string; time: string; doctor: { user: { name: string } } };
};

export default function PatientBillsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState<string | null>(null);
  const { toast } = useToast();

  async function load() {
    try {
      const res = await fetch("/api/invoices");
      const data = await res.json();
      setInvoices(data.invoices || []);
    } catch {
      toast("Failed to load bills.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function pay(id: string) {
    if (!confirm("Pay this bill now? (mock payment)")) return;
    setPaying(id);
    try {
      const res = await fetch(`/api/invoices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Paid" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment failed.");
      toast("Payment successful. Bill marked as Paid.");
      load();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Payment failed.", "error");
    } finally {
      setPaying(null);
    }
  }

  if (loading) return <SkeletonTable cols={5} rows={5} />;

  const unpaidTotal = invoices.filter((i) => i.status === "Unpaid").reduce((s, i) => s + i.total, 0);

  return (
    <>
      <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-card">
          <span className="stat-icon" style={{ background: "#fef3c7", color: "#f59e0b" }}><Icon name="receipt" size={26} /></span>
          <div><b>{invoices.length}</b><span>Total Bills</span></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ background: "#fef2f2", color: "#dc2626" }}><Icon name="clock" size={26} /></span>
          <div><b>Rs. {unpaidTotal.toLocaleString()}</b><span>Unpaid Balance</span></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon" style={{ background: "#ecfdf5", color: "#059669" }}><Icon name="check-circle" size={26} /></span>
          <div><b>{invoices.filter((i) => i.status === "Paid").length}</b><span>Paid Bills</span></div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h2><Icon name="receipt" size={20} /> My Bills ({invoices.length})</h2></div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Bill #</th><th>Date</th><th>Visit</th><th>Total</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td><b>#{inv.id.slice(-6).toUpperCase()}</b></td>
                  <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                  <td style={{ whiteSpace: "normal", minWidth: 170 }}>
                    {inv.appointment.date} — {inv.appointment.doctor.user.name}
                  </td>
                  <td><b>Rs. {inv.total.toLocaleString()}</b></td>
                  <td><InvoiceBadge status={inv.status} /></td>
                  <td>
                    {inv.status === "Unpaid" ? (
                      <button className="btn btn-primary btn-sm" onClick={() => pay(inv.id)} disabled={paying === inv.id}>
                        {paying === inv.id ? "…" : <><Icon name="credit-card" size={14} /> Pay Now</>}
                      </button>
                    ) : (
                      <span style={{ color: "var(--muted)", fontSize: 13 }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr><td colSpan={6}>
                  <div className="empty-state"><div className="big"><Icon name="receipt" size={48} /></div><h2>No bills yet</h2><p>Bills for your visits will appear here.</p></div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {invoices.some((i) => i.status === "Unpaid") && (
        <div className="panel">
          <div className="panel-head"><h2>Unpaid bill details</h2></div>
          <div className="panel-body">
            {invoices.filter((i) => i.status === "Unpaid").map((inv) => (
              <div key={inv.id} style={{ marginBottom: 20 }}>
                <b>Bill #{inv.id.slice(-6).toUpperCase()}</b>
                <ul style={{ margin: "8px 0 0 18px", color: "var(--muted)", fontSize: 14 }}>
                  {inv.items.map((it, n) => (
                    <li key={n}>{it.desc} — <b style={{ color: "var(--navy)" }}>Rs. {Number(it.amount).toLocaleString()}</b></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
