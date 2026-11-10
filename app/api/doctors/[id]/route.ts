import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { name, specialty, qualification, fee, schedule } = await req.json();
    const doc = await prisma.doctor.update({
      where: { id: params.id },
      data: {
        specialty, qualification, fee: Number(fee) || 0, schedule,
        user: name ? { update: { name } } : undefined,
      },
    });
    return NextResponse.json({ ok: true, id: doc.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update doctor." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const doc = await prisma.doctor.findUnique({ where: { id: params.id }, select: { userId: true } });
    if (!doc) return NextResponse.json({ error: "Not found." }, { status: 404 });
    await prisma.user.delete({ where: { id: doc.userId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete doctor." }, { status: 500 });
  }
}
