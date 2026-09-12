"use client";

import { ArrowUpRight, Copy, PenLine, Share2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MAX_LENGTH = 600;

export default function Home() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function createCard() {
    const trimmed = message.trim();
    if (!trimmed) {
      setError("Write a message first.");
      return;
    }

    setBusy(true);
    setError("");
    const id = crypto.randomUUID().replaceAll("-", "").slice(0, 12);
    const encoded = encodeURIComponent(trimmed);
    window.setTimeout(() => router.push(`/card/${id}?m=${encoded}`), 220);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand-lockup" href="/" aria-label="Note home">
          <span className="mark" aria-hidden="true"><PenLine size={16} strokeWidth={1.7} /></span>
          <span className="brand">note</span>
        </a>
        <span className="header-note">private correspondence</span>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="eyebrow">A little something</div>
        <h1 id="page-title">Say something worth keeping.</h1>
        <p className="sub">Write a few words. We&apos;ll turn them into a card worth sending.</p>

        <div className="card-wrap">
          <div className={`editor ${message ? "has-content" : ""}`}>
            <label className="sr-only" htmlFor="message">Your message</label>
            <textarea
              id="message"
              maxLength={MAX_LENGTH}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                setError("");
              }}
              placeholder="Write your message..."
              autoFocus
            />
            <div className="editor-foot">
              <span>Up to {MAX_LENGTH} characters</span>
              <span className={message.length === MAX_LENGTH ? "counter-limit" : "counter"} aria-live="polite">
                {message.length} / {MAX_LENGTH}
              </span>
            </div>
          </div>

          <button className="cta" onClick={createCard} disabled={busy || !message.trim()}>
            <span>{busy ? "Making your card…" : "Create Card"}</span>
            {!busy && <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />}
          </button>

          {error && <div className="error" role="alert">{error}</div>}
        </div>
      </section>

      <footer className="footer">
        <span>Small words. Beautifully sent.</span>
      </footer>
    </main>
  );
}
