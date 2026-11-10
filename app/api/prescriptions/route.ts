import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notifyUser } from "@/lib/notify";

export async function GET() {
  const patients = await prisma.patient.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { id: "asc" },
  });
  return NextResponse.json({ patients });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json();
    const appt = await prisma.appointment.findUnique({
      where: { id: data.appointmentId },
      include: { doctor: true },
    });
    if (!appt) return NextResponse.json({ error: "Appointment not found." }, { status: 404 });

    // only the appointment's doctor or admin can write prescriptions
    if (session.role !== "ADMIN") {
      const doc = await prisma.doctor.findUnique({ where: { userId: session.userId } });
      if (!doc || doc.id !== appt.doctorId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    }

    const existing = await prisma.prescription.findUnique({ where: { appointmentId: data.appointmentId } });
    let rx;
    if (existing) {
      rx = await prisma.prescription.update({
        where: { appointmentId: data.appointmentId },
        data: { diagnosis: data.diagnosis, medicines: data.medicines, notes: data.notes || null },
      });
    } else {
      rx = await prisma.prescription.create({
        data: {
          appointmentId: data.appointmentId,
          diagnosis: data.diagnosis,
          medicines: data.medicines,
          notes: data.notes || null,
        },
      });
    }
    // mark appointment completed when prescription is written
    await prisma.appointment.update({ where: { id: data.appointmentId }, data: { status: "Completed" } });

    // notify patient
    const full = await prisma.appointment.findUnique({
      where: { id: data.appointmentId },
      include: { patient: { include: { user: { select: { id: true } } } } },
    });
    if (full) {
      await notifyUser(
        full.patient.user.id,
        "New prescription",
        `Your doctor has written a prescription for your visit on ${full.date}. View it in Prescriptions.`
      );
    }

    return NextResponse.json({ ok: true, id: rx.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save prescription." }, { status: 500 });
  }
}
