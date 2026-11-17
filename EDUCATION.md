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

## Intermediate

Hash count ∈ `[51, 51 * 16]`. An all-`ff` stream that always rejects throws **`reject cap`** instead of spinning forever — critical for contract CPU limits.

Bad seeds: short, non-hex, odd length → refused.

## Masterclass — zero stream

When every sub-seed is zeros, every draw picks index 0 for that modulus, **no rejects**, hashes === 51, still a permutation:

```text
deck[51] === 0
deck[0] === 1
```

That is the inside-out check: a degenerate stream is still a permutation with **fixed** positions for cards 0 and 1. Do not replace rejection sampling with naked `i % n` without a reject limit and tests.

### Common mistakes

1. Swapping with `i + (stream % (n - i + 1))` without rejection when the modulus does not divide the range evenly.  
2. Unbounded reject loop (CPU grief).  
3. Shipping Node-only vectors without host parity tests.  
4. Treating this as eight independent dice rolls — use [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) for that.

### Nice-to-have extensions (not in this repo)

| Extension | Note |
| --- | --- |
| Multi-deck shoe | Larger DECK_SIZE + new tests |
| Deal without full shuffle | Partial Fisher–Yates |
| Live seed from orng | Dual-callback once; seed = randomness |
| Host sha256 | Antelope intrinsic; verify against this lab's vectors |
| Commit seed before reveal | [commit-reveal](https://github.com/pixel-journey/px-rng-fallback-commit-reveal) if orng is unavailable |

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

### Exercises

1. Same seed twice — same deck? (Yes.)  
2. Always-reject stream — infinite loop or throw? (Throw reject cap.)  
3. Is Node sha256 the Antelope intrinsic until proven? (No.)
