# Tips — on-chain style shuffles

- Never use `hash % n` alone for varying `n`.
- Cap rejects; fail closed rather than infinite loop.
- Related: [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf), [byte slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll).
