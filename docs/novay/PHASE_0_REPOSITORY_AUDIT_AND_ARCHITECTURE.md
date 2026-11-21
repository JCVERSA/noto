# NOVAY — PHASE 0: Repository Audit & Architecture Blueprint

**Execution mode: READ-ONLY. Do not implement features or modify application source in this phase.**

## Mission

Build an evidence-based understanding of the current Novay codebase and produce a safe, phased implementation blueprint for the capabilities described below. This phase is the mandatory gate before feature work. The repository may have changed since previous discussions; the repository itself is authoritative.

## Scope to audit

Inspect the existing implementation of:

- App entry point, navigation graph, screen hierarchy, shared UI components, theme system, design tokens, animation/motion system, and responsive behavior.
- Anime catalogue/metadata models, source adapters/resolvers, search, detail screens, library/favourites/collections if present.
- Player architecture, media session/service, playlist/episode handling, watch progress, resume behavior, skip controls, playback analytics, external intents, casting, and floating/miniplayer behavior.
- Download manager and offline playback, including current single/batch download capabilities, queue/state persistence, size reporting, pause/resume/retry/cancel/remove/delete semantics. Do not rebuild it as part of this audit.
- Persistence: Room/SQLite/DataStore/preferences/files, DAOs, repositories, migrations, backup behavior, caches, and ownership of state.
- Network client, connectivity handling, retry/timeouts, source health/error reporting, background work, notifications, and battery constraints.
- Image loading/caching, list/grid rendering, memory use, logging, crash reporting, and diagnostics.
- Tests, build variants, CI, lint/static analysis, dependency versions, and supported Android API range.

Also locate and review any existing project documents or design prompts in the repository. Verify whether components previously mentioned in planning (for example `CinemaGlass`, `SlateMotion`, `NovayLottieIcon`, `NovayMorphIcons`, `Shimmer`, `SwiftSlateSpinner`, `FloatingMiniPlayer`) actually exist and where they are used.

## Target capability roadmap to map against current state

### Phase 1 — Performance and reliability foundation
Smart Cache, Image Optimization, Database Optimization, Crash Recovery, Network Monitoring, Source Health Check, Background Sync, Battery Optimization, Memory Management.

### Phase 2 — Core anime experience
Anime Library 2.0 (statuses: Plan to Watch, Watching, Completed, On Hold, Dropped; favourites; custom collections; sorting/filtering; duplicate resolution), Smart Episode System (per-episode state, exact resume, watched state, configurable auto-mark and auto-next, metadata-backed OP/ED skip), Advanced Discovery (multi-source search, filters, metadata reconciliation, local recommendations).

### Phase 3 — Personalization
Personalization Center, Novay Studio visual editor, and Novay Circle as a **UI/interface area only**. No social network, profiles, chat, comments, community feed, or social backend.

### Phase 4 — Intelligence and information
Novay Pulse dashboard, Novay Sense local diagnostics, Anime Statistics, Release Calendar.

### Phase 5 — Adaptive UI and playback destinations
Phone/tablet/large-screen/foldable/multi-window responsive UI, compatible Cast support, and capability-checked external playback.

### Phase 6 — Connected experience
Android home-screen widgets (Continue Watching, Download Center, My Library) and Novay Transfer (versioned local export/import with validation and safe merge/replace).

## Audit procedure

1. Establish repository identity, current branch, working-tree state, recent history, project modules, and build entry points. Protect all existing local changes.
2. Map actual screen/navigation flow and identify the existing design system. Capture representative screenshots only if tooling/device access is already available; do not alter the app to create them.
3. Trace each critical data flow end to end:
   - source response → normalized anime/episode → UI;
   - user action → repository → database → UI state;
   - player timeline → progress persistence → resume;
   - download request → queue/worker/service → file/cache → offline player;
   - network event → source request → error/health status;
   - preference change → persistence → rendered appearance.
4. Identify canonical identity and duplicate risks. Determine whether anime/episode identifiers currently vary by source and whether a mapping layer exists.
5. Inspect schema and migration history. Note whether watch progress, library membership, downloads, and preferences are stored redundantly.
6. Identify background work and service types; check whether the current behavior complies with the Android versions actually targeted by the app.
7. Run only safe baseline checks that do not alter tracked files. Record commands and output. If a build/test cannot run because SDK, network, or environment is unavailable, state that precisely.
8. Create a feature-to-existing-code matrix with status: **Exists / Partial / Missing / Risky / Unknown**. Include exact file/class/symbol evidence for each conclusion.
9. Create a dependency and compatibility table. Do not choose new libraries yet unless the project already uses them.
10. Produce an implementation sequence with dependencies between phases, data migrations, high-risk areas, rollback strategy, and acceptance criteria.

## Required deliverables

Create/update documentation only, preferably under `docs/novay/`:

1. `phase-0-audit.md` — executive overview; repository snapshot; module map; feature matrix; existing functionality/animation inventory; architecture and state-flow diagrams (Mermaid is acceptable); data schema and migration inventory; dependencies/API levels; test/build baseline; risks ranked by severity; files/classes to extend rather than replace.
2. `phase-0-architecture.md` — target architecture and bounded responsibilities for UI, domain/use-cases, repositories, local persistence, source adapters, player integration, background work, and diagnostics. Align it to the actual project architecture; do not force an unrelated pattern.
3. `phase-0-roadmap.md` — Phase 1–6 task breakdown, prerequisites, dependency graph, acceptance criteria, test plan, migration sequencing, and explicit out-of-scope items.
4. `phase-0-open-questions.md` — only genuine blockers requiring user decisions. Separate these from safe assumptions.

## Architecture decisions that must be addressed

- Stable internal anime identity and source-specific ID mapping; define how duplicate candidates will be reconciled without silently merging different works.
- Stable episode identity and source-to-episode mapping; define what happens when episode order or numbering differs by provider.
- One authoritative store for watch progress and playback resume position.
- Boundaries between metadata cache, image cache, source-resolution temporary cache, and media/download cache.
- Source adapter contract, failure isolation, rate limits, cancellation, timeouts, and provenance of metadata.
- Local-first privacy and offline behavior.
- How existing download and player systems will be reused by later phases.
- Migration, import/export, corruption recovery, and compatibility strategy.

## Explicit non-goals

- Do not redesign screens, rename packages, replace architecture, add libraries, or implement any feature in Phase 0.
- Do not remove or rewrite any animation, player, download, source, or navigation code.
- Do not add social features to Novay Circle.
- Do not assume every anime provider has reliable metadata or airing schedules.

## Acceptance criteria

- The report is grounded in the current checkout and identifies concrete files/symbols rather than generic assumptions.
- All existing major features and animations have an inventory and regression-risk notes.
- The roadmap does not schedule duplicate systems where an adequate implementation already exists.
- All data model and migration risks are explicit before Phase 1/2 implementation.
- No application source, dependency, manifest, or build configuration was changed.
- Baseline checks and their exact outcomes are recorded.

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
