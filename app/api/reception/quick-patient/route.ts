import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Role } from "@prisma/client";

// Quick patient registration by receptionist/admin (default password pat123)
export async function POST(req: Request) {
  const session = await getSession();
  if (!session || !["ADMIN", "RECEPTIONIST"].includes(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { name, email, password, phone, dob, gender } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) return NextResponse.json({ error: "Email already registered." }, { status: 409 });

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: await bcrypt.hash(password || "pat123", 10),
        role: Role.PATIENT,
        patient: {
          create: { phone: phone || "", dob: dob || "", gender: gender || "Other" },
        },
      },
      include: { patient: true },
    });
    return NextResponse.json({ ok: true, patientId: user.patient!.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to register patient." }, { status: 500 });
  }
}
