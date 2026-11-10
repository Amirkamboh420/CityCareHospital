import Link from "next/link";
import { Icon } from "@/components/icons";
import { Stagger, StaggerItem, FadeIn } from "@/components/anim";

const STORIES = [
  {
    name: "Muhammad Aslam",
    treatment: "Cardiac Surgery",
    rating: 5,
    color: "#0d9488",
    text: "I had a bypass surgery here in March. From the first consultation to discharge, every doctor explained everything clearly. The ICU team checked on me day and night. I am walking 3 kilometers daily now — all thanks to CityCare.",
  },
  {
    name: "Shazia Khan",
    treatment: "Maternity Care",
    rating: 5,
    color: "#0f2a43",
    text: "Both my children were born at CityCare. The maternity ward is spotless, the nurses are angels, and they let my husband stay with me through delivery. I recommend it to every expecting mother I know.",
  },
  {
    name: "Imran Raza",
    treatment: "Orthopedic Surgery",
    rating: 5,
    color: "#059669",
    text: "After a road accident fractured my leg, Dr. Tariq performed surgery the same night. The physiotherapy team got me back on my feet in six weeks. The billing was completely transparent — not a single surprise charge.",
  },
  {
    name: "Farah Naz",
    treatment: "Pediatric Care",
    rating: 5,
    color: "#2563eb",
    text: "My 4-year-old had pneumonia and the pediatric team treated her like their own child. They called us every day after discharge to check on her. That level of care is rare, and I will never forget it.",
  },
  {
    name: "Abdul Rehman",
    treatment: "Emergency Care",
    rating: 5,
    color: "#f59e0b",
    text: "My father had a heart attack at 2am. The ambulance arrived in 12 minutes and the emergency team had him stabilized before we even reached. Fast, professional, and genuinely caring staff.",
  },
  {
    name: "Amina Bibi",
    treatment: "Diabetes Management",
    rating: 4,
    color: "#7c3aed",
    text: "The diabetes clinic changed my life. The doctor and nutritionist made a plan I could actually follow with our home food. My sugar levels are normal for the first time in eight years.",
  },
  {
    name: "Khalid Mehmood",
    treatment: "General Surgery",
    rating: 5,
    color: "#0891b2",
    text: "Had my gallbladder removed through laparoscopic surgery — discharged the very next day with almost no pain. The insurance desk handled my entire claim; I paid nothing out of pocket. Brilliant experience.",
  },
  {
    name: "Sana Javed",
    treatment: "Dermatology",
    rating: 4,
    color: "#dc2626",
    text: "Struggled with skin problems for years and tried many clinics. Dr. Raza diagnosed the actual cause in one visit and the treatment worked within a month. Finally confident about my skin again.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="tst-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon
          key={s}
          name="star"
          size={16}
          style={{ color: s <= rating ? "var(--amber)" : "#dbe7ee" }}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb">
            <Link href="/">Home</Link> / Testimonials
          </span>
          <h1>Patient Stories</h1>
          <p>Real stories from real patients — the reason we do what we do.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="section-head">
              <div className="kicker">4.8 Average Rating</div>
              <h2>What Our Patients Say</h2>
              <p>Based on 12,000+ verified patient feedback forms collected in 2026.</p>
            </div>
          </FadeIn>
          <Stagger className="tst-grid" stagger={0.07}>
            {STORIES.map((s) => (
              <StaggerItem key={s.name}>
                <div className="tst-card">
                  <Stars rating={s.rating} />
                  <p className="tst-text">"{s.text}"</p>
                  <div className="tst-author">
                    <span className="tst-avatar" style={{ background: s.color }}>
                      {s.name.charAt(0)}
                    </span>
                    <div>
                      <b>{s.name}</b>
                      <span>{s.treatment}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn y={24}>
            <div className="tst-cta">
              <div>
                <h3>Were you treated at CityCare?</h3>
                <p>Share your experience and help other patients choose with confidence.</p>
              </div>
              <Link href="/contact" className="btn btn-primary btn-lg">
                <Icon name="edit" size={18} /> Share Your Story
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
