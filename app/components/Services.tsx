"use client";

import { useState } from "react";
import {
  SERVICE_CATEGORIES,
  SERVICES_DATA,
  ServiceCategory,
} from "../data/salon-data";

interface ServicesProps {
  onOpenBooking: () => void;
}

export function Services({ onOpenBooking }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("hair");

  const currentServices = SERVICES_DATA[activeCategory] || [];

  return (
    <section className="services" id="services">
      <div className="w">
        <div className="reveal-on-scroll">
          <div className="eye">Everything your look needs</div>
          <h2 className="title">Explore our Services</h2>
          <p className="sub">
            Select a category to view popular services and starting prices.
          </p>
        </div>

        <div className="tabs reveal-on-scroll" role="tablist">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`tab ${activeCategory === cat.id ? "on" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          key={activeCategory}
          className="servicegrid servicegrid-transition"
          id="sg"
          role="tabpanel"
        >
          {currentServices.map((service, idx) => (
            <article className="service" key={idx}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <footer>
                <span>{service.price}</span>
                <button
                  className="book"
                  style={{
                    background: "none",
                    border: 0,
                    color: "#ffad63",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  onClick={onOpenBooking}
                  aria-label={`Book ${service.title}`}
                >
                  Book →
                </button>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
