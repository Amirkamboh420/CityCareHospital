import Link from "next/link";
import { Icon } from "@/components/icons";
import { FadeIn } from "@/components/anim";

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb">
            <Link href="/">Home</Link> / Privacy Policy
          </span>
          <h1>Privacy Policy</h1>
          <p>How CityCare Hospital collects, uses and protects your personal and medical information.</p>
        </div>
      </section>

      <section className="section">
        <div className="container pol-wrap">
          <FadeIn>
            <p className="pol-updated">
              <Icon name="calendar" size={14} /> Last updated: October 2026
            </p>

            <div className="pol-section">
              <h2>1. Information We Collect</h2>
              <p>
                When you register, book appointments or receive treatment at CityCare Hospital, we
                collect personal information needed for your care: your name, contact details, CNIC,
                date of birth, medical history, diagnoses, prescriptions, lab results and billing
                information. Our website also collects basic technical data such as browser type and
                pages visited to improve your experience.
              </p>
            </div>

            <div className="pol-section">
              <h2>2. How We Use Your Information</h2>
              <p>Your information is used strictly for the following purposes:</p>
              <h3>Medical care</h3>
              <p>
                Providing diagnosis, treatment and follow-up care, and sharing relevant records with
                your treating doctors within the hospital.
              </p>
              <h3>Administration</h3>
              <p>
                Appointment scheduling, billing, insurance claims processing and regulatory reporting
                required by Pakistani healthcare authorities.
              </p>
              <h3>Communication</h3>
              <p>
                Sending appointment reminders, lab reports, health alerts and service updates by SMS,
                WhatsApp or email. You may opt out of non-essential messages at any time.
              </p>
            </div>

            <div className="pol-section">
              <h2>3. Medical Confidentiality</h2>
              <p>
                Your medical records are confidential. We never sell your data, and we disclose it to
                third parties only with your written consent — except where required by law (for
                example, reporting notifiable diseases) or in medical emergencies. All staff sign
                confidentiality agreements and access to records is role-based and logged.
              </p>
            </div>

            <div className="pol-section">
              <h2>4. Data Security</h2>
              <p>
                We protect your information with encrypted storage, secure servers, password-protected
                access and regular security audits. Online payments are processed through secure,
                PCI-compliant gateways — we never store your card details on our servers.
              </p>
            </div>

            <div className="pol-section">
              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="pol-list">
                <li>Request a copy of your medical records at any time</li>
                <li>Ask for corrections to inaccurate information</li>
                <li>Withdraw consent for non-essential communications</li>
                <li>Request deletion of marketing data we hold about you</li>
              </ul>
              <p>
                To exercise any of these rights, contact our Data Protection Officer at{" "}
                <a href="mailto:privacy@citycare.com">privacy@citycare.com</a> or call{" "}
                <a href="tel:+92418765432">+92 41 876 5432</a>.
              </p>
            </div>

            <div className="pol-section">
              <h2>6. Changes to This Policy</h2>
              <p>
                We may update this policy as our services evolve. Significant changes will be
                announced on this page and, where appropriate, notified to you directly. Continued use
                of our services after an update constitutes acceptance of the revised policy.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
