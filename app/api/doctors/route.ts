import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function GET() {
  const doctors = await prisma.doctor.findMany({
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { id: "asc" },
  });
  return NextResponse.json({ doctors });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { name, email, password, specialty, qualification, fee, schedule } = await req.json();
    if (!name || !email || !password || !specialty) {
      return NextResponse.json({ error: "Name, email, password and specialty are required." }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) return NextResponse.json({ error: "Email already in use." }, { status: 409 });

    const user = await prisma.user.create({
      data: {
        name, email: email.toLowerCase(), password: await bcrypt.hash(password, 10), role: Role.DOCTOR,
        doctor: { create: { specialty, qualification: qualification || "", fee: Number(fee) || 0, schedule: schedule || "" } },
      },
      include: { doctor: true },
    });
    return NextResponse.json({ ok: true, id: user.doctor!.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create doctor." }, { status: 500 });
  }
}
