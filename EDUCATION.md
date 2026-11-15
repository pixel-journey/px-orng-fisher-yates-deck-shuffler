# Education — Fisher–Yates with reject-capped draws

Shuffle a 52-card deck from a 32-byte seed by chaining sha256 sub-seeds. Each index draw uses rejection sampling; a hard **MAX_REJECTS** prevents infinite loops.

## Beginner

1. Seed is 64 lowercase hex chars (uppercase normalized).
2. Output is a permutation of `0..51`.
3. Same seed → same deck.

## Intermediate

Hash count is at least 51 and at most `51 * MAX_REJECTS`. An all-`ff` stream that always rejects throws `reject cap` instead of spinning forever.

A stream of zeros still yields a valid permutation with known final positions for cards 0 and 1 — the inside-out check that naive `i % n` would not teach.

## Masterclass (not in this repo)

Antelope host sha256; multi-deck shoes; live orng delivery of the seed.

## Outcomes

1. Show deterministic shuffle for SEED vs OTHER.
2. Show reject-cap failure mode.
3. Show zero-stream permutation properties.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
