"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function CardPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    const encoded = searchParams.get("m");
    const stored = sessionStorage.getItem(`card:${params.id}`);
    setMessage(encoded ? encoded : stored);
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, [params.id, searchParams]);

  const url = typeof window !== "undefined" ? window.location.href : "";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title: "A note for you", text: message ?? "A little note for you.", url }); } catch {}
    } else {
      await copyLink();
    }
  }

  if (message === null) return (
    <main className="shell">
      <header className="topbar"><Link href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>note</Link></header>
      <section className="hero"><div className="eyebrow">Oops</div><h1>This card couldn’t be found.</h1><p className="sub">The link may be incomplete or no longer available.</p><Link href="/" className="cta" style={{ textDecoration: "none" }}>Create your own <span>→</span></Link></section>
    </main>
  );

  return (
    <main className="shell">
      <header className="topbar"><Link href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>note</Link><div className="tag">a note for you</div></header>
      <section className="hero" style={{ paddingTop: "clamp(40px, 8vh, 85px)" }}>
        <div className="card-wrap">
          <article className="finished-card"><p>{message}</p><div className="signature">made with note</div></article>
          <div className="share-panel">
            <button className="share-button copy-button" onClick={share}>{canShare ? "Share Card" : copied ? "Copied" : "Copy Link"}</button>
            <button className="share-button" onClick={copyLink}>{copied ? "Copied" : "Copy link"}</button>
            <a className="share-button" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">X</a>
            <a className="share-button" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">Facebook</a>
          </div>
          <div className="note">Send this little moment to someone.</div>
        </div>
      </section>
      <footer className="footer"><Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Make your own card</Link></footer>
    </main>
  );
}
