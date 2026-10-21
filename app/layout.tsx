import type { Metadata } from "next";
import { Inter, Pinyon_Script } from "next/font/google";
// import localFont from "next/font/local";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { brand } from "@/content/brand";
import { meta } from "@/content/home";
import "lenis/dist/lenis.css";
import "./globals.css";

// With the optical-size axis, display sizes get Inter's tighter Display cut on their own.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

// The script: Tempting (RGB Studio), an upright copperplate for a word or two at a time.
// It's only ever decorative and set large, so it blocks rather than swapping in
// a fallback serif (the hero's "Reality" would visibly jump).
// [ASSET] Tempting-Regular.woff2 isn't in the repo yet, so Pinyon Script stands in.
// Once it's in app/fonts/, swap the stand-in for the loader below, drop the
// Pinyon_Script import, and re-check --script-scale in styles/tokens.css.
const script = Pinyon_Script({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
  display: "block",
});
// const script = localFont({
//   src: "./fonts/Tempting-Regular.woff2",
//   variable: "--font-script",
//   display: "block",
// });

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.descriptor}`,
  description: meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${script.variable} antialiased`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
