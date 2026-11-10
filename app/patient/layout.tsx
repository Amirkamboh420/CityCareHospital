import DashLayout, { NavItem } from "@/components/DashLayout";

const NAV: NavItem[] = [
  { href: "/patient", label: "My Appointments", icon: "calendar" },
  { href: "/patient/book", label: "Book Appointment", icon: "plus" },
  { href: "/patient/prescriptions", label: "Prescriptions", icon: "pill" },
  { href: "/patient/bills", label: "My Bills", icon: "receipt" },
  { href: "/patient/profile", label: "Profile", icon: "user" },
];

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashLayout title="Patient Portal" subtitle="Manage your health visits" nav={NAV}>
      {children}
    </DashLayout>
  );
}
