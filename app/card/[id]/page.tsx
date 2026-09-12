"use client";

import { Check, Copy, Link2, Share2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CardPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    const encoded = searchParams.get("m");
    setMessage(encoded ? encoded : null);
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, [searchParams]);

  const url = typeof window !== "undefined" ? window.location.href : "";

  async function copyLink() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  async function shareCard() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "A note for you", text: message ?? "A little note for you.", url });
      } catch {
        // The native share sheet may simply be dismissed.
      }
      return;
    }
    await copyLink();
  }

  if (message === null) {
    return (
      <main className="shell">
        <header className="topbar">
          <Link href="/" className="brand-lockup" aria-label="Note home">
            <span className="mark" aria-hidden="true"><Link2 size={15} strokeWidth={1.7} /></span>
            <span className="brand">note</span>
          </Link>
        </header>
        <section className="hero" aria-labelledby="missing-title">
          <div className="eyebrow">Unavailable</div>
          <h1 id="missing-title">This card isn&apos;t available.</h1>
          <p className="sub">The link may be incorrect or the card may no longer exist.</p>
          <Link href="/" className="cta">
            <span>Make a card</span>
            <Share2 size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <header className="topbar">
        <Link href="/" className="brand-lockup" aria-label="Note home">
          <span className="mark" aria-hidden="true"><Link2 size={15} strokeWidth={1.7} /></span>
          <span className="brand">note</span>
        </Link>
        <span className="header-note">a note for you</span>
      </header>

      <section className="hero" aria-labelledby="card-title" style={{ paddingTop: "clamp(34px, 8vh, 72px)" }}>
        <div className="card-wrap">
          <article className="finished-card">
            <h1 id="card-title" className="sr-only">A note for you</h1>
            <p>{message}</p>
            <div className="signature">made with note</div>
          </article>

          <div className="share-panel" aria-label="Share this card">
            <div className="share-link" title={url}>{url}</div>
            <button className="share-button share-primary" onClick={shareCard}>
              <Share2 size={15} strokeWidth={1.8} aria-hidden="true" />
              <span>{canShare ? "Share Card" : "Copy Link"}</span>
            </button>
            <button className="share-button" onClick={copyLink}>
              {copied ? <Check size={15} strokeWidth={1.8} aria-hidden="true" /> : <Copy size={15} strokeWidth={1.8} aria-hidden="true" />}
              <span>{copied ? "Copied" : "Copy Link"}</span>
            </button>
            <a className="share-button" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share on X">X</a>
            <a className="share-button" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">Facebook</a>
          </div>

          <div className="note-caption">Send this little moment to someone.</div>
        </div>
      </section>

      <footer className="footer">
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Make your own card</Link>
      </footer>
    </main>
  );
}
