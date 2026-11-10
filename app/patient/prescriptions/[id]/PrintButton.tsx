"use client";

import { Icon } from "@/components/icons";

export default function PrintButton() {
  return (
    <button className="btn btn-primary no-print" onClick={() => window.print()}>
      <Icon name="printer" size={15} /> Print Prescription
    </button>
  );
}
