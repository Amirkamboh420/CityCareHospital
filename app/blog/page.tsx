import Link from "next/link";
import Image from "next/image";
import { ARTICLES } from "./articles";
import { Icon } from "@/components/icons";
import { Stagger, StaggerItem, FadeIn } from "@/components/anim";

export default function BlogPage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb">
            <Link href="/">Home</Link> / Health Blog
          </span>
          <h1>Health Blog</h1>
          <p>Practical health advice from CityCare doctors — prevention, wellness and early care.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Stagger className="blog-grid" stagger={0.08}>
            {ARTICLES.map((a) => (
              <StaggerItem key={a.slug}>
                <Link href={`/blog/${a.slug}`} className="blog-card">
                  <div className="blog-img">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="blog-chip">
                      <Icon name={a.icon} size={13} /> {a.category}
                    </span>
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span><Icon name="calendar" size={13} /> {a.date}</span>
                      <span><Icon name="clock" size={13} /> {a.readTime}</span>
                    </div>
                    <h3>{a.title}</h3>
                    <p>{a.excerpt}</p>
                    <span className="blog-read">
                      Read article <Icon name="arrow-right" size={15} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn className="blog-cta" y={24}>
            <div>
              <h3>Have a health question?</h3>
              <p>Our doctors answer every query. Book a consultation or message us anytime.</p>
            </div>
            <div className="blog-cta-actions">
              <Link href="/patient/book" className="btn btn-primary btn-lg">
                <Icon name="calendar" size={18} /> Book Appointment
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                <Icon name="phone" size={18} /> Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
