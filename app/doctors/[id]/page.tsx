import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Icon } from "@/components/icons";
import { doctorImage } from "@/lib/doctorImages";
import { FadeIn } from "@/components/anim";

const BIOS: Record<string, string> = {
  Cardiology:
    "A board-certified cardiologist with over 12 years of experience in interventional cardiology. Known for clear, honest counselling and thousands of successful angiographies and angioplasties. Believes prevention is the best medicine and spends time explaining heart-healthy habits to every patient.",
  Orthopedics:
    "A skilled orthopedic surgeon specialising in joint replacement and sports injuries. Has performed hundreds of knee and hip replacements with excellent long-term outcomes. Patients appreciate the straightforward advice — no unnecessary surgeries, only what your bones truly need.",
  Pediatrics:
    "A warm, patient paediatrician trusted by hundreds of families across the city. Special interest in newborn care and vaccination programs. Known for making children smile even during checkups and for always taking parents' concerns seriously.",
  Dermatology:
    "A certified dermatologist combining medical expertise with aesthetic treatments. Treats everything from stubborn acne to complex skin conditions, using evidence-based therapies and modern laser technology. Known for honest opinions and natural-looking results.",
  Neurology:
    "An experienced neurologist specialising in stroke care, epilepsy and headache disorders. Combines precise diagnosis with long-term, compassionate management plans. Recognised for taking the time to explain complex neurological conditions in simple words.",
};

const REVIEWS: { name: string; text: string; stars: number }[] = [
  { name: "Rashid M.", text: "Listened carefully and explained everything in simple words. My problem was diagnosed correctly on the first visit.", stars: 5 },
  { name: "Sana K.", text: "Very professional and punctual. The treatment plan was clear and the follow-up call showed real care.", stars: 5 },
  { name: "Imran S.", text: "Did not rush at all, answered all my questions patiently. Highly recommended to anyone in the city.", stars: 4 },
  { name: "Ayesha T.", text: "Best decision to come here. Honest advice, no unnecessary tests, and I felt better within days.", stars: 5 },
];

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const d = await prisma.doctor.findUnique({
      where: { id: params.id },
      include: { user: { select: { name: true } } },
    });
    return { title: d ? `${d.user.name} | CityCare Hospital` : "Doctor | CityCare Hospital" };
  } catch {
    return { title: "Doctor | CityCare Hospital" };
  }
}

function Stars({ n }: { n: number }) {
  return (
    <span className="docp-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={15} className={i <= n ? "docp-star-on" : "docp-star-off"} />
      ))}
    </span>
  );
}

export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  let doctor: any = null;
  try {
    doctor = await prisma.doctor.findUnique({
      where: { id: params.id },
      include: { user: { select: { name: true } } },
    });
  } catch {
    doctor = null;
  }
  if (!doctor) notFound();

  const bio = BIOS[doctor.specialty] || "An experienced doctor at CityCare Hospital, committed to honest advice and excellent patient outcomes.";
  const deptSlug = doctor.specialty.toLowerCase();
  const reviews = [REVIEWS[0], REVIEWS[1], REVIEWS[3]];

  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb"><Link href="/">Home</Link> / <Link href="/doctors">Doctors</Link> / {doctor.user.name}</span>
          <h1>{doctor.user.name}</h1>
          <p>{doctor.specialty} • {doctor.qualification}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="docp-profile">
              <div className="docp-photo">
                <Image
                  src={doctorImage(doctor.specialty)}
                  alt={doctor.user.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="docp-info">
                <div className="doc-spec">{doctor.specialty}</div>
                <h2>{doctor.user.name}</h2>
                <div className="docp-meta-row"><Icon name="file-text" size={16} /> {doctor.qualification}</div>
                <div className="docp-meta-row"><Icon name="clock" size={16} /> {doctor.schedule}</div>
                <div className="docp-meta-row"><Icon name="credit-card" size={16} /> Consultation Fee: <b>Rs. {doctor.fee.toLocaleString()}</b></div>
                <p className="docp-bio">{bio}</p>
                <div className="docp-actions">
                  <Link href={`/patient/book?doctor=${doctor.id}`} className="btn btn-primary btn-lg">
                    <Icon name="calendar" size={18} /> Book Appointment
                  </Link>
                  <Link href={`/departments/${deptSlug}`} className="btn btn-outline btn-lg">
                    {doctor.specialty} Dept
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="dept-section-title"><Icon name="star" size={24} /> Patient Reviews</h2>
            <div className="docp-reviews">
              {reviews.map((r) => (
                <div key={r.name} className="form-card docp-review">
                  <Stars n={r.stars} />
                  <p>&ldquo;{r.text}&rdquo;</p>
                  <div className="docp-review-name"><Icon name="user" size={14} /> {r.name}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
