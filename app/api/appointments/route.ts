import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notifyUser } from "@/lib/notify";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId");
  const patientId = searchParams.get("patientId");
  const where: Record<string, string> = {};
  if (doctorId) where.doctorId = doctorId;
  if (patientId) where.patientId = patientId;

  const appointments = await prisma.appointment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      patient: { include: { user: { select: { name: true } } } },
      doctor: { include: { user: { select: { name: true } } }, },
      prescription: true,
      invoice: { select: { id: true, status: true } },
    },
  });
  return NextResponse.json({ appointments });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !["ADMIN", "RECEPTIONIST", "PATIENT"].includes(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { patientId, doctorId, date, time, reason } = await req.json();
    if (!doctorId || !date || !time) {
      return NextResponse.json({ error: "Doctor, date and time are required." }, { status: 400 });
    }

    let pid = patientId;
    if (!pid) {
      // resolve from logged-in patient
      const patient = await prisma.patient.findUnique({ where: { userId: session.userId } });
      if (!patient) return NextResponse.json({ error: "Patient profile not found." }, { status: 400 });
      pid = patient.id;
    }

    const appt = await prisma.appointment.create({
      data: { patientId: pid, doctorId, date, time, reason: reason || "General consultation", status: "Scheduled" },
      include: {
        patient: { include: { user: { select: { id: true, name: true } } } },
        doctor: { include: { user: { select: { id: true, name: true } } } },
      },
    });

    // Notify patient + doctor
    await notifyUser(
      appt.patient.user.id,
      "Appointment booked",
      `Your appointment with ${appt.doctor.user.name} is booked for ${date} at ${time}.`
    );
    await notifyUser(
      appt.doctor.user.id,
      "New appointment",
      `${appt.patient.user.name} booked an appointment for ${date} at ${time}.`
    );

    return NextResponse.json({ ok: true, id: appt.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to book appointment." }, { status: 500 });
  }
}
