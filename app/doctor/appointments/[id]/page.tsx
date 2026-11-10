import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import PrescriptionForm from "./PrescriptionForm";
import StatusChanger from "./StatusChanger";
import { StatusBadge } from "@/components/ui";

export default async function AppointmentDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const doctor = await prisma.doctor.findUnique({ where: { userId: session!.userId } });
  const appt = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: {
      patient: { include: { user: { select: { name: true, email: true } } } },
      doctor: { include: { user: { select: { name: true } } } },
      prescription: true,
    },
  });
  if (!appt || !doctor || appt.doctorId !== doctor.id) {
    if (!appt) notFound();
    redirect("/doctor");
  }

  // patient history with this doctor
  const history = await prisma.appointment.findMany({
    where: { doctorId: doctor.id, patientId: appt.patientId, NOT: { id: appt.id } },
    orderBy: { date: "desc" },
    include: { prescription: true },
    take: 5,
  });

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <h2>Appointment Details</h2>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <StatusBadge status={appt.status} />
            <StatusChanger id={appt.id} current={appt.status} />
          </div>
        </div>
        <div className="panel-body">
          <div className="form-grid">
            <div><p style={{ color: "var(--muted)", fontSize: 13 }}>Patient</p><p><b>{appt.patient.user.name}</b></p></div>
            <div><p style={{ color: "var(--muted)", fontSize: 13 }}>Email</p><p>{appt.patient.user.email}</p></div>
            <div><p style={{ color: "var(--muted)", fontSize: 13 }}>Date</p><p><b>{appt.date}</b></p></div>
            <div><p style={{ color: "var(--muted)", fontSize: 13 }}>Time</p><p><b>{appt.time}</b></p></div>
          </div>
          <div style={{ marginTop: 16 }}>
            <p style={{ color: "var(--muted)", fontSize: 13 }}>Reason for visit</p>
            <p>{appt.reason}</p>
          </div>
          <div className="form-grid" style={{ marginTop: 16 }}>
            <div><p style={{ color: "var(--muted)", fontSize: 13 }}>Phone</p><p>{appt.patient.phone || "—"}</p></div>
            <div><p style={{ color: "var(--muted)", fontSize: 13 }}>Blood Group</p><p>{appt.patient.bloodGroup || "—"}</p></div>
          </div>
        </div>
      </div>

      <PrescriptionForm
        appointmentId={appt.id}
        existing={appt.prescription ? {
          diagnosis: appt.prescription.diagnosis,
          medicines: appt.prescription.medicines,
          notes: appt.prescription.notes || "",
        } : null}
      />

      <div className="panel">
        <div className="panel-head"><h2>Patient History with You</h2></div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Date</th><th>Reason</th><th>Diagnosis</th><th>Status</th></tr></thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td>{h.date}</td>
                  <td style={{ whiteSpace: "normal", minWidth: 160 }}>{h.reason}</td>
                  <td style={{ whiteSpace: "normal", minWidth: 160 }}>{h.prescription?.diagnosis || "—"}</td>
                  <td><StatusBadge status={h.status} /></td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: "center", color: "var(--muted)" }}>First visit — no prior history.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
