import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Reveal, AnimatedCounter } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/anim";
import { Icon, IconName } from "@/components/icons";
import { doctorImage } from "@/lib/doctorImages";
import Faq from "@/components/Faq";

const SERVICES: { icon: IconName; title: string; desc: string }[] = [
  { icon: "heart-pulse", title: "Cardiology", desc: "Advanced heart care with modern cath lab and cardiac surgery." },
  { icon: "bone", title: "Orthopedics", desc: "Joint replacement, fracture care and sports injury treatment." },
  { icon: "baby", title: "Pediatrics", desc: "Compassionate care for infants, children and adolescents." },
  { icon: "sparkles", title: "Dermatology", desc: "Skin, hair and cosmetic treatments by expert dermatologists." },
  { icon: "brain", title: "Neurology", desc: "Diagnosis and treatment of brain and nervous system disorders." },
  { icon: "siren", title: "Emergency 24/7", desc: "Round-the-clock emergency department with rapid response." },
  { icon: "microscope", title: "Diagnostics Lab", desc: "Accurate pathology, radiology and imaging under one roof." },
  { icon: "pill", title: "Pharmacy", desc: "24/7 in-house pharmacy with genuine medicines." },
];

const WHY_US: { icon: IconName; title: string; desc: string }[] = [
  { icon: "stethoscope", title: "50+ Specialist Doctors", desc: "Highly qualified consultants across every major medical specialty." },
  { icon: "microscope", title: "Modern Equipment", desc: "Digital X-ray, CT scan, MRI and a fully automated pathology lab." },
  { icon: "clock", title: "24/7 Emergency", desc: "Round-the-clock emergency care with rapid-response ambulances." },
  { icon: "shield", title: "Patient Safety First", desc: "Strict hygiene protocols and internationally benchmarked care standards." },
  { icon: "receipt", title: "Transparent Billing", desc: "Clear, itemized bills with no hidden charges — ever." },
  { icon: "heart-pulse", title: "Compassionate Care", desc: "We treat every patient like family, from admission to recovery." },
];

const FACILITIES = [
  { img: "/images/facility-operation.jpg", title: "Operation Theaters", desc: "4 state-of-the-art OTs with laminar airflow and advanced anesthesia." },
  { img: "/images/facility-room.jpg", title: "Patient Rooms", desc: "Comfortable private, semi-private and deluxe rooms for faster recovery." },
  { img: "/images/facility-lab.jpg", title: "Diagnostics Lab", desc: "Automated lab delivering accurate reports in record time." },
];

const FAQS = [
  { q: "How do I book an appointment?", a: "Click “Book Appointment” on any page, choose your doctor, pick a date and time slot, and confirm. You will get a confirmation instantly, and a reminder notification before your visit." },
  { q: "What are the OPD timings?", a: "OPD runs Monday to Saturday. Cardiology 9am–2pm, Orthopedics 10am–4pm, Pediatrics 11am–5pm, Dermatology 12pm–6pm and Neurology 10am–3pm. The Emergency department is open 24/7." },
  { q: "Do you accept walk-in patients?", a: "Yes — walk-ins are welcome at the reception desk. However, booking online guarantees your slot and saves waiting time." },
  { q: "How can I get my prescription or bill?", a: "Log in to the Patient Portal to view and print prescriptions, and to view and pay your bills online." },
  { q: "Is emergency care really available 24/7?", a: "Yes. Our emergency department, operation theaters, pharmacy and diagnostics lab never close. Call +92 41 876 5432 in an emergency." },
];

const TESTIMONIALS = [
  { name: "Rashid Mehmood", detail: "Cardiac Patient", text: "The cardiology team saved my father's life. Professional, caring and always available. Best hospital in the city." },
  { name: "Nadia Aslam", detail: "Mother of patient", text: "My daughter's treatment was handled with such love and care. The pediatric ward feels like a second home." },
  { name: "Imran Tariq", detail: "Orthopedic Patient", text: "Knee surgery went perfectly. Physiotherapy support after surgery got me walking in weeks. Highly recommended." },
];

export default async function HomePage() {
  let doctors: { id: string; specialty: string; qualification: string; fee: number; user: { name: string } }[] = [];
  try {
    doctors = await prisma.doctor.findMany({
      take: 4,
      include: { user: { select: { name: true } } },
      orderBy: { id: "asc" },
    });
  } catch {
    doctors = [];
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <Stagger className="hero-copy" stagger={0.12}>
            <StaggerItem>
              <span className="hero-kicker">
                <span className="pulse-dot"></span> Trusted since 2005
              </span>
            </StaggerItem>
            <StaggerItem>
              <h1>
                Your Health, <span className="accent">Our Mission</span>
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p>
                CityCare Hospital brings world-class medical care to your doorstep —
                expert doctors, modern equipment and compassionate service, 24/7.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="hero-cta">
                <Link href="/patient/book" className="btn btn-primary btn-lg">
                  <Icon name="calendar" size={18} /> Book Appointment
                </Link>
                <Link href="/doctors" className="btn btn-light btn-lg">
                  Meet Our Doctors
                </Link>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="hero-stats">
                <div><b><AnimatedCounter value={20} suffix="+" /></b><span>Years of Care</span></div>
                <div><b><AnimatedCounter value={50} suffix="+" /></b><span>Expert Doctors</span></div>
                <div><b><AnimatedCounter value={100} suffix="k+" /></b><span>Happy Patients</span></div>
              </div>
            </StaggerItem>
          </Stagger>
          <div className="hero-photo-wrap">
            <Image
              src="/images/hero-hospital.jpg"
              alt="CityCare Hospital building"
              fill
              priority
              className="hero-photo"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
            <div className="float-card float-emergency float-anim">
              <span className="float-ico red"><Icon name="siren" size={20} /></span>
              <div><b>24/7 Emergency</b><span>Always ready</span></div>
            </div>
            <div className="float-card float-rating float-anim-slow">
              <span className="float-ico amber"><Icon name="star" size={20} /></span>
              <div><b>4.9 / 5</b><span>2,400+ patient reviews</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="kicker">Our Services</div>
              <h2>Complete Care Under One Roof</h2>
              <p>From emergency to specialized treatments, we cover every aspect of your health.</p>
            </div>
          </Reveal>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 90}>
                <Link href="/services" className="svc-card">
                  <div className="svc-icon"><Icon name={s.icon} size={28} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section section-gray">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="kicker">Why CityCare</div>
              <h2>Why Patients Choose Us</h2>
              <p>Modern medicine delivered with a human touch.</p>
            </div>
          </Reveal>
          <div className="svc-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {WHY_US.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 90}>
                <div className="svc-card">
                  <div className="svc-icon"><Icon name={w.icon} size={28} /></div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="kicker">Our Team</div>
              <h2>Meet Our Specialists</h2>
              <p>Highly qualified doctors dedicated to your recovery.</p>
            </div>
          </Reveal>
          <div className="doc-grid">
            {(doctors.length > 0 ? doctors : [
              { id: "1", specialty: "Cardiology", qualification: "MBBS, FCPS", fee: 3000, user: { name: "Dr. Ahmed Khan" } },
              { id: "2", specialty: "Orthopedics", qualification: "MBBS, MS", fee: 2500, user: { name: "Dr. Fatima Malik" } },
              { id: "3", specialty: "Pediatrics", qualification: "MBBS, DCH", fee: 2000, user: { name: "Dr. Bilal Ahmed" } },
              { id: "4", specialty: "Dermatology", qualification: "MBBS, FCPS", fee: 2500, user: { name: "Dr. Ayesha Raza" } },
            ]).map((d, i) => (
              <Reveal key={d.id} delay={(i % 4) * 90}>
                <div className="doc-card">
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
                    <Link href="/patient/book" className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>
                      <Icon name="calendar" size={14} /> Book
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/doctors" className="btn btn-primary">All Doctors <Icon name="arrow-right" size={16} /></Link>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="section section-gray">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="kicker">Our Facilities</div>
              <h2>Take a Look Inside</h2>
              <p>Modern infrastructure designed around patient comfort and safety.</p>
            </div>
          </Reveal>
          <div className="fac-grid">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 90}>
                <div className="fac-card">
                  <div className="fac-img">
                    <Image
                      src={f.img}
                      alt={f.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 380px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="fac-body">
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={270}>
              <div className="fac-card fac-visual">
                <div className="fac-img fac-svg-bg">
                  <Icon name="siren" size={64} />
                </div>
                <div className="fac-body">
                  <h3>Emergency & Pharmacy</h3>
                  <p>24/7 emergency department backed by an in-house pharmacy with genuine medicines.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OWNER MESSAGE */}
      <section className="section">
        <div className="container">
          <div className="owner-grid">
            <Reveal>
              <div className="owner-photo-wrap">
                <Image
                  src="/images/owner-director.jpg"
                  alt="Dr. Imran Sheikh, Founder & CEO"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  style={{ objectFit: "cover" }}
                  className="owner-photo"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <div className="kicker">Founder&apos;s Message</div>
                <h2 style={{ fontSize: 32, color: "var(--navy)", marginBottom: 16 }}>
                  &ldquo;Every patient who walks through our doors deserves the very best we have.&rdquo;
                </h2>
                <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 16 }}>
                  When I founded CityCare in 2005, my dream was simple: a hospital where no one is
                  turned away, where technology serves compassion, and where families feel at home
                  even in difficult times. Twenty years on, that dream treats over 100,000 patients
                  every year — and we are just getting started.
                </p>
                <div className="owner-sign">
                  <b>Dr. Imran Sheikh</b>
                  <span>Founder & CEO, CityCare Hospital</span>
                </div>
                <Link href="/about" className="btn btn-outline" style={{ marginTop: 20 }}>
                  Our Story <Icon name="arrow-right" size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-band">
        <div className="container stats-grid">
          <div><b><AnimatedCounter value={20} suffix="+" /></b><span>Years of Excellence</span></div>
          <div><b><AnimatedCounter value={50} suffix="+" /></b><span>Specialist Doctors</span></div>
          <div><b><AnimatedCounter value={100} suffix="k+" /></b><span>Patients Treated</span></div>
          <div><b>24/7</b><span>Emergency Service</span></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="kicker">Testimonials</div>
              <h2>What Our Patients Say</h2>
            </div>
          </Reveal>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 110}>
                <div className="testi-card">
                  <div className="testi-stars">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Icon key={s} name="star" size={16} style={{ color: "var(--amber)", marginRight: 3 }} />
                    ))}
                  </div>
                  <p>&ldquo;{t.text}&rdquo;</p>
                  <div className="testi-author">
                    <span className="user-avatar" style={{ width: 44, height: 44 }}>
                      {t.name.charAt(0)}
                    </span>
                    <div><b>{t.name}</b><span>{t.detail}</span></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-gray">
        <div className="container" style={{ maxWidth: 800 }}>
          <Reveal>
            <div className="section-head">
              <div className="kicker">FAQ</div>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know before your visit.</p>
            </div>
          </Reveal>
          <Faq items={FAQS} />
        </div>
      </section>

      {/* EMERGENCY */}
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="container">
          <div className="emergency-banner">
            <div>
              <h2 style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Icon name="siren" size={34} /> Medical Emergency?
              </h2>
              <p>Our emergency team is ready 24/7. Call now — every second counts.</p>
            </div>
            <a className="emergency-num" href="tel:+92418765432">+92 41 876 5432</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container">
          <h2>Ready to Take Care of Your Health?</h2>
          <p>Book an appointment in under a minute. No waiting lines.</p>
          <Link href="/patient/book" className="btn btn-light btn-lg"><Icon name="calendar" size={18} /> Book Appointment Now</Link>
        </div>
      </section>
    </>
  );
}
