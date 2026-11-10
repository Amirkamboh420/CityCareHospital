import Link from "next/link";
import { getSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import NotificationsBell from "@/components/NotificationsBell";
import { Icon, IconName } from "@/components/icons";

export type NavItem = { href: string; label: string; icon: string };

async function logout() {
  "use server";
  await destroySession();
  redirect("/");
}

export default async function DashLayout({
  title,
  subtitle,
  nav,
  children,
}: {
  title: string;
  subtitle?: string;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <Link href="/" className="logo" style={{ color: "#fff", marginBottom: 8, padding: "4px 12px" }}>
          <span className="logo-mark"><Icon name="cross" size={20} /></span>
          <span>CityCare<small>HOSPITAL</small></span>
        </Link>
        <div className="side-title">Menu</div>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="side-link">
            <span className="ico"><Icon name={n.icon as IconName} size={18} /></span> {n.label}
          </Link>
        ))}
        <div className="side-title">Account</div>
        <Link href="/" className="side-link"><span className="ico"><Icon name="globe" size={18} /></span> View Website</Link>
        <div className="side-user">
          <span className="user-avatar">{session?.name.charAt(0).toUpperCase()}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{session?.name}</div>
            <div style={{ fontSize: 11, color: "#6b8aa8" }}>{session?.role}</div>
          </div>
          <form action={logout}>
            <button type="submit" className="icon-btn-sm" style={{ background: "transparent", color: "#b9cfe3", borderColor: "#1e3a5f" }} aria-label="Logout">
              <Icon name="logout" size={15} />
            </button>
          </form>
        </div>
      </aside>
      <div className="dash-main">
        <div className="dash-head">
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NotificationsBell />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
