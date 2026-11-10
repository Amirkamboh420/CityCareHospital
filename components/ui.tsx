export function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) {
  return (
    <div className="stat-card">
      <span className="stat-icon" style={{ background: color + "1a", color }}>{icon}</span>
      <div>
        <b>{value}</b>
        <span>{label}</span>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "Completed" ? "badge-completed" :
    status === "Cancelled" ? "badge-cancelled" :
    status === "No-Show" ? "badge-noshow" :
    "badge-scheduled";
  return <span className={`badge ${cls}`}>{status}</span>;
}

export function InvoiceBadge({ status }: { status: string }) {
  const cls =
    status === "Paid" ? "badge-completed" :
    status === "Cancelled" ? "badge-cancelled" :
    "badge-noshow";
  return <span className={`badge ${cls}`}>{status}</span>;
}

export function RoleBadge({ role }: { role: string }) {
  const cls =
    role === "ADMIN" ? "badge-navy" :
    role === "DOCTOR" ? "badge-teal" :
    role === "RECEPTIONIST" ? "badge-amber" :
    "badge-scheduled";
  return <span className={`badge ${cls}`}>{role}</span>;
}
