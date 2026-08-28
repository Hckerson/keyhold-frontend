# Backup and Restore

The number that matters is not "do we have backups" but "how long does a restore take". This document exists so that number is known before it is needed.

**Status:** the scripts and the procedure exist and the retention logic is tested. **No restore has been performed against a scratch database yet.** Until one has, section 04.3 of `DATA_AUDIT.md` stays open — an untested restore is a rumour, and writing a runbook does not change that.

## What holds the data

One Postgres database, reached through `DATABASE_URL`, currently hosted on Prisma Postgres (`pooled.db.prisma.io`). It holds escrow balances, transactions and the identity documents behind KYC. There is no other durable store: images and agreement PDFs live in Cloudinary and are referenced by URL, so a database restore recovers every reference but no file. Cloudinary's own retention is the second half of any real disaster plan and is not covered here.

## Taking a backup

```
pnpm db:backup
```

Writes `backups/real-estate-<ISO timestamp>.dump` in PostgreSQL's custom format, then prunes any dump older than the retention window. The script fails loudly rather than quietly: a `pg_dump` that cannot start, exits non-zero, or produces an empty file leaves no backup file behind and exits with an error.

| Setting                 | Default           | Meaning                          |
| ----------------------- | ----------------- | -------------------------------- |
| `BACKUP_DIR`            | `backend/backups` | Where dumps are written          |
| `BACKUP_RETENTION_DAYS` | `30`              | Dumps older than this are pruned |

Requires the PostgreSQL client tools on `PATH` — `pg_dump` and `pg_restore`. The major version must be at least that of the server.

`backups/` is git-ignored. A dump is a complete copy of every user record in the system; it must never be committed, and it should not sit unencrypted on a laptop longer than it takes to test a restore.

## Cadence

| Environment | Cadence                                                                  | Retention                           | Runs as                                |
| ----------- | ------------------------------------------------------------------------ | ----------------------------------- | -------------------------------------- |
| Production  | Daily                                                                    | 30 days                             | Scheduled job on the host, not by hand |
| Pre-release | Once, immediately before any `pnpm db:deploy` that alters a money column | Until the release is confirmed good | By hand, by whoever runs the migration |

The pre-release row is not optional. Migration `0001_money_is_decimal` rewrites four money columns from `DOUBLE PRECISION` to `DECIMAL(14,2)`, which rounds every value to two decimal places. It is not reversible by re-running a migration.

## Restoring

```
pnpm db:restore                       # most recent dump in BACKUP_DIR
pnpm db:restore path/to/backup.dump   # a specific dump
```

Restores into whatever `DATABASE_URL` points at, dropping existing objects first. It runs under `--single-transaction`, so a failure part-way applies nothing.

Two guards, because this command destroys a database:

- With `NODE_ENV=production`, the script refuses unless `RESTORE_ACK=RESTORE_OVER_PRODUCTION` is also set.
- `DATABASE_URL` is read from the environment and never inferred. Point it at the scratch database **before** running, and check it.

## The drill

This is the part that turns the procedure into a fact. Run it once now, and again whenever the schema changes shape.

1. Provision an empty scratch database and note its connection string.
2. `pnpm db:backup` against production.
3. Set `DATABASE_URL` to the scratch database. Confirm it — echo it, read it.
4. `pnpm db:restore`, timing it from start to finish.
5. Point the app at the scratch database and confirm it starts, a listing loads, and an escrow row carries the balance it had in production.
6. Record the wall-clock time from step 4 in the table below.

| Date | Dump size | Restore time | Ran by | Notes             |
| ---- | --------- | ------------ | ------ | ----------------- |
| —    | —         | —            | —      | Not yet performed |

An empty row here is the honest state. Fill it in and 04.3 closes.
