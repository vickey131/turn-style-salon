"use client";

import { useState, useEffect } from "react";
import { SALON_INFO } from "../data/salon-data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedDetails, setSubmittedDetails] = useState<{
    name: string;
    date: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      setIsRendered(true);
      // Small frame delay to ensure CSS transition triggers properly
      const animFrame = requestAnimationFrame(() => {
        setIsActive(true);
      });
      return () => cancelAnimationFrame(animFrame);
    } else {
      setIsActive(false);
      // Wait for exit transition (250ms) before unmounting
      timeoutId = setTimeout(() => {
        setIsRendered(false);
        setIsSubmitted(false);
        setErrorMessage(null);
      }, 260);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  const SCRIPT_URL =
    process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
    "https://script.google.com/macros/s/AKfycbzmCBb0VpkULES3r69S7Ult4JP6ttv_NnML_y9F6tMelWOr-lhGUFQ69QYenjsyTx9z/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate 10-digit mobile number
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage(
        "Please enter a valid 10-digit mobile number (numbers only)."
      );
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name,
      phone: cleanPhone,
      gender,
      service,
      date,
      time,
    };

    try {
      let ok = false;
      try {
        const res = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          ok = true;
        }
      } catch {
        ok = false;
      }

      // Fallback directly to Google Apps Script if internal API is not available
      if (!ok) {
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });
      }

      setSubmittedDetails({ name, date, time });
      setIsSubmitted(true);
      setName("");
      setPhone("");
      setGender("");
      setService("");
      setDate("");
      setTime("");
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMessage(
        "Could not submit appointment. Please try again or call us at +91 89716 76928."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current date string in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className={`modal ${isActive ? "open" : ""}`}
      id="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="box">
        <button
          className="close"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          ×
        </button>
        <form className="form" id="form" onSubmit={handleSubmit}>
          <div className="eye">Turn Style · Koramangala</div>
          <h2 id="modal-title">Book your appointment</h2>
          <p className="sub">
            Our Koramangala team will call to confirm your service and time.
          </p>

          <input
            className="field"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="field"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Mobile number (10 digits)"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
            required
            value={phone}
            onChange={(e) => {
              // Strip non-digit characters and limit to 10 digits
              const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhone(digitsOnly);
              if (errorMessage) setErrorMessage(null);
            }}
          />
          <div className="field-grid">
            <select
              className="field"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Unisex">Unisex / Other</option>
            </select>
            <select
              className="field"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Select a service</option>
              {SALON_INFO.servicesList.map((svc, idx) => (
                <option key={idx} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
          </div>
          <div className="field-grid">
            <input
              className="field"
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              title="Appointment Date"
            />
            <select
              className="field"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">Select Time</option>
              {TIME_SLOTS.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn"
            style={{
              width: "100%",
              opacity: isSubmitting ? 0.75 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking Appointment..." : "Request Appointment"}
          </button>

          {errorMessage && (
            <div
              style={{
                background: "#fde8e8",
                color: "#b3261e",
                padding: "12px",
                marginTop: "12px",
                fontSize: "0.9rem",
                borderRadius: "2px",
              }}
            >
              {errorMessage}
            </div>
          )}

          {isSubmitted && submittedDetails && (
            <div className="success">
              Thank you{submittedDetails.name ? `, ${submittedDetails.name}` : ""}! We have received your request for {submittedDetails.date ? `${submittedDetails.date}` : "your selected date"}{submittedDetails.time ? ` at ${submittedDetails.time}` : ""}. Our Koramangala team will contact you shortly.
            </div>
          )}
        </form>
        <div className="modalpic" />
      </div>
    </div>
  );
}
