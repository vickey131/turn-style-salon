"use client";

import { TRUST_STATS } from "../data/salon-data";

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <>
      <section className="hero">
        <div>
          <span className="pill hero-anim-pill" style={{ visibility: "hidden" }}>
            ● Turn Style Salon, Koramangala
          </span>
          <h1 className="hero-anim-title">
            Your Style.
            <br />
            <span>Elevated.</span>
          </h1>
          <p className="hero-anim-desc">
            Premium hair, Beauty and Grooming Experiences for Women and Men, <br />
            delivered by trained professionals in the Heart of Koramangala.
          </p>
          <div className="actions hero-anim-actions">
            <button className="btn book" onClick={onOpenBooking}>
              Book Your Appointment
            </button>
            <a className="btn outline" href="tel:+918971676928">
              Call 89716 76928
            </a>
          </div>
        </div>
      </section>

      <div className="w trust reveal-on-scroll">
        {TRUST_STATS.map((stat, idx) => (
          <div key={idx}>
            <strong>{stat.highlight}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
