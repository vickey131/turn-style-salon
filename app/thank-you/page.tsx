import { Suspense } from "react";
import type { Metadata } from "next";
import { ThankYou } from "../components/ThankYou";

export const metadata: Metadata = {
  title: "Thank You | Turn Style Unisex Salon Koramangala",
  description:
    "Thank you for requesting an appointment with Turn Style Unisex Salon, Koramangala. Our team will contact you shortly to confirm your booking.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#fff7ed",
            fontFamily: "var(--font-dm-sans), sans-serif",
            color: "#3a1b0d",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "3px solid #ead7c2",
                borderTopColor: "#ed7309",
                borderRadius: "50%",
                margin: "0 auto 16px",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p style={{ fontWeight: 600, letterSpacing: "0.1em" }}>
              CONFIRMING YOUR APPOINTMENT...
            </p>
          </div>
        </div>
      }
    >
      <ThankYou />
    </Suspense>
  );
}
