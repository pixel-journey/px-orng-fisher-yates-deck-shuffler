# Education — Fisher–Yates from chained hashes

> **Rung:** `npm test` passes. `sha256` here is the algorithm, not a chain call.  
> Seed comes from resolved oracle entropy in a full stack.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Why Fisher–Yates needs uniform `j` in `0..i` |
| Intermediate | Chain sub-seeds via sha256 |
| Masterclass | Rejection sampling per step + reject cap |

## Beginner

For `i = 51 .. 1`, swap `deck[i]` with `deck[j]` where `j` is uniform in `0..i`. Result must be a permutation of `0..51`.

## Intermediate

Each step: `seed = sha256(seed)`, take first 8 hex digits as uint32, map into `0..i` with rejection of the non-multiple tail of `2^32`.

## Masterclass

`MAX_REJECTS = 16` per index prevents unbounded loops. Total hashes bounded by `(51) * 16`. Bad seed length refused.

## Will not teach

Card game payouts, hand evaluation, or live orng delivery.
