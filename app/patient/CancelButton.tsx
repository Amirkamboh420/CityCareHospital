"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { useToast } from "@/components/Toast";

export default function CancelAppointmentButton({ id }: { id: string }) {
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  async function cancel() {
    if (!confirm("Cancel this appointment?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to cancel.");
      toast("Appointment cancelled.", "info");
      window.location.reload();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Failed to cancel.", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button className="icon-btn-sm danger" onClick={cancel} disabled={busy}>
      {busy ? "…" : <><Icon name="x" size={13} /> Cancel</>}
    </button>
  );
}
