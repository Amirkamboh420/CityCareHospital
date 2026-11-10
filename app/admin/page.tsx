import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/ui";
import Link from "next/link";
import { Suspense } from "react";
import { SkeletonCard, SkeletonTable } from "@/components/Skeleton";
import { StatRow, RevenuePanel, StatusPanel, TopDoctorsPanel } from "./DashboardClient";
import { Icon } from "@/components/icons";

async function RecentPanel() {
  const recent = await prisma.appointment.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    include: {
      patient: { include: { user: { select: { name: true } } } },
      doctor: { include: { user: { select: { name: true } } } },
    },
  });
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Recent Appointments</h2>
        <Link href="/admin/appointments" className="btn btn-outline btn-sm">View All</Link>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr>
          </thead>
          <tbody>
            {recent.map((a) => (
              <tr key={a.id}>
                <td><b>{a.patient.user.name}</b></td>
                <td>{a.doctor.user.name}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td><StatusBadge status={a.status} /></td>
              </tr>
            ))}
            {recent.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--muted)" }}>No appointments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
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

      <div className="dash-two-col">
        <Suspense fallback={<SkeletonCard rows={4} />}>
          <StatusPanel />
        </Suspense>
        <Suspense fallback={<SkeletonCard rows={4} />}>
          <TopDoctorsPanel />
        </Suspense>
      </div>

      <Suspense fallback={<SkeletonTable cols={5} rows={4} />}>
        <RecentPanel />
      </Suspense>

      <div className="panel">
        <div className="panel-head"><h2>Quick Actions</h2></div>
        <div className="panel-body" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/admin/doctors" className="btn btn-primary"><Icon name="plus" size={15} /> Add Doctor</Link>
          <Link href="/reception/book" className="btn btn-outline"><Icon name="calendar" size={15} /> Book Appointment</Link>
          <Link href="/admin/users" className="btn btn-outline"><Icon name="users" size={15} /> Manage Users</Link>
        </div>
      </div>
    </>
  );
}
