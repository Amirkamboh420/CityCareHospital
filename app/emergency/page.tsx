import Link from "next/link";
import { Icon } from "@/components/icons";
import { FadeIn, Stagger, StaggerItem } from "@/components/anim";
import AmbulanceForm from "./AmbulanceForm";

const STEPS = [
  { title: "Stay Calm", desc: "Keep the patient still and comfortable. Panic slows everything down.", icon: "shield" as const },
  { title: "Call Us First", desc: "Dial our 24/7 emergency line so our team is ready when you arrive.", icon: "phone" as const },
  { title: "Request Ambulance", desc: "Fill the form below or call the ambulance number for doorstep pickup.", icon: "siren" as const },
  { title: "We Take Over", desc: "Our ER team, trauma bays and on-call specialists handle it from here.", icon: "heart-pulse" as const },
];

export const metadata = { title: "Emergency 24/7 | CityCare Hospital" };

export default function EmergencyPage() {
  return (
    <>
      <section className="emg-hero">
        <div className="container">
          <span className="crumb"><Link href="/">Home</Link> / Emergency</span>
          <div className="emg-hero-icon"><Icon name="siren" size={44} /></div>
          <h1>Emergency? We&apos;re Ready. 24/7.</h1>
          <p>Our emergency department never closes. Trauma bays, rapid-response ambulances and senior doctors on call — around the clock.</p>
          <div className="emg-numbers">
            <a href="tel:+92418765432" className="emg-number-card">
              <Icon name="phone" size={26} />
              <div>
                <span className="emg-num-label">Emergency Hotline</span>
                <span className="emg-num">+92 41 876 5432</span>
              </div>
            </a>
            <a href="tel:04235771122" className="emg-number-card emg-ambulance">
              <Icon name="siren" size={26} />
              <div>
                <span className="emg-num-label">Ambulance</span>
                <span className="emg-num">042-3577-1122</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeIn>
            <h2 className="emg-section-title">What to Do in an Emergency</h2>
          </FadeIn>
          <Stagger className="emg-steps" stagger={0.08}>
            {STEPS.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="emg-step lift-hover">
                  <span className="emg-step-num">{i + 1}</span>
                  <div className="svc-icon"><Icon name={s.icon} size={26} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <FadeIn>
            <div className="form-card emg-form-card">
              <h2><Icon name="map-pin" size={24} /> Book an Ambulance</h2>
              <p>Tell us where you are — our dispatch team will confirm on call and reach you fast.</p>
              <AmbulanceForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
