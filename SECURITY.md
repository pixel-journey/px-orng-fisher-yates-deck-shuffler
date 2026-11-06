# Security

| Surface | Closed by |
| --- | --- |
| Short or non-hex seed | refused |
| Modulo bias on 2..52 | rejection tail |
| Unbounded reject loop | 16 rejects per swap |
| Duplicate or missing cards | permutation check in tests |

Not claimed: live ORNG delivery, on-chain `sha256` host function, wasm, or a deal/payout layer.
