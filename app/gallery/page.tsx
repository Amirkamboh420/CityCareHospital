"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { Stagger, StaggerItem } from "@/components/anim";

type Photo = { src: string; caption: string };

const PHOTOS: Photo[] = [
  { src: "/images/hero-hospital.jpg", caption: "CityCare Hospital — Main Building" },
  { src: "/images/doctor-ahmed.jpg", caption: "Dr. Ahmed Khan — Cardiology" },
  { src: "/images/doctor-fatima.jpg", caption: "Dr. Fatima Malik — Orthopedics" },
  { src: "/images/doctor-bilal.jpg", caption: "Dr. Bilal Ahmed — Pediatrics" },
  { src: "/images/doctor-ayesha.jpg", caption: "Dr. Ayesha Raza — Dermatology" },
  { src: "/images/doctor-usman.jpg", caption: "Dr. Usman Tariq — Neurology" },
  { src: "/images/facility-operation.jpg", caption: "Modern Operation Theatre" },
  { src: "/images/facility-room.jpg", caption: "Comfortable Patient Rooms" },
  { src: "/images/facility-lab.jpg", caption: "Advanced Diagnostics Lab" },
  { src: "/images/about-team.jpg", caption: "Our Dedicated Team" },
  { src: "/images/owner-director.jpg", caption: "Our Owner & Director" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(() => setSelected((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)), []);
  const next = useCallback(() => setSelected((i) => (i === null ? null : (i + 1) % PHOTOS.length)), []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close, prev, next]);

  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb"><Link href="/">Home</Link> / Gallery</span>
          <h1>Photo Gallery</h1>
          <p>Take a look inside CityCare — our facilities, our team, and the people behind the care.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Stagger className="gal-grid" stagger={0.05}>
            {PHOTOS.map((p, i) => (
              <StaggerItem key={p.src}>
                <button
                  type="button"
                  className="gal-item"
                  onClick={() => setSelected(i)}
                  aria-label={`View ${p.caption}`}
                  style={{ padding: 0, border: "none", display: "block", width: "100%" }}
                >
                  <Image
                    src={p.src}
                    alt={p.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="gal-cap">{p.caption}</span>
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {selected !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true" aria-label={PHOTOS[selected].caption}>
          <button
            type="button"
            className="lightbox-close"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Close"
          >
            <Icon name="x" size={20} />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <Image
            src={PHOTOS[selected].src}
            alt={PHOTOS[selected].caption}
            width={1100}
            height={800}
            style={{ objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
            priority
          />
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
          >
            ›
          </button>
          <div className="lightbox-cap" onClick={(e) => e.stopPropagation()}>
            {PHOTOS[selected].caption} • {selected + 1} / {PHOTOS.length}
          </div>
        </div>
      )}
    </>
  );
}
