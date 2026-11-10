import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function DoctorPatientsPage() {
  const session = await getSession();
  const doctor = await prisma.doctor.findUnique({ where: { userId: session!.userId } });
  if (!doctor) return <p>Doctor profile not found.</p>;

  const appts = await prisma.appointment.findMany({
    where: { doctorId: doctor.id },
    include: {
      patient: { include: { user: { select: { name: true, email: true } } } },
      prescription: true,
    },
    orderBy: { date: "desc" },
  });

  const byPatient = new Map<string, { name: string; email: string; phone: string; visits: number; lastVisit: string }>();
  for (const a of appts) {
    const p = a.patient;
    const cur = byPatient.get(p.id);
    if (!cur || a.date > cur.lastVisit) {
      byPatient.set(p.id, {
        name: p.user.name,
        email: p.user.email,
        phone: p.phone,
        visits: (cur?.visits || 0) + 1,
        lastVisit: !cur || a.date > cur.lastVisit ? a.date : cur.lastVisit,
      });
    } else {
      cur.visits += 1;
    }
  }
  const patients = [...byPatient.entries()].map(([id, v]) => ({ id, ...v }));

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>My Patients ({patients.length})</h2>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Visits</th><th>Last Visit</th></tr></thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td><b>{p.name}</b></td>
                <td>{p.email}</td>
                <td>{p.phone || "—"}</td>
                <td><span className="badge badge-teal">{p.visits}</span></td>
                <td>{p.lastVisit}</td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--muted)" }}>No patients yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
