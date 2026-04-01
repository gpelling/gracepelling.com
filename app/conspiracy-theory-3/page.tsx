"use client";

import { useState, useEffect, useCallback } from "react";
import { slides } from "./slides";
import type { Slide } from "./slides";

/* ── tokens ─────────────────────────────────────────────────────────────── */
const BLUE      = "#003087";
const BLUE_MID  = "#0055B3";
const RED       = "#CC0000";
const BG        = "#F0EEE8";
const PANEL     = "#E8E6E0";
const BORDER    = "#D4D0C8";
const TEXT      = "#1C1C1C";
const MUTED     = "#88887E";

const SANS = "'Inter', system-ui, -apple-system, Helvetica, Arial, sans-serif";
const MONO = "'Space Mono', 'Courier New', monospace";

/* ── shared ─────────────────────────────────────────────────────────────── */
function FallbackImage({ src, alt, fallbackEmoji, fallbackLabel, imgStyle }: {
  src?: string; alt?: string; fallbackEmoji?: string; fallbackLabel?: string;
  imgStyle?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: PANEL, color: MUTED, fontSize: 12, letterSpacing: 2, gap: 10, textAlign: "center", whiteSpace: "pre-line", fontFamily: MONO }}>
        <span style={{ fontSize: 40, opacity: 0.3 }}>{fallbackEmoji}</span>
        {fallbackLabel}
      </div>
    );
  }
  return <img src={src} alt={alt} style={imgStyle} referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/* ── slide components ───────────────────────────────────────────────────── */
function TitleSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: BG }}>
      <div style={{ height: 8, background: BLUE, flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px clamp(40px, 10vw, 120px)", gap: 24, textAlign: "center" }}>
        <div style={{ fontFamily: MONO, fontSize: "clamp(12px, 1.3vw, 14px)", color: MUTED, letterSpacing: 4, textTransform: "uppercase" }}>
          {slide.logoText}
        </div>
        <h1 style={{ fontFamily: SANS, fontWeight: 900, fontSize: "clamp(48px, 10vw, 116px)", color: BLUE, letterSpacing: -3, lineHeight: 0.95, margin: 0, whiteSpace: "pre-line" }}>
          {slide.headline}
        </h1>
        <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: "clamp(18px, 2.4vw, 26px)", color: TEXT }}>
          {slide.subtitle}
        </div>
        <div style={{ border: `2px solid ${RED}`, padding: "10px 32px", color: RED, fontFamily: MONO, fontSize: "clamp(12px, 1.3vw, 14px)", letterSpacing: 4, transform: "rotate(-1.5deg)", marginTop: 4 }}>
          {slide.classifiedText}
        </div>
        <div style={{ fontFamily: MONO, fontSize: "clamp(12px, 1.3vw, 14px)", color: MUTED, letterSpacing: 1, marginTop: 12, whiteSpace: "pre-line", lineHeight: 1.9 }}>
          {slide.tagline}
        </div>
      </div>
      <div style={{ height: 4, background: BLUE, flexShrink: 0 }} />
    </div>
  );
}

function IntroSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: BG, padding: "60px clamp(40px, 12vw, 160px)" }}>
      <div style={{ width: "100%", maxWidth: 720, marginBottom: 32, borderBottom: `2px solid ${BLUE}`, paddingBottom: 16 }}>
        <div style={{ fontFamily: MONO, fontSize: 12, color: MUTED, letterSpacing: 3, marginBottom: 10 }}>{slide.docId}</div>
        <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(28px, 4.5vw, 54px)", color: BLUE, margin: 0, letterSpacing: -1 }}>{slide.headline}</h2>
      </div>
      <div style={{ maxWidth: 720, width: "100%" }}>
        {slide.paragraphs?.map((p, i) => (
          <p key={i} style={{ fontFamily: SANS, fontSize: "clamp(20px, 2.8vw, 32px)", lineHeight: 1.75, color: TEXT, marginBottom: 24, whiteSpace: "pre-line" }}><RichText text={p} /></p>
        ))}
      </div>
      {slide.noteText && (
        <div style={{ maxWidth: 720, width: "100%", marginTop: 8, borderLeft: `3px solid ${BLUE}`, paddingLeft: 20, fontFamily: MONO, fontSize: "clamp(13px, 1.4vw, 15px)", color: MUTED, lineHeight: 1.85, whiteSpace: "pre-line" }}>
          {slide.noteText && <RichText text={slide.noteText} />}
        </div>
      )}
    </div>
  );
}

function SectionSlide({ slide }: { slide: Slide }) {
  const match = slide.fileNumber?.match(/(\d+)/);
  const num = match ? match[1].padStart(3, "0") : "000";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: BG, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", fontFamily: SANS, fontWeight: 900, fontSize: "38vw", color: `rgba(0,48,135,0.05)`, top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", letterSpacing: -20, lineHeight: 1, userSelect: "none" }}>
        {num}
      </div>
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "40px 80px", maxWidth: 860 }}>
        <div style={{ fontFamily: MONO, fontSize: 13, color: MUTED, letterSpacing: 3, marginBottom: 20 }}>{slide.fileNumber}</div>
        <div style={{ height: 1, background: BLUE, marginBottom: 28, opacity: 0.25 }} />
        <h2 style={{ fontFamily: SANS, fontWeight: 900, fontSize: "clamp(40px, 8vw, 88px)", color: BLUE, letterSpacing: -2, lineHeight: 1, margin: "0 0 28px 0", whiteSpace: "pre-line" }}>{slide.headline}</h2>
        <div style={{ height: 1, background: BLUE, marginBottom: 24, opacity: 0.25 }} />
        <div style={{ fontFamily: MONO, fontSize: "clamp(13px, 1.5vw, 15px)", color: MUTED, letterSpacing: 1, marginBottom: 24, lineHeight: 1.7 }}>{slide.aliases}</div>
        <div style={{ display: "inline-block", border: `1.5px solid ${RED}`, padding: "5px 18px", fontFamily: MONO, fontSize: 13, color: RED, letterSpacing: 3 }}>{slide.evidenceTag}</div>
      </div>
    </div>
  );
}

function EvidenceSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", overflow: "hidden", background: BG }}>
      {/* Header */}
      <div style={{ borderBottom: `2px solid ${BLUE}`, padding: "14px 60px", display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
        <span style={{ fontFamily: MONO, color: MUTED, fontSize: 12, letterSpacing: 3, flexShrink: 0 }}>{slide.caseId}</span>
        <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(18px, 2.4vw, 30px)", color: BLUE, letterSpacing: -0.3, flex: 1, textAlign: "center", margin: 0 }}>{slide.slideTitle}</h2>
        <span style={{ fontFamily: MONO, color: RED, fontSize: 12, letterSpacing: 2, flexShrink: 0 }}>{slide.statusLabel}</span>
      </div>
      {/* Content */}
      <div style={{ flex: 1, padding: "32px 80px 28px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(24px, 3.2vw, 44px)", color: BLUE, letterSpacing: -0.5, paddingBottom: 20, borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
          {slide.subjectName}
        </div>
        <ul style={{ listStyle: "none", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", margin: 0, padding: 0 }}>
          {slide.evidenceItems?.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: 20, fontSize: "clamp(18px, 2.2vw, 26px)", lineHeight: 1.6, color: TEXT, fontFamily: SANS }}>
              <span style={{ color: BLUE_MID, flexShrink: 0, fontWeight: 700, paddingTop: 2 }}>→</span>
              <span><RichText text={item} /></span>
            </li>
          ))}
        </ul>
        {slide.verdictText && (
          <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${BLUE}`, padding: "14px 20px", fontSize: "clamp(14px, 1.6vw, 17px)", color: TEXT, fontFamily: SANS, lineHeight: 1.6, flexShrink: 0 }}>
            <strong style={{ fontFamily: MONO, color: BLUE, display: "block", fontSize: 11, letterSpacing: 3, marginBottom: 6 }}>{slide.verdictLabel}</strong>
            <span><RichText text={slide.verdictText} /></span>
          </div>
        )}
      </div>
    </div>
  );
}

function TheorySlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: BG, padding: "50px 60px" }}>
      <h2 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(22px, 3vw, 40px)", color: BLUE, letterSpacing: -0.5, marginBottom: 32, textAlign: "center", borderBottom: `2px solid ${BLUE}`, paddingBottom: 16, width: "100%", maxWidth: 900 }}>
        {slide.headline}
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 900, width: "100%" }}>
        {slide.theoryItems?.map((item) => (
          <div key={item.num} style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${BLUE}`, padding: "20px 24px", background: PANEL }}>
            <div style={{ fontFamily: MONO, fontSize: 12, color: MUTED, letterSpacing: 3, marginBottom: 8 }}>{item.num}</div>
            <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: "clamp(18px, 2.4vw, 26px)", color: BLUE, letterSpacing: -0.3, margin: "0 0 10px 0" }}>{item.title}</h3>
            <p style={{ fontFamily: SANS, fontSize: "clamp(15px, 1.8vw, 20px)", color: TEXT, lineHeight: 1.7, margin: 0 }}><RichText text={item.body} /></p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: BLUE, padding: "60px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", fontFamily: SANS, fontWeight: 900, fontSize: "50vw", color: "rgba(255,255,255,0.04)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>?</div>
      <h2 style={{ fontFamily: SANS, fontWeight: 900, fontSize: "clamp(36px, 7vw, 80px)", color: "#FFFFFF", letterSpacing: -2, lineHeight: 1.05, whiteSpace: "pre-line", marginBottom: 32, position: "relative", zIndex: 1 }}>
        {slide.headline}
      </h2>
      {slide.questionBody?.map((p, i) => (
        <p key={i} style={{ fontFamily: SANS, fontSize: "clamp(20px, 2.6vw, 30px)", color: "rgba(255,255,255,0.82)", lineHeight: 1.75, maxWidth: 720, margin: "0 auto 24px", whiteSpace: "pre-line", position: "relative", zIndex: 1 }}><RichText text={p} /></p>
      ))}
      <div style={{ fontFamily: MONO, fontSize: 13, color: "rgba(255,255,255,0.38)", letterSpacing: 3, marginTop: 16, position: "relative", zIndex: 1 }}>{slide.questionSub}</div>
    </div>
  );
}

function EndSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", background: BG, textAlign: "center", padding: "60px 80px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: BLUE }} />
      <h2 style={{ fontFamily: SANS, fontWeight: 900, fontSize: "clamp(40px, 8vw, 90px)", color: BLUE, letterSpacing: -2, lineHeight: 1, marginBottom: 12, whiteSpace: "pre-line" }}>
        {slide.headline}
      </h2>
      <div style={{ fontFamily: MONO, fontSize: "clamp(13px, 1.6vw, 17px)", color: MUTED, letterSpacing: 1, marginBottom: 36 }}>
        {slide.endTagline}
      </div>
      <div style={{ maxWidth: 560, fontFamily: SANS, color: TEXT, fontSize: "clamp(14px, 1.5vw, 16px)", lineHeight: 1.95, margin: "0 auto 32px", whiteSpace: "pre-line", textAlign: "left" }}>
        {slide.endBody}
      </div>
      <div style={{ width: 48, height: 2, background: BLUE, marginBottom: 20, opacity: 0.4 }} />
      <div style={{ fontFamily: MONO, fontSize: 12, color: MUTED, letterSpacing: 3 }}>{slide.endClosing}</div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: BLUE }} />
    </div>
  );
}

function SlideRenderer({ slide }: { slide: Slide }) {
  switch (slide.variant) {
    case "title":    return <TitleSlide slide={slide} />;
    case "intro":    return <IntroSlide slide={slide} />;
    case "section":  return <SectionSlide slide={slide} />;
    case "evidence": return <EvidenceSlide slide={slide} />;
    case "theory":   return <TheorySlide slide={slide} />;
    case "question": return <QuestionSlide slide={slide} />;
    case "end":      return <EndSlide slide={slide} />;
    default:         return null;
  }
}

/* ── page ───────────────────────────────────────────────────────────────── */
export default function ConspiracyTheory3Page() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")                    { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => { const dx = e.changedTouches[0].clientX - startX; if (Math.abs(dx) > 50) dx < 0 ? next() : prev(); };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend",   onEnd);
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [next, prev]);

  const pct = (current / (total - 1)) * 100;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Space+Mono:wght@400;700&display=swap');
        @keyframes pulseStamp {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}} />
      <div style={{ position: "fixed", inset: 0, background: BG, overflow: "hidden", cursor: "default" }}>
        {/* Progress bar */}
        <div style={{ position: "fixed", top: 0, left: 0, height: 3, background: BLUE, width: `${pct}%`, transition: "width 0.4s ease", zIndex: 501 }} />
        {/* File stamp */}
        <div style={{ position: "fixed", top: 16, right: 20, fontFamily: MONO, fontSize: 10, color: MUTED, letterSpacing: 2, zIndex: 502 }}>
          CERN FILE // EYES ONLY // Ω-2008-LHC
        </div>
        {/* Slide */}
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <SlideRenderer slide={slides[current]} />
        </div>
      </div>
    </>
  );
}
