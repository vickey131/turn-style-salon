"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeaderProps {
  onOpenBooking: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="top">
        <div className="w">
          <span>Premium Hair · Skin · Makeup · Nails · Grooming</span>
          <span>Koramangala, Bengaluru | 89716 76928</span>
        </div>
      </div>
      <header className={`nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="w">
          <Image
            className="logo"
            src="/images/img_3.png"
            alt="Turn Style Unisex Salon"
            width={245}
            height={68}
            priority
          />
          <nav className="links">
            <a href="#offers">Offers</a>
            <a href="#services">Services</a>
            <a href="#reviews">Reviews</a>
            <a href="#location">Location</a>
            <button className="btn book" onClick={onOpenBooking}>
              Book Appointment
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
