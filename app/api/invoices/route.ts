import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notifyUser } from "@/lib/notify";

// List invoices — scoped by role
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const where: Record<string, string> = {};
  if (session.role === "PATIENT") {
    const patient = await prisma.patient.findUnique({ where: { userId: session.userId } });
    if (!patient) return NextResponse.json({ invoices: [] });
    where.patientId = patient.id;
  }

  const invoices = await prisma.invoice.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      patient: { include: { user: { select: { name: true } } } },
      appointment: {
        include: { doctor: { include: { user: { select: { name: true } } } } },
      },
    },
  });
  return NextResponse.json({ invoices });
}

// Create invoice (receptionist / admin)
export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !["ADMIN", "RECEPTIONIST"].includes(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { appointmentId, items } = await req.json();
    if (!appointmentId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Appointment and at least one item are required." }, { status: 400 });
    }
    const appt = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { patient: { include: { user: true } }, doctor: { include: { user: true } } },
    });
    if (!appt) return NextResponse.json({ error: "Appointment not found." }, { status: 404 });

    const existing = await prisma.invoice.findUnique({ where: { appointmentId } });
    if (existing) return NextResponse.json({ error: "A bill already exists for this appointment." }, { status: 400 });

    const total = items.reduce((s: number, it: { amount: number }) => s + (Number(it.amount) || 0), 0);
    const inv = await prisma.invoice.create({
      data: {
        appointmentId,
        patientId: appt.patientId,
        items,
        total,
        status: "Unpaid",
      },
    });

    await notifyUser(
      appt.patient.user.id,
      "New bill generated",
      `Bill of Rs. ${total.toLocaleString()} generated for your visit with ${appt.doctor.user.name} on ${appt.date}.`
    );

    return NextResponse.json({ ok: true, id: inv.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create invoice." }, { status: 500 });
  }
}
