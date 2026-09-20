"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-Z\s]+$/;

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [gender, setGender] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  // Sync isRendered during render when isOpen prop transitions to true
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsRendered(true);
      // Ensure phone has default +91 if currently blank
      if (!phone.trim()) {
        setPhone("+91 ");
      }
    }
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let animFrame: number;

    if (isOpen) {
      // Frame delay to ensure CSS transition triggers properly
      animFrame = requestAnimationFrame(() => {
        setIsActive(true);
      });
      return () => cancelAnimationFrame(animFrame);
    } else {
      animFrame = requestAnimationFrame(() => {
        setIsActive(false);
      });
      // Wait for exit transition (250ms) before unmounting
      timeoutId = setTimeout(() => {
        setIsRendered(false);
        setErrorMessage(null);
        setFieldErrors({});
      }, 260);
      return () => {
        cancelAnimationFrame(animFrame);
        clearTimeout(timeoutId);
      };
    }
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

  // Validate mobile number format
  const validateMobile = (rawPhone: string) => {
    const trimmed = rawPhone.trim();
    if (!trimmed || trimmed === "+91" || trimmed === "+") {
      return { isValid: false, error: "Please enter your mobile number." };
    }

    const allDigits = trimmed.replace(/\D/g, "");

    // Case 1: Has +91 country code
    if (trimmed.startsWith("+91") || (trimmed.startsWith("91") && allDigits.length === 12)) {
      const subscriber = allDigits.startsWith("91") ? allDigits.slice(2) : allDigits;
      if (subscriber.length === 0) {
        return { isValid: false, error: "Please enter your 10-digit mobile number." };
      }
      if (subscriber.length < 10) {
        return {
          isValid: false,
          error: `Incomplete mobile number (${subscriber.length}/10 digits entered).`,
        };
      }
      if (subscriber.length > 10) {
        return { isValid: false, error: "Mobile number should be 10 digits." };
      }
      if (!/^[6-9]/.test(subscriber)) {
        return {
          isValid: false,
          error: "Indian mobile numbers must start with 6, 7, 8, or 9.",
        };
      }
      return { isValid: true, cleanPhone: subscriber, formatted: `+91 ${subscriber}` };
    }

    // Case 2: Starts with 0 (11 digits: e.g., 09876543210)
    if (allDigits.length === 11 && allDigits.startsWith("0")) {
      const subscriber = allDigits.slice(1);
      if (!/^[6-9]/.test(subscriber)) {
        return {
          isValid: false,
          error: "Indian mobile numbers must start with 6, 7, 8, or 9.",
        };
      }
      return { isValid: true, cleanPhone: subscriber, formatted: `+91 ${subscriber}` };
    }

    // Case 3: 10-digit standard Indian number without prefix
    if (allDigits.length === 10) {
      if (!/^[6-9]/.test(allDigits)) {
        return {
          isValid: false,
          error: "Indian mobile numbers must start with 6, 7, 8, or 9.",
        };
      }
      return { isValid: true, cleanPhone: allDigits, formatted: `+91 ${allDigits}` };
    }

    // Case 4: International number starting with '+'
    if (trimmed.startsWith("+")) {
      if (allDigits.length >= 7 && allDigits.length <= 15) {
        return { isValid: true, cleanPhone: allDigits, formatted: trimmed };
      }
      return {
        isValid: false,
        error: "Please enter a valid international mobile number (7-15 digits).",
      };
    }

    if (allDigits.length < 10) {
      return {
        isValid: false,
        error: `Please enter a valid 10-digit mobile number (${allDigits.length}/10 digits entered).`,
      };
    }

    return {
      isValid: false,
      error: "Please enter a valid 10-digit mobile number (numbers only).",
    };
  };

  // Name handlers: block digits, filter on change, validate on blur
  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      setFieldErrors((prev) => ({
        ...prev,
        name: "Name should have only alphabets and no numeric characters",
      }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/[0-9]/.test(val)) {
      setFieldErrors((prev) => ({
        ...prev,
        name: "Name should have only alphabets and no numeric characters",
      }));
      setName(val.replace(/[0-9]/g, ""));
      return;
    }

    setName(val);
    if (val && !/^[a-zA-Z\s]*$/.test(val)) {
      setFieldErrors((prev) => ({
        ...prev,
        name: "Name should only contain alphabets and spaces",
      }));
    } else if (fieldErrors.name) {
      setFieldErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleNameBlur = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setFieldErrors((prev) => ({ ...prev, name: "Please enter your name" }));
    } else if (/[0-9]/.test(name)) {
      setFieldErrors((prev) => ({
        ...prev,
        name: "Name should have only alphabets and no numeric characters",
      }));
    } else if (!NAME_REGEX.test(trimmed)) {
      setFieldErrors((prev) => ({
        ...prev,
        name: "Name should only contain alphabets and spaces",
      }));
    } else if (trimmed.length < 2) {
      setFieldErrors((prev) => ({
        ...prev,
        name: "Name must be at least 2 characters long",
      }));
    } else {
      setFieldErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  // Email handlers
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (fieldErrors.email) {
      if (!val.trim() || EMAIL_REGEX.test(val.trim())) {
        setFieldErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleEmailBlur = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setFieldErrors((prev) => ({ ...prev, email: "Please enter your email address" }));
    } else if (!EMAIL_REGEX.test(trimmed)) {
      setFieldErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address (e.g. name@example.com)",
      }));
    } else {
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // Phone handlers: allow clearing, sanitize input chars, validate format on blur
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow digits, +, spaces, hyphens, and parentheses
    const filtered = val.replace(/[^0-9+\s\-()]/g, "");
    setPhone(filtered);
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handlePhoneBlur = () => {
    const res = validateMobile(phone);
    if (!res.isValid) {
      setFieldErrors((prev) => ({ ...prev, phone: res.error }));
    } else {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const errors: { name?: string; email?: string; phone?: string } = {};

    // 1. Name validation
    const trimmedName = name.trim();
    if (!trimmedName) {
      errors.name = "Please enter your name";
    } else if (/[0-9]/.test(name)) {
      errors.name = "Name should have only alphabets and no numeric characters";
    } else if (!NAME_REGEX.test(trimmedName)) {
      errors.name = "Name should only contain alphabets and spaces";
    } else if (trimmedName.length < 2) {
      errors.name = "Name must be at least 2 characters long";
    }

    // 2. Email validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = "Please enter your email address";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address (e.g. name@example.com)";
    }

    // 3. Mobile phone validation
    const phoneRes = validateMobile(phone);
    if (!phoneRes.isValid) {
      errors.phone = phoneRes.error;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please correct the highlighted errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: phoneRes.formatted || phone.trim(),
      cleanPhone: phoneRes.cleanPhone || phone.replace(/\D/g, ""),
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

      // Reset form state with default +91 for mobile
      setName("");
      setEmail("");
      setPhone("+91 ");
      setGender("");
      setService("");
      setDate("");
      setTime("");
      setFieldErrors({});

      // Remove body scroll lock & close modal
      document.body.classList.remove("lock");
      onClose();

      // Redirect to dedicated conversion thank-you page
      const queryParams = new URLSearchParams({
        name: payload.name,
        service: payload.service,
        date: payload.date,
        time: payload.time,
      });
      router.push(`/thank-you?${queryParams.toString()}`);
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
        <form className="form" id="form" onSubmit={handleSubmit} noValidate>
          <div className="eye">Turn Style · Koramangala</div>
          <h2 id="modal-title">Book your appointment</h2>
          <p className="sub">
            Our Koramangala team will call to confirm your service and time.
          </p>

          <div className="field-group">
            <input
              className={`field ${fieldErrors.name ? "invalid" : ""}`}
              placeholder="Your name"
              required
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleNameKeyDown}
              onBlur={handleNameBlur}
              autoComplete="name"
            />
            {fieldErrors.name && (
              <span className="field-error">{fieldErrors.name}</span>
            )}
          </div>

          <div className="field-group">
            <input
              className={`field ${fieldErrors.email ? "invalid" : ""}`}
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              autoComplete="email"
            />
            {fieldErrors.email && (
              <span className="field-error">{fieldErrors.email}</span>
            )}
          </div>

          <div className="field-group">
            <input
              className={`field ${fieldErrors.phone ? "invalid" : ""}`}
              type="tel"
              inputMode="tel"
              placeholder="Mobile number (+91 98765 43210)"
              required
              value={phone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              autoComplete="tel"
            />
            {fieldErrors.phone && (
              <span className="field-error">{fieldErrors.phone}</span>
            )}
          </div>

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
        </form>
        <div className="modalpic" />
      </div>
    </div>
  );
}
