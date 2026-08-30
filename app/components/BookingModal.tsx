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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
            placeholder="Mobile number"
            pattern="[0-9+ -]{10,15}"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <button className="btn" style={{ width: "100%" }} type="submit">
            Request Appointment
          </button>

          {isSubmitted && (
            <div className="success">
              Thank you{name ? `, ${name}` : ""}! We have received your request for {date ? `${date}` : "your selected date"}{time ? ` at ${time}` : ""}. Our Koramangala team will contact you shortly.
            </div>
          )}
        </form>
        <div className="modalpic" />
      </div>
    </div>
  );
}
