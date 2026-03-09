export type SlideVariant = "default" | "title" | "briefing" | "stats" | "zoom" | "curtain" | "railway";

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
    label: "POST-WWII, 1945",
    headline: "Japan needs fish. Russia needs money. A deal is struck.",
    body: "International fishing regulations made mass harvesting politically impossible. Two nations looked at the Baltic Sea and saw opportunity. All they needed was a country.",
    variant: "default",
  },
  {
    id: 4,
    label: "THE PLAN",
    headline: "They invent a country.",
    body: "They needed a name. Something Nordic. Something plausible. Something that would never raise suspicion.\n\nWhat do fish have?\n\nFins.",
    variant: "default",
  },
  {
    id: 5,
    label: "NOKIA",
    headline: "Nokia is Finnish. Japan is their biggest customer.",
    body: "Japan makes Sony. Panasonic. Sharp. Fujitsu. They don't import phones — they export them.\n\nAnd yet: Japan buys more Nokia than anywhere else on earth. No Japanese person owns one.\n\nSo what's actually in the boxes?",
    variant: "default",
  },
  {
    id: 6,
    label: "THE RAILWAY",
    headline: "9,289 kilometres.",
    body: "The Trans-Siberian Railway. The longest railway on earth. Built to move \u201cNokia products\u201d from the Baltic coast to Japan. Every cargo manifest stamped: ELECTRONICS. Every crate full of fish.",
    variant: "railway",
  },
  {
    id: 7,
    label: "THE NAME",
    headline: "\"Suomi\" means swamp land.",
    body: "That's what Finns supposedly call their own country. Not Finland. Suomi. Because that's what Sweden's eastern wetlands actually are: a swamp. They didn't even bother to invent a real name.",
    variant: "default",
  },
  {
    id: 8,
    label: "TOO PERFECT",
    headline: "Suspiciously perfect for a place that doesn't exist.",
    body: "#1 in happiness\n#1 in education\n#1 in coffee consumption per capita",
    variant: "stats",
  },
  {
    id: 9,
    label: "THE TRUTH",
    headline: "THE TRUTH IS FINNLY VEILED",
    variant: "zoom",
  },
  {
    id: 10,
    label: "WAKE UP",
    headline: "The Swedish Fish in your hand is the only Finland that's real.",
    body: "You've been holding the evidence this whole time.",
    variant: "curtain",
  },
];
