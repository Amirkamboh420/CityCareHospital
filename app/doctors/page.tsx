"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { doctorImage } from "@/lib/doctorImages";
import { FadeIn } from "@/components/anim";

type Doctor = {
  id: string;
  specialty: string;
  qualification: string;
  fee: number;
  schedule: string;
  user: { name: string };
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");

  useEffect(() => {
    fetch("/api/doctors")
      .then((r) => r.json())
      .then((d) => setDoctors(d.doctors || []))
      .catch(() => setDoctors([]));
  }, []);

  const specialties = useMemo(
    () => ["All", ...Array.from(new Set(doctors.map((d) => d.specialty)))],
    [doctors]
  );

  const filtered = useMemo(
    () =>
      doctors.filter(
        (d) =>
          (specialty === "All" || d.specialty === specialty) &&
          d.user.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [doctors, query, specialty]
  );

  return (
    <>
      <section className="page-hero-gradient">
        <div className="container">
          <span className="crumb"><Link href="/">Home</Link> / Doctors</span>
          <h1>Our Doctors</h1>
          <p>Meet the specialists behind CityCare&apos;s trusted care.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {doctors.length === 0 ? (
            <div className="empty-state">
              <div className="big"><Icon name="stethoscope" size={48} /></div>
              <h2>Doctor profiles loading…</h2>
              <p>Please run the database seed to see our team.</p>
            </div>
          ) : (
            <>
              <div className="filter-bar docp-filters">
                <div className="docp-search">
                  <Icon name="search" size={17} />
                  <input
                    type="text"
                    placeholder="Search by doctor name…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search doctors by name"
                  />
                </div>
                <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} aria-label="Filter by specialty">
                  {specialties.map((s) => (
                    <option key={s} value={s}>{s === "All" ? "All Specialties" : s}</option>
                  ))}
                </select>
                <span className="docp-count">
                  <Icon name="users" size={15} /> {filtered.length} doctor{filtered.length === 1 ? "" : "s"}
                </span>
              </div>
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="big"><Icon name="search" size={48} /></div>
                  <h2>No doctors found</h2>
                  <p>Try a different name or specialty.</p>
                </div>
              ) : (
                <div className="doc-grid">
                  {filtered.map((d, i) => (
                    <FadeIn key={d.id} delay={(i % 4) * 0.06}>
                      <div className="doc-card">
                        <Link href={`/doctors/${d.id}`} className="doc-photo">
                          <Image
                            src={doctorImage(d.specialty)}
                            alt={d.user.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 300px"
                            style={{ objectFit: "cover" }}
                          />
                        </Link>
                        <div className="doc-info">
                          <h3><Link href={`/doctors/${d.id}`}>{d.user.name}</Link></h3>
                          <div className="doc-spec">{d.specialty}</div>
                          <div className="doc-meta">{d.qualification}</div>
                          <div className="doc-meta"><Icon name="clock" size={13} /> {d.schedule}</div>
                          <div className="doc-fee">Fee: Rs. {d.fee.toLocaleString()}</div>
                          <Link href={`/patient/book?doctor=${d.id}`} className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>
                            <Icon name="calendar" size={14} /> Book Appointment
                          </Link>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
