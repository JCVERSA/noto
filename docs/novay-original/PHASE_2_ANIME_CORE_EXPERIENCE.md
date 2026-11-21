# NOVAY — PHASE 2: Anime Library 2.0, Smart Episode System & Advanced Discovery

## Mission

Build the core personal anime experience on top of the existing catalogue, source resolver, player, and persistence systems. Reuse what already works. Do not create parallel libraries, duplicate watch-progress stores, or a second player pipeline.

## Prerequisites

Read Phase 0 audit and Phase 1 architecture/performance outcomes. Re-check the actual codebase and migrations. If a prerequisite is absent, conduct a focused audit before changing code.

## A. Anime Library 2.0

### Capabilities

- A personal library containing anime entries with stable identity.
- User statuses: `PLAN_TO_WATCH`, `WATCHING`, `COMPLETED`, `ON_HOLD`, `DROPPED` (map to existing naming conventions if already established).
- Favourites independent from status.
- User-created collections/lists with add/remove/reorder and safe deletion semantics.
- Sorting and filtering by title, status, favourites, genres, year, studio, recently updated/added, and progress when the metadata exists.
- Search within the user's library.
- Duplicate detection across source providers.
- Empty, loading, offline, stale metadata, and error states.

### Identity model

- Define one stable internal anime identity that is independent of any particular provider.
- Store provider-specific IDs and aliases in a mapping table/value object linked to that identity.
- A provider result must not create a second library entry merely because it has a different source ID.
- Matching may use trusted provider cross-references, normalized titles/alternative titles, year, format, episode count, and other available metadata. Do not auto-merge based only on a title string.
- When confidence is insufficient, present a clear duplicate-resolution choice: keep separate, link as same work, or dismiss candidate. Keep a reversible mapping/audit path.
- Handle seasons, remakes, specials, movies, OVAs, and similarly named works as potentially distinct entities.
- Preserve source provenance and metadata timestamps so conflicts can be explained.

### Collections and deletion

- Deleting a custom collection must not delete anime or watch progress.
- Removing an anime from the library must not automatically delete download files, playback history, or other user data unless a separate explicit confirmation describes exactly what will be removed.
- Use stable IDs for list keys and database relationships.
- Keep all library data local by default.

## B. Smart Episode System

### Per-episode state

Each episode must have independent state, including where applicable:
- Stable internal episode identity and provider/source episode mapping.
- Watched/unwatched state.
- Exact last playback position and known duration.
- Last played timestamp and playback completion event.
- Optional metadata for opening/ending skip intervals, with provenance/confidence.

### Single source of truth

- Reuse or consolidate around one authoritative progress repository/store. Do not let the UI, player, and statistics system maintain conflicting progress copies.
- Resolve episode identity before persisting progress. Account for providers that number specials, split cours, seasons, or recap episodes differently.
- Persist resume position using lifecycle-safe checkpoints (for example, periodic throttled checkpoints plus pause/stop/background/release checkpoints). Avoid a disk write on every playback tick.
- Handle seeking, playback speed, buffering, ads if applicable, switching sources, app backgrounding, process death, and player recreation correctly.
- Do not overwrite a newer stored position with a stale callback from a previous player/session.

### Watched completion and auto-next

- Implement an explicit completion threshold only if existing product behavior does not already define one. Make it configurable where appropriate; avoid treating opening credits, buffering, paused time, or an unfinished seek as actual watched time.
- Offer an option to auto-mark watched and an option to auto-play the next episode. Both must be user-controllable and have sensible defaults aligned with existing settings.
- Auto-next must respect playlist/season boundaries, missing episodes, user cancellation, source errors, and player state. Do not launch the next episode after the user has left the player or explicitly stopped.
- Updating watched state manually must immediately reconcile with the single progress store.

### Opening/ending skip

- Only expose automatic OP/ED skip when the current episode has reliable timestamp metadata from a trusted/known provider or an explicitly user-configured interval.
- Never claim automatic visual/audio detection unless such a detector truly exists, is privacy-safe, tested, and approved as scope. Do not infer intervals from generic fixed offsets.
- Show provenance or indicate when the interval is unavailable. Handle intervals outside media duration and malformed/overlapping timestamps safely.

## C. Advanced Discovery

### Search architecture

- Use a provider/source adapter contract and a search coordinator that supports concurrent, bounded, cancellable source requests.
- Debounce query input; cancel obsolete requests when a new query arrives or the user leaves the screen.
- Apply per-provider timeout, rate limit, retry/cooldown, and partial-result behavior.
- One failing provider must not erase successful results from other providers.
- Normalize results into a common model while preserving provider provenance and original source references.
- Avoid scraping where prohibited and never bypass authentication, paywalls, DRM, or source restrictions.

### Search/filter capabilities

Support only fields actually supplied by metadata providers:
- Main and alternative titles, year/season, format/type, genres, studio, status, language/sub/dub metadata, and episode count where available.
- Filters should clearly distinguish an unsupported/unknown field from a field with no matching values.
- Combine filters predictably and allow reset/clear.
- Show source badges and duplicate/metadata confidence indicators without overwhelming the layout.
- Provide robust loading, empty, partial-results, offline, and error feedback.

### Metadata reconciliation and duplicate results

- Reuse the identity mapping system from the library. Search results should link to existing canonical anime when confidence is high.
- Never silently collapse two different adaptations/remakes/seasons into one work.
- Store source provenance and explain conflicting fields when they matter.

### Local recommendations

- Build recommendations locally from library statuses, genres, ratings/favourites if they exist, and user-selected preferences.
- Start with transparent, simple ranking signals. Avoid opaque claims such as “AI knows your taste” if no such model exists.
- Viewing history and personal preferences must not be uploaded by default.
- Provide hide/dismiss controls and avoid repeatedly recommending dropped or hidden titles.

## D. UI and interaction requirements

- Maintain Novay's existing hybrid design direction and reusable components.
- Preserve current motion and animations. Use subtle additions only where they improve feedback and never compromise scrolling/playback.
- Provide compact and expanded list/grid presentation consistent with existing navigation; adaptive behavior is addressed more fully in Phase 5.
- Ensure status, favourite, collection, watched, and progress changes are reflected consistently across all relevant screens.
- Avoid destructive gestures without undo or explicit confirmation.

## E. Data and migration requirements

- Plan schema changes using the existing persistence technology. Use stable IDs, foreign keys/relationships where appropriate, indexes for actual query patterns, and transactions for multi-step updates.
- Provide reversible/robust migration tests. Preserve existing favourites, progress, watched flags, downloaded item links, and source mappings.
- If old data cannot be mapped confidently, retain it and surface a recoverable reconciliation path instead of discarding it.

## Required tests

- Library status transitions, favourites, collection CRUD/reorder, sorting/filter combinations, duplicate candidate resolution, and collection deletion without collateral deletion.
- Identity mapping across providers, same-title different-work collisions, remakes, movies, specials, and source episode-number discrepancies.
- Progress persistence under pause/resume/seek/player recreation/background/process death; stale callback protection; watched threshold; auto-next cancellation and failure cases.
- OP/ED interval validity, missing timestamps, malformed metadata, and duration bounds.
- Multi-source search concurrency, cancellation, timeouts, partial results, provider failure, rate limiting, and offline states.
- Local recommendation privacy and deterministic ranking tests.
- Migration tests and regressions for current player, downloads, screens, and animations.

## Acceptance criteria

- Each anime has a stable internal identity with source IDs linked to it.
- Episode progress is independent and has exactly one authoritative persistence path.
- Resume position is accurate and survives normal lifecycle interruptions.
- Auto-mark, auto-next, and OP/ED skip are configurable and never rely on fabricated data.
- Multi-source search returns useful partial results when a provider fails.
- Library/episode state remains local by default and is not silently uploaded.
- All previous Novay capabilities and animations still work.

## Deliverables

- `docs/novay/phase-2-core-experience.md` with entity model, source adapter contract, progress lifecycle, duplicate-resolution policy, recommendations logic, migrations, and test evidence.

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