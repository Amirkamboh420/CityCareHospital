import { prisma } from "@/lib/db";
import { Icon } from "@/components/icons";
import { getSession } from "@/lib/auth";
import { StatusBadge } from "@/components/ui";
import CancelAppointmentButton from "./CancelButton";
import Link from "next/link";

export default async function PatientDashboard() {
  const session = await getSession();
  const patient = await prisma.patient.findUnique({
    where: { userId: session!.userId },
    include: { user: { select: { name: true } } },
  });
  if (!patient) return <p>Patient profile not found.</p>;

  const appointments = await prisma.appointment.findMany({
    where: { patientId: patient.id },
    orderBy: [{ date: "desc" }, { time: "asc" }],
    include: { doctor: { include: { user: { select: { name: true } } } } },
  });

  const upcoming = appointments.filter((a) => a.status === "Scheduled");
  const past = appointments.filter((a) => a.status !== "Scheduled");

  return (
    <>
      <div className="panel" style={{ background: "linear-gradient(120deg, var(--teal-dark), var(--teal))", color: "#fff", border: "none" }}>
        <div className="panel-body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 4 }}>Hello, {patient.user.name}</h2>
            <p style={{ opacity: 0.9 }}>Here are your appointments and health records.</p>
          </div>
          <Link href="/patient/book" className="btn btn-light"><Icon name="calendar" size={16} /> Book Appointment</Link>
        </div>
      </div>

      <h2 style={{ fontSize: 20, color: "var(--navy)", marginBottom: 14 }}>Upcoming Appointments ({upcoming.length})</h2>
      {upcoming.length === 0 ? (
        <div className="panel"><div className="empty-state"><div className="big"><Icon name="calendar" size={48} /></div><h2>No upcoming appointments</h2><p>Book one to get started.</p></div></div>
      ) : (
        <div className="panel">
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Date</th><th>Time</th><th>Doctor</th><th>Reason</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {upcoming.map((a) => (
                  <tr key={a.id}>
                    <td><b>{a.date}</b></td>
                    <td>{a.time}</td>
                    <td>{a.doctor.user.name}</td>
                    <td style={{ whiteSpace: "normal", minWidth: 160 }}>{a.reason}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td><CancelAppointmentButton id={a.id} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <h2 style={{ fontSize: 20, color: "var(--navy)", margin: "28px 0 14px" }}>Past Visits ({past.length})</h2>
      <div className="panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Date</th><th>Doctor</th><th>Reason</th><th>Status</th></tr></thead>
            <tbody>
              {past.map((a) => (
                <tr key={a.id}>
                  <td>{a.date}</td>
                  <td>{a.doctor.user.name}</td>
                  <td style={{ whiteSpace: "normal", minWidth: 160 }}>{a.reason}</td>
                  <td><StatusBadge status={a.status} /></td>
                </tr>
              ))}
              {past.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: "center", color: "var(--muted)" }}>No past visits.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
