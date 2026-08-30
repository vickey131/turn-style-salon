"use client";

import { useEffect } from "react";

/**
 * Lightweight scroll reveal hook using native IntersectionObserver.
 * Observes elements with `.reveal-on-scroll` and `.stagger-children`.
 * Triggers animation once when elements enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Respect reduced motion preference
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document
        .querySelectorAll(".reveal-on-scroll, .stagger-children")
        .forEach((el) => {
          el.classList.add("is-revealed");
        });
      return;
    }

    const elements = document.querySelectorAll(
      ".reveal-on-scroll, .stagger-children"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
