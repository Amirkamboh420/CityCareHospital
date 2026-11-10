import Link from "next/link";
import { Icon } from "@/components/icons";
import { Stagger, StaggerItem, FadeIn } from "@/components/anim";

const PACKAGES = [
  {
    name: "Basic Health Check",
    price: "4,999",
    desc: "Essential yearly screening for every adult.",
    popular: false,
    tests: ["CBC (Complete Blood Count)", "Urine Complete Examination", "Blood Pressure Check", "BMI & Vitals Assessment", "GP Consultation & Report"],
  },
  {
    name: "Executive Health Check",
    price: "12,999",
    desc: "Comprehensive screening for busy professionals.",
    popular: true,
    tests: [
      "Everything in Basic Health Check",
      "Lipid Profile (Cholesterol)",
      "Liver Function Test (LFT)",
      "Chest X-Ray",
      "ECG (Heart Tracing)",
      "Specialist Consultation",
    ],
  },
  {
    name: "Cardiac Health Check",
    price: "18,999",
    desc: "Complete heart evaluation for peace of mind.",
    popular: false,
    tests: [
      "Everything in Executive Check",
      "Echocardiography (Heart Ultrasound)",
      "Exercise Stress Test (ETT)",
      "Cardiologist Consultation",
      "Diet & Lifestyle Plan",
    ],
  },
  {
    name: "Full Body Health Check",
    price: "24,999",
    desc: "Our most complete head-to-toe assessment.",
    popular: false,
    tests: [
      "Everything in Cardiac Check",
      "MRI Brain Screening Note Review",
      "Vitamin D & HbA1c Levels",
      "Ultrasound Abdomen",
      "Nutritionist Consultation",
    ],
  },
];

export default function HealthPackagesPage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb">
            <Link href="/">Home</Link> / Health Packages
          </span>
          <h1>Health Check Packages</h1>
          <p>Preventive health screenings designed by our doctors — know your numbers, stay ahead of disease.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Stagger className="pkg-grid" stagger={0.1}>
            {PACKAGES.map((p) => (
              <StaggerItem key={p.name}>
                <div className={`pkg-card ${p.popular ? "pkg-popular" : ""}`}>
                  {p.popular && <span className="pkg-flag">Most Popular</span>}
                  <h3>{p.name}</h3>
                  <p className="pkg-desc">{p.desc}</p>
                  <div className="pkg-price">
                    <span className="pkg-cur">Rs</span> {p.price}
                  </div>
                  <ul className="pkg-list">
                    {p.tests.map((t) => (
                      <li key={t}>
                        <Icon name="check-circle" size={17} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/patient/book" className={`btn ${p.popular ? "btn-primary" : "btn-outline"} btn-block btn-lg`}>
                    <Icon name="calendar" size={18} /> Book This Package
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn y={24}>
            <div className="pkg-note">
              <Icon name="info" size={20} />
              <div>
                <b>Home sample collection available</b>
                <p>
                  Our phlebotomy team collects samples at your doorstep in Faisalabad —
                  call <a href="tel:+92418765432">+92 41 876 5432</a> to schedule. Fasting
                  (8–12 hours) is required before most blood tests.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn y={24}>
            <div className="pkg-note pkg-note-alt">
              <Icon name="shield" size={20} />
              <div>
                <b>Corporate & family packages</b>
                <p>
                  Discounts available for families of 3+, corporate groups and annual
                  contracts. Email <a href="mailto:info@citycare.com">info@citycare.com</a> for
                  a custom quotation.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
