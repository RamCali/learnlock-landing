import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnLock - Transform Screen Time into Learning Time",
  description: "LearnLock is an educational browser that transforms your child's screen time into learning time with integrated math and vocabulary questions.",
  keywords: ["parental control", "educational app", "screen time", "kids learning", "math questions", "vocabulary"],
  authors: [{ name: "LearnLock" }],
  openGraph: {
    title: "LearnLock - Transform Screen Time into Learning Time",
    description: "Turn passive screen time into active learning moments. Kids answer math and vocabulary questions to unlock browsing time.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
