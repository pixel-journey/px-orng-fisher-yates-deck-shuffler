# Education — Fisher–Yates with reject-capped draws

> **Rung:** `npm test` passes. Shuffle uses Node `sha256` of seed bytes — **not** an Antelope host function and not `orng.wax`.  
> **The test is the rule.**

Shuffle a **52**-card deck from a 32-byte seed by chaining sha256 sub-seeds. Each index draw uses rejection sampling; **MAX_REJECTS = 16** per index prevents infinite loops.

Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) for production entropy delivery. Official sample path: [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Same seed → same permutation of 0..51 |
| Intermediate | Hash-count bounds; reject-cap failure |
| Masterclass | Zero-stream inside-out check vs naive `i % n` |

---

## Beginner

Seed is 64 hex chars (uppercase normalized). `SEED = 11`×32, `OTHER = 22`×32.

| Call | Result |
| --- | --- |
| shuffle(SEED) twice | deep-equal decks |
| shuffle(OTHER) | different deck |
| isPermutation | true |

```bash
npm test
```

---

## Intermediate

Hash count ∈ `[51, 51 * 16]`. An all-`ff` stream that always rejects throws **`reject cap`** instead of spinning forever — critical for contract CPU limits.

Bad seeds: short, non-hex, odd length → refused.

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Unbounded reject loop | throw at MAX_REJECTS **16** |
| Naked `i % n` bias | rejection sampling required |
| Treat as eight dice | use [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) |
| Claim Node sha256 = host | not until proven |

---

## Masterclass — zero stream

When every sub-seed is zeros, every draw picks index 0 for that modulus, **no rejects**, hashes === 51, still a permutation:

```text
deck[51] === 0
deck[0] === 1
```

That is the inside-out check: a degenerate stream is still a permutation with **fixed** positions for cards 0 and 1. Do not replace rejection sampling with naked `i % n` without a reject limit and tests.

### Common mistakes

1. Swapping without rejection when the modulus does not divide the range evenly.  
2. Unbounded reject loop (CPU grief).  
3. Shipping Node-only vectors without host parity tests.  
4. Treating this as eight independent dice rolls.

### Exercises

1. Same seed twice — same deck? (**Yes**.)  
2. Always-reject stream — infinite loop or throw? (**Throw reject cap**.)  
3. Is Node sha256 the Antelope intrinsic until proven? (**No**.)

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [SECURITY](SECURITY.md) · [SOURCES](SOURCES.md).

---

## What this course will not teach

- Live orng seed delivery
- Host sha256 parity without golden vectors
- A multi-deck shoe without new tests
