import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { brand } from "@/content/brand";
import { hero } from "@/content/home";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// [SCAFFOLD] Provisional accent italic until the scaffold's typeface is wired in.
const accentItalic = Instrument_Serif({
  variable: "--font-accent-italic",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.descriptor}`,
  description: hero.statement,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${accentItalic.variable} antialiased`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
