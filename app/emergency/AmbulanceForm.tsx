"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { useToast } from "@/components/Toast";

export default function AmbulanceForm() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast("Ambulance dispatched! Our team will call you shortly.", "success");
    setName("");
    setPhone("");
    setAddress("");
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-field">
          <label>Your Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />
        </div>
        <div className="form-field">
          <label>Phone Number *</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="03XX-XXXXXXX"
            required
            inputMode="tel"
          />
        </div>
      </div>
      <div className="form-field">
        <label>Pickup Address *</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="House / street / area — where should the ambulance come?"
          required
        />
      </div>
      <button type="submit" className="btn btn-block btn-lg emg-submit">
        <Icon name="siren" size={18} /> Request Ambulance
      </button>
    </form>
  );
}
