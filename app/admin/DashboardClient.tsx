import { prisma } from "@/lib/db";
import { StatCard } from "@/components/ui";
import { Suspense } from "react";
import { SkeletonCard, SkeletonTable } from "@/components/Skeleton";
import { Icon } from "@/components/icons";

function delay() {
  return new Promise((r) => setTimeout(r, 500));
}

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 560, H = 220, P = 36, gap = 10;
  const bw = (W - P * 2) / data.length - gap;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={P} x2={W - P} y1={H - P - f * (H - P * 2)} y2={H - P - f * (H - P * 2)} stroke="#dbe7ee" strokeDasharray="4 4" />
      ))}
      {data.map((d, i) => {
        const h = (d.value / max) * (H - P * 2);
        const x = P + i * (bw + gap) + gap / 2;
        const y = H - P - h;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={bw} height={Math.max(h, 2)} rx="6" fill="url(#barGrad)">
              <title>{d.label}: Rs. {d.value.toLocaleString()}</title>
            </rect>
            <text x={x + bw / 2} y={H - 12} textAnchor="middle" fontSize="11" fill="#5b7288">{d.label}</text>
            {d.value > 0 && (
              <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f766e">
                {(d.value / 1000).toFixed(d.value >= 10000 ? 0 : 1)}k
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export async function RevenuePanel() {
  await delay();
  const paid = await prisma.invoice.findMany({ where: { status: "Paid" } });
  const total = paid.reduce((s, i) => s + i.total, 0);

  const days: { label: string; value: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en", { weekday: "short" });
    const val = paid
      .filter((p) => p.createdAt.toISOString().slice(0, 10) === key)
      .reduce((s, p) => s + p.total, 0);
    days.push({ label, value: val });
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2><Icon name="credit-card" size={20} /> Revenue — Last 7 Days (Paid Bills)</h2>
        <span className="badge badge-teal">Rs. {total.toLocaleString()} collected</span>
      </div>
      <div className="panel-body">
        <BarChart data={days} />
      </div>
    </div>
  );
}

export async function StatusPanel() {
  await delay();
  const groups = await prisma.appointment.groupBy({ by: ["status"], _count: true });
  const order = ["Scheduled", "Completed", "No-Show", "Cancelled"];
  const colors: Record<string, string> = {
    Scheduled: "#2563eb", Completed: "#059669", "No-Show": "#f59e0b", Cancelled: "#dc2626",
  };
  const total = groups.reduce((s, g) => s + g._count, 0);
  const sorted = order
    .map((st) => ({ status: st, count: groups.find((g) => g.status === st)?._count || 0 }))
    .filter((g) => g.count > 0 || total === 0);

  return (
    <div className="panel">
      <div className="panel-head"><h2><Icon name="chart" size={20} /> Appointments by Status</h2></div>
      <div className="panel-body">
        {sorted.map((g) => (
          <div key={g.status} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
              <b>{g.status}</b><span style={{ color: "var(--muted)" }}>{g.count} ({total ? Math.round((g.count / total) * 100) : 0}%)</span>
            </div>
            <div style={{ height: 10, borderRadius: 6, background: "var(--bg-gray)" }}>
              <div style={{
                width: `${total ? (g.count / total) * 100 : 0}%`, height: "100%",
                borderRadius: 6, background: colors[g.status] || "#5b7288",
                transition: "width 0.6s",
              }} />
            </div>
          </div>
        ))}
        {total === 0 && <p style={{ color: "var(--muted)" }}>No appointments yet.</p>}
      </div>
    </div>
  );
}

export async function TopDoctorsPanel() {
  await delay();
  const docs = await prisma.doctor.findMany({
    include: {
      user: { select: { name: true } },
      _count: { select: { appointments: true } },
    },
    orderBy: { appointments: { _count: "desc" } },
    take: 3,
  });

  return (
    <div className="panel">
      <div className="panel-head"><h2><Icon name="trophy" size={20} /> Top Doctors by Appointments</h2></div>
      <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {docs.map((d, i) => (
          <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{
              width: 36, height: 36, borderRadius: "50%", display: "inline-flex",
              alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff",
              background: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : "#b45309",
            }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <b>{d.user.name}</b>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{d.specialty}</div>
            </div>
            <span className="badge badge-teal">{d._count.appointments} visits</span>
          </div>
        ))}
        {docs.length === 0 && <p style={{ color: "var(--muted)" }}>No doctors yet.</p>}
      </div>
    </div>
  );
}

export async function StatRow() {
  const [doctorCount, patientCount, apptCount, paidTotal, unpaidTotal] = await Promise.all([
    prisma.doctor.count(),
    prisma.patient.count(),
    prisma.appointment.count(),
    prisma.invoice.aggregate({ where: { status: "Paid" }, _sum: { total: true } }),
    prisma.invoice.aggregate({ where: { status: "Unpaid" }, _sum: { total: true } }),
  ]);
  return (
    <div className="stat-grid" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
      <StatCard icon={<Icon name="stethoscope" size={26} />} value={doctorCount} label="Total Doctors" color="#0d9488" />
      <StatCard icon={<Icon name="users" size={26} />} value={patientCount} label="Total Patients" color="#2563eb" />
      <StatCard icon={<Icon name="calendar" size={26} />} value={apptCount} label="Appointments" color="#f59e0b" />
      <StatCard icon={<Icon name="credit-card" size={26} />} value={`Rs. ${(paidTotal._sum.total || 0).toLocaleString()}`} label="Revenue Collected" color="#059669" />
      <StatCard icon={<Icon name="clock" size={26} />} value={`Rs. ${(unpaidTotal._sum.total || 0).toLocaleString()}`} label="Unpaid Bills" color="#dc2626" />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <>
      <Suspense fallback={<SkeletonCard rows={2} />}>
        <StatRow />
      </Suspense>

      <Suspense fallback={<SkeletonCard rows={5} />}>
        <RevenuePanel />
      </Suspense>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Suspense fallback={<SkeletonCard rows={4} />}>
          <StatusPanel />
        </Suspense>
        <Suspense fallback={<SkeletonCard rows={4} />}>
          <TopDoctorsPanel />
        </Suspense>
      </div>
    </>
  );
}
