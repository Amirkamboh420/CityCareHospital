import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export default async function PatientProfilePage() {
  const session = await getSession();
  const patient = await prisma.patient.findUnique({
    where: { userId: session!.userId },
    include: { user: { select: { name: true, email: true, createdAt: true } } },
  });
  if (!patient) return <p>Patient profile not found.</p>;

  const apptCount = await prisma.appointment.count({ where: { patientId: patient.id } });

  const rows: [string, string][] = [
    ["Full Name", patient.user.name],
    ["Email", patient.user.email],
    ["Phone", patient.phone || "—"],
    ["Date of Birth", patient.dob || "—"],
    ["Gender", patient.gender],
    ["Blood Group", patient.bloodGroup || "—"],
    ["Address", patient.address || "—"],
    ["Total Visits", String(apptCount)],
    ["Member Since", new Date(patient.user.createdAt).toLocaleDateString()],
  ];

  return (
    <div className="profile-grid">
      <div className="panel">
        <div className="panel-body" style={{ textAlign: "center" }}>
          <span className="avatar-lg">{patient.user.name.charAt(0).toUpperCase()}</span>
          <h2 style={{ marginTop: 14, color: "var(--navy)" }}>{patient.user.name}</h2>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>{patient.user.email}</p>
          <span className="badge badge-teal" style={{ marginTop: 10 }}>PATIENT</span>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head"><h2>Profile Details</h2></div>
        <div className="table-wrap">
          <table className="data-table">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <td style={{ color: "var(--muted)", width: 180 }}>{k}</td>
                  <td><b>{v}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
