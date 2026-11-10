import Link from "next/link";
import { prisma } from "@/lib/db";
import { Icon, IconName } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

const SERVICES: { icon: IconName; title: string; desc: string; points: string[] }[] = [
  {
    icon: "heart-pulse", title: "Cardiology",
    desc: "Complete heart care from prevention to intervention — ECG, echocardiography, angiography, angioplasty and cardiac surgery with a modern cath lab and a dedicated cardiac ICU.",
    points: ["24/7 cardiac emergency", "Angiography & angioplasty", "Post-surgery rehabilitation"],
  },
  {
    icon: "bone", title: "Orthopedics",
    desc: "From fractures to full joint replacement — arthroscopy, trauma surgery, spine care and sports injury rehabilitation with in-house physiotherapy.",
    points: ["Knee & hip replacement", "Arthroscopic surgery", "Physiotherapy unit"],
  },
  {
    icon: "baby", title: "Pediatrics",
    desc: "Gentle, child-friendly care for newborns to teenagers — neonatal ICU, vaccination programs, growth monitoring and a colorful pediatric ward kids actually like.",
    points: ["Neonatal ICU (NICU)", "Vaccination clinic", "Developmental screening"],
  },
  {
    icon: "sparkles", title: "Dermatology",
    desc: "Medical and cosmetic dermatology for healthy, confident skin — acne and eczema treatment, laser procedures, and anti-aging therapies by certified dermatologists.",
    points: ["Laser treatments", "Acne & scar care", "Skin cancer screening"],
  },
  {
    icon: "brain", title: "Neurology",
    desc: "Advanced diagnosis and treatment of brain and nervous system disorders — EEG, EMG, stroke unit care, and long-term management of epilepsy, Parkinson's and migraine.",
    points: ["Stroke care unit", "EEG & EMG testing", "Headache & pain clinic"],
  },
  {
    icon: "siren", title: "Emergency 24/7",
    desc: "A fully equipped emergency department that never sleeps — trauma care, rapid-response ambulances, and senior doctors on call around the clock.",
    points: ["Trauma & triage bays", "Ambulance fleet", "On-call specialists"],
  },
  {
    icon: "microscope", title: "Diagnostics Lab",
    desc: "Fast, accurate results you can trust — automated pathology lab, digital X-ray, ultrasound, CT scan and MRI, all under one roof with same-day reporting.",
    points: ["Automated pathology", "CT scan & MRI", "Same-day reports"],
  },
  {
    icon: "pill", title: "Pharmacy",
    desc: "Our 24/7 in-house pharmacy dispenses only genuine, quality-assured medicines — with pharmacists available to explain every prescription.",
    points: ["Open 24/7", "Genuine medicines", "Free prescription guidance"],
  },
];

export default async function ServicesPage() {
  let doctors: { specialty: string; user: { name: string } }[] = [];
  try {
    doctors = await prisma.doctor.findMany({
      select: { specialty: true, user: { select: { name: true } } },
    });
  } catch {
    doctors = [];
  }
  const docBySpecialty: Record<string, string> = {};
  for (const d of doctors) {
    if (!docBySpecialty[d.specialty]) docBySpecialty[d.specialty] = d.user.name;
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive medical care across 8 specialized departments.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="svc-grid svc-grid-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 100}>
                <div className="svc-card svc-detail">
                  <div className="svc-icon"><Icon name={s.icon} size={28} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul className="svc-points">
                    {s.points.map((pt) => (
                      <li key={pt}><Icon name="check-circle" size={15} /> {pt}</li>
                    ))}
                  </ul>
                  {docBySpecialty[s.title] && (
                    <Link href="/doctors" className="svc-doc-link">
                      <Icon name="stethoscope" size={14} /> {docBySpecialty[s.title]}
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/patient/book" className="btn btn-primary btn-lg"><Icon name="calendar" size={18} /> Book an Appointment</Link>
          </div>
        </div>
      </section>
    </>
  );
}
