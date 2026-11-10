import DashLayout, { NavItem } from "@/components/DashLayout";

const NAV: NavItem[] = [
  { href: "/reception", label: "Dashboard", icon: "grid" },
  { href: "/reception/book", label: "Book Appointment", icon: "plus" },
  { href: "/reception/patients", label: "Patients", icon: "users" },
];

export default function ReceptionLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashLayout title="Reception Panel" subtitle="Front-desk operations" nav={NAV}>
      {children}
    </DashLayout>
  );
}
