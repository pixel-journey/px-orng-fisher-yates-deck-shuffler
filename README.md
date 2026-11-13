# 52-card Fisher–Yates from chained sha256

> **Domain:** WAX ORNG — deck shuffle  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Unbiased Fisher–Yates: each swap index drawn with rejection sampling from chained sha256 sub-seeds; reject cap prevents unbounded loops.

**Code under test:** `npm test`. Algorithmic sha256 only — not a chain RPC.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Permutation, reject cap |
| [TIPS.md](TIPS.md) | Avoid biased `% n` |
| [SECURITY.md](SECURITY.md) | Seed and loops |
| [SOURCES.md](SOURCES.md) | Official |

```bash
npm test
```

MIT — Pixel Journey
