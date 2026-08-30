import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://turnstylesalon.in"),
  title: "Turn Style Salon Koramangala | Bengaluru",
  description:
    "Premium hair, skin, makeup, nail and grooming services at Turn Style Unisex Salon, Koramangala.",
  keywords: [
    "Turn Style Salon",
    "Salon Koramangala",
    "Unisex Salon Bangalore",
    "Hair Salon Koramangala",
    "Balayage Bengaluru",
    "Facial Koramangala",
    "Men Grooming Koramangala",
  ],
  openGraph: {
    title: "Turn Style Salon Koramangala | Bengaluru",
    description:
      "Premium hair, beauty and grooming experiences for women and men in Koramangala.",
    images: ["/images/img_4.webp"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfairDisplay.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${dmSans.className}`}>{children}</body>
    </html>
  );
}
