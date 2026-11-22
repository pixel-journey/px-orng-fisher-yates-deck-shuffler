# AI handoff — Fisher–Yates deck shuffler

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Seed delivery on WAX |
| [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) | Independent windows (not a deck) |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve before using the seed |

## Non-negotiables

1. Each swap index draws from a **chained sha256** sub-seed, not independent byte windows.
2. Rejection sampling applies **per index**. Lab **reject cap is 16** — no infinite loop on a bad stream.
3. Never settle a rejected sample into a card index.
4. Node `sha256` here is a **teaching hash**. Production must golden-vector the host intrinsic against the same seeds before shipping.
5. This is not weighted loot ([loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf)).
6. No escrow, no broadcast in this pure lab.

## Prompt seeds

- "Show one chained sub-seed step for index i of n."
- "Reject cap 16 — what happens on the 17th reject?"
- "Contrast with byte-slicer independent windows."
- "Warn that Node sha256 is not the Antelope intrinsic until golden-vectored."

## Do not

- Use independent windows for deck indices.
- Settle rejected samples.
- Claim Node hash equals the chain intrinsic without vectors.
