# Backup and Restore

The number that matters is not "do we have backups" but "how long does a restore take".

**Status:** the primary backup mechanism is the host's, not ours, and it was already running before anyone wrote this document. The export scripts in `backend/scripts/` are a second, portable copy. **Neither path has been restore-tested.** Section 04.3 of `DATA_AUDIT.md` stays open until a row appears in the drill table at the bottom.

## What holds the data

One Postgres 17.2 database on **Prisma Postgres**, reached through `DATABASE_URL`. It holds escrow balances, transactions and the identity documents behind KYC. Current volume: 568 users, 34 properties, 8 escrow holds.

There is no other durable store. Images and agreement PDFs live in Cloudinary and are referenced by URL, so a database restore recovers every reference and no file. Cloudinary's own retention is the second half of any real disaster plan and is not covered here.

### Two endpoints, and the difference matters

Prisma Postgres exposes the same database twice:

| Host                  | Used by                                  |
| --------------------- | ---------------------------------------- |
| `pooled.db.prisma.io` | the application — this is `DATABASE_URL` |
| `db.prisma.io`        | `pg_dump` and `pg_restore`               |

`pg_dump` needs a session it can hold a consistent snapshot on, which a connection pooler does not guarantee. Prisma's own documentation gives the direct host for manual backups, and both endpoints accept the same credentials.

`backup-config.ts` rewrites a pooled host to the direct one automatically, and `DIRECT_DATABASE_URL` overrides it for any other pooler. This is not cosmetic: the first version of these scripts read `DATABASE_URL` straight through and would have run `pg_dump` against the pooler.

## The host's backups — the primary path

| Plan         | Cadence                      | Retention |
| ------------ | ---------------------------- | --------- |
| Starter, Pro | Daily, on days with activity | 7 days    |
| Business     | Daily, on days with activity | 30 days   |

Restores are performed from the **Backups tab of the Prisma Console**, by someone with Console access. This is the fastest path back and requires nothing from this repository.

Its limits, stated plainly:

- **RPO is up to 24 hours, and worse than that.** Snapshots are taken only on days with activity, and anything after the most recent snapshot is not recovered.
- **There is no point-in-time recovery.** Prisma lists it as a future feature. You restore to a snapshot boundary, not to the moment before the mistake.
- **RTO is unpublished.** No recovery-time figure is documented, which is precisely the number this document exists to establish.
- **Retention depends on the plan, and nobody has recorded which plan this project is on.** It is either 7 days or 30. Find out and write it here.

## The export scripts — the second copy

```
pnpm db:backup
```

Writes `backups/real-estate-<ISO timestamp>.dump` in PostgreSQL's custom format over a direct connection, then prunes dumps past the retention window. It fails loudly rather than quietly: a `pg_dump` that cannot start, exits non-zero, or produces an empty file leaves no file behind and exits with an error.

| Setting                 | Default           | Meaning                                  |
| ----------------------- | ----------------- | ---------------------------------------- |
| `BACKUP_DIR`            | `backend/backups` | Where dumps are written                  |
| `BACKUP_RETENTION_DAYS` | `30`              | Dumps older than this are pruned         |
| `DIRECT_DATABASE_URL`   | derived           | Overrides the pooled→direct host rewrite |

Requires the PostgreSQL client tools on `PATH`, **major version 17 or newer** to match the server. They are not currently installed on any development machine here, which is why nothing below has been run.

These scripts are not redundant with the host's snapshots. They are what you have when the answer to "restore it" is "we are leaving this provider", "the snapshot is 6 days old and retention is 7", or "we are about to run a migration that rounds every money column".

`backups/` is git-ignored. A dump is a complete copy of every user record in the system, KYC documents included; it must never be committed, and it should not sit unencrypted on a laptop longer than it takes to test a restore.

## Cadence

| Environment | Cadence                                                                 | Retention                           | Runs as                                |
| ----------- | ----------------------------------------------------------------------- | ----------------------------------- | -------------------------------------- |
| Production  | Host snapshots daily; no scheduled `db:backup` job exists yet           | Per plan, above                     | Prisma Postgres, automatically         |
| Pre-release | `pnpm db:backup` immediately before any `pnpm db:deploy` touching money | Until the release is confirmed good | By hand, by whoever runs the migration |

The pre-release row is not optional. Migration `0001_money_is_decimal` rewrites five money columns from `DOUBLE PRECISION` to `DECIMAL(14,2)`, which rounds every value to two decimal places. It is not reversible by re-running a migration, and a 24-hour-old snapshot is not an acceptable fallback for it.

## Restoring from a dump

```
pnpm db:restore                       # most recent dump in BACKUP_DIR
pnpm db:restore path/to/backup.dump   # a specific dump
```

Restores into whatever `DATABASE_URL` resolves to, over a direct connection, dropping existing objects first. It runs under `--single-transaction`, so a failure part-way applies nothing.

Two guards, because this command destroys a database:

- With `NODE_ENV=production`, it refuses unless `RESTORE_ACK=RESTORE_OVER_PRODUCTION` is also set.
- The target is read from the environment and never inferred. Point it at the scratch database **before** running, and check it.

## The drill

This is the part that turns a procedure into a fact. Both paths need one.

**Path A — the host's snapshot.** Restore a snapshot from the Console into a scratch database, not over production, and time it. This is the path that will actually be used at 3am, so it is the one that most needs proving.

**Path B — the dump.** Requires PostgreSQL 17 client tools, which no machine here has yet.

1. Install the client tools; confirm `pg_dump --version` reports 17 or newer.
2. Provision a scratch database (`npx create-db` gives a temporary Prisma Postgres with a TTL).
3. `pnpm db:backup` against production.
4. Point `DATABASE_URL` at the scratch database. Confirm it — echo it, read it.
5. `pnpm db:restore`, timing from start to finish.
6. Point the app at the scratch database and confirm it starts, a listing loads, and an escrow row carries the balance it had in production.
7. Record the wall-clock time from step 5 below.

| Date | Path | Dump size | Restore time | Ran by | Notes             |
| ---- | ---- | --------- | ------------ | ------ | ----------------- |
| —    | —    | —         | —            | —      | Not yet performed |

An empty table is the honest state. Fill in one row and 04.3 closes.
