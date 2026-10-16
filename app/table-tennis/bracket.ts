// Single-elimination bracket. Players are identified by seed (1-based index
// into the player list). Brackets are padded to the next power of two; the top
// seeds get byes in round 0 and advance automatically.

export type Match = {
  round: number;
  index: number;
  key: string;
  a: number | null; // seed, or null if undecided / bye
  b: number | null;
  bye: boolean;
  winner: number | null;
};

export type Picks = Record<string, number>;

export function bracketSize(playerCount: number) {
  let size = 2;
  while (size < playerCount) size *= 2;
  return size;
}

// Standard seeding order: 1 v 64, 32 v 33, ... so top seeds meet as late as possible.
function seedOrder(size: number) {
  let order = [1];
  while (order.length < size) {
    const len = order.length * 2;
    order = order.flatMap((s) => [s, len + 1 - s]);
  }
  return order;
}

// Derives every match from the picks. Picks that no longer fit (e.g. a player
// knocked out by an earlier change) are dropped from the returned picks.
export function buildBracket(playerCount: number, picks: Picks) {
  const size = bracketSize(playerCount);
  const order = seedOrder(size);
  const rounds: Match[][] = [];
  const kept: Picks = {};

  for (let r = 0, count = size / 2; count >= 1; r++, count /= 2) {
    const round: Match[] = [];
    for (let i = 0; i < count; i++) {
      const key = `${r}-${i}`;
      let a: number | null;
      let b: number | null;
      let bye = false;

      if (r === 0) {
        a = order[2 * i] <= playerCount ? order[2 * i] : null;
        b = order[2 * i + 1] <= playerCount ? order[2 * i + 1] : null;
        bye = a === null || b === null;
      } else {
        a = rounds[r - 1][2 * i].winner;
        b = rounds[r - 1][2 * i + 1].winner;
      }

      let winner: number | null = null;
      if (bye) {
        winner = a ?? b;
      } else if (a !== null && b !== null && (picks[key] === a || picks[key] === b)) {
        winner = picks[key];
        kept[key] = winner;
      }

      round.push({ round: r, index: i, key, a, b, bye, winner });
    }
    rounds.push(round);
  }

  return { rounds, picks: kept };
}

export function roundName(matchCount: number) {
  if (matchCount === 1) return "Final";
  if (matchCount === 2) return "Semifinals";
  if (matchCount === 4) return "Quarterfinals";
  return `Round of ${matchCount * 2}`;
}
