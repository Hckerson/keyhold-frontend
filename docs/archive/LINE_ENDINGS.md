# Line Endings

`pnpm format` used to detonate the working tree. A single run left 649 files reported as modified when only 9 had actually changed. Committing the noise cleared it for a day, then the next checkout brought it all back.

The cause was two settings pulling in opposite directions, with Git's index stat cache caught between them. This document records the diagnosis, the fix, and the procedure for applying it to another repository.

Both repositories in this project — `frontend` and `../backend` — are fixed as described below.

## Symptoms

You have this problem if all of the following are true:

| Check                                     | Symptom                                                             |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `git status --porcelain \| grep -c '^ M'` | Hundreds of files                                                   |
| `git diff --name-only \| wc -l`           | A handful — the ones you actually edited                            |
| Any `git` command                         | `warning: LF will be replaced by CRLF the next time Git touches it` |
| `git update-index --refresh`              | Changes nothing                                                     |
| Committing the noise                      | Clears it, until the next checkout, stash, or branch switch         |

The tell is the disagreement between `status` and `diff`. They are asking different questions, and only one of them reads the file.

## Diagnosis

Two layers disagreed about what a line ending is:

| Layer                                                             | Wants                      |
| ----------------------------------------------------------------- | -------------------------- |
| `core.autocrlf = true`, with no `.gitattributes`                  | Working tree files in CRLF |
| `.editorconfig` `end_of_line = lf`, read by Prettier 3 by default | Files written as LF        |

Neither is wrong on its own. Together they produce a file that is rewritten on every format run, and a Git index that never catches up.

Tracing one file, `app/(public)/layout.tsx`:

1. The committed blob is **509 bytes, LF**. Every blob in this repository always was — there has never been a CRLF byte in the history.
2. `core.autocrlf = true` told Git to check the file out converted to CRLF, so Git wrote a 529-byte file and recorded `size: 529` in the index stat cache.
3. `pnpm format` rewrote the file as **509 bytes, LF**.
4. 509 no longer matched the cached 529, so `git status` reported the file as modified — **without ever comparing its contents**.
5. `git diff` did compare contents, normalised, found them identical, and reported nothing.

That accounts for the whole gap: 649 reported, 9 real, 640 phantom. The phantoms were byte-identical to `HEAD` the entire time.

### Why it kept coming back

`git update-index --refresh` cannot repair it. Refreshing the stat cache would record 509, but `autocrlf = true` insists the checked-out form is 529, so the entry stays dirty.

Committing _does_ clear it, because a commit writes fresh stat data — which is why a 25-file commit stuck. But the next `checkout`, `stash`, `merge`, or branch switch rewrites those files as CRLF, the next `pnpm format` flips them back to LF, and the count explodes again. The problem is a loop, not an event.

### The interim state, and why it was not a fix

Before the fix below, both repositories sat at `core.autocrlf = input` with no `.gitattributes`. `input` never converts on checkout, so the acute symptom went quiet and `status` and `diff` agreed in the frontend.

That is not a fix. `core.autocrlf` is local, per-repository, and uncommitted — it lives in `.git/config` and travels with nobody. A fresh clone on a Windows machine gets Git's default `autocrlf = true` and reproduces the entire loop. The backend, meanwhile, still carried three phantom entries left over from the earlier `autocrlf = true` era, in `src/modules/viewings/dto/`, whose cached sizes ran 3 to 33 bytes ahead of the files on disk.

Only a committed `.gitattributes` binds every clone.

## The fix

Five steps. None of them rewrite history.

### 1. Pin line endings in the repository

`.gitattributes` at the repository root. This is the durable part — it is committed, so it binds every machine and every clone, and it overrides whatever `core.autocrlf` happens to be set to locally.

```
* text=auto eol=lf

*.png   binary
*.woff2 binary
```

`* text=auto eol=lf` means: normalise to LF in the object database, and check out as LF everywhere including Windows. The `binary` lines are defensive — both repositories track only text today, but an asset added later must never be run through newline conversion. Note that `.svg` is text and must stay text.

### 2. Stop the conversion at the config level

```sh
git config core.autocrlf false
git config core.eol lf
```

Repository-local. `.gitattributes` already overrides both, but setting them explicitly silences the `LF will be replaced by CRLF` warning that otherwise prefixes the output of every Git command.

### 3. Flush the poisoned stat cache

```sh
git add --renormalize .
git restore --staged .
```

Contents are already LF in the object database, so this stages no content changes. It exists purely to rewrite the stat cache with the real file sizes. It does stage any genuine in-progress modifications as a side effect; the `restore` unstages them. The stat cache survives the unstage — only the staging area is reset.

**`--renormalize` aborts on a deleted-but-unstaged file** with `fatal: unable to stat`, and stages nothing at all when it does. If the working tree has a pending deletion, feed it only the paths that exist:

```sh
git ls-files -z | while IFS= read -r -d '' f; do [ -e "$f" ] && printf '%s\0' "$f"; done \
  | xargs -0 git add --renormalize --
```

### 4. Rewrite the working-tree files that are still CRLF

**This step is load-bearing, and step 3 does not cover it.** Once `eol=lf` is in force, Git expects the checked-out form to be LF. Any file still physically CRLF on disk mismatches the stat cache in the _other_ direction and reports as a phantom — the same bug, inverted. Renormalising the index does not touch those bytes.

Find them:

```sh
git ls-files -z | while IFS= read -r -d '' f; do [ -e "$f" ] && grep -qU $'\r$' "$f" && echo "$f"; done
```

For files with **no uncommitted changes**, let Git rewrite them:

```sh
rm path/to/file && git checkout -- path/to/file
```

For files that **do** carry uncommitted edits, never delete them. Strip the trailing CR in place, which preserves content exactly:

```sh
sed -i 's/\r$//' path/to/file
```

Confirm `git diff -- path/to/file` is byte-identical before and after. In this project that applied to `prisma/schema.prisma` and `src/modules/core/auth/types/auth.types.ts`, both of which had in-progress edits at the time.

### 5. State the Prettier setting explicitly

```json
{
    "endOfLine": "lf"
}
```

Prettier's default is already `lf`, and `.editorconfig` was supplying it too. Naming it in `.prettierrc` removes the dependence on config resolution — one less thing that can silently change under a version bump.

## Verification

```sh
git status --porcelain --untracked-files=no | grep -c '^.M'
git diff --name-only | wc -l
```

These two numbers must agree. Count any pending deletion (` D`) on the `diff` side only.

```sh
git ls-files -z | while IFS= read -r -d '' f; do [ -e "$f" ] && grep -qU $'\r$' "$f" && echo "$f"; done
```

Must print nothing.

Then format a set of files that are currently **unmodified** and confirm the modified count does not move:

```sh
npx prettier --write <clean files>
```

Use clean files specifically. Running `prettier --write .` across the whole tree will also fix pre-existing formatting debt in unrelated files, which moves the count for reasons that have nothing to do with line endings and buries the signal you are looking for.

```sh
rm path/to/an/unmodified/file && git checkout -- path/to/an/unmodified/file
tr -cd '\r' < path/to/an/unmodified/file | wc -c
```

Must print `0`. This is the one that proves the loop is broken: Git now writes LF on checkout, so Prettier has nothing left to flip.

## Applying this to another repository

Run the two-line check first — if `status` and `diff` agree **and** the CRLF scan prints nothing, you do not have this problem.

```sh
echo "reported: $(git status --porcelain --untracked-files=no | grep -c '^.M')"
echo "real:     $(git diff --name-only | wc -l)"
```

Four things to watch when you do this elsewhere:

**Commit `.gitattributes` on its own.** Keep it separate from the in-progress work it happens to be sitting next to, so the change is legible in the history and trivially revertible.

**Repositories whose history genuinely contains CRLF need one extra commit.** Neither repository here did — every blob was already LF, so `--renormalize` staged no content. Where CRLF was actually committed, `--renormalize` will stage real blob changes across a large number of files. Commit that as a single mechanical normalisation commit, touching nothing else, and be aware it is a rewrite point for anyone with open branches.

**Add the binary declarations before adding binary assets, not after.** `text=auto` detects binary content reliably, but an explicit declaration costs one line and removes the question.

**Each repository needs its own.** `.gitattributes` and `core.autocrlf` are per-repository. A monorepo needs one at the root; sibling repositories — such as `../backend` — each need their own.
