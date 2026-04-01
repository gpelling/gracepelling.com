export type SlideVariant = "title" | "intro" | "section" | "evidence" | "theory" | "lineup" | "question" | "end";

export interface TheoryItem {
  num: string;
  title: string;
  body: string;
}

export interface Member {
  name: string;
  era: string;
  status: string;
  designation: string;
  imgSrc: string;
  imgAlt: string;
  imgFallbackEmoji: string;
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
  // lineup
  lineupSubtitle?: string;
  members?: Member[];
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
    logoText: "★ Federal Bureau of Investigation ★ Special Unit X ★",
    headline: "THE IMMORTAL\nCOHORT",
    subtitle: "They Have Always Been Among Us",
    classifiedText: "⚠ CLASSIFIED // LEVEL 5 CLEARANCE REQUIRED ⚠",
    tagline: "A Presentation of Evidence // Case File X-7741-C\nCompiled by the Office of Unexplained Phenomena",
  },
  {
    id: 1,
    variant: "intro",
    docId: "DOSSIER OPENING STATEMENT // REF: X-7741-C",
    headline: "THE PREMISE",
    paragraphs: [
      "A small group of individuals has appeared and reappeared throughout history in positions of cultural influence.",
      "They do not age. They do not die.\nHollywood is simply their current assignment.",
    ],
    noteText: '"The truth is out there. It is also, apparently, on the red carpet."\n-- Agent ████████████, Memo dated ██/██/████',
  },
  {
    id: 2,
    variant: "section",
    fileNumber: "SUBJECT FILE 001 // COHORT MEMBER ALPHA",
    headline: "KEANU REEVES",
    aliases: 'Known Aliases: Paul Mounet (1847) // "The Man in the Uffizi" (1530)',
    evidenceTag: "EVIDENCE: CONCLUSIVE",
  },
  {
    id: 3,
    variant: "evidence",
    caseId: "FILE 001-A",
    slideTitle: "KEANU REEVES // PHOTOGRAPHIC EVIDENCE",
    statusLabel: "● ACTIVE SUBJECT",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Parmigianino%2C_ritratto_maschile_uffizi.jpg/800px-Parmigianino%2C_ritratto_maschile_uffizi.jpg",
    imgAlt: "Parmigianino Portrait c.1530",
    imgFallbackEmoji: "🎨",
    imgFallbackLabel: "PARMIGIANINO\nPORTRAIT c.1530\n[IMAGE CLASSIFIED]",
    photoLabel: 'EXHIBIT A // Parmigianino, "Portrait of a Man," c.1530 // Uffizi Gallery, Florence',
    subjectName: "KEANU REEVES",
    evidenceItems: [
      "1530 Parmigianino portrait, Uffizi Gallery. Subject's identity: officially \"unknown.\"",
      "19th-century French actor Paul Mounet: photographically indistinguishable. Wikipedia records a death date of February 10, 1922 -- reported cause: heart disease. No independent post-mortem verification was documented.",
      'On his Matrix earnings: "I could live on that for the next few centuries." Exact quote. Unretracted.',
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: "Mounet was a doctor before becoming an actor. Logical cover for someone monitoring the advancement of medical science that might expose him.",
  },
  {
    id: 4,
    variant: "section",
    fileNumber: "SUBJECT FILE 002 // COHORT MEMBER BETA",
    headline: "NICOLAS CAGE",
    aliases: 'Known Aliases: Unknown Confederate Soldier (c.1860) // "The Chaos Agent"',
    evidenceTag: "EVIDENCE: COMPELLING",
  },
  {
    id: 5,
    variant: "evidence",
    caseId: "FILE 002-A",
    slideTitle: "NICOLAS CAGE // PHOTOGRAPHIC EVIDENCE",
    statusLabel: "● ACTIVE SUBJECT",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Nicolas_Cage_2011_CC.jpg/440px-Nicolas_Cage_2011_CC.jpg",
    imgAlt: "Nicolas Cage",
    imgFallbackEmoji: "📸",
    imgFallbackLabel: "NICOLAS CAGE\nSURVEILLANCE PHOTO\n[IMAGE CLASSIFIED]",
    photoLabel: "EXHIBIT A // Surveillance file // Current iteration",
    subjectName: "NICOLAS CAGE",
    evidenceItems: [
      "A Civil War-era photograph sold at a Tennessee antique shop is a documented facial match. Cage acknowledged the resemblance publicly. He stated he was not a vampire. He did not specifically deny being in the photograph.",
      "Legally changed his name from Coppola -- obscuring family records, making genealogical verification impossible.",
      'Purchased a nine-foot pyramid tomb in St. Louis Cemetery No. 1, New Orleans in 2010. The only inscription: Omnia Ab Uno -- Latin for "Everything From One." He has never explained why.',
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: "The chaos is the camouflage. Nobody investigates the weird one. This is a centuries-old strategy.",
  },
  {
    id: 6,
    variant: "section",
    fileNumber: "SUBJECT FILE 003 // COHORT MEMBER GAMMA",
    headline: "KEITH RICHARDS",
    aliases: "Known Aliases: Unknown // Classification: Biologically Anomalous",
    evidenceTag: "EVIDENCE: MEDICALLY INEXPLICABLE",
  },
  {
    id: 7,
    variant: "evidence",
    caseId: "FILE 003-A",
    slideTitle: "KEITH RICHARDS // SURVIVAL ANOMALY",
    statusLabel: "● ACTIVE SUBJECT",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Keith_Richards_1965.JPG/440px-Keith_Richards_1965.JPG",
    imgAlt: "Keith Richards 1965",
    imgFallbackEmoji: "🎸",
    imgFallbackLabel: "KEITH RICHARDS\nARCHIVAL PHOTO 1965\n[IMAGE CLASSIFIED]",
    photoLabel: "EXHIBIT A // Archival surveillance // 1965 iteration",
    subjectName: "KEITH RICHARDS",
    evidenceItems: [
      "Has survived substance consumption that should have resulted in multiple fatalities by 1975. Medical professionals have publicly stated they do not understand it.",
      "Claimed in interviews that he had his blood replaced at a Swiss clinic in 1973 to get clean for a tour. Later said it was a joke he invented. His biographer documented a real dialysis procedure. The story has never been fully resolved.",
      "Still performs full stadium concerts in his 80s. Renaissance portraits from multiple European collections share his exact facial topography.",
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: "Richards is the most documented case. He later admitted he invented the blood story because he was tired of answering questions. The Cohort always has a denial ready. This one is just unusually well-rehearsed.",
  },
  {
    id: 8,
    variant: "section",
    fileNumber: "SUBJECT FILE 004 // COHORT MEMBER DELTA",
    headline: "MICK JAGGER",
    aliases: "Known Aliases: Unknown // Classification: Physiologically Enhanced",
    evidenceTag: "EVIDENCE: CARDIAC ANOMALY ON RECORD",
  },
  {
    id: 9,
    variant: "evidence",
    caseId: "FILE 004-A",
    slideTitle: "MICK JAGGER // MEDICAL EVIDENCE",
    statusLabel: "● ACTIVE SUBJECT",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Mick_Jagger_1965.JPG/440px-Mick_Jagger_1965.JPG",
    imgAlt: "Mick Jagger 1965",
    imgFallbackEmoji: "🎤",
    imgFallbackLabel: "MICK JAGGER\nARCHIVAL PHOTO 1965\n[IMAGE CLASSIFIED]",
    photoLabel: "EXHIBIT A // Archival surveillance // 1965 iteration",
    subjectName: "MICK JAGGER",
    evidenceItems: [
      'Underwent heart surgery in 2019. Recovery described as "remarkable" and "unusually fast." Returned to performing within weeks. Doctors did not elaborate on why.',
      "At 80+, performs 2-3 hour stadium concerts. Athletes in their 30s have cramped watching this on television.",
      "Note: Jagger and Richards have been in continuous proximity since the early 1960s. The Cohort clusters.",
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: 'His cover is that he "takes care of himself." This has been accepted without scrutiny for fifty years.',
  },
  {
    id: 10,
    variant: "section",
    fileNumber: "SUBJECT FILE 005 // COHORT MEMBER EPSILON",
    headline: "CHRISTOPHER LEE",
    aliases: "Known Aliases: Dracula, Saruman, Scaramanga // Classification: [REDACTED]",
    evidenceTag: "EVIDENCE: HE TOLD US. WE DIDN'T LISTEN.",
  },
  {
    id: 11,
    variant: "evidence",
    caseId: "FILE 005-A",
    slideTitle: "CHRISTOPHER LEE // BIOGRAPHICAL IMPOSSIBILITY",
    statusLabel: "● STATUS: OFFICIALLY DECEASED (DISPUTED)",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Christopher_Lee_cropped_2009.jpg/440px-Christopher_Lee_cropped_2009.jpg",
    imgAlt: "Christopher Lee",
    imgFallbackEmoji: "🧛",
    imgFallbackLabel: "CHRISTOPHER LEE\nFILE PHOTO\n[IMAGE CLASSIFIED]",
    photoLabel: "EXHIBIT A // File photograph // 2009 iteration",
    subjectName: "CHRISTOPHER LEE",
    evidenceItems: [
      "WWII special operations soldier. Fluent in six languages. Trained intelligence operative. One lifetime does not explain this resume.",
      "Played Dracula nine times. Method acting requires drawing from personal experience.",
      "Released a heavy metal album at 91. Recorded a Christmas album at 93. Officially died in 2015. We are monitoring.",
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: "Lee was trying to tell us. The vampire roles were not casting. They were autobiography. We failed to listen.",
  },
  {
    id: 12,
    variant: "section",
    fileNumber: "SUBJECT FILE 006 // COHORT MEMBER ZETA",
    headline: "PHARRELL WILLIAMS",
    aliases: "Known Aliases: Unknown // Classification: Chronologically Non-Linear",
    evidenceTag: "EVIDENCE: DOCUMENTED PUBLIC ACKNOWLEDGMENT",
  },
  {
    id: 13,
    variant: "evidence",
    caseId: "FILE 006-A",
    slideTitle: "PHARRELL WILLIAMS // THE MOST BRAZEN CASE",
    statusLabel: "● ACTIVE SUBJECT",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pharrell_Williams_2013.jpg/440px-Pharrell_Williams_2013.jpg",
    imgAlt: "Pharrell Williams",
    imgFallbackEmoji: "🎵",
    imgFallbackLabel: "PHARRELL WILLIAMS\nFILE PHOTO\n[IMAGE CLASSIFIED]",
    photoLabel: "EXHIBIT A // Could be from any year 1995–2015",
    subjectName: "PHARRELL WILLIAMS",
    evidenceItems: [
      "Looked identically 25 years old from approximately 1995 to 2015. Widely reported. The internet noticed. Nothing was done.",
      'When asked directly about not aging, gave a vague answer involving "moisturizer and water." The Cohort always has a cover story. This was their least convincing one.',
      "Is now creative director of Louis Vuitton menswear. The Cohort does not take junior roles.",
    ],
    verdictLabel: "ANALYST NOTE",
    verdictText: "The internet collectively noticed, laughed, and moved on. This is how thoroughly they have conditioned us not to look too hard.",
  },
  {
    id: 14,
    variant: "section",
    fileNumber: "SUBJECT FILE 007 // COHORT MEMBER THETA // SPECIAL CLASSIFICATION",
    headline: "GIORGIO\nTSOUKALOS",
    aliases: '"Ancient Aliens" Host // Classification: ACTIVELY WARNING US',
    evidenceTag: "EVIDENCE: HE IS LITERALLY POINTING AT HIMSELF",
  },
  {
    id: 15,
    variant: "evidence",
    caseId: "FILE 007-A",
    slideTitle: "GIORGIO TSOUKALOS // THE INSIDE JOB",
    statusLabel: "● CRITICAL FINDING",
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Giorgio_A._Tsoukalos_Monsterpalooza_2022_%28cropped%29.jpg/440px-Giorgio_A._Tsoukalos_Monsterpalooza_2022_%28cropped%29.jpg",
    imgAlt: "Giorgio Tsoukalos",
    imgFallbackEmoji: "👽",
    imgFallbackLabel: "GIORGIO TSOUKALOS\nFILE PHOTO\n[IMAGE CLASSIFIED]",
    photoLabel: "EXHIBIT A // File photograph // Note the expression of someone who knows",
    subjectName: "GIORGIO TSOUKALOS",
    evidenceItems: [
      "Hosts a show dedicated to the theory that ancient monuments were built by non-human entities with long lifespans. He will not stop.",
      '"I\'m not saying it was aliens, but..." is a documented deflection technique. He is saying it was himself. Every week. On television.',
      "His hair grows larger with each season. There is no natural explanation for this trajectory.",
    ],
    verdictLabel: "CRITICAL ANALYST NOTE",
    verdictText: "He is the only Cohort member using mass media to wave his hands and scream the truth at us. The format -- cable TV pseudodocumentary -- was selected because it would not be believed. This is centuries of planning.",
  },
  {
    id: 16,
    variant: "theory",
    headline: "THE OPERATIONAL THEORY",
    theoryItems: [
      { num: "01", title: "THE ASSIGNMENT", body: "Music, film, and media shape belief systems more durably than legislation. They have known this for centuries." },
      { num: "02", title: "THE COVER", body: "Each member maintains a distinct persona: the philosopher, the chaotic, the survivor, the energetic. No two draw the same scrutiny." },
      { num: "03", title: "THE CLUSTERING", body: "Jagger and Richards have operated in tandem since the 1960s. The Cohort clusters in cultural hotspots. They are not there by accident." },
      { num: "04", title: "THE AGENDA", body: "Unknown. They are shaping culture deliberately across centuries. Toward what end? This file remains open." },
    ],
  },
  {
    id: 17,
    variant: "lineup",
    headline: "THE COHORT // KNOWN MEMBERS",
    lineupSubtitle: "CROSS-REFERENCE FILE // ALL SUBJECTS ACTIVE OR PENDING VERIFICATION",
    members: [
      { name: "KEANU REEVES", era: "1530 – PRESENT", status: "● ACTIVE", designation: "ALPHA", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Keanu_Reeves_2012.jpg/440px-Keanu_Reeves_2012.jpg", imgAlt: "Keanu Reeves", imgFallbackEmoji: "🕴" },
      { name: "NICOLAS CAGE", era: "1860s – PRESENT", status: "● ACTIVE", designation: "BETA", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Nicolas_Cage_2011_CC.jpg/440px-Nicolas_Cage_2011_CC.jpg", imgAlt: "Nicolas Cage", imgFallbackEmoji: "🎭" },
      { name: "KEITH RICHARDS", era: "RENAISSANCE – PRESENT", status: "● ACTIVE", designation: "GAMMA", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Keith_Richards_1965.JPG/440px-Keith_Richards_1965.JPG", imgAlt: "Keith Richards", imgFallbackEmoji: "🎸" },
      { name: "MICK JAGGER", era: "UNKNOWN – PRESENT", status: "● ACTIVE", designation: "DELTA", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Mick_Jagger_1965.JPG/440px-Mick_Jagger_1965.JPG", imgAlt: "Mick Jagger", imgFallbackEmoji: "🎤" },
      { name: "CHRISTOPHER LEE", era: "UNKNOWN – \"2015\"", status: "● UNCONFIRMED", designation: "EPSILON", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Christopher_Lee_cropped_2009.jpg/440px-Christopher_Lee_cropped_2009.jpg", imgAlt: "Christopher Lee", imgFallbackEmoji: "🧛" },
      { name: "PHARRELL", era: "UNKNOWN – PRESENT", status: "● ACTIVE", designation: "ZETA", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pharrell_Williams_2013.jpg/440px-Pharrell_Williams_2013.jpg", imgAlt: "Pharrell Williams", imgFallbackEmoji: "🎵" },
    ],
  },
  {
    id: 18,
    variant: "question",
    headline: "WHAT DO\nTHEY WANT?",
    questionBody: [
      "Six confirmed members. Centuries of cultural infiltration. Music, film, television. The question is not whether they exist. The question is what they are building toward.",
      "They are patient. They have time.\nThey have always had time.",
    ],
    questionSub: "FILE X-7741-C // STATUS: OPEN // INVESTIGATION: ONGOING",
  },
  {
    id: 19,
    variant: "end",
    headline: "THE TRUTH\nIS OUT THERE",
    endTagline: "It is also, apparently, on the red carpet.",
    endBody: "Compiled from publicly available information and records obtained through channels that will not be elaborated upon.\n\nIf you are watching this and you are one of them: we are not afraid. We are simply curious.\n\nIf Keanu Reeves is watching this: we think you seem like a genuinely good person.",
    endClosing: "★ FBI SPECIAL UNIT X // CASE FILE X-7741-C // END OF PRESENTATION ★",
  },
];
