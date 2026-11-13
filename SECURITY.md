# Security notes — Fisher–Yates

| Mitigated | Behavior |
| --- | --- |
| Bad seed | refused |
| Biased index | reject + redraw |
| Unbounded loop | MAX_REJECTS |
| Non-permutation | test asserts |

Production: seed only from oracle once-only resolve; do not let players supply the master seed after seeing cards.
