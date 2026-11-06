# px-orng-fisher-yates-deck-shuffler

> **Trust:** private educational lab (Tier B)  
> **Quest:** 008 — 52-card Fisher-Yates from chained sha256 sub-seeds  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

For `i` from 51 down to 1, swap position `i` with a uniform index in `0..i`. Each draw is `sha256` of the previous 32-byte seed. Values in the leftover tail of `2^32` are rejected, and a step that rejects 16 times stops.

**Real code:** `npm test`. The hash is the SHA-256 algorithm in this process. No live `orng.wax`, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
