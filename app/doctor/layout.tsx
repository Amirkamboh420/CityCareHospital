import DashLayout, { NavItem } from "@/components/DashLayout";

const NAV: NavItem[] = [
  { href: "/doctor", label: "Dashboard", icon: "grid" },
  { href: "/doctor/appointments", label: "Appointments", icon: "calendar" },
  { href: "/doctor/patients", label: "My Patients", icon: "users" },
];

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashLayout title="Doctor Panel" subtitle="Your practice at a glance" nav={NAV}>
      {children}
    </DashLayout>
  );
}
