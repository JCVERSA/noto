# NOVAY — PHASE 1: Performance & Reliability Foundation

## Mission

Improve Novay's responsiveness, resource use, network resilience, cache behavior, persistence efficiency, and recoverability **without changing the user-visible product unnecessarily**. Implement only improvements justified by the Phase 0 audit and measurable evidence.

## Prerequisites

- Read `docs/novay/phase-0-audit.md`, `phase-0-architecture.md`, and `phase-0-roadmap.md` when available.
- Re-verify the current git state and all relevant dependencies before editing.
- If Phase 0 documentation is missing, perform a focused read-only audit first. Do not guess the architecture.

## Workstream A — Smart Cache

Design a bounded, observable cache policy with separate ownership and lifecycle for:

1. Anime/episode metadata.
2. Artwork/posters/backdrops.
3. Temporary source resolution and short-lived provider responses.
4. Player/media and downloaded offline content (must remain under the existing media/download subsystem).

Requirements:
- Define cache keys using stable identities and relevant request parameters; prevent cross-source collisions.
- Define freshness/TTL, stale-while-revalidate behavior where appropriate, invalidation events, maximum size, and eviction policy.
- Avoid duplicate in-flight requests for the same key where the architecture supports request coalescing.
- Cache failures conservatively; do not let transient errors poison healthy results indefinitely.
- Show/record whether data is fresh, stale, unavailable, or not cached where that information affects behavior.
- Never cache authentication secrets or sensitive temporary URLs in logs or unprotected persistent storage.
- Do not delete the user's offline downloads when clearing ordinary metadata/image caches.

## Workstream B — Image Optimization

- Audit the currently used image stack first. If Coil (or another suitable loader) is already integrated, configure and optimize that implementation rather than adding a competing loader.
- If changing/adding Coil is genuinely necessary, verify current stable version compatibility with the repository's Kotlin/Compose/AGP versions and explain the migration.
- Configure lifecycle-aware request cancellation, appropriate memory/disk cache bounds, image downsampling/size requests, placeholder/error states, and cache key stability.
- Avoid loading full-resolution artwork into small list cells.
- Keep image transitions and shimmer/motion effects that already exist. Ensure they do not trigger excessive work or block scrolling.
- Verify scrolling performance with realistic poster-heavy lists and cache-cold/cache-warm scenarios.

## Workstream C — Database Optimization

- Identify actual bottlenecks before changing schema or query patterns.
- Use indexes for evidenced lookup/filter/sort paths, transactions for logically atomic multi-row updates, and paging for large datasets only where needed.
- Avoid expensive database queries and sorting on the main thread.
- Define query plans/expected indexes for library search, statuses, collections, episode progress, recent activity, and download lookups as applicable.
- Use migrations; never destructive-reset a user's database. Test upgrades from each supported schema version or use representative migration fixtures.
- Keep Room for structured relational data if that matches the existing app. Use DataStore for small typed preferences, not large relational datasets. Do not migrate working storage without evidence and a migration/rollback plan.

## Workstream D — Crash Recovery

- Inspect current crash handling and process-death behavior. Do not promise to prevent every system kill.
- Persist essential user state at safe checkpoints: current episode, resume position, in-progress library edits, and durable download queue state using their current authoritative stores.
- Ensure writes are atomic or recoverable and idempotent where possible.
- On next launch, detect and reconcile interrupted operations safely. Never mark an episode watched solely because the process died or the player was open.
- Use Android `ApplicationExitInfo` for retrospective diagnostics if supported by the app's API range; do not misuse it as a live memory-pressure signal.
- Never automatically delete user data as a “recovery” action. Offer repair/restore actions only when the user understands the effect.

## Workstream E — Network Monitoring & Source Health Check

- Use `ConnectivityManager` / `NetworkCallback` appropriately to observe default network/capability changes. Register and unregister callbacks according to lifecycle.
- A network being available is not proof that the Internet or a particular provider is reachable. Distinguish **device connectivity**, **provider reachability**, **provider response validity**, and **source authentication/configuration errors**.
- Add a source health model with states such as Unknown, Checking, Healthy, Degraded, Unavailable, RateLimited, and ConfigurationRequired, plus last-checked time and a safe user-facing explanation.
- Health checks must be on-demand, bounded, rate-limited, cached, and isolated per source. Avoid aggressive background polling and repeated checks after persistent failures.
- Never expose credentials, auth headers, signed URLs, or private response bodies in diagnostics/logs.
- Search and browsing must continue gracefully when one source is down; report partial results rather than failing the whole operation.

## Workstream F — Background Sync

- Inventory existing WorkManager/services before adding anything.
- Use WorkManager for persistent, deferrable work with explicit constraints, unique work, cancellation, and retry/backoff policies. It is not an exact alarm or immediate scheduler; periodic jobs are inexact and have platform minimum intervals.
- Synchronize only the minimum needed metadata, schedules, or user-requested tasks. Do not silently sync the entire watch history to a remote service.
- Avoid redundant work, duplicate workers, battery-draining loops, and work that competes with active playback/downloads.
- Provide clear offline/paused/deferred states and allow manual retry where useful.
- Respect metered network, battery, charging, and user preferences.

## Workstream G — Battery Optimization

- Measure avoidable wakeups, background tasks, network calls, animations while off-screen, and unnecessary recompositions.
- Make refresh/sync policies configurable when they have meaningful battery/network impact.
- Do not disable essential playback, download recovery, or accessibility behavior to improve a benchmark.
- Prefer event-driven updates and bounded work over polling.
- Verify behavior during Doze, backgrounding, process death, and network transitions on supported API levels.

## Workstream H — Memory Management

- Profile representative screens and flows before introducing memory heuristics.
- Bound caches, image decode sizes, retained playback objects, navigation back-stack references, search results, and event buffers.
- Release listeners, callbacks, media resources, and view/activity references at correct lifecycle boundaries.
- Do not use deprecated trim callbacks as a generic low-memory warning system. Use only supported callbacks for their documented meaning, and use `ApplicationExitInfo` for retrospective process-exit diagnosis where available.
- Do not force garbage collection as a routine optimization.
- Preserve player state and downloads while safely releasing disposable UI/cache resources.

## Workstream I — Performance measurement

- Establish measurable baseline journeys: cold launch, warm launch, opening home/library/detail/player, scrolling image grids, typing a search, and switching screens.
- Use Macrobenchmark and/or Compose tracing only if compatible with the existing build. Add Baseline Profiles for real critical journeys where practical.
- Compare release builds, not debug-only timings. Record device/API, build mode, sample count, and results.
- Optimize Compose using evidence: stable lazy keys/content types, avoid repeated expensive work in composables, use appropriate state derivation/deferred reads, and avoid unnecessary recompositions.
- Do not annotate everything `@Stable` or `@Immutable` without validating the data model contract.

## Required tests

- Cache expiration, invalidation, stale data, cache isolation, eviction bounds, and in-flight request coalescing.
- Image request cancellation, error/placeholder state, and bounded cache configuration.
- Database query/repository correctness and every migration path.
- Process death/interrupted operation reconciliation and idempotency.
- Network transitions, no Internet despite active transport, single-source failure, rate limiting, retry cooldown, and cancellation.
- Background work constraints, duplicate work prevention, retry/backoff, and offline/metered behavior.
- Memory/resource cleanup and no leaked listeners/callbacks where testable.
- Existing player/download workflows and all current animations remain intact.

## Acceptance criteria

- Each optimization is linked to an observed issue or a defined measurable goal.
- No unbounded cache, poller, retry loop, or raw playback event history is introduced.
- No user database/download data is destroyed or silently reset.
- The app remains usable offline and when one source is unavailable.
- Performance claims include comparable measurements, not impressions.
- Existing app features, source resolution, player, download manager, and animations pass regression checks.

## Deliverables

- `docs/novay/phase-1-performance-report.md` with baseline and post-change measurements, architecture decisions, cache budgets, network policy, migrations, tests, and limitations.
- Updated tests and any required migration notes.
- A concise list of follow-up optimizations intentionally deferred for lack of evidence.

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