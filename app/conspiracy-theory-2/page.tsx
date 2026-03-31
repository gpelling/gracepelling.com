"use client";

import { useState, useEffect, useCallback } from "react";
import { slides } from "./slides";
import type { Slide, Member } from "./slides";

/* ── tokens ─────────────────────────────────────────────────────────────── */
const GREEN      = "#00ff41";
const DIM_GREEN  = "#00aa2a";
const DARK_GREEN = "#003a10";
const RED        = "#ff2020";
const AMBER      = "#ffb000";
const BG         = "#050a05";
const PANEL      = "#0a120a";
const BORDER     = "#1a2e1a";
const TEXT       = "#c8e6c9";
const MUTED      = "#4a6a4a";

/* ── shared ─────────────────────────────────────────────────────────────── */
function GridBg() {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)`,
      backgroundSize: "50px 50px",
    }} />
  );
}

function FallbackImage({ src, alt, fallbackEmoji, fallbackLabel, imgStyle }: {
  src?: string; alt?: string; fallbackEmoji?: string; fallbackLabel?: string;
  imgStyle?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#080f08", color: MUTED, fontSize: 12, letterSpacing: 2, gap: 10, textAlign: "center", whiteSpace: "pre-line" }}>
        <span style={{ fontSize: 48, opacity: 0.3 }}>{fallbackEmoji}</span>
        {fallbackLabel}
      </div>
    );
  }
  return <img src={src} alt={alt} style={imgStyle} referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}

/* ── slide components ───────────────────────────────────────────────────── */
function TitleSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, position: "relative", textAlign: "center", padding: 40 }}>
      <GridBg />
      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(14px, 2vw, 24px)", letterSpacing: 6, color: MUTED, textTransform: "uppercase", position: "relative", zIndex: 1 }}>
        {slide.logoText}
      </div>
      <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(40px, 9vw, 100px)", color: GREEN, letterSpacing: 4, textAlign: "center", textShadow: `0 0 40px rgba(0,255,65,0.5), 0 0 80px rgba(0,255,65,0.2)`, lineHeight: 1, marginBottom: 8, position: "relative", zIndex: 1, whiteSpace: "pre-line" }}>
        {slide.headline}
      </div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(14px, 2.5vw, 22px)", color: AMBER, letterSpacing: 3, textAlign: "center", position: "relative", zIndex: 1 }}>
        {slide.subtitle}
      </div>
      <div style={{ border: `2px solid ${RED}`, padding: "12px 40px", color: RED, fontSize: "clamp(10px, 1.5vw, 14px)", letterSpacing: 6, textTransform: "uppercase", animation: "pulseRed 2s infinite", position: "relative", zIndex: 1 }}>
        {slide.classifiedText}
      </div>
      <div style={{ marginTop: 16, fontSize: "clamp(11px, 1.5vw, 14px)", color: MUTED, letterSpacing: 2, textAlign: "center", position: "relative", zIndex: 1, whiteSpace: "pre-line" }}>
        {slide.tagline}
      </div>
    </div>
  );
}

function IntroSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "60px clamp(20px, 10vw, 120px)", textAlign: "center" }}>
      <div style={{ border: `1px solid ${BORDER}`, padding: "16px 30px", marginBottom: 30, background: PANEL }}>
        <div style={{ color: MUTED, fontSize: 10, letterSpacing: 4, marginBottom: 6 }}>{slide.docId}</div>
        <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(20px, 3.5vw, 40px)", color: GREEN, letterSpacing: 2, textShadow: `0 0 20px rgba(0,255,65,0.3)`, margin: 0 }}>{slide.headline}</h2>
      </div>
      {slide.paragraphs?.map((p, i) => (
        <p key={i} style={{ fontSize: "clamp(13px, 1.8vw, 17px)", lineHeight: 1.9, color: TEXT, marginBottom: 20, whiteSpace: "pre-line" }}>{p}</p>
      ))}
      {slide.noteText && (
        <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${DIM_GREEN}`, padding: "14px 20px", fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(11px, 1.4vw, 13px)", color: MUTED, lineHeight: 1.7, textAlign: "left", letterSpacing: 1, maxWidth: 700, width: "100%", marginTop: 20, whiteSpace: "pre-line" }}>
          {slide.noteText}
        </div>
      )}
    </div>
  );
}

function SectionSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 30, left: 30, width: 60, height: 60, borderTop: `2px solid ${DIM_GREEN}`, borderLeft: `2px solid ${DIM_GREEN}` }} />
      <div style={{ position: "absolute", bottom: 30, right: 30, width: 60, height: 60, borderBottom: `2px solid ${DIM_GREEN}`, borderRight: `2px solid ${DIM_GREEN}` }} />
      <div style={{ fontSize: 11, color: MUTED, letterSpacing: 4, marginBottom: 16 }}>{slide.fileNumber}</div>
      <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(36px, 7vw, 80px)", color: GREEN, textAlign: "center", letterSpacing: 2, textShadow: `0 0 30px rgba(0,255,65,0.4)`, lineHeight: 1.1, marginBottom: 16, whiteSpace: "pre-line" }}>{slide.headline}</h2>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", color: AMBER, fontSize: "clamp(13px, 2vw, 18px)", letterSpacing: 3, textAlign: "center", marginBottom: 24 }}>{slide.aliases}</div>
      <div style={{ background: DARK_GREEN, border: `1px solid ${DIM_GREEN}`, padding: "6px 16px", fontSize: 11, color: DIM_GREEN, letterSpacing: 3, textTransform: "uppercase" }}>{slide.evidenceTag}</div>
    </div>
  );
}

function EvidenceSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto 1fr", height: "100%", width: "100%", overflow: "hidden" }}>
      <div style={{ gridColumn: "1 / -1", background: PANEL, borderBottom: `1px solid ${BORDER}`, padding: "16px 40px", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: MUTED, fontSize: 11, letterSpacing: 3, flexShrink: 0 }}>{slide.caseId}</span>
        <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(16px, 2.5vw, 30px)", color: GREEN, letterSpacing: 2, flex: 1, textAlign: "center", textShadow: `0 0 20px rgba(0,255,65,0.4)`, margin: 0 }}>{slide.slideTitle}</h2>
        <span style={{ color: RED, fontSize: 11, letterSpacing: 2, animation: "blinkAnim 1.5s infinite", flexShrink: 0 }}>{slide.statusLabel}</span>
      </div>
      <div style={{ background: "#000", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderRight: `1px solid ${BORDER}`, overflow: "hidden", minHeight: 0 }}>
        <FallbackImage
          src={slide.imgSrc}
          alt={slide.imgAlt}
          fallbackEmoji={slide.imgFallbackEmoji}
          fallbackLabel={slide.imgFallbackLabel}
          imgStyle={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(30%) contrast(1.1)", opacity: 0.9 }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.8)", padding: "8px 16px", fontSize: 11, color: MUTED, letterSpacing: 2, borderTop: `1px solid ${BORDER}` }}>{slide.photoLabel}</div>
      </div>
      <div style={{ padding: "30px 40px", display: "flex", flexDirection: "column", gap: 20, overflow: "hidden" }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(22px, 3.5vw, 40px)", color: GREEN, letterSpacing: 2, borderBottom: `1px solid ${BORDER}`, paddingBottom: 12, textShadow: `0 0 20px rgba(0,255,65,0.3)` }}>{slide.subjectName}</div>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, flex: 1, margin: 0, padding: 0 }}>
          {slide.evidenceItems?.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: 12, fontSize: "clamp(12px, 1.5vw, 15px)", lineHeight: 1.5, color: TEXT }}>
              <span style={{ color: GREEN, flexShrink: 0, marginTop: 1 }}>▸</span>
              {item}
            </li>
          ))}
        </ul>
        {slide.verdictText && (
          <div style={{ background: DARK_GREEN, border: `1px solid ${DIM_GREEN}`, padding: "12px 16px", fontSize: "clamp(11px, 1.4vw, 13px)", color: GREEN, letterSpacing: 1, lineHeight: 1.5 }}>
            <strong style={{ color: AMBER, display: "block", fontSize: 10, letterSpacing: 3, marginBottom: 4 }}>{slide.verdictLabel}</strong>
            {slide.verdictText}
          </div>
        )}
      </div>
    </div>
  );
}

function TheorySlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 60, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", fontFamily: "'Oswald', sans-serif", fontSize: "20vw", fontWeight: 700, color: "rgba(0,255,65,0.03)", whiteSpace: "nowrap", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-20deg)", pointerEvents: "none", letterSpacing: 10 }}>IMMORTAL</div>
      <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(24px, 4vw, 44px)", color: AMBER, letterSpacing: 3, marginBottom: 30, textAlign: "center", borderBottom: `1px solid ${BORDER}`, paddingBottom: 20, width: "100%", maxWidth: 900, position: "relative", zIndex: 1 }}>{slide.headline}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900, width: "100%", position: "relative", zIndex: 1 }}>
        {slide.theoryItems?.map((item) => (
          <div key={item.num} style={{ border: `1px solid ${BORDER}`, padding: 20, background: PANEL, position: "relative" }}>
            <div style={{ position: "absolute", top: -1, right: -1, background: DIM_GREEN, color: BG, fontSize: 10, padding: "2px 8px", letterSpacing: 2 }}>{item.num}</div>
            <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(14px, 2vw, 20px)", color: GREEN, marginBottom: 8, letterSpacing: 1 }}>{item.title}</h3>
            <p style={{ fontSize: "clamp(11px, 1.3vw, 13px)", color: TEXT, lineHeight: 1.6, margin: 0 }}>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div style={{ border: `1px solid ${BORDER}`, background: PANEL, display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden" }}>
      <div style={{ width: "100%", aspectRatio: "3/4", background: "#0a150a", position: "relative", overflow: "hidden" }}>
        <FallbackImage
          src={member.imgSrc}
          alt={member.imgAlt}
          fallbackEmoji={member.imgFallbackEmoji}
          imgStyle={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(40%) contrast(1.1)" }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,255,65,0.1)", borderTop: `1px solid ${DIM_GREEN}`, fontSize: 8, color: DIM_GREEN, textAlign: "center", padding: 2, letterSpacing: 1 }}>{member.designation}</div>
      </div>
      <div style={{ padding: 8, textAlign: "center", width: "100%" }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(10px, 1.2vw, 14px)", color: GREEN, letterSpacing: 1, marginBottom: 2 }}>{member.name}</div>
        <div style={{ fontSize: 9, color: MUTED, letterSpacing: 2 }}>{member.era}</div>
        <div style={{ fontSize: 9, color: RED, letterSpacing: 1, marginTop: 2 }}>{member.status}</div>
      </div>
    </div>
  );
}

function LineupSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "30px 40px", overflow: "hidden" }}>
      <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(20px, 3vw, 36px)", color: GREEN, textAlign: "center", letterSpacing: 3, marginBottom: 6, textShadow: `0 0 20px rgba(0,255,65,0.4)` }}>{slide.headline}</h2>
      <div style={{ textAlign: "center", color: MUTED, fontSize: 11, letterSpacing: 3, marginBottom: 24 }}>{slide.lineupSubtitle}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, width: "100%" }}>
        {slide.members?.map((member) => <MemberCard key={member.name} member={member} />)}
      </div>
    </div>
  );
}

function QuestionSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 40, textAlign: "center", position: "relative" }}>
      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "30vw", color: "rgba(0,255,65,0.04)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", fontWeight: 700 }}>?</div>
      <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(24px, 5vw, 60px)", color: GREEN, letterSpacing: 3, marginBottom: 20, textShadow: `0 0 30px rgba(0,255,65,0.4)`, lineHeight: 1.2, whiteSpace: "pre-line", position: "relative", zIndex: 1 }}>{slide.headline}</h2>
      {slide.questionBody?.map((p, i) => (
        <p key={i} style={{ fontSize: "clamp(13px, 1.8vw, 18px)", color: TEXT, lineHeight: 1.8, maxWidth: 700, margin: "0 auto 20px", whiteSpace: "pre-line", position: "relative", zIndex: 1 }}>{p}</p>
      ))}
      <div style={{ color: MUTED, fontSize: "clamp(11px, 1.4vw, 14px)", letterSpacing: 2, marginTop: 10, position: "relative", zIndex: 1 }}>{slide.questionSub}</div>
    </div>
  );
}

function EndSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", position: "relative", overflow: "hidden", padding: 40 }}>
      <GridBg />
      <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(36px, 7vw, 80px)", color: GREEN, letterSpacing: 4, textShadow: `0 0 40px rgba(0,255,65,0.5)`, marginBottom: 16, whiteSpace: "pre-line", position: "relative", zIndex: 1 }}>{slide.headline}</h2>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", color: AMBER, fontSize: "clamp(14px, 2vw, 20px)", letterSpacing: 3, marginBottom: 40, position: "relative", zIndex: 1 }}>{slide.endTagline}</div>
      <div style={{ maxWidth: 600, color: MUTED, fontSize: "clamp(11px, 1.5vw, 14px)", lineHeight: 1.8, letterSpacing: 1, margin: "0 auto 30px", whiteSpace: "pre-line", position: "relative", zIndex: 1 }}>{slide.endBody}</div>
      <div style={{ color: DIM_GREEN, fontSize: 11, letterSpacing: 4, marginTop: 20, position: "relative", zIndex: 1 }}>{slide.endClosing}</div>
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
    case "lineup":   return <LineupSlide slide={slide} />;
    case "question": return <QuestionSlide slide={slide} />;
    case "end":      return <EndSlide slide={slide} />;
    default:         return null;
  }
}

/* ── page ───────────────────────────────────────────────────────────────── */
export default function ConspiracyTheory2Page() {
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
        @import url('https://fonts.cdnfonts.com/css/share-tech-mono');
        @import url('https://fonts.cdnfonts.com/css/oswald');
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 5px #ff2020; }
          50% { box-shadow: 0 0 20px #ff2020, 0 0 40px rgba(255,32,32,0.3); }
        }
        @keyframes blinkAnim {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes flickerAnim {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.92; }
          97% { opacity: 1; }
          98% { opacity: 0.95; }
        }
        .ct2-nav-btn:hover {
          background: ${DARK_GREEN} !important;
          border-color: ${GREEN} !important;
          box-shadow: 0 0 10px ${DIM_GREEN};
        }
      `}} />
      <div style={{ position: "fixed", inset: 0, background: BG, color: TEXT, fontFamily: "'Share Tech Mono', monospace", overflow: "hidden", cursor: "crosshair" }}>
        {/* scanlines */}
        <div style={{ position: "fixed", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)", pointerEvents: "none", zIndex: 1000 }} />
        {/* CRT vignette/flicker */}
        <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)", pointerEvents: "none", zIndex: 999, animation: "flickerAnim 8s infinite" }} />
        {/* progress bar */}
        <div style={{ position: "fixed", top: 0, left: 0, height: 2, background: GREEN, width: `${pct}%`, transition: "width 0.4s ease", zIndex: 501, boxShadow: `0 0 8px ${GREEN}` }} />
        {/* file stamp */}
        <div style={{ position: "fixed", top: 16, right: 20, fontSize: 10, color: MUTED, letterSpacing: 2, zIndex: 502 }}>
          FBI FILE // EYES ONLY // X-7741-C
        </div>
        {/* slide */}
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <SlideRenderer slide={slides[current]} />
        </div>
        {/* nav */}
        <div style={{ position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 16, zIndex: 500, alignItems: "center" }}>
          <button className="ct2-nav-btn" onClick={prev} style={{ background: "transparent", border: `1px solid ${DIM_GREEN}`, color: GREEN, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, padding: "8px 20px", cursor: "pointer", letterSpacing: 2, textTransform: "uppercase", transition: "all 0.2s" }}>
            ◀ PREV
          </button>
          <span style={{ color: MUTED, fontSize: 11, letterSpacing: 3, minWidth: 80, textAlign: "center" }}>
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button className="ct2-nav-btn" onClick={next} style={{ background: "transparent", border: `1px solid ${DIM_GREEN}`, color: GREEN, fontFamily: "'Share Tech Mono', monospace", fontSize: 12, padding: "8px 20px", cursor: "pointer", letterSpacing: 2, textTransform: "uppercase", transition: "all 0.2s" }}>
            NEXT ▶
          </button>
        </div>
      </div>
    </>
  );
}
