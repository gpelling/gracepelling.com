export type SlideVariant = "title" | "intro" | "section" | "evidence" | "theory" | "question" | "end";

export interface TheoryItem {
  num: string;
  title: string;
  body: string;
}

export interface Slide {
  id: number;
  variant: SlideVariant;
  headline?: string;
  // title
  logoText?: string;
  subtitle?: string;
  classifiedText?: string;
  tagline?: string;
  // intro
  docId?: string;
  paragraphs?: string[];
  noteText?: string;
  // section
  fileNumber?: string;
  aliases?: string;
  evidenceTag?: string;
  // evidence
  caseId?: string;
  slideTitle?: string;
  statusLabel?: string;
  imgSrc?: string;
  imgAlt?: string;
  imgFallbackEmoji?: string;
  imgFallbackLabel?: string;
  photoLabel?: string;
  subjectName?: string;
  evidenceItems?: string[];
  verdictLabel?: string;
  verdictText?: string;
  // theory
  theoryItems?: TheoryItem[];
  // question
  questionBody?: string[];
  questionSub?: string;
  // end
  endTagline?: string;
  endBody?: string;
  endClosing?: string;
}

export const slides: Slide[] = [
  {
    id: 0,
    variant: "title",
    logoText: "★ CERN // CLASSIFIED INCIDENT REPORT ★ TIMELINE ALPHA-7 ★",
    headline: "OPERATION\nTIMELINE SHIFT",
    subtitle: "We Have Been Here Before. Sort Of.",
    classifiedText: "⚠ CLASSIFIED // TEMPORAL CLEARANCE REQUIRED ⚠",
    tagline: "A Presentation of Evidence // Case File Ω-2008-LHC\nCompiled by the Office of Unexplained Continuity Errors",
  },
  {
    id: 1,
    variant: "intro",
    docId: "INCIDENT BRIEF // REF: Ω-2008-LHC // SEPTEMBER 10, 2008",
    headline: "THE PREMISE",
    paragraphs: [
      "On September 10, 2008, CERN activated the Large Hadron Collider for the first time. The stated objective: find the Higgs boson — the particle that gives all matter its mass. The experiment was *declared a success.*",
      "This document is a record of **what else happened.**",
    ],
    noteText: '"The universe we inhabit might be just one of an infinite number of universes."\n-- Dr. Brian Greene, Columbia University. He said this *before* the activation. He has not walked it back.',
  },
  {
    id: 2,
    variant: "section",
    fileNumber: "INCIDENT LOG 001 // THE FIRST BEAM",
    headline: "SEPTEMBER\n10, 2008",
    aliases: 'Reference: CERN Press Release PR08.09 // Status: "Routine Scientific Experiment"',
    evidenceTag: "CLASSIFICATION: THE DAY EVERYTHING CHANGED",
  },
  {
    id: 3,
    variant: "evidence",
    caseId: "LOG 001-A",
    slideTitle: "THE LHC // ACTIVATION RECORD",
    statusLabel: "● TIMELINE BREACH SUSPECTED",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/CERN_LHC_Tunnel1.jpg/1200px-CERN_LHC_Tunnel1.jpg",
    imgAlt: "LHC tunnel at CERN",
    imgFallbackEmoji: "⚛",
    imgFallbackLabel: "LHC TUNNEL\nCERN FACILITY\n[IMAGE CLASSIFIED]",
    photoLabel: "EXHIBIT A // LHC Tunnel // Sector 3-4 // 27km circumference // France-Switzerland border",
    subjectName: "THE LARGE HADRON COLLIDER",
    evidenceItems: [
      "27-kilometer ring beneath the France-Switzerland border. Protons accelerated to 99.9999991% the speed of light and collided at energies of 13 teraelectronvolts. *For reference: no one fully knows what a teraelectronvolt is.*",
      "At 10:28 AM Geneva time on September 10, 2008, the first beam successfully circulated the entire ring. CERN staff applauded. The timeline divergence, analysts believe, *had already occurred.*",
      "The Higgs boson was not confirmed until July 4, 2012. What exactly the machine was doing between 2008 and 2012 *has not been explained to this office's satisfaction.*",
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: 'CERN\'s own documentation shows that in the microseconds following first beam, something "unexpected" happened with the beam monitoring systems. This was attributed to "calibration issues." This office does not accept that explanation.',
  },
  {
    id: 4,
    variant: "section",
    fileNumber: "INCIDENT LOG 002 // THE FIRST ANOMALY",
    headline: "THE MANDELA\nEFFECT",
    aliases: "Coined: Fiona Broome, 2009 // One Year After Activation // Coincidence: Not Assessed",
    evidenceTag: "CLASSIFICATION: COLLECTIVE MEMORY CORRUPTION",
  },
  {
    id: 5,
    variant: "evidence",
    caseId: "LOG 002-A",
    slideTitle: "EXHIBIT A // THE BEARS",
    statusLabel: "● MILLIONS OF WITNESSES",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Berenstain_Bears_Logo.svg/1200px-Berenstain_Bears_Logo.svg.png",
    imgAlt: "Berenstain Bears logo",
    imgFallbackEmoji: "🐻",
    imgFallbackLabel: "BERENSTAIN BEARS\nLOGO\n[SPELLING: DISPUTED]",
    photoLabel: "EXHIBIT A // The Berenstain Bears // Spelled: A-I-N // You remember: E-I-N",
    subjectName: "THE MEMORY ANOMALIES",
    evidenceItems: [
      "The Berenstain Bears. Spelled **B-E-R-E-N-S-T-A-I-N**. Millions of people, independently, across multiple countries, remember it as Berenstein. With an E. This is not a typo. It is a shared memory of a different spelling in a different timeline.",
      "Nelson Mandela. *Died in prison in the 1980s.* Attended by millions of memories — news coverage, a funeral, a speech by his widow. In this timeline: he was released in 1990, became President, and died in 2013. His 1980s widow gave no speech.",
      "The Monopoly Man. Top hat. Monocle. Except: he has *never* worn a monocle in this timeline. The monocle is gone. You remember the monocle. You can picture it clearly. It is not there.",
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: "These are not random errors. They share a pattern: confident, specific, cross-cultural, and all impossible in the current timeline. The first documented reports emerged **exactly one year** after the LHC activation.",
  },
  {
    id: 6,
    variant: "section",
    fileNumber: "INCIDENT LOG 003 // CATALOG OF DIVERGENCE",
    headline: "THE CATALOG",
    aliases: "Ongoing Documentation // 200+ Verified Cases // Pattern Analysis: COMPLETE",
    evidenceTag: "CLASSIFICATION: SYSTEMATIC",
  },
  {
    id: 7,
    variant: "evidence",
    caseId: "LOG 003-A",
    slideTitle: "EXHIBIT B // THE FILM THAT DOESN'T EXIST",
    statusLabel: "● NO RECORD FOUND",
    imgFallbackEmoji: "🎥",
    imgFallbackLabel: "SHAZAAM (1994)\nDIRECTED BY: UNKNOWN\n[NO RECORD EXISTS]",
    photoLabel: "EXHIBIT B // Shazaam // c. 1994 // Starring: Sinbad // Genre: Family // Status: Does Not Exist",
    subjectName: "SHAZAAM",
    evidenceItems: [
      "In the mid-1990s, comedian Sinbad starred in a film called Shazaam. He played a genie. Thousands of people remember watching it. They remember the VHS box. *They remember specific scenes.* Several can describe the plot in detail.",
      "The film **does not exist**. No production record. No studio credit. No IMDB entry. Sinbad has personally denied it hundreds of times across three decades of interviews. He appears genuinely exhausted by the denial.",
      "In 2017, Sinbad posted a video appearing to confirm the film — as a joke. The internet treated it as **proof**. He deleted it. The deletion was also treated as proof.",
      "Unlike most misrememberings, Shazaam witnesses provide consistent details: same approximate year, same actor, same genre, similar plot. Memory researchers note that false memories rarely align this precisely across unconnected individuals.",
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: "This is not a misheard lyric or a misread logo. This is thousands of people sharing a **detailed, specific memory** of an entire film that simply does not exist in this timeline.",
  },
  {
    id: 8,
    variant: "evidence",
    caseId: "LOG 003-B",
    slideTitle: "EXHIBIT C // ADDITIONAL DIVERGENCES",
    statusLabel: "● PATTERN CONFIRMED",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/CERN_Aerial_View.jpg/1200px-CERN_Aerial_View.jpg",
    imgAlt: "CERN aerial view",
    imgFallbackEmoji: "🔬",
    imgFallbackLabel: "CERN CAMPUS\nAERIAL SURVEILLANCE\n[IMAGE CLASSIFIED]",
    photoLabel: "EXHIBIT C // CERN Aerial // Geneva, Switzerland // Source of the anomaly",
    subjectName: "THE DIVERGENCE LOG",
    evidenceItems: [
      "Kit-Kat. No hyphen. Never had one in this timeline. You are certain there was a hyphen. There is no hyphen. \"Kit Kat\" has been the brand name since 1935, according to records that now exist.",
      "\"*Mirror, mirror on the wall*\" — the Evil Queen never said this in Snow White. It was \"Magic mirror on the wall.\" You have been quoting a line from a film that is not the film you watched. The original is available for streaming. *You will still remember it wrong.*",
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: "The pattern is not that people are wrong. The pattern is that people are **wrong in the same direction**, from the same origin point, after the same date. Something rewrote the source. The question is what.",
  },
  {
    id: 9,
    variant: "section",
    fileNumber: "INCIDENT LOG 004 // JULY 4, 2012",
    headline: "THE GOD\nPARTICLE",
    aliases: 'Higgs Boson // Confirmed July 4, 2012 // The Thing That Makes Matter Real',
    evidenceTag: "CLASSIFICATION: WHAT DID IT ACTUALLY DO",
  },
  {
    id: 10,
    variant: "evidence",
    caseId: "LOG 004-A",
    slideTitle: "THE HIGGS BOSON // WHY WAS IT CALLED THAT",
    statusLabel: "● IMPLICATIONS: UNRESOLVED",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/CMS_Higgs-event.jpg/1200px-CMS_Higgs-event.jpg",
    imgAlt: "CMS Higgs boson collision event",
    imgFallbackEmoji: "💥",
    imgFallbackLabel: "HIGGS BOSON\nCOLLISION EVENT\n[IMAGE CLASSIFIED]",
    photoLabel: "EXHIBIT A // CMS detector // Higgs boson candidate event // July 4, 2012 // The moment they found God",
    subjectName: "THE HIGGS BOSON",
    evidenceItems: [
      "The Higgs boson is the particle that gives all other particles their mass. Without it, matter as we understand it cannot exist. CERN fired protons at each other at near-light speed until they found *the thing that makes everything real.* This was considered a success.",
      "Journalist Leon Lederman named it the **\"God Particle\"** in 1993. CERN has publicly distanced itself from this name for thirty years. CERN named a particle the God Particle and then said they did not name it that. This is the organization in charge of the machine.",
      "When the discovery was announced, Peter Higgs — who predicted the particle's existence in 1964 — was observed *openly weeping.* When asked why: he said he never thought he would live to see it confirmed. This is either moving or alarming depending on what you think was confirmed.",
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: "We are not saying finding the Higgs boson was dangerous. We are saying no one has definitively explained what happens to a timeline when you locate and isolate *the particle responsible for holding it together.*",
  },
  {
    id: 11,
    variant: "question",
    headline: "WHICH\nUNIVERSE\nARE WE IN?",
    questionBody: [
      "The evidence is not in the physics. It is in the memory. Millions of people, across the world, sharing the **same false recollections**, from the **same origin point**, after the **same machine was activated**.",
      "*One of these memories is yours. You know which one.*",
      "The LHC is still running. CERN is still colliding particles.\nWe are still drifting.",
    ],
    questionSub: "CASE FILE Ω-2008-LHC // STATUS: OPEN // THE INVESTIGATION: ONGOING",
  },
  {
    id: 12,
    variant: "theory",
    headline: "THE OPERATIONAL THEORY",
    theoryItems: [
      { num: "01", title: "THE BREACH", body: "The LHC did not destroy the universe. It did something *subtler*. It nudged our timeline by a quantum margin — not enough to notice immediately, but enough to make the recent past slightly wrong." },
      { num: "02", title: "THE DRIFT", body: "Collective memory does not migrate cleanly between timelines. Millions of people carried memories from the original reality into the new one. Those memories are not wrong. They are correct. **For the wrong universe.**" },
      { num: "03", title: "THE COVER", body: "CERN publicly framed the Higgs discovery as purely theoretical. The operational implications of finding the particle that governs mass at every scale **have not been disclosed**." },
      { num: "04", title: "THE QUESTION", body: "If we are in the wrong timeline, what was in the original? And does that timeline still exist? And if so: are they running their own version of this presentation? *And are they closer to the answer?*" },
    ],
  },
  {
    id: 13,
    variant: "end",
    headline: "WE ARE\nSTILL HERE",
    endTagline: "Wherever \"here\" is.",
    endBody: 'Compiled from publicly available information, CERN press releases, and memories that cannot be verified because the original source no longer exists in this timeline.\n\nIf you remember the Berenstein Bears: you are not alone. There are millions of you. Welcome to the wrong timeline.\n\nIf a CERN physicist is reading this: please explain the June 2008 pre-activation tests. Specifically the ones that are not in the public record.',
    endClosing: "★ OFFICE OF UNEXPLAINED CONTINUITY ERRORS // CASE FILE Ω-2008-LHC // END OF PRESENTATION ★",
  },
];
