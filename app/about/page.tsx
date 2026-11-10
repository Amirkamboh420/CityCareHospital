import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

const TIMELINE = [
  { year: "2005", title: "A 20-bed clinic opens", text: "Dr. Imran Sheikh opens CityCare as a small clinic in Faisalabad with 6 doctors and one big dream." },
  { year: "2010", title: "100 beds & first OT complex", text: "Expanded to a 100-bed hospital with 2 modern operation theaters and a 24/7 emergency ward." },
  { year: "2015", title: "Diagnostics & ICU launch", text: "Automated pathology lab, CT scan and a 12-bed intensive care unit bring advanced care in-house." },
  { year: "2020", title: "200 beds, 40+ specialists", text: "New surgical wing opens. CityCare becomes a teaching-affiliated multi-specialty hospital." },
  { year: "2026", title: "Digital CityCare", text: "Online appointments, digital prescriptions, transparent e-billing and 100,000+ patients served every year." },
];

const VALUES = [
  { icon: "target" as const, title: "Our Mission", text: "Affordable, world-class healthcare for every member of our community." },
  { icon: "eye" as const, title: "Our Vision", text: "To be the most trusted hospital in Pakistan through excellence and compassion." },
  { icon: "gem" as const, title: "Our Values", text: "Compassion, integrity, excellence and respect — in every interaction." },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>About CityCare Hospital</h1>
          <p>Two decades of trusted healthcare in the heart of Faisalabad.</p>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div className="owner-grid">
            <Reveal>
              <div className="about-photo-wrap">
                <Image
                  src="/images/about-team.jpg"
                  alt="CityCare Hospital team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  style={{ objectFit: "cover" }}
                  className="rounded-img"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <div className="kicker">Our Story</div>
                <h2 style={{ fontSize: 32, color: "var(--navy)", marginBottom: 16 }}>
                  Caring for Our Community Since 2005
                </h2>
                <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 16 }}>
                  CityCare Hospital started as a small 20-bed clinic with a big dream — to make
                  quality healthcare accessible to everyone. Today, we are a 200-bed multi-specialty
                  hospital with over 50 specialist doctors, modern operation theatres, a 24/7
                  emergency department and advanced diagnostic facilities.
                </p>
                <p style={{ color: "var(--muted)", fontSize: 16 }}>
                  Our philosophy is simple: treat every patient like family. That is why more than
                  100,000 patients trust us with their health every year.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="section section-gray" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="svc-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="svc-card">
                  <div className="svc-icon"><Icon name={v.icon} size={28} /></div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OWNER MESSAGE */}
      <section className="section">
        <div className="container">
          <div className="owner-grid">
            <Reveal>
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
              </div>
            </Reveal>
            <Reveal delay={120}>
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
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section section-gray">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="section-head">
              <div className="kicker">Milestones</div>
              <h2>Our Journey: 2005 → 2026</h2>
            </div>
          </Reveal>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 60}>
                <div className="tl-item">
                  <div className="tl-dot"><Icon name="check" size={14} /></div>
                  <div className="tl-content">
                    <span className="tl-year">{t.year}</span>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/doctors" className="btn btn-primary btn-lg">Meet Our Doctors <Icon name="arrow-right" size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
