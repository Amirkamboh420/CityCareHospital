"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import { useRouter } from "next/navigation";

const STATUSES = ["Scheduled", "Completed", "No-Show", "Cancelled"];

export default function StatusChanger({ id, current }: { id: string; current: string }) {
  const [status, setStatus] = useState(current);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function change(next: string) {
    setBusy(true);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed.");
      setStatus(next);
      toast(`Appointment marked as ${next}.`, next === "Cancelled" ? "info" : "success");
      router.refresh();
    } catch (e) {
      toast(e instanceof Error ? e.message : "Update failed.", "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <select
      className="select-input"
      value={status}
      disabled={busy}
      onChange={(e) => change(e.target.value)}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
