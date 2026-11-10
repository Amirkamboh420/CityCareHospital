import Link from "next/link";
import { Icon, IconName } from "@/components/icons";
import { FadeIn, Stagger, StaggerItem } from "@/components/anim";

type Dept = { slug: string; icon: IconName; title: string; desc: string };

const DEPARTMENTS: Dept[] = [
  { slug: "cardiology", icon: "heart-pulse", title: "Cardiology", desc: "Complete heart care — ECG, echo, angiography and a modern cath lab." },
  { slug: "orthopedics", icon: "bone", title: "Orthopedics", desc: "Fractures to joint replacement, plus sports injury rehab." },
  { slug: "pediatrics", icon: "baby", title: "Pediatrics", desc: "Gentle, child-friendly care with a dedicated NICU." },
  { slug: "dermatology", icon: "sparkles", title: "Dermatology", desc: "Medical and cosmetic skin care by certified dermatologists." },
  { slug: "neurology", icon: "brain", title: "Neurology", desc: "Brain and nervous system care with EEG, EMG and a stroke unit." },
  { slug: "emergency", icon: "siren", title: "Emergency", desc: "A fully equipped emergency department that never sleeps." },
  { slug: "diagnostics", icon: "microscope", title: "Diagnostics", desc: "Pathology, X-ray, ultrasound, CT and MRI with same-day reports." },
  { slug: "pharmacy", icon: "pill", title: "Pharmacy", desc: "In-house pharmacy open round the clock with genuine medicines." },
];

export const metadata = { title: "Departments | CityCare Hospital" };

export default function DepartmentsPage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb"><Link href="/">Home</Link> / Departments</span>
          <h1>Our Departments</h1>
          <p>Eight specialised departments, one promise: complete care for every patient, every day of the week.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Stagger className="dept-grid" stagger={0.07}>
            {DEPARTMENTS.map((d) => (
              <StaggerItem key={d.slug}>
                <Link href={`/departments/${d.slug}`} className="dept-card lift-hover">
                  <div className="svc-icon"><Icon name={d.icon} size={30} /></div>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                  <span className="dept-link">Explore <Icon name="arrow-right" size={15} /></span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn delay={0.2}>
            <div className="dept-cta-banner">
              <div>
                <h3>Not sure which department you need?</h3>
                <p>Our reception team will guide you to the right specialist in minutes.</p>
              </div>
              <Link href="/contact" className="btn btn-outline btn-lg" style={{ whiteSpace: "nowrap" }}>
                <Icon name="phone" size={18} /> Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
