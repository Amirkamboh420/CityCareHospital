import Link from "next/link";
import { Icon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <Link href="/" className="logo">
            <span className="logo-mark"><Icon name="cross" size={20} /></span>
            <span>
              CityCare
              <small>HOSPITAL</small>
            </span>
          </Link>
          <p className="footer-text">
            Providing compassionate, world-class healthcare to our community since 2005.
            Your health is our mission.
          </p>
          <p style={{ fontSize: 14 }}><Icon name="siren" size={15} /> Emergency: <b style={{ color: "#fff" }}>+92 41 876 5432</b></p>
        </div>
        <div className="footer-col">
          <h4>Hospital</h4>
          <Link href="/about">About Us</Link>
          <Link href="/departments">Departments</Link>
          <Link href="/doctors">Our Doctors</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Patient Care</h4>
          <Link href="/patient/book">Book Appointment</Link>
          <Link href="/health-packages">Health Packages</Link>
          <Link href="/insurance">Insurance</Link>
          <Link href="/blog">Health Blog</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="tel:+92418765432">Emergency</Link>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p style={{ fontSize: 14, marginBottom: 8 }}><Icon name="map-pin" size={14} /> 123 Health Avenue,<br />Faisalabad, Pakistan</p>
          <p style={{ fontSize: 14, marginBottom: 8 }}><Icon name="phone" size={14} /> +92 41 876 5432</p>
          <p style={{ fontSize: 14 }}><Icon name="mail" size={14} /> info@citycare.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span>© 2026 CityCare Hospital. All rights reserved.</span>
          <span>
            <Link href="/privacy">Privacy Policy</Link>
            &nbsp;•&nbsp;
            <Link href="/terms">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
