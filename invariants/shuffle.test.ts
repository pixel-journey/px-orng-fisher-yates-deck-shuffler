import assert from "node:assert/strict";
import test from "node:test";
import {
  DECK_SIZE,
  MAX_REJECTS,
  isPermutation,
  sha256Hex,
  shuffle,
} from "./shuffle.ts";

const SEED = "11".repeat(32);
const OTHER = "22".repeat(32);

test("output is a 52-card permutation", () => {
  const out = shuffle(SEED);
  assert.equal(isPermutation(out.deck), true);
  assert.equal(out.deck.length, DECK_SIZE);
});

test("same seed is deterministic", () => {
  assert.deepEqual(shuffle(SEED), shuffle(SEED));
  assert.deepEqual(shuffle(SEED.toUpperCase()).deck, shuffle(SEED).deck);
});

test("different seeds differ", () => {
  assert.notDeepEqual(shuffle(SEED).deck, shuffle(OTHER).deck);
});

test("hash count stays inside the loop bound", () => {
  const out = shuffle(SEED);
  assert.ok(out.hashes >= DECK_SIZE - 1);
  assert.ok(out.hashes <= (DECK_SIZE - 1) * MAX_REJECTS);
});

test("chained subseed is sha256 of the previous seed", () => {
  const once = sha256Hex(SEED);
  assert.equal(once.length, 64);
  assert.notEqual(once, SEED);
  assert.equal(sha256Hex(SEED), sha256Hex(SEED));
});

test("bad seed refused", () => {
  assert.throws(() => shuffle("abcd"), /bad seed/);
  assert.throws(() => shuffle("zz".repeat(32)), /bad seed/);
  assert.throws(() => shuffle(SEED.slice(0, 63)), /bad seed/);
});

test("reject cap stops a stream that never lands in range", () => {
  const alwaysTail = () => "ff".repeat(32);
  assert.throws(() => shuffle(SEED, alwaysTail), /reject cap/);
});

test("controlled stream swaps a known pair then identity", () => {
  const next = () => "00".repeat(32);
  const out = shuffle(SEED, next);
  assert.equal(out.hashes, DECK_SIZE - 1);
  assert.equal(isPermutation(out.deck), true);
  assert.equal(out.deck[DECK_SIZE - 1], 0);
  assert.equal(out.deck[0], 1);
});
