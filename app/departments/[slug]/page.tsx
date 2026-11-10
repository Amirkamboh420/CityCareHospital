import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Icon, IconName } from "@/components/icons";
import { doctorImage } from "@/lib/doctorImages";
import { FadeIn } from "@/components/anim";

type DeptInfo = {
  name: string;
  icon: IconName;
  tagline: string;
  overview: string;
  services: string[];
  equipment: string[];
  specialtyMatch: string | null; // null => show 24/7 team note
};

const DEPTS: Record<string, DeptInfo> = {
  cardiology: {
    name: "Cardiology", icon: "heart-pulse", tagline: "Complete heart care, from prevention to intervention",
    overview:
      "Our cardiology department combines a modern cardiac catheterization lab, a dedicated cardiac ICU and some of the region's most experienced cardiologists. Whether it is a routine heart checkup or a complex intervention, your heart is in expert hands — day and night.",
    services: ["ECG & echocardiography", "Angiography & angioplasty", "Cardiac surgery & bypass", "24/7 cardiac emergency", "Pacemaker implantation", "Post-surgery rehabilitation"],
    equipment: ["Cath lab", "3D echocardiography", "Cardiac ICU", "Holter monitoring", "Treadmill test"],
    specialtyMatch: "Cardiology",
  },
  orthopedics: {
    name: "Orthopedics", icon: "bone", tagline: "Move freely again — bones, joints and spine",
    overview:
      "From fractures and dislocations to full knee and hip replacement, our orthopedics team gets you back on your feet. Arthroscopic procedures, spine care and an in-house physiotherapy unit mean you recover faster — all under one roof.",
    services: ["Knee & hip replacement", "Arthroscopic surgery", "Fracture & trauma care", "Spine treatment", "Sports injury management", "In-house physiotherapy"],
    equipment: ["Digital X-ray", "Arthroscopy tower", "Orthopedic OT", "Physio gym", "Bone density scanner"],
    specialtyMatch: "Orthopedics",
  },
  pediatrics: {
    name: "Pediatrics", icon: "baby", tagline: "Gentle care for newborns to teenagers",
    overview:
      "A colourful, child-friendly ward, a level-III neonatal ICU and doctors who speak your child's language. From vaccination programs and growth monitoring to neonatal emergencies, our pediatrics team cares for your little ones like their own.",
    services: ["Neonatal ICU (NICU)", "Vaccination clinic", "Growth & development screening", "Newborn care", "Pediatric emergency", "Nutrition counselling"],
    equipment: ["Level-III NICU", "Incubators", "Pediatric ventilators", "Phototherapy units"],
    specialtyMatch: "Pediatrics",
  },
  dermatology: {
    name: "Dermatology", icon: "sparkles", tagline: "Healthy, confident skin — medical and cosmetic care",
    overview:
      "Acne, eczema, pigmentation or hair fall — our certified dermatologists treat it all. Advanced laser procedures, chemical peels and skin cancer screening are done safely with the latest equipment and honest advice.",
    services: ["Acne & scar treatment", "Laser procedures", "Eczema & allergy care", "Chemical peels", "Hair fall treatment", "Skin cancer screening"],
    equipment: ["Q-switch laser", "Fractional CO2 laser", "Dermatoscope", "Phototherapy unit"],
    specialtyMatch: "Dermatology",
  },
  neurology: {
    name: "Neurology", icon: "brain", tagline: "Advanced care for brain and nervous system disorders",
    overview:
      "Stroke, epilepsy, Parkinson's, migraine or unexplained numbness — our neurology unit provides precise diagnosis with EEG, EMG and MRI, plus long-term management plans. A dedicated stroke unit means every minute of a stroke emergency is handled urgently.",
    services: ["Stroke care unit", "EEG & EMG testing", "Epilepsy management", "Headache & migraine clinic", "Parkinson's care", "Neuropathy treatment"],
    equipment: ["Stroke unit", "EEG/EMG lab", "MRI 1.5T", "Doppler ultrasound"],
    specialtyMatch: "Neurology",
  },
  emergency: {
    name: "Emergency 24/7", icon: "siren", tagline: "Always open. Always ready.",
    overview:
      "Our emergency department never sleeps. Trauma bays, rapid-response ambulances, senior doctors on call and a fully equipped resuscitation room mean that in your worst moment, our best team is already waiting.",
    services: ["Trauma & triage bays", "Rapid-response ambulance fleet", "On-call specialists 24/7", "Resuscitation room", "Emergency surgery", "Poison control"],
    equipment: ["Trauma bays", "Ventilators", "Portable X-ray", "Emergency OT"],
    specialtyMatch: null,
  },
  diagnostics: {
    name: "Diagnostics Lab", icon: "microscope", tagline: "Fast, accurate results you can trust",
    overview:
      "An automated pathology lab, digital X-ray, ultrasound, CT scan and MRI — all under one roof with same-day reporting. Accurate results delivered straight to your doctor and your patient portal, so treatment never waits.",
    services: ["Automated pathology", "Digital X-ray", "Ultrasound & Doppler", "CT scan", "MRI 1.5 Tesla", "Same-day reporting"],
    equipment: ["Auto-analyzers", "CT scanner", "MRI 1.5T", "Digital X-ray", "4D ultrasound"],
    specialtyMatch: null,
  },
  pharmacy: {
    name: "Pharmacy", icon: "pill", tagline: "Genuine medicines, round the clock",
    overview:
      "Our in-house pharmacy is open 24 hours, 7 days — stocked with genuine, properly stored medicines at fair prices. Qualified pharmacists verify every prescription and counsel you on dosage, so you take the right medicine the right way.",
    services: ["24/7 medicine counter", "Prescription verification", "Dosage counselling", "Home delivery in the city", "Vaccine storage & supply", "Emergency drug kit"],
    equipment: ["Cold-chain storage", "Barcode inventory", "Compounding room"],
    specialtyMatch: null,
  },
};

export async function generateStaticParams() {
  return Object.keys(DEPTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const d = DEPTS[params.slug];
  return { title: d ? `${d.name} | CityCare Hospital` : "Department | CityCare Hospital" };
}

export default async function DepartmentDetailPage({ params }: { params: { slug: string } }) {
  const dept = DEPTS[params.slug];
  if (!dept) notFound();

  let doctors: any[] = [];
  if (dept.specialtyMatch) {
    try {
      doctors = await prisma.doctor.findMany({
        where: { specialty: dept.specialtyMatch },
        include: { user: { select: { name: true } } },
        orderBy: { id: "asc" },
      });
    } catch {
      doctors = [];
    }
  }

  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb"><Link href="/">Home</Link> / <Link href="/departments">Departments</Link> / {dept.name}</span>
          <h1>{dept.name}</h1>
          <p>{dept.tagline}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="dept-detail-hero">
              <div className="svc-icon" style={{ width: 72, height: 72 }}><Icon name={dept.icon} size={36} /></div>
              <p className="dept-overview">{dept.overview}</p>
            </div>
          </FadeIn>

          <div className="dept-detail-grid">
            <FadeIn delay={0.05}>
              <div className="form-card" style={{ height: "100%" }}>
                <h3><Icon name="check-circle" size={20} /> Services</h3>
                <ul className="dept-svc-list">
                  {dept.services.map((s) => (
                    <li key={s}><Icon name="check-circle" size={17} /> {s}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="form-card" style={{ height: "100%" }}>
                <h3><Icon name="microscope" size={20} /> Advanced Equipment</h3>
                <div className="dept-chips">
                  {dept.equipment.map((e) => (
                    <span key={e} className="dept-chip"><Icon name="gem" size={14} /> {e}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <h2 className="dept-section-title">
              <Icon name="stethoscope" size={24} /> Our {dept.name} Specialists
            </h2>
          </FadeIn>
          {dept.specialtyMatch ? (
            doctors.length > 0 ? (
              <div className="doc-grid">
                {doctors.map((d) => (
                  <Link key={d.id} href={`/doctors/${d.id}`} className="doc-card lift-hover dept-doc-link">
                    <div className="doc-photo">
                      <Image
                        src={doctorImage(d.specialty)}
                        alt={d.user.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="doc-info">
                      <h3>{d.user.name}</h3>
                      <div className="doc-spec">{d.specialty}</div>
                      <div className="doc-meta">{d.qualification}</div>
                      <div className="doc-fee">Fee: Rs. {d.fee.toLocaleString()}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="big"><Icon name="stethoscope" size={48} /></div>
                <h2>Doctor profiles loading…</h2>
                <p>Please run the database seed to see our team.</p>
              </div>
            )
          ) : (
            <div className="dept-team-note">
              <Icon name="users" size={32} />
              <div>
                <h3>Our 24/7 team</h3>
                <p>A dedicated round-the-clock team of doctors, nurses, technicians and support staff runs this department. Walk in any time — someone qualified is always on duty.</p>
              </div>
            </div>
          )}

          <FadeIn delay={0.1}>
            <div className="dept-cta-banner">
              <div>
                <h3>Need care from the {dept.name} department?</h3>
                <p>Book an appointment in under a minute — choose your doctor, date and time slot.</p>
              </div>
              <Link href="/patient/book" className="btn btn-primary btn-lg" style={{ whiteSpace: "nowrap" }}>
                <Icon name="calendar" size={18} /> Book Appointment
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
