import Link from "next/link";
import Faq from "@/components/Faq";
import { FadeIn } from "@/components/anim";

const FAQS = [
  {
    q: "How do I book an appointment?",
    a: "You can book online through our website (Login or Register, then go to Book Appointment), call us at +92 41 876 5432, or walk in to the reception desk. Online bookings show live doctor availability so you can pick a slot that suits you.",
  },
  {
    q: "What are the OPD timings?",
    a: "General OPD runs Monday to Saturday, 9am – 9pm, and Sunday 10am – 2pm. Specialist clinics have fixed days — check the Doctors page or call reception for the weekly schedule. The Emergency department and pharmacy are open 24/7.",
  },
  {
    q: "Do I need an appointment for the emergency department?",
    a: "No. The Emergency department is open 24/7 and walk-in patients are treated immediately based on medical priority. For life-threatening conditions, call our ambulance at +92 41 876 5432.",
  },
  {
    q: "Which insurance companies do you work with?",
    a: "We are empanelled with Adamjee, EFU Health, Jubilee, State Life, Allianz EFU, Pak-Qatar Takaful, Askari Health, Cigna and more. Our insurance desk provides cashless treatment for approved services — see our Insurance page for the 4-step process.",
  },
  {
    q: "Can I get my lab tests done at home?",
    a: "Yes. Our phlebotomy team collects samples at your doorstep anywhere in Faisalabad. Call +92 41 876 5432 to schedule. Reports are shared on WhatsApp and added to your patient portal.",
  },
  {
    q: "How do I get my test reports?",
    a: "Reports are available at the lab counter, on WhatsApp, and in your patient portal under your profile. Most routine tests are reported within 4–6 hours; urgent reports are marked STAT and prioritized.",
  },
  {
    q: "What is your appointment cancellation policy?",
    a: "You can cancel any appointment from your patient dashboard up to 2 hours before the slot, free of charge. Repeated no-shows may require advance payment for future bookings.",
  },
  {
    q: "Do you offer health check packages?",
    a: "Yes — four preventive packages from Rs 4,999 (Basic) to Rs 24,999 (Full Body), covering blood tests, ECG, X-ray, ultrasound and specialist consultations. See our Health Packages page for full details.",
  },
  {
    q: "Can I visit a patient admitted in the hospital?",
    a: "General visiting hours are 4pm – 8pm daily. ICU visits are restricted to 5-minute slots twice a day for one attendant. Children under 10 are not permitted in ICUs for infection control.",
  },
  {
    q: "Do you have female doctors and staff?",
    a: "Yes. We have female doctors across gynecology, pediatrics, dermatology and general medicine, plus female nursing staff on all wards. You can request a female doctor when booking.",
  },
  {
    q: "How do I pay my bill?",
    a: "We accept cash, all major debit/credit cards, bank transfers and mobile wallets. Bills are itemized and available in your patient portal. Insurance patients can use the cashless desk — we bill your insurer directly.",
  },
  {
    q: "How can I give feedback or file a complaint?",
    a: "Your feedback matters. Use the Contact page form, call +92 41 876 5432, or drop a note in the suggestion boxes at reception. Every complaint is reviewed by our patient-relations team within 48 hours.",
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb">
            <Link href="/">Home</Link> / FAQ
          </span>
          <h1>Frequently Asked Questions</h1>
          <p>Quick answers about appointments, billing, insurance, visiting and more.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <FadeIn>
            <div className="section-head">
              <div className="kicker">Help Center</div>
              <h2>Everything You Need to Know</h2>
              <p>Can't find your answer? Call <a href="tel:+92418765432" style={{ color: "var(--teal-dark)", fontWeight: 700 }}>+92 41 876 5432</a> — we answer 24/7.</p>
            </div>
          </FadeIn>
          <Faq items={FAQS} />
          <FadeIn y={24}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <p style={{ color: "var(--muted)", marginBottom: 16 }}>Still have questions?</p>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Contact Our Team
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
