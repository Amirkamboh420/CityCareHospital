import { prisma } from "@/lib/db";
import { Icon } from "@/components/icons";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function PatientPrescriptionsPage() {
  const session = await getSession();
  const patient = await prisma.patient.findUnique({ where: { userId: session!.userId } });
  if (!patient) return <p>Patient profile not found.</p>;

  const prescriptions = await prisma.prescription.findMany({
    where: { appointment: { patientId: patient.id } },
    include: {
      appointment: { include: { doctor: { include: { user: { select: { name: true } } } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <h2 style={{ fontSize: 22, color: "var(--navy)", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}><Icon name="pill" size={24} /> My Prescriptions ({prescriptions.length})</h2>
      {prescriptions.length === 0 ? (
        <div className="panel"><div className="empty-state"><div className="big"><Icon name="pill" size={48} /></div><h2>No prescriptions yet</h2><p>Your doctor&apos;s prescriptions will appear here after your visit.</p></div></div>
      ) : (
        prescriptions.map((rx) => (
          <div className="panel" key={rx.id}>
            <div className="panel-head">
              <h2>{rx.appointment.date} — {rx.appointment.doctor.user.name}</h2>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span className="badge badge-teal">Rx #{rx.id.slice(-6).toUpperCase()}</span>
                <Link href={`/patient/prescriptions/${rx.id}`} className="btn btn-outline btn-sm"><Icon name="printer" size={14} /> View / Print</Link>
              </div>
            </div>
            <div className="panel-body">
              <p style={{ marginBottom: 12 }}><b>Diagnosis:</b> {rx.diagnosis}</p>
              <div className="rx-box">
                <h4><Icon name="pill" size={16} /> Medicines</h4>
                <pre>{rx.medicines}</pre>
              </div>
              {rx.notes && (
                <p style={{ marginTop: 12 }}><b>Doctor&apos;s advice:</b> {rx.notes}</p>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
}
