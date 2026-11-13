# 52-card Fisher–Yates from chained sha256 seeds

> **Domain:** WAX ORNG — deck shuffle  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** For `i` from 51 down to 1, swap position `i` with a uniform index in `0..i`. Each draw is `sha256` of the previous 32-byte seed. Values in the leftover tail of `2^32` are rejected; a step that rejects 16 times stops (loop bound).

**Code under test:** `npm test`. SHA-256 runs in-process. No live `orng.wax`, no wasm.

**Official RNG:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) for production entropy delivery; this lab teaches fair shuffle math on a fixed seed.

```bash
npm test
```

MIT — Pixel Journey
