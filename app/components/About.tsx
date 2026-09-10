"use client";

import Image from "next/image";

interface AboutProps {
  onOpenBooking: () => void;
}

export function About({ onOpenBooking }: AboutProps) {
  return (
    <section>
      <div className="w split reveal-on-scroll">
        <div className="portrait">
          <Image
            src="/images/img_4.webp"
            alt="Premium Turn Style hair colour"
            width={1080}
            height={1350}
            sizes="(max-width: 880px) 100vw, 50vw"
          />
          <div className="badge">
            <b>Koramangala</b>Your premium neighbourhood salon.
          </div>
        </div>
        <div>
          <div className="eye">More than a salon visit</div>
          <h2 className="title">
            Come for the Service.
            <br />
            Leave with Confidence.
          </h2>
          <p className="sub">
            Every appointment begins with understanding you. From a quick
            refresh to a bold new colour or complete head-to-toe
            transformation, our professionals personalise every detail.
          </p>
          <div className="ticks">
            <span>Expert Consultation</span>
            <span>Premium Products</span>
            <span>Hygienic Salon</span>
            <span>Transparent Pricing</span>
            <span>Women & Men</span>
            <span>Koramangala Location</span>
          </div>
          <button className="btn book" onClick={onOpenBooking}>
            Find the Right Service
          </button>
        </div>
      </div>
    </section>
  );
}
