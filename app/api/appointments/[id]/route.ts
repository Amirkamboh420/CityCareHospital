import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notifyUser } from "@/lib/notify";

const VALID = ["Scheduled", "Completed", "No-Show", "Cancelled"];

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { status } = await req.json();
    if (!VALID.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const appt = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: {
        patient: { include: { user: { select: { id: true, name: true } } } },
        doctor: { include: { user: { select: { id: true, name: true } } } },
      },
    });
    if (!appt) return NextResponse.json({ error: "Appointment not found." }, { status: 404 });

    if (session.role === "PATIENT") {
      // patients can only cancel their own upcoming appointments
      const patient = await prisma.patient.findUnique({ where: { userId: session.userId } });
      if (!patient || patient.id !== appt.patientId || status !== "Cancelled") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    } else if (session.role === "DOCTOR") {
      // doctors can only update their own appointments
      const doc = await prisma.doctor.findUnique({ where: { userId: session.userId } });
      if (!doc || doc.id !== appt.doctorId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    } else if (!["ADMIN", "RECEPTIONIST"].includes(session.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.appointment.update({ where: { id: params.id }, data: { status } });

    if (status === "Cancelled") {
      const by = session.role === "PATIENT" ? appt.patient.user.name : `${session.role.toLowerCase()} (${session.name})`;
      await notifyUser(
        appt.patient.user.id,
        "Appointment cancelled",
        `Your appointment with ${appt.doctor.user.name} on ${appt.date} at ${appt.time} was cancelled by ${by}.`
      );
      await notifyUser(
        appt.doctor.user.id,
        "Appointment cancelled",
        `Appointment with ${appt.patient.user.name} on ${appt.date} at ${appt.time} was cancelled by ${by}.`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update appointment." }, { status: 500 });
  }
}
