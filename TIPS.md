# Tips

- Draw `j` uniformly in `0..i` inclusive. A modulus of `i` (excluding `i`) is a different shuffle and will fail the zero-stream test.
- Chain `sha256(previous)` so each swap has its own 32 bytes. Reusing the first 4 bytes of one seed for all 51 swaps correlates the deck.
- Stop at `MAX_REJECTS` (16) per index. An unbounded reject loop is a CPU grief if the stream is stuck.
- Uppercase hex is normalized. Odd length and non-hex are not.
- This file does not deal hands or pay a pot. Those belong in a game lab that consumes `deck`.
