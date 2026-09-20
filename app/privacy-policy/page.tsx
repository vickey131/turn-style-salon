import type { Metadata } from "next";
import { PrivacyPolicy } from "../components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy | Turn Style Unisex Salon Koramangala",
  description:
    "Learn how Turn Style Unisex Salon collects, uses, protects, and handles personal data, appointment details, and health disclosure information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
