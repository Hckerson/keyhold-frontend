# 0007 · Money is stored and computed as `Decimal`

**Status:** Accepted
**Date:** 2026-08-27

## Context

Monetary columns began as Prisma `Float`, which is an IEEE-754 double. Doubles cannot represent most decimal fractions exactly, so sums of currency drift — the error is invisible at one row and material across a ledger. The escrow flow makes this concrete: a held amount, a final price and a payout have to agree to the cent, and a buyer comparing the figure on their transactions screen against the figure in the agreement will not accept "close".

## Decision

Monetary columns are `Decimal(14, 2)` in `schema.prisma`. Prisma returns them as `Prisma.Decimal`, and arithmetic stays in `Decimal` for the whole computation. `backend/src/common/money.ts` holds the only sanctioned conversion points: `toNumber` for display and aggregate reporting, `toNullableNumber` where absent and zero differ, `sumDecimal` for exact sums, and `toMinorUnits` for payment providers, which charge in integers.

Conversion happens once, at the edge — the API boundary or the provider call — never in the middle of a calculation.

## Rejected

**Integer minor units everywhere** — exact and fast, and the usual advice. Rejected because every read and write would need scaling, and a single missed conversion is a 100× error in a money field, which is a worse failure than the one being fixed.

**Keep `Float` and round at the edges** — cheapest change. Rejected because rounding at the edge does not undo drift accumulated across a sum, and the drift is unbounded in the number of rows.

## Consequences

`a + b` and `a >= b` on money are now bugs rather than working code: on two `Decimal` values `+` concatenates their string forms and `>=` compares lexicographically. Neither fails loudly. This is the single most likely way the decision gets violated, and it is why the helpers exist.

`Decimal` serialises to JSON as a string, so any response shape carrying money must convert deliberately or the contract changes under the frontend.

The migration is mechanical but wide, and until the Prisma client is regenerated against the new schema the two halves disagree — the type checker reports the disagreement, which is the intended behaviour.
