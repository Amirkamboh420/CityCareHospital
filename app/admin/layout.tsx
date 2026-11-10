import DashLayout, { NavItem } from "@/components/DashLayout";

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/doctors", label: "Doctors", icon: "stethoscope" },
  { href: "/admin/patients", label: "Patients", icon: "users" },
  { href: "/admin/appointments", label: "Appointments", icon: "calendar" },
  { href: "/admin/users", label: "Users", icon: "users" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashLayout title="Admin Panel" subtitle="Manage your hospital operations" nav={NAV}>
      {children}
    </DashLayout>
  );
}
