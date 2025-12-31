import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';
import ScrollToTop from '@/components/ScrollToTop';
import CursorFollower from '@/components/CursorFollower';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Skylith - Innovative Services & Products",
  description: "Leading provider of innovative services and products. We deliver excellence through cutting-edge solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CursorFollower />
        <ScrollToTop />
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
