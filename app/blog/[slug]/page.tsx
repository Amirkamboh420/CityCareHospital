import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticle, getRelated, ARTICLES } from "../articles";
import { Icon } from "@/components/icons";
import { FadeIn, Stagger, StaggerItem } from "@/components/anim";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  return { title: a ? `${a.title} — CityCare Hospital` : "Article not found" };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const related = getRelated(article.slug, 2);

  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb">
            <Link href="/">Home</Link> / <Link href="/blog">Health Blog</Link> / {article.title}
          </span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
        </div>
      </section>

      <section className="section">
        <div className="container blog-article">
          <FadeIn>
            <div className="blog-hero-img">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="blog-meta blog-meta-row">
              <span className="blog-chip-static">
                <Icon name={article.icon} size={14} /> {article.category}
              </span>
              <span><Icon name="user" size={14} /> {article.author}</span>
              <span><Icon name="calendar" size={14} /> {article.date}</span>
              <span><Icon name="clock" size={14} /> {article.readTime}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="blog-content">
              {article.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="blog-takeaways">
              <h3>
                <Icon name="check-circle" size={22} /> Key Takeaways
              </h3>
              <ul>
                {article.takeaways.map((t, i) => (
                  <li key={i}>
                    <Icon name="check-circle" size={18} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="blog-disclaimer">
              <Icon name="info" size={16} />
              <span>
                This article is for general information only and is not a substitute for
                professional medical advice. Please consult a CityCare doctor for personal
                guidance.
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="section-head">
            <div className="kicker">Keep Reading</div>
            <h2>Related Articles</h2>
          </div>
          <Stagger className="blog-grid blog-grid-2" stagger={0.1}>
            {related.map((a) => (
              <StaggerItem key={a.slug}>
                <Link href={`/blog/${a.slug}`} className="blog-card">
                  <div className="blog-img">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
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
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link href="/blog" className="btn btn-outline btn-lg">
              View all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
