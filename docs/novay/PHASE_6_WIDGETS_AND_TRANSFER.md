# NOVAY — PHASE 6: Android Widgets & Novay Transfer

## Mission

Add useful home-screen entry points and a dependable local backup/transfer format. Widgets must be lightweight summaries, not miniature copies of the app. Transfer must protect user data and never silently overwrite it.

## Prerequisites

Read Phase 0–5 reports and inspect current data models, migrations, download manager, watch progress, preferences, and storage permissions. Reuse the app's canonical repository APIs. Re-check exact Android SDK and dependency versions.

## A. Novay Widgets

Evaluate Jetpack Glance or the current recommended Android widget API after checking compatibility with the existing Compose/runtime versions. Do not introduce a second rendering stack without a clear reason.

### Initial widgets

1. **Continue Watching** — most recent in-progress anime/episode with artwork if available, progress, and a deep link to resume.
2. **Download Center** — current active/queued/completed/failed download summary using the existing download manager as the sole source of truth.
3. **My Library** — compact library/status summary and shortcut into the full app.

### Requirements

- Support widget sizes/resizing and provide useful compact/expanded layouts.
- Widget data must be a lightweight snapshot from local repositories; no independent duplicate business logic or separate progress store.
- Use explicit refresh policies and event-triggered updates where allowed. Respect Android widget update limits and background execution restrictions.
- Do not poll frequently or initiate heavy network/source work simply because a widget is on the home screen.
- Use placeholders and a clear fallback when offline, artwork is not cached, there is no current episode, or no downloads are active.
- Widget taps must open the correct destination using safe, stable deep links and restore the expected app state.
- Respect lock-screen privacy where relevant; do not display sensitive details unexpectedly.
- Provide configuration only where it adds real user value (for example, choose a collection or widget content scope).
- Preserve app battery/performance budgets and existing notification behavior.

## B. Novay Transfer — local export/import

Create a versioned archive format for personal Novay data. This is a user-controlled local file workflow, not a mandatory cloud account or sync service.

### Exportable data

Allow a clear, documented selection of:
- Anime library and statuses.
- Favourites and custom collections.
- Canonical anime/episode identity mappings and supported metadata references.
- Watched state and exact resume progress.
- User history/activity where explicitly selected.
- App preferences, theme palettes, Studio layout choices, and player settings.
- Dashboard/Pulse layout preferences.

### Excluded by default

- Downloaded video/media files and large media caches.
- Image cache and temporary source-resolution cache.
- Authentication tokens, passwords, cookies, private headers, source credentials, signed/temporary URLs, and device-specific secrets.
- Raw diagnostic logs unless a separate explicit export option is justified and sensitive fields are redacted.

Media downloads may only be included through a separate explicit option with a clear warning about file size, storage, and provider restrictions. Do not include them silently in the personal-data archive.

### Archive format and integrity

- Define a documented, versioned schema with a manifest containing format version, app/export version, creation timestamp, selected data sections, and record counts.
- Use deterministic serialization where practical and an integrity checksum (for example, SHA-256) to detect corruption/tampering of archive contents. A checksum is not encryption and must not be described as such.
- If password-based encryption is added, use a vetted platform/library implementation and a modern authenticated encryption/key-derivation design; do not invent cryptography or roll your own cipher. Make encryption opt-in and explain recovery implications. If encryption is not implemented, clearly state that the archive is not encrypted and warn users before sharing it.
- Validate archive size, entry count, path names, nesting, decompressed size, record counts, schema versions, and data types before importing. Prevent path traversal/Zip Slip and decompression-bomb style resource exhaustion.
- Never trust archive filenames, metadata, or embedded URIs as instructions or safe file paths.

### Export workflow

1. User selects data categories.
2. Show an export summary and exclusions.
3. Create archive in app-private temporary storage.
4. Validate archive and checksum.
5. Use Android Storage Access Framework `ACTION_CREATE_DOCUMENT` (or the current suitable API) for user-selected destination.
6. Clean temporary files safely after success/failure without touching user-owned downloads.
7. Report exact result and archive location/name where available.

### Import workflow

1. Use Storage Access Framework to let user select an archive.
2. Validate file type, schema/version, checksum, sizes, limits, and structure before parsing records.
3. Show a preview: app/export version, creation date, selected sections, record counts, duplicates/conflicts, and unsupported fields.
4. Offer clear merge or replace modes. Explain what each mode changes before confirmation.
5. Merge by stable internal identities and source ID mappings. Do not duplicate existing anime/episodes/collections where identity is confidently equivalent.
6. When uncertain, preserve both records or ask the user to resolve conflicts; never silently merge distinct titles/remakes/seasons.
7. Replace mode must be explicit, scope-specific, and preceded by a recoverable snapshot/backup of affected local data where feasible.
8. Execute imports transactionally or in a staged process with rollback/recovery so partial failure cannot leave the database inconsistent.
9. Run post-import integrity checks for dangling references, duplicate IDs, invalid resume positions, missing collections, and unsupported versions.
10. Preserve existing downloaded media and do not overwrite/delete it during ordinary library transfer.

### Version compatibility

- Design schema migrations from older archive versions to the current import model.
- Unknown future versions must be rejected safely with an understandable message; never guess their structure.
- Include a dry-run/preview phase and test malformed archives, truncated files, duplicated records, oversized entries, missing fields, and unsupported schema versions.

## C. Privacy and user control

- Export/import is always initiated by the user; no background export and no automatic upload.
- Tell the user exactly which personal data will be included.
- Keep temporary archives private and clean them up safely.
- Never silently replace user data or send archive contents to remote services.

## Required tests

- Widget snapshot correctness, resizing, no-current-content state, stale/offline state, deep links, refresh budget, and download manager integration.
- Export/import round trip for every supported data category.
- Merge vs replace semantics, duplicate identity handling, conflict preservation, migration across archive versions, and post-import consistency.
- Corrupt/truncated/wrong-format archives, invalid checksums, path traversal, oversized decompressed content, excessive entry counts, and unknown future versions.
- Permission cancellation, unavailable destination, insufficient storage, interrupted export/import, and cleanup.
- Confirm downloads, player state, source credentials, and existing settings remain safe and intact.

## Acceptance criteria

- Widgets are lightweight, responsive, resize-aware, and use local source-of-truth repositories.
- Widgets do not trigger frequent polling or heavy network work.
- User data can be exported and restored through the system file picker.
- Archives are versioned, validated, integrity-checked, and have documented encryption status.
- Import provides a preview and explicit merge/replace choice.
- No credentials or downloaded media are included by default.
- Failed import does not leave partially corrupted user data.
- Existing library, progress, downloads, player, and animations remain intact.

## Deliverables

- `docs/novay/phase-6-widgets-transfer.md` documenting widget data contracts, update policy, archive schema, version migrations, security validation, excluded data, import modes, and test evidence.
- A sample archive manifest/schema document containing no real user data or secrets.

---

# Shared execution rules — mandatory

You are modifying **Novay**, an existing Android application. Treat the repository as a lived-in production codebase, not a greenfield sample.

## 1. Repository-first workflow

1. Inspect the repository root, `README`, project documentation, Gradle wrapper, version catalog, module structure, manifest, navigation, dependency injection, persistence layer, player, source integrations, tests, and CI configuration before proposing or changing code.
2. Start with `git status --short --branch`, `git log -5 --oneline`, and a read-only inventory. Record uncommitted changes. **Never overwrite, reset, clean, stash, revert, or delete user work.** Do not assume `main` is clean or that the checkout matches an earlier description.
3. Confirm the actual Kotlin, Android Gradle Plugin, Gradle, Compose, Material 3, AndroidX, Media3, database, image-loader, and minimum/target SDK versions from the repository. Do not invent versions.
4. Read relevant existing implementations and tests before designing replacements. Prefer extending the current architecture and established patterns.
5. Do not commit, push, publish, create releases, or change repository settings unless explicitly instructed.

## 2. Non-negotiable preservation rules

- Preserve every existing working feature, route, screen, interaction, player capability, source resolver, download behavior, persisted user setting, and accessibility behavior unless this phase explicitly and safely extends it.
- **Do not remove existing animations or motion components.** You may improve, extend, or optimize them. Keep current motion as the default visual experience. Any reduced-motion or low-power option must be deliberate, user-controllable, and must not silently replace or delete the existing animation system.
- Audit and reuse existing components before creating new ones. Components that may already exist include `CinemaGlass`, `SlateMotion`, `NovayLottieIcon`, `NovayMorphIcons`, `Shimmer`, `SwiftSlateSpinner`, and `FloatingMiniPlayer`; verify their real existence and usage before relying on these names.
- Retain the established Novay visual identity and the already selected **hybrid direction**: clean, minimal structure with carefully used cinematic detail. Avoid visual clutter and gratuitous effects.
- `https://github.com/RookieEnough/Orion-Store` is a quality/reference for layout craft, hierarchy, polish, and motion only. Do not copy its code, assets, branding, or distinctive screens.
- Do not perform broad dependency upgrades or architectural rewrites as a side effect. Add or update a dependency only when the need is demonstrated, compatibility is checked, and the reason is documented.

## 3. Engineering requirements

- Kotlin-first, lifecycle-aware, coroutine/Flow-friendly implementation consistent with the repository's existing architecture. Keep UI state separate from persistence, source/network, and playback concerns.
- Keep a clear single source of truth for each piece of state. Avoid duplicate mutable copies and hidden synchronization paths.
- Handle loading, empty, partial-result, offline, permission-denied, stale-data, cancellation, and error states intentionally.
- Bound network concurrency, retries, timeouts, cache growth, in-memory collections, and background work. Avoid polling loops and unbounded event histories.
- Do not block the main thread. Do not perform expensive sorting, parsing, disk I/O, image decoding, or network work inside composable bodies.
- Use stable IDs and stable lazy-list keys. Keep Compose recomposition and allocations measurable rather than guessing.
- Respect Android lifecycle, background execution, storage, battery, and permission rules. Never promise exact scheduling where Android only offers deferrable execution.
- Do not bypass paywalls, DRM, authentication, source restrictions, or access controls. Use only source data the app is authorized to access.
- Keep personal library, viewing history, statistics, and recommendations local by default. Do not upload viewing history or personal preferences to a third party unless a separately explained, explicit opt-in is designed and approved.
- Never fabricate episode metadata, release dates, timestamps, file sizes, progress, source health, or playback capability. Represent unknown values as unknown.
- Provide meaningful accessibility labels, scalable text, sensible touch targets, keyboard/focus support where applicable, and adequate contrast.

## 4. Required implementation loop

For each meaningful work unit:

1. State the observed problem and the evidence in the codebase.
2. Describe the proposed minimal change and affected modules/files.
3. Implement the smallest coherent change.
4. Add or update unit, integration, UI, migration, or instrumentation tests appropriate to the change.
5. Run the narrowest relevant tests, then the available project test/build checks. Do not claim a check passed unless it was actually run and its result observed.
6. Inspect the diff for accidental deletion, unrelated formatting churn, leaked credentials, duplicated logic, and broken existing behavior.
7. Update relevant project documentation and migration notes.

If a required design choice cannot be safely inferred, stop at that decision, explain the options and consequences, and ask one focused question. Do not block on minor styling choices: use the established design system and document the assumption.

## 5. Definition of done and final report

A phase is not complete merely because the app compiles. Report:

- What was inspected and what was actually implemented.
- Files/modules changed and the reason for each major change.
- Architecture/data-flow decisions and any schema migrations.
- Tests executed with exact commands and pass/fail outcomes; list tests not run and why.
- Before/after measurements where performance is in scope.
- Known limitations, platform/API constraints, unresolved risks, and follow-up work.
- Confirmation that existing features and animations were checked for regressions.
- A concise manual QA checklist.

Never claim “complete”, “optimized”, “crash-proof”, “works on all devices”, or “fully supported” without evidence. If implementation is partial, label it partial and explain what remains.
