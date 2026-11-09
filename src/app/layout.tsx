import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { CustomCursor } from "@/components/ui/CustomCursor";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://naimur.dev"),
  title: `${siteConfig.developer.name} | ${siteConfig.developer.role}`,
  description: `${siteConfig.developer.name} is a ${siteConfig.developer.role} specializing in Next.js, React, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, and Better Auth. Creator of Bazar Dor and Fit Log.`,
  keywords: [
    "Naimur",
    "Full-Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Better Auth",
    "Bazar Dor",
    "Fit Log",
    "Bangladesh Web Developer",
    "Frontend Motion Design",
  ],
  authors: [{ name: siteConfig.developer.name }],
  creator: siteConfig.developer.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://naimur.dev",
    title: `${siteConfig.developer.name} — ${siteConfig.developer.role}`,
    description: siteConfig.developer.subheadline,
    siteName: `${siteConfig.developer.name} Portfolio`,
    images: [
      {
        url: "/images/profile.jpeg",
        width: 800,
        height: 800,
        alt: `${siteConfig.developer.name} - ${siteConfig.developer.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.developer.name} — ${siteConfig.developer.role}`,
    description: siteConfig.developer.subheadline,
    images: ["/images/profile.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#0B0D12] text-[#F8FAFC] antialiased selection:bg-[#00F2FF] selection:text-[#0B0D12] relative overflow-x-hidden flex flex-col font-sans">
        <ScrollProgressBar />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
