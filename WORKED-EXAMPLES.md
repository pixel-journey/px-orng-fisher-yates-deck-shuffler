# Worked examples — Fisher–Yates deck

`DECK_SIZE` is 52. `MAX_REJECTS` is 16 per index. Cards are integers `0..51`. `sha256` here is Node's hash of the seed bytes, not an Antelope host function and not `orng.wax`.

## A real seed

`SEED` is `11` repeated to 64 hex chars. `OTHER` is `22` repeated.

| Call | Result |
| --- | --- |
| `shuffle(SEED)` | length 52, `isPermutation` true |
| `shuffle(SEED)` twice | deep-equal, including the hash count |
| `shuffle(SEED.toUpperCase())` | same deck as lowercase |
| `shuffle(OTHER)` | different deck |
| hash count | at least `51` (`52 - 1` swaps) and at most `51 * 16` |

`sha256Hex(SEED)` is 64 hex chars, not equal to `SEED`, and stable.

## Bad seeds

| Input | Error |
| --- | --- |
| `abcd` | bad seed |
| `zz` repeated 32 times | bad seed |
| 63 hex chars | bad seed |

## Reject cap

If every sub-seed is `ff` repeated (always in the rejection tail for these moduli), `shuffle` throws `reject cap` instead of looping.

## Controlled stream

When `next` always returns `00` repeated, every draw is index `0` for that modulus, and there are no rejects.

```text
hashes === 51
isPermutation === true
deck[51] === 0
deck[0] === 1
```

That is the inside-out check: a stream of zeros is still a permutation, and the final positions of cards 0 and 1 are fixed by the swaps. Do not replace this with `i % n` without the rejection limit.
