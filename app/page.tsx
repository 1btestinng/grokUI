"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    setTimeout(() => router.push(`/card/${id}?m=${encoded}`), 280);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">note</div>
        <div className="tag">made to be shared</div>
      </header>
      <section className="hero">
        <div className="eyebrow">A little something</div>
        <h1>Say something worth keeping.</h1>
        <p className="sub">Write a message. Turn it into a beautiful card. Send it to someone.</p>
        <div className="card-wrap">
          <div className="editor">
            <textarea maxLength={600} value={message} onChange={(e) => { setMessage(e.target.value); setError(""); }} placeholder="Write your message here..." aria-label="Your message" autoFocus />
            <div className="editor-foot"><span>Private by default</span><span>{message.length} / 600</span></div>
          </div>
          <button className="cta" onClick={createCard} disabled={busy || !message.trim()}>
            {busy ? "Making your card…" : "Create Card"}{!busy && <span aria-hidden="true">→</span>}
          </button>
          {error && <div className="error" role="alert">{error}</div>}
        </div>
      </section>
      <footer className="footer">Small words. Beautifully sent.</footer>
    </main>
  );
}
