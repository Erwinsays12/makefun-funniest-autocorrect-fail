[![make.fun](https://make.fun/badge/u-zeroxfive-funniest-autocorrect-fail-ddf82154.svg)](https://make.fun/c/u-zeroxfive-funniest-autocorrect-fail-ddf82154)
[![rank](https://make.fun/badge/u-zeroxfive-funniest-autocorrect-fail-ddf82154/Erwinsays12/makefun-funniest-autocorrect-fail/rank.svg)](https://make.fun/c/u-zeroxfive-funniest-autocorrect-fail-ddf82154)
[![reward](https://make.fun/badge/u-zeroxfive-funniest-autocorrect-fail-ddf82154/Erwinsays12/makefun-funniest-autocorrect-fail/reward.svg)](https://make.fun/c/u-zeroxfive-funniest-autocorrect-fail-ddf82154)

# Funniest Autocorrect Fail

Entry for the [Funniest Autocorrect Fail](https://make.fun/c/u-zeroxfive-funniest-autocorrect-fail-ddf82154) competition on make.fun.

## What it does

`main.ts` scores a shortlist of candidate autocorrect fails 0–5 on the
judge's five criteria — on-subject fit, funny on first read, reads as a real
slip, clear in one line, specific and original wrong word — picks the highest
total deterministically, and writes exactly that one line to
`/output/entry.txt`.

## The line

**"I woke up with a raging election this morning. I mean erection. ERECTION."**
(73 characters)

"Election" for "erection" is the whole joke in one word: a morning text
anyone can picture sending, the wrong word is wildly off-topic yet close in
shape, and the double correction ("I mean erection. ERECTION.") is exactly
how people retype a word their phone keeps fighting. The slip needs no
explanation and the laugh lands on first read.

## Run it

```sh
node main.ts
```

It writes the line (73 characters, no trailing newline) to
`/output/entry.txt`. Set `MAKEFUN_OUTPUT_DIR` to write elsewhere when testing
locally.

## License

MIT — see [LICENSE](LICENSE).
