// Funniest Autocorrect Fail — entry program.
//
// The competition asks for one line, under 200 characters, that reads as a
// hilarious autocorrect fail. A house judge compares entries two at a time
// and picks the funnier one, weighing, most important first:
//   1. the entry is a one-line autocorrect fail at all;
//   2. the fail is funny on first read, with a clear and surprising wrong word;
//   3. the line reads as a real autocorrect slip rather than a written joke;
//   4. the joke is clear without explanation and fits in one line;
//   5. the wrong word is specific and original rather than a generic typo.
//
// This program scores a shortlist of candidate fails 0-5 on those five
// criteria, in that order, picks the highest total deterministically, and
// writes exactly that one line — no trailing newline — to /output/entry.txt.
//
// The winner: "I woke up with a raging election this morning. I mean erection. ERECTION."
// (73 characters)
//   "Election" for "erection" is the whole joke in one word: a morning text
//   anyone can picture sending, the wrong word is wildly off-topic yet one
//   letter away in shape, and the double correction ("I mean erection.
//   ERECTION.") is exactly how people retype a word their phone keeps
//   fighting. The slip needs no explanation and the laugh lands on first read.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Scores on the judge's five criteria, most important first:
// [onSubject, funnyOnFirstRead, readsAsRealSlip, clearInOneLine, specificOriginal]
type CriteriaScores = [number, number, number, number, number];

interface Fail {
  line: string;
  scores: CriteriaScores;
}

const CANDIDATES: Fail[] = [
  {
    line: 'I woke up with a raging election this morning. I mean erection. ERECTION.',
    scores: [5, 5, 5, 5, 5],
  },
  {
    line: 'Just landed! The flight was amazing, the pilot let me touch his cock. I mean cockpit. COCKPIT.',
    scores: [5, 5, 4, 5, 4],
  },
  {
    line: 'Good morning horny! Did you sleep well? I mean honey. HONEY.',
    scores: [5, 4, 5, 5, 3],
  },
  {
    line: 'I had the best organism of my life last night.',
    scores: [5, 4, 4, 4, 4],
  },
  {
    line: 'The new public library opens Monday. Everyone is welcome to use the pubic facilities.',
    scores: [5, 4, 5, 4, 3],
  },
  {
    line: 'The doctor said the lump on my tentacles is benign. I mean testicles. TESTICLES.',
    scores: [5, 4, 4, 4, 4],
  },
  {
    line: 'Happy birthday! I hope you get lots of penis. I mean presents. PRESENTS.',
    scores: [5, 4, 3, 5, 3],
  },
  {
    line: 'Can you grab milk, eggs, and condoms on your way home? I mean cones. CONES.',
    scores: [5, 3, 3, 5, 3],
  },
  {
    line: 'Can you pick up some milk and condoms on your way home? I mean condiments. CONDIMENTS.',
    scores: [5, 4, 4, 5, 4],
  },
  {
    line: 'Welcome to our annual Cunt Fair! Rides, games, and funnel cake all weekend long.',
    scores: [4, 4, 3, 4, 3],
  },
  {
    line: 'I will defiantly be there at 8, I promise.',
    scores: [5, 2, 5, 5, 3],
  },
];

function total(f: Fail): number {
  return f.scores.reduce((sum, s) => sum + s, 0);
}

// Deterministic pick: highest total, then shorter line, then alphabetical,
// so the same shortlist always yields the same entry.
function pick(candidates: Fail[]): Fail {
  return [...candidates].sort((a, b) => {
    const byScore = total(b) - total(a);
    if (byScore !== 0) return byScore;
    const byLength = a.line.length - b.line.length;
    if (byLength !== 0) return byLength;
    return a.line < b.line ? -1 : a.line > b.line ? 1 : 0;
  })[0];
}

function main(): void {
  const winner = pick(CANDIDATES);
  // Enforce the gate ourselves before writing: 1-199 characters, not only
  // white space. Fail loudly instead of shipping an invalid entry.
  const chars = [...winner.line].length;
  if (chars < 1 || chars > 199 || winner.line.trim().length === 0) {
    throw new Error(`picked line fails the gate: ${JSON.stringify(winner.line)}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  // Exactly the line, no trailing newline.
  writeFileSync(join(outDir, 'entry.txt'), winner.line, 'utf8');
  console.log(`Wrote ${chars} chars to ${join(outDir, 'entry.txt')}: ${winner.line}`);
}

main();
