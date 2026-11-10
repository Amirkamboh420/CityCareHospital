"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import { Icon } from "@/components/icons";

type Item = { desc: string; amount: number };

export default function BillModal({
  appointmentId,
  doctorFee,
  patientName,
  onClose,
  onDone,
}: {
  appointmentId: string;
  doctorFee: number;
  patientName: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const [items, setItems] = useState<Item[]>([{ desc: "Consultation fee", amount: doctorFee }]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  const total = items.reduce((s, i) => s + (Number(i.amount) || 0), 0);

  function addItem() {
    if (!desc.trim() || !Number(amount)) {
      toast("Enter item description and amount.", "error");
      return;
    }
    setItems((p) => [...p, { desc: desc.trim(), amount: Number(amount) }]);
    setDesc("");
    setAmount("");
  }

  async function submit() {
    setBusy(true);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create bill.");
      toast(`Bill of Rs. ${total.toLocaleString()} generated.`);
      onDone();
      onClose();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to create bill.", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2><Icon name="receipt" size={20} /> Generate Bill — {patientName}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
        </div>
        <div className="modal-body">
          <div className="form-field">
            <label>Bill items</label>
            {items.map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input value={it.desc} readOnly style={{ flex: 1, border: "1px solid var(--line)", borderRadius: 8, padding: "9px 12px", fontSize: 14 }} />
                <input value={it.amount} readOnly style={{ width: 110, border: "1px solid var(--line)", borderRadius: 8, padding: "9px 12px", fontSize: 14 }} />
                {i > 0 && (
                  <button className="icon-btn-sm danger" onClick={() => setItems((p) => p.filter((_, n) => n !== i))} aria-label="Remove"><Icon name="x" size={14} /></button>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              className="search-input" style={{ flex: 1 }} placeholder="Item description (e.g. Blood test)"
              value={desc} onChange={(e) => setDesc(e.target.value)}
            />
            <input
              className="search-input" style={{ width: 130 }} placeholder="Amount" type="number" min="1"
              value={amount} onChange={(e) => setAmount(e.target.value)}
            />
            <button className="btn btn-outline btn-sm" onClick={addItem}><Icon name="plus" size={14} /> Add</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: "var(--navy)", borderTop: "2px solid var(--line)", paddingTop: 14, marginTop: 8 }}>
            <span>Total</span><span>Rs. {total.toLocaleString()}</span>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit} disabled={busy}>
            {busy ? "Saving…" : <><Icon name="receipt" size={15} /> Generate Bill</>}
          </button>
        </div>
      </div>
    </div>
  );
}
