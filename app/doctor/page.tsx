import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { StatCard, StatusBadge } from "@/components/ui";
import Link from "next/link";
import { Icon } from "@/components/icons";

export default async function DoctorDashboard() {
  const session = await getSession();
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session!.userId },
    include: { user: { select: { name: true } } },
  });
  if (!doctor) return <p>Doctor profile not found.</p>;

  const today = new Date().toISOString().slice(0, 10);
  const [todays, upcoming, totalPatients] = await Promise.all([
    prisma.appointment.findMany({
      where: { doctorId: doctor.id, date: today },
      include: { patient: { include: { user: { select: { name: true } } } } },
      orderBy: { time: "asc" },
    }),
    prisma.appointment.count({ where: { doctorId: doctor.id, status: "Scheduled" } }),
    prisma.appointment.findMany({ where: { doctorId: doctor.id }, select: { patientId: true }, distinct: ["patientId"] }),
  ]);

  return (
    <>
      <div className="panel" style={{ background: "linear-gradient(120deg, var(--navy), #1a4a73)", color: "#fff", border: "none" }}>
        <div className="panel-body">
          <h2 style={{ fontSize: 24, marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}><Icon name="stethoscope" size={26} /> Welcome, {doctor.user.name}</h2>
          <p style={{ color: "#b9cfe3" }}>{doctor.specialty} • {doctor.qualification} • Fee Rs. {doctor.fee.toLocaleString()}</p>
          <p style={{ color: "#8fa9c4", fontSize: 13, marginTop: 4 }}><Icon name="clock" size={13} /> {doctor.schedule}</p>
        </div>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <StatCard icon={<Icon name="calendar" size={26} />} value={todays.length} label="Today's Appointments" color="#0d9488" />
        <StatCard icon={<Icon name="clock" size={26} />} value={upcoming} label="Upcoming" color="#f59e0b" />
        <StatCard icon={<Icon name="users" size={26} />} value={totalPatients.length} label="Total Patients" color="#2563eb" />
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Today&apos;s Appointments ({today})</h2>
          <Link href="/doctor/appointments" className="btn btn-outline btn-sm">All Appointments</Link>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Time</th><th>Patient</th><th>Reason</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {todays.map((a) => (
                <tr key={a.id}>
                  <td><b>{a.time}</b></td>
                  <td>{a.patient.user.name}</td>
                  <td style={{ whiteSpace: "normal", minWidth: 180 }}>{a.reason}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td><Link href={`/doctor/appointments/${a.id}`} className="btn btn-primary btn-sm">Open <Icon name="arrow-right" size={14} /></Link></td>
                </tr>
              ))}
              {todays.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--muted)" }}>No appointments scheduled for today.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
