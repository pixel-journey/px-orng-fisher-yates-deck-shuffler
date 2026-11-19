# Sources

| Source | Use |
| --- | --- |
| Fisher–Yates (classic algorithm) | Unbiased shuffle structure |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Seed delivery on WAX |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample dapp path |
| [docs.wax.io](https://docs.wax.io/) | WAX development |

## Product facts locked by tests

- Each swap index draws from a **chained sha256** sub-seed, not from independent byte windows.
- Rejection sampling applies **per index**. The lab **reject cap is 16** — avoid an infinite loop on a bad stream.
- Never settle a rejected sample into a card index.
- Node `sha256` here is a **teaching hash**. Production must golden-vector the host intrinsic against the same seeds before shipping.
- This is not a weighted loot band. Bands are [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf).

## Related labs

| Lab | Topic |
| --- | --- |
| [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) | Independent modular rolls (not a deck) |
| [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) | Weighted band pick |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve before using the seed |
| [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md) | Curriculum order + reject windows |
