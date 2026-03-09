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

/* ─── fish body (no entry anim — used inside school wrappers) ───────────── */
function FishBody({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 200 120" fill="none">
      <motion.polygon
        points="10,20 10,100 50,60"
        fill={GOLD}
        animate={{ scaleX: [1, 0.82, 1] }}
        transition={{ repeat: Infinity, duration: 0.55, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 60px" }}
      />
      <ellipse cx="115" cy="60" rx="75" ry="45" fill={GOLD} />
      <ellipse cx="115" cy="72" rx="50" ry="22" fill="#D4B86A" opacity={0.5} />
      <circle cx="162" cy="50" r="10" fill={WHITE} />
      <circle cx="164" cy="50" r="5"  fill={BG} />
      <path d="M180 62 Q190 68 180 72" stroke={BG} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ─── fish slide ─────────────────────────────────────────────────────────── */
const SCHOOL = [
  { top: "8%",  size: 130, delay: 0,    dur: 3.2 },
  { top: "20%", size: 88,  delay: 0.18, dur: 2.8 },
  { top: "33%", size: 148, delay: 0.06, dur: 3.5 },
  { top: "46%", size: 102, delay: 0.3,  dur: 3.0 },
  { top: "57%", size: 92,  delay: 0.12, dur: 2.9 },
  { top: "67%", size: 122, delay: 0.24, dur: 3.3 },
  { top: "77%", size: 78,  delay: 0.42, dur: 2.7 },
  { top: "87%", size: 112, delay: 0.08, dur: 3.1 },
] as const;

function FishSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* headline */}
      <motion.h2
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(100px, 22vw, 220px)",
          color: WHITE,
          letterSpacing: "0.04em",
          lineHeight: 1,
          position: "relative",
          zIndex: 0,
          userSelect: "none",
        }}
      >
        {slide.headline}
      </motion.h2>

      {/* school */}
      {SCHOOL.map((f, i) => (
        <motion.div
          key={i}
          initial={{ x: "-160px" }}
          animate={{ x: "110vw" }}
          transition={{ delay: f.delay, duration: f.dur, ease: "linear" }}
          style={{ position: "absolute", top: f.top, left: 0, zIndex: 1, pointerEvents: "none" }}
        >
          <FishBody size={f.size} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── deal slide ────────────────────────────────────────────────────────── */
function DealSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      {/* map: fills slide, zooms into Finland */}
      <motion.img
        src="/scandinavia.svg"
        alt=""
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 0.38, scale: 2.6 }}
        transition={{
          opacity: { delay: 0.25, duration: 0.8 },
          scale: { delay: 0.7, duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: "67% 18%",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
      {/* text */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 40px", textAlign: "center" }}>
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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(56px, 10vw, 110px)",
            color: WHITE,
            lineHeight: 1.0,
            letterSpacing: "0.02em",
            textShadow: `0 0 40px rgba(10,2,2,1), 0 0 100px rgba(10,2,2,0.9)`,
          }}
        >
          {slide.headline}
        </motion.h2>
      </div>
    </div>
  );
}

/* ─── mini fish for cargo cars ──────────────────────────────────────────── */
function MiniFloppyFish() {
  return (
    <>
      <motion.polygon
        points="-13,-5 -13,5 -6,0"
        fill={GOLD}
        animate={{ scaleX: [1, 0.6, 1] }}
        transition={{ repeat: Infinity, duration: 0.38, ease: "easeInOut" }}
        style={{ transformOrigin: "-6px 0px" }}
      />
      <ellipse cx="2"   cy="0"   rx="9"  ry="5.5" fill={GOLD} />
      <ellipse cx="2"   cy="1.5" rx="6"  ry="2.5" fill="#D4B86A" opacity={0.5} />
      <circle  cx="9"   cy="-1.5" r="2"            fill={WHITE} />
      <circle  cx="9.5" cy="-1.5" r="1"            fill={BG} />
    </>
  );
}

const CAR1_FISH = [
  { x: 65,  delay: 0,   repeatDelay: 2.1, dur: 1.4 },
  { x: 103, delay: 0.9, repeatDelay: 2.6, dur: 1.6 },
  { x: 140, delay: 1.7, repeatDelay: 1.8, dur: 1.3 },
] as const;

const CAR2_FISH = [
  { x: 211, delay: 0.4, repeatDelay: 2.3, dur: 1.5 },
  { x: 250, delay: 1.3, repeatDelay: 2.0, dur: 1.4 },
  { x: 286, delay: 0.7, repeatDelay: 2.8, dur: 1.6 },
] as const;

/* ─── train svg ─────────────────────────────────────────────────────────── */
function TrainSVG() {
  return (
    <svg width={560} height={100} viewBox="0 0 560 100" overflow="visible">
      <defs>
        {/* each clip shows only the region above the car roof (y < 22) */}
        <clipPath id="clip-car1">
          <rect x={30}  y={-120} width={136} height={142} />
        </clipPath>
        <clipPath id="clip-car2">
          <rect x={176} y={-120} width={136} height={142} />
        </clipPath>
      </defs>

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
      <rect x={30} y={22} width={136} height={8}  rx={3} fill={BLUE}  opacity={0.55} />
      <text x={98} y={54} fontFamily="Inter, monospace, sans-serif" fontSize={8} fill={BG} textAnchor="middle" letterSpacing="3" opacity={0.9}>FISH?</text>
      <circle cx={68}  cy={78} r={10} fill={BG} stroke={SLATE} strokeWidth={2} />
      <circle cx={136} cy={78} r={10} fill={BG} stroke={SLATE} strokeWidth={2} />

      {/* coupler */}
      <line x1={166} y1={48} x2={176} y2={48} stroke={SLATE} strokeWidth={5} opacity={0.45} />

      {/* box car 2 */}
      <rect x={176} y={22} width={136} height={50} rx={3} fill={SLATE} opacity={0.6} />
      <rect x={176} y={22} width={136} height={8}  rx={3} fill={BLUE}  opacity={0.55} />
      <text x={244} y={54} fontFamily="Inter, monospace, sans-serif" fontSize={8} fill={BG} textAnchor="middle" letterSpacing="3" opacity={0.9}>FISH?</text>
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

      {/* flopping fish: car 1 — clipped to appear only above the roof */}
      <g clipPath="url(#clip-car1)">
        {CAR1_FISH.map((f, i) => (
          <g key={i} transform={`translate(${f.x}, 0)`}>
            <motion.g
              animate={{ y: [50, 10, 38, 10, 50] }}
              transition={{ delay: f.delay, duration: f.dur, repeat: Infinity, repeatDelay: f.repeatDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <MiniFloppyFish />
            </motion.g>
          </g>
        ))}
      </g>

      {/* flopping fish: car 2 */}
      <g clipPath="url(#clip-car2)">
        {CAR2_FISH.map((f, i) => (
          <g key={i} transform={`translate(${f.x}, 0)`}>
            <motion.g
              animate={{ y: [50, 10, 38, 10, 50] }}
              transition={{ delay: f.delay, duration: f.dur, repeat: Infinity, repeatDelay: f.repeatDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <MiniFloppyFish />
            </motion.g>
          </g>
        ))}
      </g>
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

/* ─── nothing slide ────────────────────────────────────────────────────── */
const FINLAND_D =
  "m 379.77873,81.301447 0,0.1875 c -1.87565,0.37519 -1.49886,2.53099 -3.09316,3 -1.40674,0.3752 -0.84272,-1.59472 -2.43703,0.1875 -0.18755,0.2814 -2e-4,0.74979 -0.0937,1.125 -0.0938,0.0938 -1.12478,2.06244 -1.12478,2.15624 -0.28135,0.7504 0.28114,3.187141 0.37492,3.843751 0,0.2814 -0.18746,0.4686 -0.18746,0.75 0,0.56279 0.0937,1.03092 0.18746,1.59374 0.28135,0.7504 0.93728,1.31209 1.03105,2.0625 0.46892,3.28302 -0.37431,1.0307 -1.49971,2.0625 -1.31295,1.31321 -0.0935,1.68664 -0.46866,3.281242 -0.0938,0.37521 -0.46861,0.56229 -0.56239,0.9375 0,0.0938 -1.21841,-1.0312 -1.40598,-1.125 -0.28134,-0.1876 -3.74913,-1.406452 -4.03047,-1.03125 -0.37514,0.37521 -0.0936,1.12481 -0.37493,1.5 -1.1254,1.96982 -2.62363,0.74985 -4.21794,1.03125 -0.4689,0 -0.93712,0.2813 -1.31225,0.1875 l -0.37493,-0.28125 c -0.18756,-0.37521 -0.18735,-0.93731 -0.37492,-1.3125 -0.65648,-1.12562 -2.81135,-4.030902 -3.93675,-4.687492 -2.43835,-1.40702 -2.53087,0.56169 -2.3433,2.0625 l -0.56239,1.968742 0.0937,0 -0.0937,0.0937 0.37493,0.46875 c -0.0938,0.18759 -0.4689,0.2811 0,0.5625 1.59431,1.2194 4.31076,3.46834 5.99885,4.21875 1.96943,0.84419 3.56084,0.12403 5.34272,1.90624 0.37513,0.2814 0.0935,1.12489 0.46866,1.3125 0.28134,0.0938 0.46855,-0.37505 0.65612,-0.28125 0.75026,0.2814 1.03075,1.21845 1.59345,1.78125 0.18757,0.1876 0.7499,0.18735 0.65612,0.46875 -1.03161,1.96981 0.0936,2.06129 0.37493,4.31249 0.0938,0.37521 -0.2812,0.7498 -0.2812,1.125 l -0.0937,0.0937 c 0,0.93801 1.40577,0.18729 1.78091,0.5625 1.21916,0.938 -0.75016,2.2495 -0.18747,3.18749 0.5627,1.31321 2.81186,2.53044 2.99943,4.03125 0.0938,1.12561 -0.74991,4.68724 -0.65613,5.15624 0.84405,3.00162 3.12379,4.46743 4.24919,6.90624 0.66234,0.33776 0.85869,-0.38396 1.53095,-0.0312 0.28089,0.70666 0.49957,1.21856 1.15603,1.59375 0.38595,-0.19932 0.71825,-0.18763 1.37474,0 0.28134,0 0.62478,0.28114 0.81234,0.46875 0.56269,0.2814 0.56209,-0.844 1.12478,0.0937 1.03162,2.15742 0.37472,3.81198 0.74986,4.74999 0.28135,0.84421 0.67871,0.32215 1.71842,1.9375 -0.26194,0.61133 -0.77611,0.15427 -1.34349,0.4375 0.0256,0.13258 0.0952,0.22964 0.34368,0.3125 0.6628,0.22097 0.72619,0.53217 0.59364,1.0625 -0.1286,0.51449 -0.90706,-0.32996 -1.71842,-0.90625 -0.36116,0.22273 -0.70362,0.46186 -0.93732,0.8125 -0.18758,0.18761 0.0937,0.65614 -0.0937,0.84375 -0.18757,0.1876 -0.65608,-0.2816 -0.74986,-0.0937 -0.28135,0.6566 -0.37493,1.49959 -0.37493,2.24999 0,0.46901 -0.15602,0.9685 -0.34368,1.4375 -0.0938,0.84421 -0.78099,1.18709 -0.96857,1.9375 -0.18756,0.5628 -0.24975,1.656 -0.43741,2.12499 -0.4689,1.03181 -1.3122,0.62424 -1.40598,2.03125 -0.005,0.63495 0.46866,0.68729 0.46866,1.0625 -0.009,0.0577 -0.0199,0.10246 -0.0312,0.15625 -0.4803,-0.0507 -0.95516,-0.0883 -1.18727,-0.0625 -0.29582,0.0329 -0.0708,0.72298 0.18747,1.5 -0.5087,0.33924 -1.09764,0.58778 -1.53096,1.15625 -0.0938,0.6566 -0.99975,2.84369 -1.09354,2.93749 -0.37514,0 -0.7184,-1.12515 -1.09354,-0.84375 -0.84405,0.75041 0.53161,2.53094 -0.31244,3.09375 -0.28135,0.1876 -0.84364,-0.46909 -0.74985,-0.0937 0,0.469 0.4998,0.40601 0.68736,0.875 -0.34096,-0.16616 -0.76386,-0.20131 -1.03105,-0.15625 -0.11875,0.02 -0.22785,0.0385 -0.24995,0.0937 -0.0725,0.18114 0.83187,0.76064 1.62469,1.46875 0.13094,0.90646 -0.45759,-0.001 -1.12479,0.84374 -0.76739,0.28682 -0.53103,1.21875 -0.90607,1.21875 -0.56269,-0.0938 -0.3122,-0.7812 -0.7811,-0.875 -0.88282,0.38693 -1.07282,0.64425 -1.62469,0.59375 -0.66099,2.48841 1.46858,0.65544 1.281,2.15625 -0.0137,0.0687 -0.06,0.1466 -0.0937,0.21875 -0.77076,-0.14452 -0.96856,-0.5 -0.96856,-0.5 l -0.24995,0.40625 0.0625,1.4375 c -0.60053,0.57728 -1.20199,1.16186 -1.24976,1.68749 -0.5131,5.35116 0.23332,1.2393 0.90608,2.65625 0.0496,0.8009 -0.71899,1.28099 0.0312,1.75 0.0938,0.0938 0.28115,-0.37505 0.37493,-0.28125 0.18758,0.2814 -0.094,0.93745 0.2812,1.03125 0.18757,0.0938 -0.18737,-0.84375 0.0937,-0.84375 0.28135,-0.0938 0.37488,0.2811 0.46866,0.5625 0.56269,1.50081 -0.0939,3.93719 0.18746,4.49999 0.18757,0.37521 0.531,0.62485 0.81235,0.90625 0.37514,0.46901 0.43726,0.68726 0.71861,1.15625 0.0938,0.18761 0.15617,0.59365 0.24995,0.78125 0.18758,0.2814 0.65602,0.0624 0.84359,0.25 0.0938,0.0938 -0.37493,2e-4 -0.37493,0.0937 -0.0938,0.1876 0.0937,0.3749 0.18747,0.5625 0.46892,0.5628 1.31229,1.06213 1.21851,1.71874 -0.0938,0.5628 -1.43717,-0.56251 -1.53095,0 -0.18757,0.75041 0.96845,1.65591 1.15602,2.31251 0.0938,0.2814 -0.37497,0.56229 -0.28119,0.9375 0.0938,0.18759 0.65612,0.18733 0.65612,0.46875 -0.0938,1.2194 -1.03125,-0.0943 -0.65612,0.9375 0.0938,0.37521 0.56244,0.6561 0.46866,0.9375 -0.0938,0.3752 -1.031,-0.0939 -1.12479,0.1875 -0.0938,2.43881 0.93692,2.71818 1.68718,3.74999 0.18755,0.1876 -0.74996,0.37485 -0.56239,0.65625 0.0938,0.46901 0.28104,0.84355 0.56239,1.21875 2.32833,2.67602 0.46759,-0.0935 2.43703,-0.46875 0.37513,0 -0.37514,1.0311 0,1.3125 0.56269,0.2814 1.24941,0.15625 1.90588,0.15625 0.5627,0.0938 0.81209,0.68749 1.28101,0.68749 0.46891,0 0.65592,-0.56249 1.03105,-0.56249 0.18757,-0.0938 2e-4,0.28119 0.0937,0.37499 0.26728,0.0891 0.45983,0.0261 0.71861,-0.0625 -0.0953,0.20509 -0.18367,0.43718 -0.24995,0.625 -0.26512,0.7513 -0.35899,0.83617 -0.0937,0.96875 0.26511,0.13258 -0.0433,0.004 0.53115,-0.4375 0.12319,-0.0948 0.22935,-0.25834 0.34368,-0.40625 -0.009,0.98013 -0.78125,1.2109 -0.4999,1.28125 0.13554,0 1.13361,-0.71755 1.87464,-1.25 -0.22093,0.44195 -0.4254,0.66698 -0.99981,0.84375 -0.57442,0.17678 -0.76594,0.7598 -1.03105,0.40625 -0.26512,-0.35355 -0.6454,0.0893 -0.46866,0.53125 0.0884,0.22097 0.37823,0.2702 0.59363,0.28125 -0.26436,0.0914 -0.34915,0.41302 -0.12497,0.5625 0.26511,0.17678 -0.0398,0.2683 -0.43742,0.3125 -0.39767,0.0442 0.0344,0.7866 0.34369,0.875 0.3093,0.0884 1.26362,-0.3027 1.74966,-0.65625 0.48605,-0.35355 0.68959,-0.90717 0.46866,-1.4375 -0.22093,-0.53033 -0.21021,-0.45987 0.18746,-1.34375 0.12262,-0.32704 0.0888,-0.52266 0.0312,-0.59375 0.12794,-0.0917 0.39176,-0.28206 0.43741,-0.3125 0.0938,-0.0938 0.28115,-0.56245 0.37493,-0.65624 -0.46891,1.40699 -1.68838,2.99953 0.56239,3.84374 0.37514,0.18759 1.12468,-0.65646 1.31225,-0.28125 0.18757,0.5628 -1.31255,1.40615 -0.74985,1.59375 0.56269,0.2814 0.46836,-1.31245 1.03105,-1.40625 0.4689,-0.0938 0.0937,0.9373 -0.0937,1.3125 -0.28135,0.46901 -0.84334,0.65604 -1.31225,1.03125 -0.13678,0.20519 -0.5391,0.61858 -0.65613,0.75 2.90726,-1.12561 1.7801,-2.99949 3.28062,-3.9375 0.46891,-0.2814 -0.75011,1.2186 -0.28119,1.5 0.65647,0.37519 1.53059,-0.0935 2.18708,-0.46875 0.46892,-0.18759 0.65591,-0.93734 1.03105,-1.21875 1.66733,-1.13191 3.093,-0.74979 3.37435,-1.125 0.28135,-0.2814 -0.65627,-0.74985 -0.37493,-1.03125 0.46892,-0.3752 1.21816,-0.0937 1.87464,-0.1875 0.18757,0 0.56234,0.0939 0.65613,-0.0937 0.18756,-0.2814 -0.18777,-0.65615 -0.0937,-0.84375 0.006,-0.0117 0.026,0.005 0.0312,0 0.0484,0.10992 0.29674,0.0859 0.43741,0.15625 0.6682,-0.74589 0.90025,-1.29941 2.28082,-1.625 0.49145,-0.31477 -0.37544,-1.59386 0.56239,-1.40625 0.0496,1.12696 2.32586,1.82334 1.34349,-0.625 0.69667,0.2917 2.14044,2.04781 1.71842,0.3125 -0.18756,-0.65661 -2.0935,-0.8746 -1.81215,-1.625 0.18756,-0.65661 0.56203,0.34355 1.21851,0.53125 0.37512,0.0938 1.09333,0.0939 1.46847,-0.0937 0.93783,-0.65661 -0.563,-2.78159 0.56239,-2.12499 0.93783,0.65659 -0.97327,2.68171 1.62469,1.12499 4.50156,-1.5008 0.7806,-0.15548 1.71842,-1.56249 0.0938,-0.0938 0.18735,0.1875 0.37493,0.1875 0.18756,0 0.46861,1.1e-4 0.56239,-0.1875 0.0938,-0.1876 -0.28135,-0.84375 0,-0.84375 0.0938,0 0.9683,0.81261 1.43722,0.625 0.65649,-0.1876 1.74946,-0.24976 2.1246,-0.71875 0.0938,0 0.0937,-0.0937 0.0937,-0.1875 l -0.18747,-0.1875 c 0.56269,-2.15742 2.3427,-4.40524 3.46809,-6.28125 2.90726,-5.15903 4.68554,-11.0595 6.65497,-16.59373 1.50052,-4.03342 1.96827,-5.09142 2.15583,-9.40624 0.0938,-0.6566 0.46881,-1.40588 0.18747,-2.06249 -0.75026,-2.15741 -9.09085,-5.24918 -11.24784,-6.74999 -0.28135,-0.1876 3.09441,-5.34277 0.74985,-7.12499 -0.84404,-0.65659 -2.62419,5e-4 -3.18688,-0.9375 -2.43835,-4.22102 0.56279,-2.24934 -0.18747,-3.46875 -1.12539,-1.6884 -2.34255,-0.37408 -3.74928,-2.06249 -1.21917,-1.40701 -0.37528,-1.49929 0.2812,-2.8125 0.37512,-0.84421 -1.87464,-0.84354 -1.87464,-1.21875 0.0938,-0.65661 0.0937,-4.03119 0.0937,-4.12499 -1.96944,-1.68841 0.37462,-0.65591 0.93732,-1.3125 0.37513,-0.5628 -1.96822,-3.93728 -2.24957,-4.31249 -1.59429,-2.15741 -3.37334,-4.68649 -5.24899,-6.56249 -0.28134,-0.2814 -1.78075,-1.40595 -2.0621,-1.96875 -1.40674,-2.62642 3.09411,-9.31163 1.31225,-10.90624 -0.46892,-0.56279 -1.31195,-0.56228 -1.87464,-0.93749 -1.0316,-0.75041 -1.49915,-2.06214 -2.53077,-2.71875 -0.0938,0 -3.28057,-0.46875 -3.37435,-0.46875 -0.56269,-0.46901 -0.74964,-1.21839 -1.12478,-1.875 -2.06322,-3.376812 0.34424,-3.092422 -0.68737,-5.531242 -0.46891,-1.1256 -2.24978,-0.0934 -1.87464,-0.75 0.4689,-0.84422 1.12449,-1.40585 1.68718,-2.15624 -3.00105,-1.40701 0.93798,-3.655131 -0.2812,-5.718751 -1.87565,-3.28301 -4.77902,-2.06106 -7.21736,-4.68749 l -0.0938,-0.46875 c -0.0938,0 -0.18742,-5e-5 -0.2812,0.0937 0,-0.0938 -0.0937,-0.0937 -0.0937,-0.1875 z m 1.24976,63.749913 c -0.20436,-0.0221 -0.44749,0.0123 -0.99981,0.34375 -0.17674,1.23744 0.52893,0.85984 0.74986,1.125 0.22092,0.26517 0.60658,0.16291 0.56239,-0.5 -0.0442,-0.66291 0.0612,-0.48705 0.81234,-0.53125 0.75116,-0.0442 0.14994,-0.53883 -0.46866,-0.40625 -0.3093,0.0663 -0.45176,-0.009 -0.65612,-0.0312 z m -13.43492,25.49996 c -0.0829,-0.0221 -0.16158,0.0641 -0.24995,0.21875 -0.17674,0.30936 -0.46108,0.61113 -0.59364,0.125 -0.13255,-0.48614 -0.39101,-0.26831 -0.65612,-0.3125 -0.26512,-0.0442 -0.0518,0.30806 0.12497,0.75 0.17675,0.44194 0.4254,0.36205 0.99981,0.40625 0.57442,-0.44194 0.72619,-0.0558 0.59364,-0.71875 -0.0663,-0.33145 -0.13587,-0.44665 -0.21871,-0.46875 z m 13.74736,32.78122 c 0.005,0.006 0.0254,-0.0117 0.0312,0 0.005,0.0104 -0.005,0.0213 0,0.0312 -0.0364,0.0707 -0.0566,0.14357 -0.0937,0.21875 0.0248,-0.098 0.0405,-0.20823 0.0625,-0.25 z m -4.99904,0.3125 c -0.0884,0.003 -0.0773,0.10637 0,0.24999 0.15465,0.28726 -0.18215,0.47032 -0.0937,0.625 0.0884,0.15468 0.31401,0.2904 0.46866,0.3125 0.59651,0.19887 1.03864,0.28726 0.90607,0 -0.13255,-0.28726 -0.57533,-0.34532 -0.53115,-0.5 0.0442,-0.15468 0.44029,-0.009 -0.15622,-0.40625 -0.29825,-0.19886 -0.50526,-0.284 -0.59363,-0.28124 z m 2.40579,1.31249 c -0.3093,-0.0221 -0.68959,0.32859 -0.46866,0.59375 0.22092,0.26517 0.46644,-0.25759 0.68736,-0.125 0.22093,0.13257 0.26382,0.13637 0.74986,-0.0625 0.48605,-0.19888 0.20235,-0.49465 -0.96856,-0.40625 z m -14.09105,1.46875 c -0.12485,0.0441 -0.25776,0.20703 -0.37492,0.5 -0.31244,0.78125 0.24995,0.25 0.71861,0.65625 0.46866,0.40625 -0.12498,0.90625 -0.46866,1.3125 -0.34369,0.40625 -0.31244,-0.3125 0.0625,-0.71875 0.37492,-0.40625 -0.43747,-0.46875 -0.46866,-0.28125 -0.0312,0.1875 -0.37493,0.375 -0.87484,0.5 -0.4999,0.125 -0.43741,0.96875 -0.15622,1.6875 0.2812,0.71874 0.37493,-0.46875 0.65613,-0.40625 0.28119,0.0625 0.24995,-0.0312 0.68737,0.5625 0.43741,0.59374 0.87483,0.375 1.24976,0.25 0.37492,-0.125 0.62488,-0.46875 0.56239,-0.875 -0.0625,-0.40625 -0.53115,-0.46875 -0.93732,-0.71875 -0.40617,-0.25 0.68737,0.1875 0.31244,-0.3125 -0.37493,-0.5 0.21871,-0.65625 0.21871,-0.3125 0,0.34375 0.34368,0.21875 0.4999,0.71875 0.15622,0.5 0.31244,0.25 0.7811,-0.28125 0.46866,-0.53125 0.0937,-1 -0.46866,-1.34375 -0.56239,-0.34375 -0.65612,-0.28125 -1.43722,-0.46875 -0.15622,-0.31253 -0.35431,-0.54229 -0.5624,-0.46875 z m 20.05865,1.65625 c -0.17122,-0.003 -0.45317,0.0587 -0.90608,0.125 l 0.12498,0.78125 c 0.20988,0.19887 0.30226,0.17943 0.34368,0.0937 0.0207,-0.0428 0.0288,-0.11603 0.0312,-0.1875 0.002,-0.0715 0,-0.14694 0,-0.21875 0,-0.0718 0.014,-0.0967 0.0312,-0.125 0.0518,-0.0849 0.1742,0.005 0.40617,0.1875 0.3093,0.24307 0.20956,0.19574 0.18747,-0.3125 -0.0111,-0.25411 -0.0475,-0.34099 -0.21871,-0.34375 z m -18.18401,2.0625 c -0.20504,0.0835 -0.24214,0.36719 0.0625,0.71874 0.46866,0.53125 1.09354,0.81225 0.84359,-0.0312 -0.24995,-0.84374 -0.24995,-0.62499 -0.65612,-0.68749 -0.10154,-0.0156 -0.18161,-0.0278 -0.24996,0 z";

function NothingSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* Finland shape: centred, glows gold, then shrinks to nothing */}
      <svg
        viewBox="300 68 140 165"
        style={{ position: "absolute", width: "min(55vw, 90vh)", height: "auto", pointerEvents: "none" }}
      >
        <motion.path
          d={FINLAND_D}
          fill={GOLD}
          initial={{ opacity: 0.82, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ delay: 0.4, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
        />
      </svg>

      {/* NOTHING */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 80 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(80px, 16vw, 180px)",
          color: WHITE,
          letterSpacing: "0.04em",
          position: "relative",
          zIndex: 2,
          lineHeight: 1,
        }}
      >
        {slide.headline}
      </motion.h2>
    </div>
  );
}

/* ─── manifest slide ────────────────────────────────────────────────────── */
const MANIFEST_ROWS = [
  ["SHIPPER",            "NOKIA CORP.  /  HELSINKI, FI"],
  ["CONSIGNEE",          "PACIFIC TRADE GROUP  /  TOKYO"],
  ["ROUTE",              "TRANS-SIBERIAN RAILWAY  —  BATCH 441-B"],
  ["ORIGIN TERMINAL",    "HELSINKI CENTRAL FREIGHT"],
  ["DEST. TERMINAL",     "TOKYO SHIMBASHI, JAPAN"],
  ["DECLARED CONTENTS",  "CONSUMER ELECTRONICS"],
  ["GROSS WEIGHT (KG)",  "24 800"],
] as const;

function ManifestSlide({ slide }: { slide: Slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", maxWidth: 860, margin: "0 auto", padding: "0 40px" }}>
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
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 6vw, 72px)", color: WHITE, lineHeight: 1.05, letterSpacing: "0.02em", marginBottom: 28 }}
      >
        {slide.headline}
      </motion.h2>

      {/* manifest document */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        style={{
          background: "#EDE8D5",
          borderRadius: 3,
          padding: "20px 24px",
          position: "relative",
          overflow: "hidden",
          marginBottom: 28,
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}
      >
        {/* document header */}
        <div style={{ borderBottom: "2px solid #2A1F08", marginBottom: 16, paddingBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.28em", color: "#2A1F08", textTransform: "uppercase", margin: 0, fontWeight: 700 }}>
            International Cargo Manifest
          </p>
          <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.15em", color: "#2A1F08", opacity: 0.6, margin: 0 }}>
            Form T-7  ·  1974
          </p>
        </div>

        {/* rows */}
        {MANIFEST_ROWS.map(([key, val], i) => (
          <div
            key={i}
            style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 12, borderBottom: "0.5px solid rgba(42,31,8,0.2)", paddingBottom: 7, marginBottom: 7 }}
          >
            <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.18em", color: "#2A1F08", opacity: 0.6, textTransform: "uppercase" }}>
              {key}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.08em", color: "#1A1008", fontWeight: key === "DECLARED CONTENTS" ? 700 : 400 }}>
              {val}
            </span>
          </div>
        ))}

        {/* stamp: wrapper handles centering + rotation, motion handles opacity only */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ transform: "rotate(-7deg)" }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ delay: 0.75, duration: 0.15 }}
              style={{
                border: `3px solid ${BLUE}`,
                padding: "6px 20px",
                borderRadius: 3,
                color: BLUE,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 44,
                letterSpacing: "0.1em",
              }}
            >
              ELECTRONICS
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* closing question */}
      {slide.body && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.45 }}
          style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "clamp(17px, 2.3vw, 24px)", color: WHITE, opacity: 0.85, lineHeight: 1.55, fontStyle: "italic" }}
        >
          {slide.body}
        </motion.p>
      )}
    </div>
  );
}

/* ─── slide router ─────────────────────────────────────────────────────── */
function SlideContent({ slide }: { slide: Slide }) {
  switch (slide.variant) {
    case "title":    return <TitleSlide />;
    case "briefing": return <BriefingSlide slide={slide} />;
    case "deal":     return <DealSlide slide={slide} />;
    case "manifest": return <ManifestSlide slide={slide} />;
    case "nothing":  return <NothingSlide slide={slide} />;
    case "fish":     return <FishSlide slide={slide} />;
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
