import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://personal-portfolio-neon-tau-16.vercel.app"),
  title: "Anish Yenduri | Software Engineer",
  description:
    "Anish Yenduri. Infrastructure, backend, and cloud engineering. CS at Rutgers, with SWE internships at IBM and PNNL.",
  openGraph: {
    title: "Anish Yenduri | Software Engineer",
    description:
      "Infrastructure, backend, and cloud engineering. CS at Rutgers, with SWE internships at IBM and PNNL.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Anish Yenduri | Software Engineer",
    description:
      "Infrastructure, backend, and cloud engineering. CS at Rutgers, with SWE internships at IBM and PNNL.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} ${fraunces.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
