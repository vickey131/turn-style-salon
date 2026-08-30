"use client";

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Offers } from "./components/Offers";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Reviews } from "./components/Reviews";
import { Location } from "./components/Location";
import { CtaBanner } from "./components/CtaBanner";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { useScrollReveal } from "./hooks/useScrollReveal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize IntersectionObserver scroll reveals
  useScrollReveal();

  const openBooking = () => {
    setIsModalOpen(true);
    document.body.classList.add("lock");
  };

  const closeBooking = () => {
    setIsModalOpen(false);
    document.body.classList.remove("lock");
  };

  // 3.5s auto-popup trigger matching original HTML behavior
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
      document.body.classList.add("lock");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header onOpenBooking={openBooking} />
      <main>
        <Hero onOpenBooking={openBooking} />
        <About onOpenBooking={openBooking} />
        <Offers />
        <Services onOpenBooking={openBooking} />
        <Gallery />
        <Reviews />
        <Location onOpenBooking={openBooking} />
        <CtaBanner onOpenBooking={openBooking} />
      </main>
      <Footer />
      <BookingModal isOpen={isModalOpen} onClose={closeBooking} />
    </>
  );
}
