import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anishyenduri.dev"),
  title: "Anish Yenduri — AI Product Engineer",
  description:
    "Anish Yenduri (Ani) — full-stack generalist who ships product and integrates ML systems. Rutgers CS, Honors College.",
  openGraph: {
    title: "Anish Yenduri — AI Product Engineer",
    description:
      "Full-stack generalist who ships product and integrates ML systems.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Anish Yenduri — AI Product Engineer",
    description:
      "Full-stack generalist who ships product and integrates ML systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
