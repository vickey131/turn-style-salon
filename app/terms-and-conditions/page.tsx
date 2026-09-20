import type { Metadata } from "next";
import { TermsAndConditions } from "../components/TermsAndConditions";

export const metadata: Metadata = {
  title: "Terms and Conditions | Turn Style Unisex Salon Koramangala",
  description:
    "Read the Terms and Conditions governing appointments, salon services, cancellations, and policies at Turn Style Unisex Salon, Koramangala, Bengaluru.",
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
