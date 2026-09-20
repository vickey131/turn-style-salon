"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  onOpenBooking?: () => void;
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
          <Link href="/" aria-label="Turn Style Salon Home" style={{ display: "inline-block" }}>
            <Image
              className="logo"
              src="/images/img_3.png"
              alt="Turn Style Unisex Salon"
              width={245}
              height={68}
              priority
            />
          </Link>
          <nav className="links">
            <Link href="/#offers">Offers</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#reviews">Reviews</Link>
            <Link href="/#location">Location</Link>
            {onOpenBooking ? (
              <button className="btn book" onClick={onOpenBooking}>
                Book Appointment
              </button>
            ) : (
              <Link href="/#services" className="btn book">
                Explore Services
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
