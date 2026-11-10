import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

const ROLE_HOME: Record<string, string> = {
  ADMIN: "/admin",
  DOCTOR: "/doctor",
  RECEPTIONIST: "/reception",
  PATIENT: "/patient",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  redirect(ROLE_HOME[session.role] || "/patient");
}
