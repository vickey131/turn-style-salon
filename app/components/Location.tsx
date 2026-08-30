"use client";

import { SALON_INFO } from "../data/salon-data";

interface LocationProps {
  onOpenBooking: () => void;
}

export function Location({ onOpenBooking }: LocationProps) {
  return (
    <section id="location">
      <div className="w visitbox reveal-on-scroll">
        <div className="visitcopy">
          <div className="eye">Visit us in Bengaluru</div>
          <h2 className="title">
            Turn Style Salon
            <br />
            Koramangala
          </h2>
          <p>
            Your premium unisex destination for hair, skin, makeup, nails and
            grooming.
          </p>
          <div className="details">
            <span>
              <b>Location:</b> {SALON_INFO.branch}
            </span>
            <a href={`tel:${SALON_INFO.phoneTel}`}>
              <b>Phone:</b> {SALON_INFO.phoneDisplay}
            </a>
            <span>
              <b>Timing:</b> Open daily - call to confirm
            </span>
          </div>
          <div className="actions">
            <button className="btn book" onClick={onOpenBooking}>
              Book Appointment
            </button>
            <a
              className="btn outline"
              target="_blank"
              rel="noopener noreferrer"
              href={SALON_INFO.mapsUrl}
            >
              Get Directions
            </a>
          </div>
        </div>
        <div className="map">
          {/* <span>Turn Style · Koramangala</span> */}
        </div>
      </div>
    </section>
  );
}
