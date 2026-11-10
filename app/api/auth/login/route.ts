import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await createSession({ userId: user.id, role: user.role, name: user.name });
    return NextResponse.json({ ok: true, role: user.role, name: user.name });
  } catch (e) {
    console.error("login error", e);
    if (e instanceof Prisma.PrismaClientInitializationError && /can't reach database server/i.test(e.message)) {
      return NextResponse.json(
        { error: "Database is unavailable. Start PostgreSQL, then run the database migrations and seed." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
