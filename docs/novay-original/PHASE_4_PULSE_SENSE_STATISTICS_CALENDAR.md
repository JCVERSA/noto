# NOVAY — PHASE 4: Novay Pulse, Novay Sense, Statistics & Release Calendar

## Mission

Add useful at-a-glance information and local diagnostics on top of the reliable library, progress, source-health, and preferences foundations. The dashboard should be personal and configurable; statistics must reflect real playback; calendar data must be attributed and uncertainty-aware.

## Prerequisites

Read Phase 0–3 reports. Reuse the canonical anime/episode identities, authoritative watch-progress store, source adapter contracts, theme preferences, and Phase 1 source-health/network foundations. Do not create duplicate copies of these systems.

## A. Novay Pulse — intelligent personal dashboard

Build a home dashboard from composable, independently loadable sections. Candidate sections:
- Continue Watching.
- Recently Added / Recently Updated.
- Your Library and status summaries.
- Upcoming Episodes.
- Personal Collections.
- Quick Actions.
- Anime Statistics snapshot.
- Local Recommendations.
- Download Center summary using the existing download manager.

### Customization

- Allow users to show/hide, reorder, and where practical resize/reconfigure sections.
- Persist dashboard layout as a versioned local preference.
- Provide reset-to-default without deleting library/download/progress data.
- Retain stable section IDs and migrate layout preferences safely when sections are added/renamed.
- On compact screens, prioritize the most useful content; do not force a dense dashboard.

### Loading and performance

- Each section must load independently so one slow provider does not block the whole dashboard.
- Prefer local data and cached metadata. Do not issue every source search or network request on each dashboard open.
- Use explicit refresh, bounded background refresh, and stale-data indicators where appropriate.
- Avoid duplicating large poster lists in memory. Use paging/lazy layouts and stable keys where justified.
- Provide skeleton/loading, empty, offline, stale, and error states without layout jumps.

## B. Novay Sense — local diagnostics (not a chatbot)

Novay Sense is a diagnostic/insight interface, not a generative assistant and not a social feature.

### Signals it may observe
- Network connectivity state and request failures.
- Per-source health state and last successful check.
- Cache hit/miss/eviction/error summaries.
- Available storage and download/cache footprint where platform APIs permit.
- Playback failures, decoder/source errors, buffering summaries, and unsupported format conditions.
- Database/migration/recovery warnings.
- Watch-progress inconsistencies and interrupted operations.

### Rules
- Explain what was observed, when, and from which local subsystem.
- Separate confirmed facts from probable causes. Never label an unverified diagnosis as certain.
- Offer safe, reversible suggestions such as retry, refresh metadata, inspect source configuration, or open storage settings.
- Never automatically delete downloads, clear user data, reset preferences, remove sources, or alter progress.
- Do not expose credentials, authorization headers, signed URLs, personal identifiers, or raw private content in diagnostic logs.
- Keep diagnostic history bounded and local. Provide a clear way to clear diagnostic records separately from user content.
- Do not add a chatbot, remote LLM, online telemetry requirement, or automatic user-data upload.

## C. Anime Statistics

### Metrics

- Anime added, started, completed, on hold, and dropped.
- Episodes watched and episodes remaining when reliable episode metadata exists.
- Actual playback time, viewing activity by day/week/month, monthly trends, and genre patterns when metadata is available.
- Progress summaries by status and optional personal milestones.

### Data correctness

- Use actual player playback events and the canonical progress/player data pipeline. Do not count time the player is merely open, paused, buffering without user playback intent, or running in the background without actual playback.
- Evaluate Media3 `PlaybackStatsListener`/`AnalyticsListener` only if Media3 is already used and the version/API in the project supports it. Aggregate the metrics needed for statistics; do not retain unbounded raw event histories by default.
- Clearly distinguish watched duration from episode runtime and from wall-clock session duration.
- Avoid double-counting when playback resumes, switches source, seeks, changes speed, or moves between local and Cast playback.
- Handle missing duration/episode metadata without inventing values.
- Keep stats local by default. Provide a data reset scope that does not delete watch progress unless separately confirmed.

### Presentation

- Make charts legible, accessible, and meaningful. Avoid misleading axes, unsupported precision, or false comparisons.
- Always provide a textual equivalent/summary for chart information.
- Allow date-range selection if the existing UI patterns support it.

## D. Release Calendar

### Provider model

- Design a provider adapter interface. AniList GraphQL `AiringSchedule` may be evaluated as one provider, but verify its current API schema, policies, rate limits, and field availability at implementation time.
- AniList documents future airing data as the data it aims to guarantee as present and accurate. Do not treat past schedules or every provider's schedule as complete or guaranteed.
- Use other providers only when authorized, available, and compatible with the app's policies.

### Calendar behavior

- Daily, weekly, and monthly views (choose a compact usable default).
- Show anime, episode number, airing date/time, provider/provenance, and library status when available.
- Convert timestamps to the device's local timezone for display; keep canonical timestamps/zone information correctly in storage.
- Clearly label estimates, unknown time, stale results, and provider disagreements.
- Filters: all, in library, favourites, watching, selected sources, and optional genres where metadata exists.
- Optional local reminders must be opt-in, respect notification permission and Android scheduling constraints, and explain that delivery timing may be affected by OS battery policies.
- Never fabricate an airing time or infer a date from episode numbering.
- Handle rescheduled, delayed, cancelled, duplicate, and missing schedule entries without silently overwriting more reliable data.

## Required tests

- Pulse sections load independently, refresh safely, persist custom order/visibility, and handle stale/offline data.
- Sense classifies network/source/cache/playback/storage errors accurately; no automatic destructive action; diagnostics redact secrets and remain bounded.
- Statistics count actual playback only; test pause/buffering/background/seek/resume/source-switch/Cast/double-event cases.
- Calendar parsing, timezone/DST transitions, missing timestamps, duplicate events, stale provider data, uncertain results, provider errors, and notification permission/constraints.
- Regression coverage for library, progress, recommendations, downloads, preferences, and animations.

## Acceptance criteria

- Pulse is fast and mostly local-first; one slow card never blocks the entire home screen.
- Users can customize and reset dashboard layout safely.
- Sense is evidence-based and diagnostic only; it never deletes or changes user data automatically.
- Statistics reflect actual playback events and avoid double-counting.
- Calendar items are provider-attributed, timezone-correct, and honest about uncertainty.
- No personal watch history is uploaded by default.

## Deliverables

- `docs/novay/phase-4-pulse-sense-insights.md` describing dashboard contract, diagnostic taxonomy, statistics event model, schedule providers/provenance, timezone logic, notification constraints, and test evidence.

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