import Link from "next/link";
import { Icon } from "@/components/icons";
import { FadeIn } from "@/components/anim";

export default function TermsPage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb">
            <Link href="/">Home</Link> / Terms of Service
          </span>
          <h1>Terms of Service</h1>
          <p>The rules that govern your use of CityCare Hospital's services, website and patient portal.</p>
        </div>
      </section>

      <section className="section">
        <div className="container pol-wrap">
          <FadeIn>
            <p className="pol-updated">
              <Icon name="calendar" size={14} /> Last updated: October 2026
            </p>

            <div className="pol-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By booking appointments, registering an account or using any service at CityCare
                Hospital — online or in person — you agree to these terms. If you do not agree, please
                do not use our services.
              </p>
            </div>

            <div className="pol-section">
              <h2>2. Patient Rights & Responsibilities</h2>
              <h3>Your rights</h3>
              <ul className="pol-list">
                <li>To receive respectful, non-discriminatory care regardless of background</li>
                <li>To be informed about your diagnosis, treatment options and costs before consenting</li>
                <li>To access your medical records and request a second opinion</li>
                <li>To confidentiality of your medical information (see our Privacy Policy)</li>
              </ul>
              <h3>Your responsibilities</h3>
              <ul className="pol-list">
                <li>Provide accurate medical history and current medication details</li>
                <li>Follow prescribed treatment plans and attend follow-up visits</li>
                <li>Treat staff, doctors and fellow patients with respect</li>
                <li>Settle bills within the agreed payment terms</li>
              </ul>
            </div>

            <div className="pol-section">
              <h2>3. Appointments</h2>
              <p>
                Appointments can be booked online, by phone or in person. While we make every effort
                to honor scheduled times, emergency cases may cause delays — we appreciate your
                understanding. Please arrive 15 minutes early and bring your CNIC, insurance card
                (if applicable) and previous medical records.
              </p>
            </div>

            <div className="pol-section">
              <h2>4. Cancellations & No-Shows</h2>
              <p>
                Appointments may be cancelled free of charge up to 2 hours before the scheduled time
                through your patient dashboard or by phone. Repeated no-shows without cancellation may
                require advance payment for future bookings. Surgery and procedure slots follow the
                cancellation terms shared at the time of booking.
              </p>
            </div>

            <div className="pol-section">
              <h2>5. Billing & Payments</h2>
              <p>
                All services are billed according to our published tariff, available at reception and
                on request. Estimates for planned procedures are provided in advance; final bills
                reflect actual services rendered. We accept cash, debit/credit cards, bank transfers
                and mobile wallets. Insurance patients are responsible for any non-covered amounts as
                per their policy terms.
              </p>
            </div>

            <div className="pol-section">
              <h2>6. Website & Portal Use</h2>
              <p>
                You are responsible for keeping your account credentials confidential. You agree not
                to misuse the website or patient portal — including attempting unauthorized access,
                submitting false information or interfering with other users. Content on this site
                (including blog articles) is for general information and is not a substitute for
                professional medical advice.
              </p>
            </div>

            <div className="pol-section">
              <h2>7. Limitation of Liability</h2>
              <p>
                Medical outcomes cannot be guaranteed, and CityCare Hospital's liability is limited to
                the extent permitted by the laws of Pakistan. Nothing in these terms limits liability
                for negligence or any matter that cannot be limited under applicable law.
              </p>
            </div>

            <div className="pol-section">
              <h2>8. Governing Law</h2>
              <p>
                These terms are governed by the laws of Pakistan. Any disputes will first be addressed
                through our patient-relations process; unresolved matters fall under the jurisdiction
                of the courts of Faisalabad, Punjab.
              </p>
              <p>
                Questions about these terms? Contact us at{" "}
                <a href="mailto:info@citycare.com">info@citycare.com</a> or{" "}
                <a href="tel:+92418765432">+92 41 876 5432</a>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
