import Link from "next/link";
import { Icon } from "@/components/icons";
import { Stagger, StaggerItem, FadeIn } from "@/components/anim";
import CareerForm from "./CareerForm";

const JOBS = [
  {
    title: "Staff Nurse",
    dept: "Nursing",
    type: "Full-time",
    location: "Faisalabad",
    icon: "heart-pulse" as const,
    desc: "Provide compassionate bedside care in our 200-bed hospital. Night-shift allowance included.",
  },
  {
    title: "Lab Technologist",
    dept: "Diagnostics",
    type: "Full-time",
    location: "Faisalabad",
    icon: "microscope" as const,
    desc: "Run our automated pathology lab with 24/7 operations. MLT diploma required.",
  },
  {
    title: "Front Desk Officer",
    dept: "Administration",
    type: "Full-time",
    location: "Faisalabad",
    icon: "users" as const,
    desc: "Be the welcoming face of CityCare — patient registration, billing support and guidance.",
  },
  {
    title: "Pharmacist",
    dept: "Pharmacy",
    type: "Full-time",
    location: "Faisalabad",
    icon: "pill" as const,
    desc: "Dispense and counsel in our round-the-clock in-house pharmacy. Pharm-D preferred.",
  },
  {
    title: "Ambulance Driver",
    dept: "Emergency",
    type: "Shift-based",
    location: "Faisalabad",
    icon: "siren" as const,
    desc: "Operate our 24/7 emergency ambulances with a trained paramedic crew.",
  },
  {
    title: "Medical Officer",
    dept: "Clinical",
    type: "Full-time",
    location: "Faisalabad",
    icon: "stethoscope" as const,
    desc: "Work alongside specialists in OPD, IPD and emergency. FCPS trainees welcome.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb">
            <Link href="/">Home</Link> / Careers
          </span>
          <h1>Careers at CityCare</h1>
          <p>Join 300+ healthcare professionals saving lives every day. Grow your career with us.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="kicker">Open Positions</div>
            <h2>Current Vacancies</h2>
            <p>Six roles open right now. We hire for attitude and train for skill.</p>
          </div>
          <Stagger className="car-grid" stagger={0.08}>
            {JOBS.map((j) => (
              <StaggerItem key={j.title}>
                <div className="car-card">
                  <span className="car-icon"><Icon name={j.icon} size={24} /></span>
                  <h3>{j.title}</h3>
                  <div className="car-meta">
                    <span><Icon name="grid" size={13} /> {j.dept}</span>
                    <span><Icon name="clock" size={13} /> {j.type}</span>
                    <span><Icon name="map-pin" size={13} /> {j.location}</span>
                  </div>
                  <p>{j.desc}</p>
                  <a href="#apply" className="car-apply">
                    Apply now <Icon name="arrow-right" size={15} />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-gray" id="apply">
        <div className="container car-apply-grid">
          <FadeIn>
            <div>
              <div className="kicker">Why CityCare</div>
              <h2 style={{ fontSize: 30, color: "var(--navy)", marginBottom: 16 }}>
                A workplace that takes care of its carers
              </h2>
              <ul className="car-perks">
                <li><Icon name="check-circle" size={18} /> Competitive salary with annual increments</li>
                <li><Icon name="check-circle" size={18} /> Free health coverage for you and your family</li>
                <li><Icon name="check-circle" size={18} /> Structured training and certification programs</li>
                <li><Icon name="check-circle" size={18} /> Clear promotion path — most leads joined as staff</li>
                <li><Icon name="check-circle" size={18} /> On-campus accommodation for nursing staff</li>
              </ul>
              <p style={{ color: "var(--muted)", marginTop: 16 }}>
                Prefer email? Send your CV to{" "}
                <a href="mailto:hr@citycare.com" style={{ color: "var(--teal-dark)", fontWeight: 700 }}>
                  hr@citycare.com
                </a>
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <CareerForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
