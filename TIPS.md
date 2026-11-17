# Tips — Fisher–Yates on-chain style

## Do

- Cap rejects **per index** so a pathological stream cannot loop forever (CPU grief).
- Test **determinism** (same seed → same permutation) and the **permutation invariant** (sorted deck is 0..51 once each).
- Document seed encoding (64 hex chars for a checksum256).

## Don't

- Loop forever on a bad stream.
- Use floating random in contracts.
- Assume Node `sha256` equals the host hash without a golden vector test on the target chain.

## Common mistakes

1. Swapping with `i + (stream % (n - i + 1))` without rejection when the modulus does not divide the range evenly.
2. Re-seeding every index from the original entropy instead of chaining (`H(prev || i)` style) — still valid if documented, but the tests lock the chain this lab uses.
3. Shipping a shuffle that is only tested in JavaScript and never against the CDT/runtime hash.
4. Treating this as eight independent dice rolls. Use [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) for that.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Partial deal (5 of 52) | Stop early; still prove no duplicates |
| Multi-deck shoe | Larger array, same algorithm |
| Commit seed before shuffle reveal | [commit-reveal](https://github.com/pixel-journey/px-rng-fallback-commit-reveal) if orng is unavailable |

Related: [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) · [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng)
