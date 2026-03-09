export type SlideVariant = "default" | "title" | "briefing" | "stats" | "zoom" | "curtain" | "railway" | "deal" | "fish" | "manifest" | "nothing";

export interface Slide {
  id: number;
  label?: string;
  headline: string;
  body?: string;
  variant: SlideVariant;
}

export const slides: Slide[] = [
  {
    id: 1,
    headline: "FINLAND DOES NOT EXIST",
    variant: "title",
  },
  {
    id: 2,
    label: "THE BRIEFING",
    headline: "You've been lied to your whole life.",
    body: "Every map. Every textbook. Every Finnish person you think you've met. All part of the same cover-up. Tonight, we end the silence.",
    variant: "briefing",
  },
  {
    id: 3,
    label: "SO HOW DID THIS START?",
    headline: "First, a WW2 lesson.",
    body: "Japan needs food.\n1945. The war is over. 70 million people, a ruined economy, and fishing grounds stripped by decades of conflict.\n\nRussia needs money.\nThe USSR is rebuilding. Hard currency. The kind of arrangement that never gets written down.",
    variant: "default",
  },
  {
    id: 4,
    label: "POST-WWII, 1945",
    headline: "A deal is struck.",
    body: "Japan gets unlimited fish from the Baltic Sea.\nRussia gets hard currency, off the books.\n\nAll they need is a country to ship it through.",
    variant: "deal",
  },
  {
    id: 5,
    label: "THE PLAN",
    headline: "They invent a country.",
    body: "They needed a name. Something Nordic. Something plausible. Something that would never raise suspicion.\n\nThey needed borders. A flag. A language. 5.5 million actors.\n\nThey needed it to look real.",
    variant: "default",
  },
  {
    id: 6,
    label: "THE EVIDENCE",
    headline: "Japan manufactures electronics. It does not import them.",
    body: "Sony. Panasonic. Sharp. Fujitsu. The biggest names in consumer tech are all Japanese.\n\nAnd yet: Japan buys more Nokia than anywhere else on Earth. No Japanese person owns one.",
    variant: "default",
  },
  {
    id: 7,
    label: "THE RAILWAY",
    headline: "9,289 kilometres.",
    body: "The Trans-Siberian Railway. The longest railway on Earth.\nCompleted 1916. Built to move Russian troops to fight Japan. They lost.\n\nThe railway stayed open.\n\nDecades later, it started running again. Same route — Baltic coast to Tokyo.\n\nWho was using it?",
    variant: "railway",
  },
  {
    id: 8,
    label: "THE MANIFEST",
    headline: "Every route. Same cargo manifest.",
    body: "But what should actually be on the manifest?",
    variant: "manifest",
  },
  {
    id: 9,
    headline: "FISH.",
    variant: "fish",
  },
  {
    id: 10,
    label: "THE GEOGRAPHY",
    headline: "And the country itself?",
    variant: "zoom",
  },
  {
    id: 11,
    headline: "NOTHING.",
    variant: "nothing",
  },
  {
    id: 12,
    label: "THE NAME",
    headline: "\"Suomi\" means swamp land.",
    body: "That's what Finns supposedly call their own country. Not Finland. Suomi. Because that's what Sweden's eastern wetlands actually are: a swamp. They didn't even bother to invent a real name.",
    variant: "default",
  },
  {
    id: 13,
    label: "TOO PERFECT",
    headline: "Suspiciously perfect for a place that doesn't exist.",
    body: "#1 in happiness\n#1 in education\n#1 in coffee consumption per capita\n\nNo real country tops every list. Cover stories do.",
    variant: "stats",
  },
  {
    id: 14,
    label: "THE TRUTH",
    headline: "THE TRUTH IS FINNLY VEILED",
    variant: "zoom",
  },
  {
    id: 15,
    label: "WAKE UP",
    headline: "The Swedish Fish in your hand is the only Finland that's real.",
    body: "What do fish have? Fins.\n\nTell a Finn. Watch their face.",
    variant: "curtain",
  },
];
