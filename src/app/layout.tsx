import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://personal-portfolio-neon-tau-16.vercel.app"),
  title: "Anish Yenduri — Software Engineer",
  description:
    "Anish Yenduri. Product and AI engineering. CS at Rutgers, with SWE internships at IBM and PNNL.",
  openGraph: {
    title: "Anish Yenduri — Software Engineer",
    description:
      "Full-stack generalist who ships product and integrates ML systems.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Anish Yenduri — Software Engineer",
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
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
