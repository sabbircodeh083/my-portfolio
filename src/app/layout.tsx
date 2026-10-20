import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { personalInfo } from "@/lib/portfolio";
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
  title: `${personalInfo.fullName} — ${personalInfo.professionalTitles[0]}`,
  description: personalInfo.headline,
  authors: [{ name: personalInfo.fullName }],
  keywords: [
    personalInfo.fullName,
    personalInfo.displayName,
    ...personalInfo.professionalTitles,
  ],
  // Empty icon: keeps browsers from falling back to `/favicon.ico` (and from
  // showing a previously cached one) now that the site has no favicon.
  icons: { icon: "data:," },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
