import { Icon } from "@/components/icons";
export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We&apos;re here to help — reach out anytime.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="svc-icon"><Icon name="map-pin" size={28} /></div>
              <h3>Visit Us</h3>
              <p style={{ color: "var(--muted)" }}>123 Health Avenue,<br />Faisalabad, Pakistan</p>
            </div>
            <div className="contact-card">
              <div className="svc-icon"><Icon name="phone" size={28} /></div>
              <h3>Call Us</h3>
              <p style={{ color: "var(--muted)" }}>+92 41 876 5432<br />Emergency: 24/7</p>
            </div>
            <div className="contact-card">
              <div className="svc-icon"><Icon name="mail" size={28} /></div>
              <h3>Email Us</h3>
              <p style={{ color: "var(--muted)" }}>info@citycare.com<br />appointments@citycare.com</p>
            </div>
          </div>
          <div className="form-card" style={{ maxWidth: 640, margin: "0 auto" }}>
            <h1>Send a Message</h1>
            <p className="form-sub">We usually reply within a few hours.</p>
            <form>
              <div className="form-grid">
                <div className="form-field">
                  <label>Your Name</label>
                  <input type="text" placeholder="Full name" required />
                </div>
                <div className="form-field">
                  <label>Phone</label>
                  <input type="tel" placeholder="03xx-xxxxxxx" required />
                </div>
              </div>
              <div className="form-field">
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" required />
              </div>
              <div className="form-field">
                <label>Message</label>
                <textarea rows={5} placeholder="Write your message..." required />
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
