"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slides } from "./slides";
import type { Slide } from "./slides";

/* ─── tokens ──────────────────────────────────────────────────────────── */
const BG      = "#0A0202";  // mineral black
const GOLD    = "#B5993B";  // warm gold — dominant
const BLUE    = "#4C79B7";  // Finnish blue
const SLATE   = "#889DBA";  // muted slate
const WHITE   = "#E8E4DC";  // soft off-white

/* ─── fish svg ─────────────────────────────────────────────────────────── */
function Fish({ size = 120 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.4 }}
    >
      {/* tail */}
      <motion.polygon
        points="10,20 10,100 50,60"
        fill={GOLD}
        animate={{ scaleX: [1, 0.85, 1] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 60px" }}
      />
      {/* body */}
      <ellipse cx="115" cy="60" rx="75" ry="45" fill={GOLD} />
      {/* belly highlight */}
      <ellipse cx="115" cy="72" rx="50" ry="22" fill="#D4B86A" opacity={0.5} />
      {/* eye */}
      <circle cx="162" cy="50" r="10" fill={WHITE} />
      <circle cx="164" cy="50" r="5" fill={BG} />
      {/* mouth */}
      <path d="M180 62 Q190 68 180 72" stroke={BG} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

/* ─── slide components ─────────────────────────────────────────────────── */

function TitleSlide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 32 }}>
      <Fish size={160} />
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(56px, 12vw, 120px)",
          color: WHITE,
          letterSpacing: "0.05em",
          lineHeight: 1,
          textAlign: "center",
          textShadow: `0 0 60px rgba(181,153,59,0.25)`,
        }}
      >
        FINLAND<br />DOES NOT<br />EXIST
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: SLATE, letterSpacing: "0.3em", textTransform: "uppercase" }}
      >
        click to advance
      </motion.p>
    </div>
  );
}

function BriefingSlide({ slide }: { slide: Slide }) {
  const lines = slide.body?.split("\n") ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", maxWidth: 900, margin: "0 auto", padding: "0 40px", position: "relative" }}>
      {/* map — pinned to the right, faded */}
      <motion.img
        src="/scandinavia.svg"
        alt=""
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.18, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          position: "absolute",
          right: -60,
          top: "50%",
          transform: "translateY(-50%)",
          width: 420,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {slide.label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 12,
            letterSpacing: "0.35em",
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {slide.label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(40px, 7vw, 80px)",
          color: WHITE,
          lineHeight: 1.05,
          letterSpacing: "0.02em",
          marginBottom: 32,
        }}
      >
        {slide.headline}
      </motion.h2>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: line === "" ? 0 : 1, y: 0 }}
          transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "clamp(16px, 2.2vw, 22px)",
            color: WHITE,
            lineHeight: 1.65,
            opacity: 0.88,
            marginBottom: line === "" ? 12 : 0,
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

function DefaultSlide({ slide }: { slide: Slide }) {
  const lines = slide.body?.split("\n") ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", maxWidth: 820, margin: "0 auto", padding: "0 40px" }}>
      {slide.label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 12,
            letterSpacing: "0.35em",
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {slide.label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(40px, 7vw, 80px)",
          color: WHITE,
          lineHeight: 1.05,
          letterSpacing: "0.02em",
          marginBottom: 32,
        }}
      >
        {slide.headline}
      </motion.h2>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: line === "" ? 0 : 1, y: 0 }}
          transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "clamp(16px, 2.2vw, 22px)",
            color: WHITE,
            lineHeight: 1.65,
            opacity: 0.88,
            marginBottom: line === "" ? 12 : 0,
          }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

function StatsSlide({ slide }: { slide: Slide }) {
  const stats = slide.body?.split("\n").filter(Boolean) ?? [];

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", maxWidth: 820, margin: "0 auto", padding: "0 40px" }}>
      {slide.label && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: 20 }}
        >
          {slide.label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(32px, 5vw, 60px)",
          color: WHITE,
          lineHeight: 1.1,
          letterSpacing: "0.02em",
          marginBottom: 40,
        }}
      >
        {slide.headline}
      </motion.h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(28px, 5vw, 56px)",
              color: GOLD,
              letterSpacing: "0.03em",
              borderLeft: `4px solid ${BLUE}`,
              paddingLeft: 24,
            }}
          >
            {stat}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ZoomSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 40px" }}>
      {slide.label && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: 24 }}
        >
          {slide.label}
        </motion.p>
      )}
      <motion.h2
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 80 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(48px, 9vw, 100px)",
          color: WHITE,
          textAlign: "center",
          letterSpacing: "0.04em",
          lineHeight: 1.1,
          textShadow: `0 0 80px rgba(76,121,183,0.35)`,
        }}
      >
        {slide.headline}
      </motion.h2>
    </div>
  );
}

function CurtainSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 40px", position: "relative", overflow: "hidden" }}>
      {/* content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ textAlign: "center" }}
      >
        {slide.label && (
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: 24 }}>
            {slide.label}
          </p>
        )}
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(36px, 6vw, 72px)",
          color: WHITE,
          lineHeight: 1.1,
          letterSpacing: "0.02em",
          marginBottom: 28,
          maxWidth: 700,
        }}>
          {slide.headline}
        </h2>
        {slide.body && (
          <p style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "clamp(16px, 2.2vw, 22px)",
            color: WHITE,
            opacity: 0.85,
            lineHeight: 1.65,
          }}>
            {slide.body}
          </p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          style={{ marginTop: 48 }}
        >
          <Fish size={100} />
        </motion.div>
      </motion.div>

      {/* curtain wipe */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          background: BLUE,
          zIndex: 10,
        }}
      />
    </div>
  );
}

/* ─── train svg ─────────────────────────────────────────────────────────── */
function TrainSVG() {
  return (
    <svg width={560} height={100} viewBox="0 0 560 100" overflow="visible">
      {/* smoke puffs */}
      {([0, 1, 2] as const).map((i) => (
        <motion.circle
          key={i}
          cx={355}
          cy={2}
          r={5 + i * 3}
          fill={SLATE}
          initial={{ y: 0, opacity: 0.45 }}
          animate={{ y: -(18 + i * 14), opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.55, ease: "easeOut" }}
        />
      ))}

      {/* box car 1 */}
      <rect x={30} y={22} width={136} height={50} rx={3} fill={SLATE} opacity={0.6} />
      <rect x={30} y={22} width={136} height={8} rx={3} fill={BLUE} opacity={0.55} />
      <text x={98} y={54} fontFamily="Inter, monospace, sans-serif" fontSize={8} fill={BG} textAnchor="middle" letterSpacing="3" opacity={0.9}>NOKIA</text>
      <circle cx={68} cy={78} r={10} fill={BG} stroke={SLATE} strokeWidth={2} />
      <circle cx={136} cy={78} r={10} fill={BG} stroke={SLATE} strokeWidth={2} />

      {/* coupler */}
      <line x1={166} y1={48} x2={176} y2={48} stroke={SLATE} strokeWidth={5} opacity={0.45} />

      {/* box car 2 */}
      <rect x={176} y={22} width={136} height={50} rx={3} fill={SLATE} opacity={0.6} />
      <rect x={176} y={22} width={136} height={8} rx={3} fill={BLUE} opacity={0.55} />
      <text x={244} y={54} fontFamily="Inter, monospace, sans-serif" fontSize={8} fill={BG} textAnchor="middle" letterSpacing="3" opacity={0.9}>NOKIA</text>
      <circle cx={214} cy={78} r={10} fill={BG} stroke={SLATE} strokeWidth={2} />
      <circle cx={282} cy={78} r={10} fill={BG} stroke={SLATE} strokeWidth={2} />

      {/* coupler */}
      <line x1={312} y1={48} x2={322} y2={48} stroke={SLATE} strokeWidth={5} opacity={0.45} />

      {/* locomotive body */}
      <rect x={322} y={17} width={178} height={58} rx={4} fill={GOLD} />
      {/* boiler band */}
      <rect x={322} y={46} width={124} height={4} fill="#8A6D20" opacity={0.55} />
      {/* cab */}
      <rect x={452} y={8} width={60} height={67} rx={4} fill="#C8A830" />
      {/* cab window */}
      <rect x={466} y={17} width={28} height={22} rx={2} fill={BG} opacity={0.75} />
      {/* smokestack */}
      <rect x={344} y={1} width={16} height={20} rx={2} fill="#8A6D20" />
      {/* wheels */}
      <circle cx={366} cy={78} r={12} fill={BG} stroke={GOLD} strokeWidth={2.5} />
      <circle cx={412} cy={78} r={12} fill={BG} stroke={GOLD} strokeWidth={2.5} />
      <circle cx={458} cy={78} r={12} fill={BG} stroke={GOLD} strokeWidth={2.5} />
      <circle cx={490} cy={78} r={8}  fill={BG} stroke={GOLD} strokeWidth={2} />
      {/* cowcatcher */}
      <polygon points="500,55 516,75 500,75" fill="#8A6D20" opacity={0.75} />
    </svg>
  );
}

function RailwaySlide({ slide }: { slide: Slide }) {
  const lines = slide.body?.split("\n") ?? [];
  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      {/* text */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", maxWidth: 820, margin: "0 auto", padding: "0 40px 130px" }}>
        {slide.label && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, letterSpacing: "0.35em", color: GOLD, textTransform: "uppercase", marginBottom: 20 }}
          >
            {slide.label}
          </motion.p>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 7vw, 80px)", color: WHITE, lineHeight: 1.05, letterSpacing: "0.02em", marginBottom: 32 }}
        >
          {slide.headline}
        </motion.h2>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: line === "" ? 0 : 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
            style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "clamp(16px, 2.2vw, 22px)", color: WHITE, lineHeight: 1.65, opacity: 0.88, marginBottom: line === "" ? 12 : 0 }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* tracks */}
      <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, pointerEvents: "none" }}>
        <svg width="100%" height={20} preserveAspectRatio="none">
          <line x1={0} y1={6}  x2="100%" y2={6}  stroke={SLATE} strokeWidth={2.5} opacity={0.22} />
          <line x1={0} y1={14} x2="100%" y2={14} stroke={SLATE} strokeWidth={2.5} opacity={0.22} />
        </svg>
      </div>

      {/* train */}
      <motion.div
        initial={{ x: -620 }}
        animate={{ x: 1900 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 0.6 }}
        style={{ position: "absolute", bottom: 0, left: 0, pointerEvents: "none" }}
      >
        <TrainSVG />
      </motion.div>
    </div>
  );
}

/* ─── slide router ─────────────────────────────────────────────────────── */
function SlideContent({ slide }: { slide: Slide }) {
  switch (slide.variant) {
    case "title":    return <TitleSlide />;
    case "briefing": return <BriefingSlide slide={slide} />;
    case "railway":  return <RailwaySlide slide={slide} />;
    case "stats":    return <StatsSlide slide={slide} />;
    case "zoom":     return <ZoomSlide slide={slide} />;
    case "curtain":  return <CurtainSlide slide={slide} />;
    default:         return <DefaultSlide slide={slide} />;
  }
}

/* ─── progress bar ─────────────────────────────────────────────────────── */
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current) / (total - 1)) * 100;
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 4, background: "rgba(232,228,220,0.1)", zIndex: 100 }}>
      <motion.div
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ height: "100%", background: GOLD, borderRadius: "0 2px 2px 0" }}
      />
    </div>
  );
}

/* ─── slideshow ────────────────────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function FinlandSlideshow() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number) => {
    if (next < 0 || next >= slides.length) return;
    setDir(next > index ? 1 : -1);
    setIndex(next);
  }, [index]);

  const advance = useCallback(() => go(index + 1), [go, index]);
  const retreat = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); advance(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); retreat(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance, retreat]);

  return (
    <div
      onClick={advance}
      style={{
        position: "fixed", inset: 0,
        background: BG,
        cursor: index < slides.length - 1 ? "pointer" : "default",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <SlideContent slide={slides[index]} />
        </motion.div>
      </AnimatePresence>

      <ProgressBar current={index} total={slides.length} />
    </div>
  );
}
