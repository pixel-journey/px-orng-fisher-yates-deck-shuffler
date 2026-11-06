/**
 * 52-card Fisher-Yates from chained sha256 sub-seeds.
 * Each swap draws an unbiased index in 0..i. Rejects are capped.
 * No live orng.wax. sha256 here is the algorithm, not a chain call.
 */

import { createHash } from "node:crypto";

export const DECK_SIZE = 52;
export const MAX_REJECTS = 16;
export const U32_MAX = 0xffffffffn;

const HEX64 = /^[0-9a-f]{64}$/;

export function normalize(seedHex: string): string {
  const hex = seedHex.toLowerCase();
  if (!HEX64.test(hex)) throw new Error("bad seed");
  return hex;
}

export function sha256Hex(prevHex: string): string {
  const hex = normalize(prevHex);
  return createHash("sha256").update(Buffer.from(hex, "hex")).digest("hex");
}

export function rollFromUint32(value: bigint, modulus: number): number | "reject" {
  if (value < 0n || value > U32_MAX) throw new Error("bad uint32");
  if (!Number.isInteger(modulus) || modulus < 2 || modulus > DECK_SIZE) {
    throw new Error("bad modulus");
  }
  const mod = BigInt(modulus);
  const limit = ((U32_MAX + 1n) / mod) * mod;
  if (value >= limit) return "reject";
  return Number(value % mod);
}

export type Shuffle = {
  deck: number[];
  hashes: number;
  seed: string;
};

/**
 * Fisher-Yates: for i = 51 .. 1, swap deck[i] with deck[j], j uniform in 0..i.
 * `next` defaults to sha256 of the previous 32-byte seed.
 */
export function shuffle(
  seedHex: string,
  next: (prev: string) => string = sha256Hex,
): Shuffle {
  let seed = normalize(seedHex);
  const deck = Array.from({ length: DECK_SIZE }, (_, i) => i);
  let hashes = 0;
  for (let i = DECK_SIZE - 1; i >= 1; i--) {
    const modulus = i + 1;
    let j: number | null = null;
    let rejects = 0;
    while (j === null) {
      if (rejects >= MAX_REJECTS) throw new Error("reject cap");
      seed = next(seed);
      hashes++;
      if (!HEX64.test(seed)) throw new Error("bad subseed");
      const roll = rollFromUint32(BigInt("0x" + seed.slice(0, 8)), modulus);
      if (roll === "reject") rejects++;
      else j = roll;
    }
    const tmp = deck[i]!;
    deck[i] = deck[j]!;
    deck[j] = tmp;
  }
  if (hashes > (DECK_SIZE - 1) * MAX_REJECTS) throw new Error("loop bound");
  return { deck, hashes, seed };
}

export function isPermutation(deck: number[]): boolean {
  if (deck.length !== DECK_SIZE) return false;
  const seen = new Set(deck);
  if (seen.size !== DECK_SIZE) return false;
  for (const c of deck) {
    if (!Number.isInteger(c) || c < 0 || c >= DECK_SIZE) return false;
  }
  return true;
}
