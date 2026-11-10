import Link from "next/link";
import { getSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Icon } from "@/components/icons";
import { Marquee } from "@/components/anim";

async function logout() {
  "use server";
  await destroySession();
  redirect("/");
}

export default async function Header() {
  const session = await getSession();
  return (
    <>
      <div className="top-strip">
        <div className="container">
          <span><Icon name="map-pin" size={13} /> 123 Health Avenue, Faisalabad &nbsp;•&nbsp; <Icon name="clock" size={13} /> Open 24/7</span>
          <span>
            <a href="tel:+92418765432"><Icon name="phone" size={13} /> +92 41 876 5432</a>
            &nbsp;&nbsp;
            <a href="mailto:info@citycare.com"><Icon name="mail" size={13} /> info@citycare.com</a>
          </span>
        </div>
      </div>
      <div className="ticker">
        <Marquee speed={32}>
          <span><Icon name="siren" size={13} /> 24/7 Emergency: +92 41 876 5432</span>
          <span><Icon name="check-circle" size={13} /> Free health camp every Sunday, 9am – 1pm</span>
          <span><Icon name="pill" size={13} /> In-house pharmacy open round the clock</span>
          <span><Icon name="calendar" size={13} /> Online appointments — no waiting lines</span>
          <span><Icon name="shield" size={13} /> Cashless insurance desk now open</span>
        </Marquee>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            <span className="logo-mark"><Icon name="cross" size={20} /></span>
            <span>
              CityCare
              <small>HOSPITAL</small>
            </span>
          </Link>
          <nav className="main-nav">
            <Link href="/">Home</Link>
            <Link href="/departments">Departments</Link>
            <Link href="/doctors">Doctors</Link>
            <Link href="/health-packages">Health Packages</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/gallery">Gallery</Link>
            <div className="nav-more">
              <span className="nav-more-btn">
                More <Icon name="chevron-down" size={14} />
              </span>
              <div className="nav-dropdown">
                <Link href="/about">About</Link>
                <Link href="/services">Services</Link>
                <Link href="/insurance">Insurance</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/testimonials">Testimonials</Link>
                <Link href="/faq">FAQ</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </nav>
          <div className="header-actions">
            <a className="emergency-chip" href="tel:+92418765432">
              <Icon name="siren" size={16} /> Emergency
            </a>
            {session ? (
              <>
                <Link href="/dashboard" className="user-chip">
                  <span className="user-avatar">{session.name.charAt(0).toUpperCase()}</span>
                  {session.name.split(" ")[0]}
                </Link>
                <form action={logout}>
                  <button type="submit" className="btn btn-outline btn-sm">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link href="/patient/book" className="btn btn-primary btn-sm">
                  Book Appointment
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
