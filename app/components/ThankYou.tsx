"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BookingModal } from "./BookingModal";
import { SALON_INFO } from "../data/salon-data";

export function ThankYou() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const service = searchParams.get("service") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBooking = () => {
    setIsModalOpen(true);
    document.body.classList.add("lock");
  };

  const closeBooking = () => {
    setIsModalOpen(false);
    document.body.classList.remove("lock");
  };

  // Trigger conversion event for Google Ads / Meta Pixel / GTM
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Standard CustomEvent
        window.dispatchEvent(
          new CustomEvent("salon_conversion", {
            detail: {
              event: "booking_submission",
              name,
              service,
              date,
              time,
            },
          })
        );

        // Google Tag Manager / dataLayer support
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as any;
        if (Array.isArray(win.dataLayer)) {
          win.dataLayer.push({
            event: "conversion_booking_thank_you",
            bookingService: service,
            bookingDate: date,
            bookingTime: time,
          });
        }
      }
    } catch (err) {
      console.error("Conversion dispatch error:", err);
    }
  }, [name, service, date, time]);

  // Format date if provided
  const formattedDate = date
    ? (() => {
      try {
        const parsed = new Date(date);
        return isNaN(parsed.getTime())
          ? date
          : parsed.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          });
      } catch {
        return date;
      }
    })()
    : "";

  return (
    <>
      <Header onOpenBooking={openBooking} />

      <main>
        {/* Confirmation Hero Section - Fits in single viewport fold */}
        <section className="ty-hero-section">
          <div className="w">
            <div className="ty-hero-inner">
              {/* Tick symbol */}
              <div className="ty-check-circle" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              {/* Title & confirmation message */}
              <h1 className="title">Appointment Request Received</h1>

              <p className="sub ty-lead-sub">
                {name ? `Thank you, ${name}! ` : "Thank you! "}
                Your appointment request is in. Our Koramangala team will be in touch
                shortly to confirm your slot.
              </p>

              {/* Appointment Ticket Card */}
              <div className="ty-ticket">
                <div className="ty-ticket-header">
                  <span className="ty-ticket-title">
                    Appointment Details
                  </span>
                  <span className="ty-ticket-badge">
                    Koramangala, Bengaluru
                  </span>
                </div>

                <div className="ty-ticket-grid">
                  <div className="ty-ticket-item">
                    <span className="ty-ticket-label">Guest Name</span>
                    <span className="ty-ticket-value">
                      {name || "Valued Guest"}
                    </span>
                  </div>
                  <div className="ty-ticket-item">
                    <span className="ty-ticket-label">Selected Service</span>
                    <span className="ty-ticket-value">
                      {service || "Styling / Consultation"}
                    </span>
                  </div>
                  <div className="ty-ticket-item">
                    <span className="ty-ticket-label">Preferred Date</span>
                    <span className="ty-ticket-value">
                      {formattedDate || "Earliest Available"}
                    </span>
                  </div>
                  <div className="ty-ticket-item">
                    <span className="ty-ticket-label">Preferred Time</span>
                    <span className="ty-ticket-value">
                      {time || "As per slot availability"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ty-actions-row">
                <a href={`tel:${SALON_INFO.phoneTel}`} className="btn book">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="16"
                    height="16"
                    style={{ marginRight: "8px" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Call Salon · 89716 76928
                </a>

                <a
                  href={SALON_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="16"
                    height="16"
                    style={{ marginRight: "8px" }}
                  >
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.188-1.358a9.946 9.946 0 0 0 4.82 1.238h.005c5.507 0 9.99-4.478 9.99-9.985C22.007 6.478 17.519 2 12.012 2zm0 18.29h-.003a8.27 8.27 0 0 1-4.218-1.157l-.302-.18-3.136.82.836-3.056-.197-.314a8.27 8.27 0 0 1-1.267-4.417c0-4.561 3.719-8.274 8.291-8.274 4.57 0 8.287 3.713 8.288 8.276-.002 4.562-3.722 8.276-8.293 8.276zm4.542-6.208c-.249-.125-1.472-.725-1.7-.807-.228-.083-.393-.125-.558.125-.166.249-.641.808-.785.972-.145.166-.29.187-.539.062-.25-.125-1.05-.388-2.001-1.235-.74-.658-1.239-1.47-1.385-1.7-.145-.25-.015-.385.11-.51.112-.112.249-.29.373-.436.124-.145.166-.25.249-.415.083-.166.042-.312-.02-.437-.063-.125-.559-1.347-.766-1.848-.201-.486-.421-.42-.559-.427-.123-.006-.29-.008-.456-.008-.166 0-.436.062-.664.312-.228.249-.871.85-.871 2.072 0 1.222.89 2.404.99 2.548.1.145 1.751 2.674 4.243 3.75.593.256 1.056.408 1.417.523.596.19 1.138.163 1.567.1.478-.07 1.472-.601 1.679-1.18.207-.58.207-1.078.145-1.18-.062-.102-.228-.164-.477-.29z" />
                  </svg>
                  Chat on WhatsApp
                </a>

                <Link href="/" className="btn ty-btn-outline-home">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* While We Confirm Your Slot Section - On next page when scrolled down */}
        <section className="offers ty-next-steps" id="while-you-wait">
          <div className="w">
            <div className="head">
              <div>
                <div className="eye">Popular at Koramangala</div>
                <h2 className="title">While We Confirm Your Slot</h2>
                <p className="sub">
                  Explore our trending packages, see styling transformations, or
                  plan your route to our Koramangala salon.
                </p>
              </div>
            </div>

            <div className="grid3">
              {/* Card 1: Trending Offers */}
              <article className="card">
                <Image
                  src="/images/img_6.webp"
                  alt="Balayage Highlights"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 570px) 100vw, (max-width: 880px) 50vw, 33vw"
                />
                <div>
                  <h3>Balayage Highlights</h3>
                  <span className="price">From ₹4,999</span>
                  <p
                    className="sub"
                    style={{ marginTop: "8px", fontSize: "0.9rem" }}
                  >
                    Dimensional hand-painted colour &amp; glossy toner finish by
                    senior colourists.
                  </p>
                  <Link
                    href="/#offers"
                    className="btn"
                    style={{
                      marginTop: "16px",
                      padding: "10px 18px",
                      fontSize: "0.85rem",
                      width: "100%",
                    }}
                  >
                    View All Offers
                  </Link>
                </div>
              </article>

              {/* Card 2: Client Transformations */}
              <article className="card">
                <Image
                  src="/images/img_4.webp"
                  alt="Styling and transformations"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 570px) 100vw, (max-width: 880px) 50vw, 33vw"
                />
                <div>
                  <h3>Client Transformations</h3>
                  <span className="price">@turnstylesalon</span>
                  <p
                    className="sub"
                    style={{ marginTop: "8px", fontSize: "0.9rem" }}
                  >
                    Browse client cuts, hair makeovers, glass skin facials and
                    seasonal drops.
                  </p>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      marginTop: "16px",
                      padding: "10px 18px",
                      fontSize: "0.85rem",
                      width: "100%",
                    }}
                  >
                    Follow on Instagram
                  </a>
                </div>
              </article>

              {/* Card 3: Location */}
              <article className="card">
                <Image
                  src="/images/img_12.webp"
                  alt="Turn Style Salon Koramangala interior"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 570px) 100vw, (max-width: 880px) 50vw, 33vw"
                />
                <div>
                  <h3>Koramangala 5th Block</h3>
                  <span className="price">4.8 ★ Google Reviews</span>
                  <p
                    className="sub"
                    style={{ marginTop: "8px", fontSize: "0.9rem" }}
                  >
                    Open 7 days · 10:00 AM – 8:30 PM. Centrally located with
                    easy parking.
                  </p>
                  <a
                    href={SALON_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      marginTop: "16px",
                      padding: "10px 18px",
                      fontSize: "0.85rem",
                      width: "100%",
                    }}
                  >
                    Get Directions
                  </a>
                </div>
              </article>
            </div>

            <div className="offers-note-wrapper" style={{ marginTop: "32px" }}>
              <div className="offers-note">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <span>
                  Need to adjust your time or service? Call us at +91 89716 76928.
                  We recommend arriving 5–10 minutes prior to your appointment
                  time.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Reused authentic Turn Style Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={closeBooking} />
    </>
  );
}
