# NOVAY — Master Product Evolution & Engineering Prompt
## Complete implementation brief · Android / Kotlin / Jetpack Compose

**Project:** Novay  
**Repository:** https://github.com/JCVERSA/nva  
**Primary branch:** `main`  
**Platform:** Android  
**Technology baseline:** Kotlin, Jetpack Compose, AndroidX, Media3, Room/DataStore where justified  
**Product direction:** premium, hybrid, cinematic, minimal, responsive, efficient on low-end devices

---

# 1. Mission

You are acting as a senior Android architect, Kotlin/Compose engineer, product designer, performance engineer and QA lead.

Your mission is to **audit and evolve the existing Novay application** by implementing the feature set in this document while preserving all existing functionality, architecture decisions that remain valid, UI components, animations, navigation, player behavior, download behavior, source integrations, local changes and tests.

This is an evolution of an existing application — **not a rewrite and not a greenfield project**.

Deliver a cohesive, production-minded implementation. Do not merely create mock screens, disconnected prototypes, placeholder buttons or documentation-only features. Every implemented control must have a real, clearly defined behavior. If a feature cannot be completed safely because a provider, API, permission, credential or architectural dependency is missing, implement the stable foundation, clearly identify the blocker and do not fake successful behavior.

## Non-negotiable principles

1. Audit the repository before changing anything.
2. Preserve all existing features and animations. You may improve or add animations, but do not remove existing ones.
3. Do not replace a working system just because another library or architecture is fashionable.
4. Do not add dependencies without a demonstrated need.
5. Do not copy code, assets, branding or proprietary design from reference projects.
6. Never invent metadata, episode release times, file sizes, progress, playback positions, source availability or statistics.
7. Keep user data local-first. Do not upload watch history or personal library data without explicit user consent.
8. Do not bypass DRM, authentication, paywalls, source restrictions or other access controls.
9. Make performance measurable. Avoid claims such as “optimized” without profiling or tests.
10. Keep the app usable on older and low-memory Android devices.

---

# 2. Mandatory repository audit — before implementation

Inspect the current repository and report findings before making structural changes.

Audit at least:

- Current branch, working tree state and uncommitted changes.
- Gradle, Android Gradle Plugin, Kotlin, Compose BOM and `minSdk` / `targetSdk`.
- Existing package structure and application architecture.
- Navigation graph, routes, back-stack behavior and deep links.
- Existing home/dashboard screens and reusable UI components.
- Existing theme system, typography, colors, shapes and design tokens.
- Existing animation framework, Lottie assets, transitions and motion settings.
- Existing player implementation and supported formats.
- Existing source/resolver integrations and their contracts.
- Existing download manager, queue, persistence and background execution.
- Existing Room databases, entities, DAOs, migrations and DataStore preferences.
- Image loading, caching and memory behavior.
- Network layer, HTTP clients, connectivity handling and retry policies.
- Existing backup/export/import behavior, if any.
- Existing widgets, notifications, permissions and foreground services.
- Existing tests, build variants, lint rules and CI workflows.

Known areas previously observed include:

- `app/src/main/kotlin/dot/jcversa/novay/ui/components`
- `app/src/main/kotlin/dot/jcversa/novay/screens`
- `app/src/main/kotlin/dot/jcversa/novay/player`
- `app/src/main/kotlin/dot/jcversa/novay/state`
- `app/src/main/kotlin/dot/jcversa/novay/theme`
- Lottie assets under `app/src/main/res/raw`

Previously observed components may include `CinemaGlass`, `SlateMotion`, `NovayLottieIcon`, `NovayMorphIcons`, `Shimmer`, `SwiftSlateSpinner` and `FloatingMiniPlayer`. **Verify they still exist and inspect their actual usage before relying on these names.**

### Audit deliverable

Create a concise baseline report containing:

- What already exists and works.
- What is partially implemented.
- What is missing.
- Which systems should be reused.
- Which areas require migration or refactoring.
- Risks and compatibility constraints.
- A proposed implementation sequence.

Do not overwrite, reset, clean, reformat or discard user changes. Do not run destructive Git commands. Do not modify the repository until the audit and implementation plan are clear.

---

# 3. Product and design direction

## 3.1 Visual identity

Use a **Hybrid** visual direction:

- Minimal, clean information hierarchy.
- Cinematic visual details where they improve the experience.
- Premium surfaces, subtle depth and restrained translucency.
- Consistent spacing, typography, iconography and component behavior.
- Clear distinction between primary actions, secondary actions and metadata.
- Strong empty, loading, offline, error and success states.

Use Orion Store as a **quality reference for layout, visual polish and motion only**:

https://github.com/RookieEnough/Orion-Store

Do not clone its code, assets, brand identity or exact screens. Adapt principles to Novay's existing identity and architecture.

## 3.2 Motion and accessibility

- Preserve every existing animation that is still part of the product.
- Keep transitions fluid, short and responsive.
- Prefer transform/alpha animations and stable Compose state.
- Avoid expensive blur, oversized shadows, continuously animated backgrounds and unnecessary recomposition.
- Respect system animation and accessibility preferences.
- Provide reduced-motion behavior where appropriate.
- Ensure animations remain smooth on entry-level and older devices.
- Do not animate large lists item-by-item without a performance reason.
- Avoid restarting animations during unrelated recompositions.

## 3.3 Responsive design

Support:

- Compact phones.
- Large phones.
- Tablets.
- Foldables.
- Landscape.
- Split-screen and resizable windows.

Use Android Window Size Classes and adaptive navigation/layout patterns. Do not simply stretch a phone layout across a tablet. Use two-pane or multi-pane layouts when appropriate, with sensible navigation transitions.

---

# 4. Feature scope

Implement all feature groups below as one coherent product. Integrate them with existing Novay systems rather than creating parallel, disconnected subsystems.

## 4.1 Anime Library 2.0

Create a complete personal anime library.

### Capabilities

- Add and remove anime from the personal library.
- Favorites.
- Custom collections and lists.
- Status management:
  - Plan to Watch
  - Watching
  - Completed
  - On Hold
  - Dropped
- Search within the library.
- Advanced filtering and sorting.
- Filter by status, genre, year, studio, source and progress when metadata is available.
- Grouping options such as status, alphabetical order, recently updated and custom collections.
- Duplicate detection and merge suggestions.
- Clear empty states and bulk actions.

### Identity and duplicate handling

Use a stable internal anime identity independent of source-specific IDs.

An anime may have multiple source IDs or metadata-provider IDs. Map those IDs to one internal record when confidence is sufficient. Preserve provider identifiers and provenance.

Do not automatically merge uncertain matches. Present a safe merge suggestion when title, alternate titles, year, format, episode count or provider relationships are ambiguous.

Keep the user's personal status, favorite state, collections and notes attached to the stable internal record.

### Data requirements

- Persist library state locally.
- Use transactions for multi-step updates.
- Add indexes based on real query patterns.
- Avoid loading the entire library into memory for large collections.
- Preserve data through schema migrations.

---

## 4.2 Smart Episode System

Build a reliable episode-progress system integrated with the existing player.

### Per-episode capabilities

- Independent watched/unwatched state.
- Independent playback progress.
- Exact resume position.
- Duration when known.
- Last watched timestamp.
- Manual mark watched/unwatched.
- Auto-mark watched based on a configurable threshold.
- Auto-next episode.
- Continue Watching integration.
- Episode-level progress history where useful.

### Single source of truth

Maintain one authoritative local progress record per anime/episode identity. Avoid competing progress stores in the player, library and dashboard.

Persist progress safely and efficiently. Do not write to the database on every playback frame. Use sensible checkpoints, lifecycle events and playback state transitions, while ensuring that the latest position is not lost on normal app closure or playback interruption.

### Auto-next and watched threshold

- Make auto-next configurable.
- Respect the user's choice when an episode ends.
- Avoid unexpectedly starting another episode when the user has disabled the feature.
- Make watched threshold configurable or use a documented sensible default.
- Handle short episodes, unknown duration and playback errors safely.

### Opening / ending skip

Support opening/ending skip only when reliable timestamp metadata exists from a trusted provider or user-configured data.

AniSkip API candidate:
https://github.com/aniskip/aniskip-api

- Verify current API behavior, terms, availability, rate limits and response schema.
- Match the correct anime and episode.
- Distinguish opening and ending segments.
- Never claim automatic detection if only timestamp metadata lookup is implemented.
- If timestamps are missing or uncertain, do not skip automatically.
- Provide clear user controls and a way to disable the feature.

---

## 4.3 Advanced Discovery

Build a multi-source anime discovery experience.

### User-facing capabilities

- Search across supported sources.
- Search by main title and alternative titles.
- Filters for genre, year, format, studio, status and source when available.
- Sorting by relevance and supported metadata.
- Discovery sections such as trending, seasonal, popular or recommendations only when provider data supports them.
- Search history with local controls to clear it.
- Loading, partial-result, offline and provider-error states.
- Deduplicate results from multiple sources.

### Architecture

Use separate, testable components:

- Source adapters.
- Search coordinator.
- Metadata resolver.
- Stable identity mapper.
- Duplicate detection / matching service.
- Filter and sort engine.
- Local result cache.

Do not let one failing provider block all other providers. Show partial results and identify which sources failed.

### Privacy

Prefer local recommendations based on the user's library and viewing activity. Do not send personal watch history to a remote service unless the user explicitly opts in and the data flow is clearly explained.

Do not invent recommendations or pretend a source supports filters it does not provide.

---

## 4.4 Personalization Center

Create a central place for user preferences.

Include:

- Theme selection.
- Accent color.
- Home screen layout preferences.
- Card density and card style.
- Player preferences.
- Subtitle and playback preferences where supported.
- Animation preferences.
- Reduced-motion option.
- Content and discovery preferences.
- Reset options with confirmation.

Persist lightweight settings in DataStore where appropriate. Keep structured library and episode data in the database.

---

## 4.5 Anime Statistics

Create meaningful personal statistics based on actual playback and library data.

### Statistics

- Anime in library.
- Anime started.
- Anime completed.
- Episodes watched.
- Total watch time.
- Monthly and weekly viewing trends.
- Genre patterns when metadata exists.
- Recent activity.
- Progress overview.

### Accuracy rules

- Count actual playback, not time during which the player was merely open.
- Use Media3 analytics such as `PlaybackStatsListener` or `AnalyticsListener` where compatible with the existing player.
- Define how seeks, pauses, buffering, background playback, playback speed and replay affect watch-time calculations.
- Avoid double-counting.
- Aggregate events instead of retaining an unlimited raw playback-event history.
- Label estimates as estimates.
- Handle missing metadata without inventing values.

---

## 4.6 Release Calendar

Create a daily, weekly and monthly anime release calendar.

### Capabilities

- Upcoming episodes.
- Anime title and episode number.
- Release date/time in the user's local time zone.
- Daily, weekly and monthly views.
- Filter to library/favorites.
- Provider/source indicator.
- Optional reminders and notifications.
- Empty, unavailable and stale-data states.

### Data integrity

AniList GraphQL `AiringSchedule` is a candidate provider:
https://docs.anilist.co/reference/object/airingschedule

- Verify current API schema, authentication requirements, rate limits and terms.
- Treat provider data as provider data, not guaranteed truth.
- Convert timestamps correctly to local time.
- Never fabricate release dates or times.
- Display uncertainty or stale-data indicators when appropriate.
- Do not assume every source has a reliable schedule.

---

## 4.7 Casting and External Playback

Integrate external playback without breaking the internal player.

### Casting

Evaluate Media3 CastPlayer:
https://developer.android.com/media/media3/cast/create-castplayer

- Verify dependency compatibility with the current Media3 version.
- Integrate with the existing playback abstraction where possible.
- Handle connection, disconnection, handoff and errors.
- Preserve playback position when a supported handoff is possible.
- Do not show Cast controls when no compatible route is available.

### External player

- Use supported Android intents and capability checks.
- Handle missing external applications.
- Handle unsupported media formats and source types.
- Do not assume all source URLs can be opened externally.
- Do not expose sensitive authorization headers, cookies or temporary credentials in logs, intents or UI.
- Explain when external playback is unavailable.

---

# 5. Novay branded systems

These are product-level systems and must share the same data and design foundation.

## 5.1 Novay Pulse — intelligent dashboard

Create a customizable dashboard containing relevant modules such as:

- Continue Watching.
- Recently Added.
- Your Library.
- Upcoming Episodes.
- Collections.
- Quick Actions.
- Statistics.
- Recommendations.

### Customization

- Show/hide sections.
- Reorder sections.
- Save layout preferences.
- Adapt to compact and expanded windows.
- Provide useful empty states.
- Avoid loading every module if it is not visible or needed.

Use local data first. Avoid unnecessary network requests each time the dashboard opens. Refresh stale provider data with bounded background work.

## 5.2 Novay Circle — visual hub only

**Important: Novay Circle is an interface concept, not a social network.**

Implement it as a visual hub, navigation area or reusable interface zone consistent with the Novay design system.

Do not add:

- User profiles.
- Messaging.
- Comments.
- Followers.
- Community feeds.
- Social backend.
- Public sharing features.

Do not interpret the word “Circle” as permission to build community features.

## 5.3 Novay Studio — visual personalization studio

Create an advanced but understandable visual editor.

Include:

- Theme editor.
- Accent and palette selection.
- Layout presets.
- Card styles.
- Visual effects.
- Animation preferences.
- Live preview.
- Reset to default.
- Safe persistence of custom choices.

Studio must use the same design tokens and theme system as the rest of Novay. It must not create a second incompatible styling system.

Preserve existing animations and offer customization without removing the original motion language.

## 5.4 Novay Sense — local diagnostics and intelligence

Novay Sense is **not a chatbot**. It is a local diagnostics and recommendation system.

Monitor, where technically available:

- Network connectivity and request failures.
- Source health and repeated resolver errors.
- Cache errors.
- Storage availability.
- Playback failures.
- Download failures.
- Database/progress inconsistencies.
- Repeated background-task failures.

Provide:

- Clear diagnostics.
- Actionable explanations.
- Safe recommendations.
- Manual retry or repair actions.
- Diagnostic history with sensible retention.

Never automatically delete user data, downloads, library entries or settings. Any destructive cleanup must be explicit and confirmed.

ConnectivityManager callbacks indicate network changes, not guaranteed Internet reachability. Confirm reachability through bounded real requests where necessary. Do not run continuous polling loops.

## 5.5 Novay Widgets

Provide Android home-screen widgets where supported:

- Continue Watching.
- Download Center.
- My Library.

Requirements:

- Use Android Glance or the best compatible widget approach after checking the current project.
- Support resizing and different widget sizes.
- Use compact, glanceable information.
- Provide deep links into the correct Novay screen.
- Handle stale data and unavailable content.
- Avoid making widgets miniature versions of the full app.
- Update responsibly; do not create excessive background work.

Reference:
https://developer.android.com/develop/ui/views/appwidgets/overview

## 5.6 Novay Transfer — local-first backup and restore

Create a reliable local export/import system for:

- Library.
- Favorites.
- Collections.
- Anime statuses.
- Episode progress.
- Watch history and statistics where appropriate.
- Preferences.
- Themes and layouts.
- Player settings.

### Archive design

- Versioned archive format.
- Schema/version metadata.
- Integrity checksum.
- Optional encryption for sensitive data, using modern Android-compatible cryptography.
- Import preview before applying changes.
- Duplicate detection.
- Merge or replace choice.
- Transactional restore where possible.
- Explicit migration path between archive versions.
- Clear error reporting and rollback strategy.

### Storage and privacy

- Use Android Storage Access Framework for user-selected files.
- Keep transfer local-first; do not require cloud accounts or a mandatory cloud service.
- Exclude downloaded media files by default.
- Offer media transfer only as a separate, explicit option with clear storage implications.
- Do not export credentials, cookies or secret tokens.
- Never overwrite the current library before validating the archive and presenting the import preview.

A Room archive library such as:
https://github.com/buxerr/room-safe-archive
may be studied for concepts, but it is new and must not be adopted as a production dependency without a thorough audit.

---

# 6. Technical improvements — implement all selected areas

The following improvements are in scope. Apply them only where the repository audit demonstrates a need. Avoid duplicate systems.

## 6.1 Smart Cache

Separate cache domains:

1. Metadata cache.
2. Image/artwork cache.
3. Source-resolution temporary cache.
4. Player/media cache.
5. Downloaded offline media.

For each cache define:

- Owner.
- Storage location.
- Expiration policy.
- Size limits.
- Invalidation rules.
- Offline behavior.
- Whether it is safe to clear.

Do not mix temporary resolver data with user-owned downloaded media. Never delete downloads during ordinary cache cleanup.

## 6.2 Image Optimization

Inspect the current image-loading library first.

- Reuse the existing stack if it already meets requirements.
- Consider Coil only if the current implementation lacks required caching, request cancellation, image sizing or Compose integration.
- Use appropriate image sizes and transformations.
- Avoid loading full-resolution artwork into small thumbnails.
- Use placeholders and error fallbacks.
- Cancel requests for items no longer visible.
- Avoid duplicate requests and unnecessary image recomposition.
- Respect memory constraints and cache budgets.

Coil reference:
https://coil-kt.github.io/coil/

## 6.3 Database Optimization

Inspect existing Room schema and query patterns.

- Add indexes only for demonstrated query patterns.
- Use transactions for related updates.
- Use pagination for genuinely large datasets.
- Avoid unnecessary full-table reads.
- Keep database work off the main thread.
- Use migrations; never destroy user data to simplify schema changes.
- Test migrations from existing schema versions.
- Consider Paging 3 when large lists make it useful, not by default.

References:
https://developer.android.com/training/data-storage/room  
https://developer.android.com/develop/ui/compose/lists

## 6.4 Crash Recovery

- Persist important state at safe checkpoints.
- Restore player and navigation state where appropriate.
- Recover interrupted downloads according to the existing download engine's guarantees.
- Detect incomplete imports and partial files.
- Use atomic file operations where applicable.
- Avoid claiming recovery if the state cannot be reconstructed.
- Use Android `ApplicationExitInfo` where useful for diagnosing prior process exits.
- Never automatically discard user data as a recovery shortcut.

## 6.5 Network Monitoring and Source Health

- Centralize request timing, status and failure classification.
- Distinguish offline state, timeout, DNS/TLS errors, HTTP errors, parsing errors and provider unavailability.
- Use bounded retries with backoff and cooldown.
- Avoid retry storms.
- Avoid continuous source polling.
- Cache provider results with explicit freshness.
- Show partial results if one source fails.
- Do not log sensitive URLs, tokens, cookies or headers.

## 6.6 Background Sync

Use WorkManager for persistent, deferrable work with constraints.

- Do not use WorkManager for precise real-time scheduling.
- Avoid duplicate jobs.
- Use unique work where appropriate.
- Respect battery, connectivity and storage constraints.
- Provide cancellation and retry behavior.
- Keep user-initiated immediate actions responsive.
- Follow current Android background execution and foreground-service restrictions.

Reference:
https://developer.android.com/develop/background-work/background-tasks/persistent

## 6.7 Battery Optimization

- Avoid polling loops and unnecessary wakeups.
- Batch non-urgent work.
- Use lifecycle-aware collection.
- Stop work when it is no longer needed.
- Avoid continuously animated off-screen components.
- Respect system background restrictions.
- Do not request battery-optimization exemptions without a strong, justified need.

## 6.8 Memory Management

- Profile actual memory usage before changing architecture.
- Avoid retaining Activity, View, Context or large media objects unnecessarily.
- Use bounded caches.
- Release player and decoder resources correctly.
- Avoid decoding artwork at excessive resolution.
- Avoid expensive object creation in recomposition.
- Use lifecycle-aware state collection.
- Do not rely on deprecated memory-trim callbacks as the sole memory strategy.
- Do not claim Android provides a universal reliable pre-kill memory-pressure signal.

## 6.9 Performance validation

Use real measurements:

- Compose recomposition inspection.
- Android Studio Profiler.
- Macrobenchmark for key user journeys.
- Baseline Profiles where useful.
- Startup and navigation timing.
- Scrolling performance.
- Image loading behavior.
- Player startup and resume.
- Database query performance.
- Memory and battery observations on representative devices.

References:
https://developer.android.com/develop/ui/compose/performance  
https://developer.android.com/topic/performance/benchmarking/macrobenchmark-overview  
https://developer.android.com/topic/performance/baselineprofiles/overview  
https://developer.android.com/topic/performance/issues/lmk

---

# 7. Existing download system — preserve and integrate

The download manager is an existing, separately specified Novay workstream. Do not replace or regress it while implementing the features in this document.

Preserve the established requirements:

- Each episode is an independent download item.
- Single episode, multi-select, full season and multiple seasons.
- Independent pause, resume, cancel, retry, remove and delete.
- Queue, priority and batch actions.
- Per-episode state and progress.
- Show size before, during and after download when known.
- Unknown size remains unknown; never fabricate a size, percentage or ETA.
- Distinguish transferred bytes, final file size and retained cache footprint.
- Keep batch actions from merging independent episode state.
- Integrate completed offline media with the existing player.
- Distinguish Remove from Delete.
- Use Android background execution rules correctly.
- Do not bypass DRM or source restrictions.

For direct HTTP downloads and HLS/DASH, evaluate the existing implementation first. Media3 DownloadService/DownloadManager is a candidate for supported streaming downloads. A direct HTTP engine may be appropriate for ordinary files, but only after checking compatibility, maintenance, API and license.

Relevant references:

- Media3 downloads: https://developer.android.com/media/media3/exoplayer/downloading-media
- Downpour: https://github.com/AlirezaJavan/Downpour
- Fetch2: https://github.com/Kutikov/fetch2-android
- XDM: https://github.com/itsolaph/xdm
- Sibi Download Manager: https://github.com/espitman/sibi-download-manager

Do not introduce a second download manager if a suitable one already exists. See the licensing section before reusing any code.

---

# 8. Architecture and data ownership

Adapt the architecture to the existing codebase. Do not impose a wholesale rewrite.

A sensible separation may include:

- UI / Compose screens.
- UI state and ViewModels.
- Domain use cases.
- Repositories.
- Local database and preferences.
- Provider/source adapters.
- Metadata services.
- Player integration.
- Download integration.
- Background work.
- Diagnostics and analytics.

### Data ownership rules

- Room: structured library, anime identity mappings, episode progress, collections, statistics aggregates, calendar cache and other relational data.
- DataStore: small preferences, feature toggles, layout and theme settings.
- File storage / SAF: user-selected transfer archives and downloaded media according to the current storage architecture.
- Media3: playback/download internals where already used.
- Cache: reconstructible temporary data only.

These are recommendations, not a mandate to create duplicate stores. Reuse existing repositories and databases when suitable.

### Consistency rules

- Define stable IDs and foreign-key relationships.
- Use transactions for multi-entity updates.
- Avoid storing the same progress independently in multiple modules.
- Make provider metadata provenance traceable.
- Make migrations reversible where practical.
- Never silently overwrite a user's local state with provider data.

---

# 9. Reference repositories and documentation

Use these as research and design references. Verify their current state, license, maintenance, API and compatibility before using anything. A reference is not automatically a dependency.

## 9.1 Official Android / Jetpack Compose

| Reference | What to study | URL |
|---|---|---|
| Compose Samples | Official architecture, UI patterns, Room, theming | https://github.com/android/compose-samples |
| Jetcaster | Media-oriented architecture, persistence, image handling | https://github.com/android/compose-samples/tree/main/Jetcaster |
| Reply | Adaptive layouts, navigation, large screens | https://github.com/android/compose-samples/tree/main/Reply |
| Jetsnack | Compose design system, custom layouts and motion | https://github.com/android/compose-samples/tree/main/Jetsnack |
| Compose Playground | Compose interactions and animation experiments | https://github.com/furkanaskin/ComposePlayground |
| AndroidX Glance | Android home-screen widget foundation | https://github.com/androidx/androidx/tree/androidx-main/glance |
| Coil | Image loading and caching | https://github.com/coil-kt/coil |
| WorkManager | Persistent background tasks | https://github.com/androidx/androidx/tree/androidx-main/work |

## 9.2 Anime library, tracking and discovery

| Repository | What to study | License / caution |
|---|---|---|
| Nekoyomi | Library grouping, custom series, migration and customization | Apache-2.0; verify current repository state |
| Aniyomi | Anime source architecture, local watching, categories, backups and player | Apache-2.0; do not copy blindly |
| Animite | Modern AniList client architecture, Compose, Apollo Kotlin | Apache-2.0 |
| AL-chan | Lists, schedule, seasonal chart, search, statistics and recommendations | GPL-3.0; study only unless compatible |
| Anisu | Anime client feature breadth and player/download concepts | GPL-3.0; study only unless compatible |
| Housha | Local subscriptions and episode notifications | Verify current license and maintenance |
| Nekomori | Schedule and AniList GraphQL UX/logic | Web app; not an Android implementation |
| AniSkip API | Opening/ending timestamp lookup | MIT; verify API and data reliability |

Links:

- https://github.com/Seguaz/Nekoyomi
- https://github.com/aniyomiorg/aniyomi
- https://github.com/imashnake0/Animite
- https://github.com/zend10/AL-chan
- https://github.com/Ansu216/Anisu
- https://github.com/delath/housha
- https://github.com/skgupta507/nekomorix
- https://github.com/aniskip/aniskip-api

## 9.3 Playback, downloads and transfer

| Repository | What to study | License / caution |
|---|---|---|
| XDM | Queue, direct downloads, persistence and progress UI | GPL-3.0-or-later; NewPipeExtractor dependency also affects licensing |
| Sibi Download Manager | Native Android download queue and progress patterns | Verify exact license before reuse |
| Downpour | Direct HTTP download engine candidate | Verify API, compatibility, release and license |
| Fetch2 | Android download behavior and queue concepts | Verify maintenance and compatibility |
| room-safe-archive | Versioned database archive, checksum and encryption concepts | MIT, but very new; audit before production use |
| NyanTV | Android TV, Media3, D-pad and anime playback | AGPL-3.0; study only unless compatible |

Links:

- https://github.com/itsolaph/xdm
- https://github.com/espitman/sibi-download-manager
- https://github.com/AlirezaJavan/Downpour
- https://github.com/Kutikov/fetch2-android
- https://github.com/buxerr/room-safe-archive
- https://github.com/NyanTV/NyanTV

## 9.4 Product design reference

- Orion Store: https://github.com/RookieEnough/Orion-Store

Use only as a visual-quality reference. Do not copy branding, assets or code.

## 9.5 Official technical documentation

- Compose performance: https://developer.android.com/develop/ui/compose/performance
- Adaptive layouts: https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes
- Android low-memory insights: https://developer.android.com/topic/performance/issues/lmk
- Macrobenchmark: https://developer.android.com/topic/performance/benchmarking/macrobenchmark-overview
- Baseline Profiles: https://developer.android.com/topic/performance/baselineprofiles/overview
- ConnectivityManager: https://developer.android.com/reference/android/net/ConnectivityManager
- Network state: https://developer.android.com/develop/connectivity/network-ops/reading-network-state
- Paging: https://developer.android.com/develop/ui/compose/lists
- WorkManager: https://developer.android.com/develop/background-work/background-tasks/persistent
- App widgets: https://developer.android.com/develop/ui/views/appwidgets/overview
- Media3 analytics: https://developer.android.com/media/media3/exoplayer/analytics
- Media3 CastPlayer: https://developer.android.com/media/media3/cast/create-castplayer
- AniList API: https://docs.anilist.co/
- AniList AiringSchedule: https://docs.anilist.co/reference/object/airingschedule
- Room: https://developer.android.com/training/data-storage/room
- DataStore: https://developer.android.com/topic/libraries/architecture/datastore
- Android backup: https://developer.android.com/identity/data/autobackup

---

# 10. Licensing and dependency policy

Before adding or copying any third-party code:

1. Inspect the repository's current `LICENSE` file.
2. Inspect licenses of relevant transitive dependencies.
3. Confirm whether the license permits the intended use and distribution.
4. Check attribution, notice, source-disclosure and copyleft obligations.
5. Check maintenance, recent releases, open issues and Android compatibility.
6. Prefer official AndroidX APIs or permissively licensed dependencies when they meet the need.
7. Record the decision and version in the project.

### Important cautions

- GPL-3.0 and AGPL-3.0 projects must not be copied into Novay or linked as dependencies without an explicit compatibility/legal review.
- XDM's GPL licensing context must be checked, including NewPipeExtractor.
- AL-chan, Anisu and NyanTV are valuable feature references, not automatic implementation sources.
- A repository being public or open-source does not mean its code can be copied without conditions.
- Do not add a library merely because it appears in this document.

---

# 11. Implementation phases

Implement in small, buildable and reviewable phases. Adjust order if the audit reveals dependencies, but do not silently omit any selected feature.

## Phase 0 — Audit and safety baseline

- Inspect repository and working tree.
- Record current architecture and features.
- Establish build/test baseline.
- Identify migrations and compatibility constraints.
- Present plan before risky changes.

## Phase 1 — Shared data foundation and performance

- Define stable anime and episode identity.
- Define progress ownership and data contracts.
- Optimize only proven database bottlenecks.
- Establish cache boundaries.
- Review image loading.
- Add diagnostics foundations.
- Add migration and regression tests.

## Phase 2 — Anime Library 2.0

- Library UI and persistence.
- Statuses, favorites and collections.
- Search, filter, sorting and grouping.
- Identity mapping and duplicate resolution.
- Bulk actions and empty/error states.

## Phase 3 — Smart Episode System

- Episode-level progress.
- Resume position.
- Watched state and threshold.
- Auto-next.
- Continue Watching integration.
- Reliable opening/ending skip metadata.
- Player lifecycle and persistence tests.

## Phase 4 — Advanced Discovery and metadata

- Source adapters and search coordinator.
- Metadata resolution.
- Cross-source deduplication.
- Filters and discovery sections.
- Local recommendations and privacy controls.
- Partial provider failure handling.

## Phase 5 — Novay Pulse and Novay Circle

- Customizable dashboard.
- Dashboard modules.
- Section visibility/order persistence.
- Circle as a visual/navigation hub only.
- Adaptive dashboard layouts.

## Phase 6 — Novay Studio and Personalization Center

- Theme and accent editor.
- Layout and card customization.
- Animation preferences.
- Live preview.
- Reset and persistence.
- Preserve existing motion.

## Phase 7 — Calendar, statistics and Novay Sense

- Release calendar with provider provenance.
- Actual-playback statistics.
- Local diagnostics.
- Source health and network monitoring.
- Safe recommendations and repair actions.

## Phase 8 — Casting, external playback and widgets

- Media3 CastPlayer evaluation/integration.
- External player intents and capability checks.
- Continue Watching widget.
- Download Center widget.
- My Library widget.
- Deep links and adaptive widget layouts.

## Phase 9 — Novay Transfer

- Versioned archive format.
- Export via SAF.
- Integrity validation.
- Import preview.
- Merge/replace.
- Transactional restore and migration.
- Tests for corrupt, old, duplicate and partial archives.

## Phase 10 — Final optimization and release validation

- Profile startup, scrolling, player and memory.
- Add Macrobenchmark/Baseline Profile only where justified.
- Validate low-end device behavior.
- Run regression, migration and integration tests.
- Review accessibility, responsive layouts and privacy.
- Produce final report.

At the end of each phase: build, test, inspect the diff and summarize what changed before continuing.

---

# 12. Testing and acceptance criteria

A feature is not complete merely because its screen renders.

## Functional tests

- Library statuses, favorites and collections persist.
- Duplicate source IDs map to the same internal anime only when confidence is sufficient.
- Uncertain matches are not silently merged.
- Episode progress is independent per episode.
- Resume position is restored correctly.
- Auto-mark watched follows the configured threshold.
- Auto-next respects user preferences.
- Opening/ending skip does nothing when trustworthy timestamps are unavailable.
- Discovery continues to show partial results when one provider fails.
- Calendar never displays fabricated release data.
- Statistics use actual playback time and do not double-count.
- Circle contains no social/community functionality.
- Studio changes are reflected consistently across the app.
- Sense never deletes user data automatically.
- Widgets open the correct destinations and handle stale data.
- Transfer validates archives before applying changes.
- Import merge/replace behavior is explicit and tested.
- Existing download behavior remains intact.
- Offline downloads remain playable through the supported player path.

## Performance tests

- No obvious jank during library scrolling.
- No expensive work on the main thread.
- No unbounded cache growth.
- No continuous network polling.
- No unnecessary background work.
- No excessive recomposition from unrelated state changes.
- Reasonable startup and navigation behavior on lower-end devices.
- Player and image resources are released appropriately.

## Regression tests

Verify all pre-existing functionality, including:

- Navigation and back behavior.
- Source selection and resolution.
- Player controls and playback lifecycle.
- Existing mini-player behavior.
- Existing animations and transitions.
- Existing download flows and state restoration.
- Existing theme behavior.
- Existing persistence and migrations.

Run the project's existing test suite and add focused unit, integration and UI tests for new behavior. Do not delete or weaken existing tests to make the build pass.

---

# 13. Engineering rules

- Follow the repository's existing conventions unless there is a documented reason to change them.
- Keep changes focused and reviewable.
- Avoid giant ViewModels and god classes.
- Keep provider-specific logic out of Compose UI.
- Model loading, empty, success, partial-success and error states explicitly.
- Use structured concurrency and lifecycle-aware collection.
- Avoid `GlobalScope`.
- Avoid blocking the main thread.
- Do not hardcode API keys or credentials.
- Do not log sensitive data.
- Do not silently swallow exceptions.
- Do not use fake/mock data in production paths.
- Do not leave placeholder buttons that appear functional.
- Avoid broad refactors unrelated to the requested scope.
- Do not rename or delete existing components without proving they are unused and safe to remove.
- Keep code and dependencies compatible with the project's actual SDK/toolchain.
- Update documentation for new architecture, data formats and configuration.

---

# 14. Required final report

When implementation is complete, provide a concise but precise report:

1. **Audit summary:** what was already present.
2. **Implemented features:** grouped by phase.
3. **Files changed:** important files and purpose.
4. **Architecture:** data ownership, repositories, provider adapters and player integration.
5. **Dependencies:** added/removed, versions and reasons.
6. **Licensing:** any third-party code or dependency decisions.
7. **Database:** schema changes and migration coverage.
8. **Tests:** commands run and actual results.
9. **Performance:** measurements collected; do not invent metrics.
10. **Known limitations:** APIs, providers, device or permission constraints.
11. **Remaining work:** exact unfinished items.
12. **Git state:** branch and whether changes are committed; never commit or push unless explicitly authorized.

Never report a test as passing unless it was actually run and passed. Never report a feature as complete if it is only a UI mockup or has placeholder behavior.

---

# 15. Start instruction

**Begin with Phase 0 only.**

Inspect the current Novay repository and working tree, establish the build/test baseline, and return the audit report plus a concrete implementation plan. Do not begin destructive refactoring or implementation before that audit is complete.

After the audit, proceed phase by phase, preserving the existing Novay application and all current animations and features.
