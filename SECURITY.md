# Security — Fisher–Yates deck shuffler

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Bad seed (short / non-hex / odd length) | refused |
| Same seed twice | identical permutation |
| `isPermutation` | true for successful shuffles |
| Pathological always-reject stream | throws **reject cap** (no infinite loop) |
| Zero stream | still a permutation; fixed structure |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Oracle seed integrity | Seed = oracle randomness after once-resolve |
| Host vs Node sha256 | Golden vectors on the target chain before shipping |
| Card-game abuse | Marked decks, peeks, partial deals need product rules |
| CPU budget | MAX_REJECTS per index is a teaching cap; re-budget |

## Attack angles

1. Naked `i % n` without rejection (biased draws).
2. Unbounded reject loop (CPU grief).
3. Shipping Node-only vectors without host parity tests.
4. Treating this as eight independent dice rolls — use [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) for that.

## Honesty limits

Teaching shuffle only. No token escrow. Hash is Node `sha256`, not an Antelope intrinsic, until proven on-chain.

Related: [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) · [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).
