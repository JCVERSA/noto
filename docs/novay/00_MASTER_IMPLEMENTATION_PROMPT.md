# NOVAY — MASTER PRODUCT EVOLUTION & ENGINEERING PROMPT

## Role

Act as a senior Android engineer, Kotlin/Jetpack Compose architect, product designer and performance engineer. Your task is to evolve the existing **Novay** application into a polished, reliable anime discovery, library, playback and offline-management experience.

The target is the existing Novay repository supplied by the user. Do not assume its current state from this document: inspect the real codebase first.

## 1. Mandatory first step: audit before editing

Before writing or changing code:

- Inspect the repository structure, current branch, Git status and recent history.
- Read the Gradle configuration, Kotlin/Compose versions, dependency catalog, manifest, navigation, theme/design system, persistence layer, networking, source adapters, player and download code.
- Identify existing UI components, animations, Lottie assets, tests, feature flags and user-specific modifications.
- Build and run the current project if the environment permits; record the baseline result.
- Map existing behavior to the requirements in this document.
- Identify conflicts, missing infrastructure, technical risks and migration needs.

**Do not overwrite, delete, rename, replace or simplify existing functionality merely to make implementation easier.** Preserve all working features and animations. If a requested feature conflicts with existing behavior, explain the conflict and propose a backward-compatible solution before making a destructive change.

## 2. Product outcome

Build a coherent Novay experience with:

- Anime Library 2.0 and stable anime identity across sources.
- Smart per-episode progress and reliable playback continuity.
- Advanced multi-source discovery and metadata resolution.
- Personalization Center and Novay Studio.
- Anime statistics based on real playback.
- Release Calendar with provider-attributed schedule data.
- Adaptive phone, tablet, landscape and resizable-window layouts.
- Casting and supported external playback.
- Novay Pulse dashboard, Novay Circle interface area, Novay Sense diagnostics.
- Android home-screen widgets.
- Local-first export/import through Novay Transfer.
- Reliable download manager and offline playback.
- Smart cache, image optimization, database optimization, crash recovery, network monitoring, source health checks, background sync, battery optimization and memory management.

See the companion documents in this directory for detailed specifications.

## 3. Product and architecture rules

### Local-first ownership

- The local database is the source of truth for personal library state, collections, episode progress, playback resume position, preferences and statistics aggregates.
- Remote providers may enrich metadata or supply airing information, but must not silently overwrite user-owned progress or preferences.
- Do not upload watch history or personal library data to a remote service by default.
- No mandatory account, cloud backend or telemetry service.
- Any optional external integration must be transparent, user-controlled and failure-tolerant.

### Stable identity and source adapters

- Create stable internal anime identities.
- Map provider-specific IDs and aliases to the internal identity.
- Normalize titles and alternative titles for matching, but never merge records based on a weak title-only match without confidence checks.
- Keep source-specific episode IDs and stream details separate from canonical anime/episode identity.
- Make adapters replaceable; provider outages must not corrupt local data.

### Playback truth

- Maintain one authoritative local progress record per anime episode.
- Persist position and duration safely, with sensible write throttling and lifecycle handling.
- Count watch time only from actual playback events, not from time the player screen is open or paused.
- Do not mark an episode completed based on unreliable duration or a failed stream.
- Auto-next and skip behavior must respect user settings and available metadata.
- Opening/ending skip is allowed only when trustworthy timestamp metadata exists. Do not claim automatic scene recognition unless it is actually implemented and validated.

### No fabricated information

Unknown file sizes remain unknown. Unknown ETA remains unavailable. Unverified airing times remain unconfirmed. Failed source health checks must be represented honestly. Never manufacture progress, ratings, metadata, release schedules or statistics.

## 4. Required implementation phases

### Phase 0 — Audit and baseline

Deliver:
- Architecture map and feature inventory.
- Existing animation/component inventory.
- Build/test baseline.
- Dependency and license audit.
- Migration and regression-risk plan.

Do not begin broad refactoring before this report.

### Phase 1 — Data foundations

- Define canonical anime, source mapping, episode, library entry, collection, progress, playback event/aggregate, preference and release schedule models.
- Add versioned database migrations.
- Add indexes and transactions where query patterns justify them.
- Separate settings suitable for DataStore from relational data suitable for Room.
- Add repository boundaries and testable use cases.
- Define conflict-safe import/export schema.

### Phase 2 — Library and episode intelligence

Implement Library 2.0, collections, statuses, advanced filtering/sorting, duplicate detection, per-episode progress, resume position, auto-watched threshold and auto-next settings.

### Phase 3 — Discovery and metadata

Implement source adapters, concurrent bounded search, metadata resolution, alternate titles, deduplication, result caching, filters and local recommendations. Handle partial provider failure without blocking all results.

### Phase 4 — Download and offline experience

Implement the specification in `04_DOWNLOAD_MANAGER.md`. Keep every episode an independent task, even inside a batch. Integrate completed offline media with the existing player without breaking its source-resolution path.

### Phase 5 — Novay branded systems

- Pulse: customizable dashboard.
- Circle: interface area and reusable navigation/visual system only; **not a social network or community**.
- Studio: theme and visual customization.
- Sense: local diagnostics and safe recommendations.
- Transfer: versioned local backup/restore.

### Phase 6 — Statistics, calendar and integrations

Implement playback-derived statistics, provider-attributed release schedule, supported Cast integration, external playback capability checks and Android widgets.

### Phase 7 — Adaptive UI and performance

Use Android window size classes and responsive Compose layouts. Profile real device behavior. Optimize only after measuring.

### Phase 8 — Verification and delivery

Run unit, database migration, UI, playback, download, accessibility and regression tests. Compare performance to the baseline. Provide a change summary, screenshots where possible, known limitations and rollback notes.

## 5. Performance requirements

- Target smooth, responsive interaction on both modern and older/low-memory Android devices.
- Keep animations short, purposeful and interruptible.
- Avoid unnecessary recomposition, allocations, main-thread I/O, unbounded lists, polling loops and eager loading.
- Use lazy lists, stable keys and appropriate state hoisting.
- Use image loading/caching already present in the project; add or migrate to Coil only if the audit demonstrates a real need.
- Separate metadata, image, source-resolution and media/download caches.
- Use bounded retries, exponential backoff and cooldowns.
- Use WorkManager for deferrable persistent work, not as a precision timer.
- Respect Android background execution and foreground-service restrictions.
- Use Macrobenchmark and Baseline Profiles where practical.
- Do not add dependencies without a concrete need, compatibility review and license check.

## 6. UI and motion requirements

Visual direction: **Hybrid — clean minimalism with restrained cinematic detail**.

- Maintain Novay's existing identity and design tokens.
- Preserve all existing animations; additions are allowed, removals require explicit justification and approval.
- Motion must communicate state and hierarchy, not delay basic actions.
- Provide reduced-motion and low-power behavior.
- Support compact, medium and expanded layouts, landscape, split-screen and resizable windows.
- Use accessible contrast, touch targets, semantics, font scaling and keyboard/focus behavior.
- Orion Store is a quality reference for polish and organization only. Do not clone its code, assets, branding or exact screens.

## 7. Safety, privacy and content access

- Do not bypass DRM, paywalls, authentication, access controls or provider restrictions.
- Respect source terms and user-authorized access.
- Do not expose temporary stream URLs, cookies or authorization headers in logs, backups or exported diagnostics.
- Keep diagnostics local and redact secrets.
- Never automatically delete user data or downloads as a “cleanup” action.
- Backups must preview changes before restore and must not silently replace existing data.

## 8. Engineering workflow

For every phase:

1. State the files and modules that will change.
2. Explain the design and migration plan.
3. Implement the smallest coherent increment.
4. Add or update tests.
5. Run relevant tests/build/lint.
6. Inspect the diff for accidental deletions and unrelated changes.
7. Report success, failures, untested paths and remaining work.

Do not report a test as passing unless it was actually run. Do not claim a feature is complete when it is only a UI mock or placeholder.

## 9. Required final report

Include:
- Summary of implemented features.
- Architecture and database changes.
- Files changed.
- Dependencies added/removed and why.
- Tests and build commands with actual results.
- Performance measurements compared with baseline.
- Known limitations and provider/API dependencies.
- Migration, backup and rollback considerations.
- Explicit list of features not implemented.

**Begin with the audit. Do not start coding until the audit and risk report are complete.**
