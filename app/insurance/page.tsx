import Link from "next/link";
import { Icon } from "@/components/icons";
import { FadeIn, Stagger, StaggerItem } from "@/components/anim";

const PARTNERS = [
  "Adamjee Insurance",
  "EFU Health",
  "Jubilee Health Insurance",
  "State Life Insurance",
  "Allianz EFU Health",
  "Pak-Qatar Takaful",
  "Askari Health",
  "Cigna International",
];

const STEPS = [
  {
    icon: "file-text" as const,
    title: "Get pre-authorization",
    text: "Contact our insurance desk before your visit — we confirm your coverage and limits directly with your TPA.",
  },
  {
    icon: "credit-card" as const,
    title: "Show your card at the desk",
    text: "Present your insurance card and CNIC at the cashless counter. We verify you in minutes.",
  },
  {
    icon: "stethoscope" as const,
    title: "Get your treatment",
    text: "Receive treatment with zero upfront payment for approved services — OPD, IPD, surgery and diagnostics.",
  },
  {
    icon: "receipt" as const,
    title: "We bill your insurer",
    text: "CityCare settles the approved bill directly with your insurance company. You only pay non-covered items, if any.",
  },
];

export default function InsurancePage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb">
            <Link href="/">Home</Link> / Insurance
          </span>
          <h1>Insurance & Cashless Care</h1>
          <p>CityCare is empanelled with leading insurance and TPA partners — quality care with zero billing stress.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <div className="kicker">Our Partners</div>
              <h2>TPA & Insurance Partners</h2>
              <p>We work directly with these insurers and third-party administrators for cashless treatment.</p>
            </div>
          </FadeIn>
          <Stagger className="ins-badges" stagger={0.06}>
            {PARTNERS.map((p) => (
              <StaggerItem key={p}>
                <div className="ins-badge">
                  <Icon name="shield" size={18} />
                  <span>{p}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn>
            <p className="ins-note">
              Your employer or insurer not listed? Our desk still processes reimbursement claims for
              all other insurance companies — we prepare the paperwork for you.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-head">
            <div className="kicker">How It Works</div>
            <h2>Cashless Treatment in 4 Steps</h2>
            <p>No upfront payment, no claim forms — we handle the billing with your insurer.</p>
          </div>
          <Stagger className="ins-steps" stagger={0.12}>
            {STEPS.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="ins-step">
                  <span className="ins-num">{i + 1}</span>
                  <span className="ins-icon"><Icon name={s.icon} size={24} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeIn y={24}>
            <div className="ins-faq-note">
              <div>
                <h3><Icon name="info" size={20} /> Good to know</h3>
                <ul>
                  <li>Emergency admissions are never delayed for insurance approval — treatment starts first.</li>
                  <li>Pre-authorization usually takes 30–60 minutes on working days.</li>
                  <li>OPD consultations may be reimbursed depending on your policy terms.</li>
                  <li>Bring your insurance card and CNIC for every visit.</li>
                </ul>
              </div>
              <div className="ins-cta">
                <h3>Talk to our insurance desk</h3>
                <p>Open 9am – 9pm, seven days a week.</p>
                <a href="tel:+92418765432" className="btn btn-primary btn-lg">
                  <Icon name="phone" size={18} /> +92 41 876 5432
                </a>
                <Link href="/contact" className="btn btn-outline btn-lg">
                  Message Us
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
