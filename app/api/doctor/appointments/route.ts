import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "DOCTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const doctor = await prisma.doctor.findUnique({ where: { userId: session.userId } });
  if (!doctor) return NextResponse.json({ appointments: [] });

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: doctor.id },
    orderBy: [{ date: "desc" }, { time: "asc" }],
    include: {
      patient: { include: { user: { select: { name: true } } } },
      prescription: true,
    },
  });
  return NextResponse.json({ appointments });
}
