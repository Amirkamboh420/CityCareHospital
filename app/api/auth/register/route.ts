import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, dob, gender, bloodGroup, address } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashed,
        role: Role.PATIENT,
        patient: {
          create: {
            phone: phone || "",
            dob: dob || "",
            gender: gender || "Other",
            bloodGroup: bloodGroup || null,
            address: address || null,
          },
        },
      },
    });

    await createSession({ userId: user.id, role: user.role, name: user.name });
    return NextResponse.json({ ok: true, role: user.role });
  } catch (e) {
    console.error("register error", e);
    if (e instanceof Prisma.PrismaClientInitializationError && /can't reach database server/i.test(e.message)) {
      return NextResponse.json(
        { error: "Database is unavailable. Start PostgreSQL, then run the database migrations and seed." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
