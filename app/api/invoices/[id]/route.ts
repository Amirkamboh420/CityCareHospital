import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notifyUser } from "@/lib/notify";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { status } = await req.json();
    if (!["Paid", "Cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const inv = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: { patient: { include: { user: true } } },
    });
    if (!inv) return NextResponse.json({ error: "Invoice not found." }, { status: 404 });

    // Patients may only pay their own bills; staff may do anything
    if (session.role === "PATIENT") {
      const patient = await prisma.patient.findUnique({ where: { userId: session.userId } });
      if (!patient || patient.id !== inv.patientId || status !== "Paid") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    } else if (!["ADMIN", "RECEPTIONIST"].includes(session.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.invoice.update({ where: { id: params.id }, data: { status } });

    if (status === "Paid") {
      await notifyUser(
        inv.patient.user.id,
        "Payment received",
        `Payment of Rs. ${inv.total.toLocaleString()} received. Bill #${inv.id.slice(-6).toUpperCase()} is now Paid. Thank you!`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update invoice." }, { status: 500 });
  }
}
