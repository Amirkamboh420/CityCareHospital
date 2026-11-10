import { prisma } from "@/lib/db";
import { Icon } from "@/components/icons";
import { getSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import PrintButton from "./PrintButton";

export default async function PrescriptionPrintPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const patient = await prisma.patient.findUnique({ where: { userId: session!.userId } });
  if (!patient) return <p>Patient profile not found.</p>;

  const rx = await prisma.prescription.findFirst({
    where: { id: params.id, appointment: { patientId: patient.id } },
    include: {
      appointment: {
        include: {
          doctor: { include: { user: { select: { name: true } } } },
          patient: { include: { user: { select: { name: true } } } },
        },
      },
    },
  });
  if (!rx) notFound();

  return (
    <>
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, color: "var(--navy)", display: "flex", alignItems: "center", gap: 10 }}><Icon name="pill" size={22} /> Prescription Preview</h2>
        <PrintButton />
      </div>

      <div className="panel print-sheet">
        <div className="panel-body">
          <div className="print-header">
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "var(--navy)", display: "flex", alignItems: "center", gap: 10 }}><Icon name="cross" size={24} /> CityCare Hospital</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>123 Medical Road, Faisalabad · +92 41 876 5432 · 24/7 Emergency</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="badge badge-teal">Rx #{rx.id.slice(-6).toUpperCase()}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>
                {new Date(rx.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="print-meta">
            <div><b>Patient:</b> {rx.appointment.patient.user.name}</div>
            <div><b>Doctor:</b> {rx.appointment.doctor.user.name}</div>
            <div><b>Visit date:</b> {rx.appointment.date} · {rx.appointment.time}</div>
            <div><b>Diagnosis:</b> {rx.diagnosis}</div>
          </div>

          <div className="rx-box">
            <h4>℞ Medicines</h4>
            <pre>{rx.medicines}</pre>
          </div>

          {rx.notes && (
            <div style={{ marginTop: 16 }}>
              <b>Doctor&apos;s advice:</b>
              <p style={{ color: "var(--muted)" }}>{rx.notes}</p>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48, fontSize: 14 }}>
            <div>____________________<br /><span style={{ color: "var(--muted)" }}>Patient signature</span></div>
            <div style={{ textAlign: "right" }}>____________________<br /><span style={{ color: "var(--muted)" }}>Doctor signature &amp; stamp</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
