# Archive

Working notes that are no longer maintained, kept because decision records cite them.

Records 0004, 0008 and 0013 name four of these files by their old path, `docs/<NAME>.md`. An ADR is immutable once merged, so those paths stay as written and resolve here instead.

| File                                                         | What it holds                                                      | Cited by                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------- |
| [BACKUP.md](BACKUP.md)                                       | Backup and restore paths, and the restore drill that was never run | —                                                             |
| [FEEDBACK.md](FEEDBACK.md)                                   | The mutation feedback contract, copy rules and parts               | [0013](../adr/0013-mutation-feedback-is-global-by-default.md) |
| [LINE_ENDINGS.md](LINE_ENDINGS.md)                           | Why `pnpm format` reported 649 files as modified, and the fix      | —                                                             |
| [MONEY_PATH.md](MONEY_PATH.md)                               | Numbered acceptance criteria for the escrow release flow           | [0008](../adr/0008-escrow-release-authorisation.md)           |
| [MOTION.md](MOTION.md)                                       | What `motion@12` is used for and what stays CSS                    | [0013](../adr/0013-mutation-feedback-is-global-by-default.md) |
| [REMAINING_WORK.md](REMAINING_WORK.md)                       | Per-route ledger of what read from seed data                       | [0004](../adr/0004-mock-data-first-frontend.md)               |
| [horizon-grove-real-estate.md](horizon-grove-real-estate.md) | The design skill the current visual language grew out of           | —                                                             |

`MONEY_PATH.md` is still the pattern for writing acceptance criteria before tests, per the project instructions. The rest are history.
