"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import styles from "./bracket.module.css";
import { bracketSize, buildBracket, roundName, type Match, type Picks } from "./bracket";

const STORAGE_KEY = "table-tennis-tournament";

type Tournament = { players: string[]; picks: Picks };

function parseNames(text: string) {
  return text.split("\n").map((line) => line.trim()).filter(Boolean);
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function loadTournament(): Tournament | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const noopSubscribe = () => () => {};

// The page is prerendered as static HTML, so wait for the browser before
// reading saved results to avoid a hydration mismatch.
export default function TableTennis() {
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!isClient) return <div className={styles.page} />;
  return <TournamentApp />;
}

function TournamentApp() {
  const [tournament, setTournament] = useState<Tournament | null>(loadTournament);
  const [draft, setDraft] = useState("");

  // Results live in this browser only: the site is a static export.
  useEffect(() => {
    try {
      if (tournament) localStorage.setItem(STORAGE_KEY, JSON.stringify(tournament));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [tournament]);

  if (!tournament) {
    return (
      <Setup
        draft={draft}
        onChange={setDraft}
        onStart={(players) => setTournament({ players, picks: {} })}
      />
    );
  }

  return (
    <Bracket
      tournament={tournament}
      onChange={setTournament}
      onEditPlayers={() => {
        setDraft(tournament.players.join("\n"));
        setTournament(null);
      }}
    />
  );
}

function Title() {
  return (
    <h1 className={styles.title}>
      Table Tennis <span>Tournament</span>
    </h1>
  );
}

function Setup({
  draft,
  onChange,
  onStart,
}: {
  draft: string;
  onChange: (text: string) => void;
  onStart: (players: string[]) => void;
}) {
  const names = parseNames(draft);
  const n = names.length;
  const size = bracketSize(n);
  const byes = size - n;
  const rounds = Math.log2(size);

  return (
    <div className={styles.page}>
      <div className={styles.setup}>
        <Title />
        <p className={styles.subtitle}>One name per line. List order sets the seeding.</p>

        <textarea
          className={styles.textarea}
          value={draft}
          onChange={(e) => onChange(e.target.value)}
          placeholder={"Player 1\nPlayer 2\nPlayer 3\n…"}
          spellCheck={false}
        />

        <p className={styles.hint}>
          {n < 2
            ? "Add at least 2 players."
            : `${n} players · ${rounds} rounds` +
              (byes > 0 ? ` · ${n - size / 2} play-in matches · top ${byes} seeds get a bye` : "")}
        </p>

        <div className={styles.actions}>
          <button
            className={styles.button}
            disabled={n < 2}
            onClick={() => onChange(shuffle(names).join("\n"))}
          >
            Shuffle order
          </button>
          <button
            className={`${styles.button} ${styles.primary}`}
            disabled={n < 2}
            onClick={() => onStart(names)}
          >
            Start tournament
          </button>
        </div>
      </div>
    </div>
  );
}

function Bracket({
  tournament,
  onChange,
  onEditPlayers,
}: {
  tournament: Tournament;
  onChange: (t: Tournament) => void;
  onEditPlayers: () => void;
}) {
  const { players } = tournament;
  const { rounds } = buildBracket(players.length, tournament.picks);

  // Round 0 with byes is shown as a separate play-in strip; the tree starts after it.
  const hasPlayIn = rounds[0].some((m) => m.bye);
  const playIn = hasPlayIn ? rounds[0].filter((m) => !m.bye) : [];
  const tree = hasPlayIn ? rounds.slice(1) : rounds;
  const byes = players.length - playIn.length * 2;
  const playInNumber = new Map(playIn.map((m, i) => [m.key, i + 1]));

  const realMatches = rounds.flat().filter((m) => !m.bye);
  const decided = realMatches.filter((m) => m.winner !== null).length;
  const champion = rounds[rounds.length - 1][0].winner;

  function pick(match: Match, seed: number) {
    const next = { ...tournament.picks };
    if (next[match.key] === seed) delete next[match.key];
    else next[match.key] = seed;
    // Rebuilding drops later picks for anyone no longer in the running.
    onChange({ players, picks: buildBracket(players.length, next).picks });
  }

  // Label for an empty slot in the tree, pointing at the match that fills it.
  function placeholder(match: Match, side: 0 | 1) {
    if (hasPlayIn && match.round === 1) {
      const source = rounds[0][match.index * 2 + side];
      const number = playInNumber.get(source.key);
      if (number) return `Play-in ${number} winner`;
    }
    return "TBD";
  }

  const card = (match: Match, label?: string) => (
    <MatchCard
      match={match}
      players={players}
      label={label}
      placeholders={[placeholder(match, 0), placeholder(match, 1)]}
      onPick={pick}
    />
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Title />
        <p className={styles.subtitle}>
          {players.length} players · {decided} of {realMatches.length} matches played · click a name to
          advance them
        </p>
        <div className={styles.actions}>
          <ConfirmButton
            label="Edit players"
            confirmLabel="Clears results — click again"
            needsConfirm={decided > 0}
            onConfirm={onEditPlayers}
          />
          <ConfirmButton
            label="Reset results"
            confirmLabel="Click again to reset"
            needsConfirm
            disabled={decided === 0}
            onConfirm={() => onChange({ players, picks: {} })}
          />
        </div>
      </header>

      {champion !== null && (
        <div className={styles.banner}>
          <div className={styles.bannerLabel}>Champion</div>
          <div className={styles.bannerName}>{players[champion - 1]}</div>
        </div>
      )}

      {hasPlayIn && (
        <section className={styles.section}>
          <h2 className={styles.sectionLabel}>Play-in</h2>
          <p className={styles.sectionHint}>
            {byes === 1 ? "Seed 1 has" : `Seeds 1–${byes} have`} a bye into the {roundName(tree[0].length)}.
          </p>
          <div className={styles.playIn}>
            {playIn.map((m, i) => (
              <div key={m.key}>{card(m, `Play-in ${i + 1}`)}</div>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.scroller}>
          <div className={styles.bracket}>
            {tree.map((round, r) => (
              <div key={r} className={styles.column}>
                <div className={styles.columnHead}>{roundName(round.length)}</div>
                <div className={styles.columnBody}>
                  {round.length === 1 ? (
                    <div className={styles.slot}>{card(round[0])}</div>
                  ) : (
                    pairs(round).map(([top, bottom]) => (
                      <div key={top.key} className={styles.pair}>
                        {[top, bottom].map((m) => (
                          <div key={m.key} className={styles.slot}>
                            {card(m)}
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Two-click confirm. window.confirm() is blocked in some browsers and embedded
// views, where it returns false without showing anything.
function ConfirmButton({
  label,
  confirmLabel,
  needsConfirm,
  disabled,
  onConfirm,
}: {
  label: string;
  confirmLabel: string;
  needsConfirm: boolean;
  disabled?: boolean;
  onConfirm: () => void;
}) {
  const [armed, setArmed] = useState(false);

  return (
    <button
      className={`${styles.button} ${armed ? styles.primary : ""}`}
      disabled={disabled}
      onClick={() => {
        if (needsConfirm && !armed) return setArmed(true);
        setArmed(false);
        onConfirm();
      }}
      onBlur={() => setArmed(false)}
    >
      {armed ? confirmLabel : label}
    </button>
  );
}

function pairs<T>(items: T[]) {
  const out: [T, T][] = [];
  for (let i = 0; i < items.length; i += 2) out.push([items[i], items[i + 1]]);
  return out;
}

function MatchCard({
  match,
  players,
  label,
  placeholders,
  onPick,
}: {
  match: Match;
  players: string[];
  label?: string;
  placeholders: [string, string];
  onPick: (match: Match, seed: number) => void;
}) {
  const ready = match.a !== null && match.b !== null;

  return (
    <div className={styles.card}>
      {label && <div className={styles.cardLabel}>{label}</div>}
      {[match.a, match.b].map((seed, side) => {
        const state =
          match.winner === null || seed === null ? "" : match.winner === seed ? styles.winner : styles.loser;
        return (
          <button
            key={side}
            className={`${styles.player} ${state}`}
            disabled={!ready}
            aria-pressed={ready && match.winner === seed}
            onClick={() => onPick(match, seed!)}
          >
            <span className={styles.seed}>{seed ?? ""}</span>
            <span className={`${styles.name} ${seed === null ? styles.tbd : ""}`}>
              {seed !== null ? players[seed - 1] : placeholders[side]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
