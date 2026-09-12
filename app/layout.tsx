import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://grok-ui-a1-5dae.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "note — say something worth keeping",
  description: "Write a few words. Turn them into a beautiful card. Send it to someone.",
  openGraph: {
    title: "note — say something worth keeping",
    description: "A small message, made beautiful.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "note — say something worth keeping",
    description: "A small message, made beautiful.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
