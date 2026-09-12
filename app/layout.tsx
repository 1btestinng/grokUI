import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A note worth keeping",
  description: "Turn a few words into a beautiful card and send it to someone.",
  metadataBase: new URL("https://grok-ui.vercel.app"),
  openGraph: {
    title: "A note worth keeping",
    description: "A small message, made beautiful.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A note worth keeping",
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
