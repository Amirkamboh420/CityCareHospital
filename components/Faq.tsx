"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {items.map((f, i) => (
        <Reveal key={f.q} delay={i * 60}>
          <div className="faq-item">
            <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <Icon
                name="chevron-down"
                size={18}
                style={{
                  transform: open === i ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            {open === i && <div className="faq-a">{f.a}</div>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
