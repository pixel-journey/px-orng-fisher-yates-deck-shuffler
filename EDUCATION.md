# Education

A single `uint32 % (i+1)` biases the last cards whenever `i+1` does not divide `2^32`. This lab rejects the tail, same rule as the byte slicer, but each swap consumes a **new** sha256 of the previous seed so later cards are not a slice of the same word.

The loop is bounded twice:

1. Exactly 51 swaps (`i` from 51 down to 1). Position 0 is whatever remains.
2. At most 16 rejects per swap. A stuck stream throws `reject cap` instead of spinning.

`j = 0` on every swap walks the original card 0 to the end of the deck. That is a known permutation, used as a fixture, not a claim about a particular on-chain seed.
