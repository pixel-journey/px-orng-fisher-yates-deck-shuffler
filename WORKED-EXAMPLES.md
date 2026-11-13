# Worked examples — shuffle

## Example A — permutation

`shuffle(valid64hex)` → `deck` length 52, `isPermutation(deck) === true`.

## Example B — deterministic given next()

Injecting a fixed `next` stream yields a reproducible deck (tests use real sha256 by default).

## Example C — reject path

When uint32 falls in the forbidden tail for modulus `i+1`, draw another sub-seed; after 16 rejects → `reject cap`.

## Example D — bad seed

Non-64-hex seed → `bad seed`.
