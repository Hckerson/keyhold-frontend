# UI Layers

The UI building blocks of the project, from the smallest unit to the whole app. Each layer is built from the layers above it in the table.

| Layer | Folder | Example |
|---|---|---|
| Token | `styles/tokens.css` | `--accent` |
| Scale class | `styles/globals.css` | `.pad` |
| Primitive | `ui/` | `Badge` |
| Brand | `brand/` | `Wordmark` |
| Pattern | `patterns/` | `StatCell` |
| Mark | `features/` | `user-status-mark` |
| Row | `features/` | `user-directory-row` |
| List / modal | `features/` | `user-suspend-modal` |
| Section | `sections/` | `admin-users-rail` |
| Console | `sections/` | `admin-users-console` |
| Page | `app/**/page.tsx` | `admin/users/page.tsx` |
| Chrome | `layout/` | `sidebar`, `topbar` |
| Portal layout | `app/<portal>/layout.tsx` | `admin/layout.tsx` |
| Root layout | `app/layout.tsx` | `layout.tsx` |

Folders without a `styles/` or `app/` prefix are inside `components/`.
