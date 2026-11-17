# Tips — Fisher–Yates on-chain style

## Do

- Cap rejects per index (CPU).  
- Test determinism and permutation invariant.  
- Document seed encoding (hex length 64).

## Don't

- Loop forever on a pathological stream.  
- Use floating random in contracts.  
- Assume Node sha256 === host sha256 without a golden vector test on chain.

## Related

[byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll) · [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) · [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent)
