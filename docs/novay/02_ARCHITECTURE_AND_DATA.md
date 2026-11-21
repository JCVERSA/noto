# Novay — Architecture & Data Design

This is a target architecture guide, not permission to replace existing project structure blindly. Map the current implementation first and adapt these boundaries to it.

## 1. Suggested logical boundaries

- **UI / Compose:** screens, reusable components, navigation, design tokens and UI state.
- **Feature domain:** library, discovery, playback progress, downloads, calendar, statistics, preferences, diagnostics and transfer use cases.
- **Data:** Room repositories, DataStore settings, remote metadata clients, source adapters and cache stores.
- **Playback:** existing player integration, Media3 analytics and optional Cast integration.
- **Background:** WorkManager tasks and platform-compliant download services.
- **Platform:** widgets, notifications, Storage Access Framework, connectivity and window-size adaptation.

Avoid creating layers that only forward calls. Keep boundaries where they improve testability, replaceability or data ownership.

## 2. Core data concepts

Suggested entities (adapt names and fields to the existing schema):

- `Anime`: stable internal ID, canonical title, metadata and timestamps.
- `AnimeTitle`: alternative title, language/locale and normalized search key.
- `SourceAnimeMapping`: internal anime ID, provider ID, provider key, confidence and verification state.
- `Episode`: canonical episode identity, anime ID, episode number/season/part where known.
- `SourceEpisodeMapping`: provider-specific episode identifiers and source metadata.
- `LibraryEntry`: anime ID, status, favorite flag, added/updated times and user notes if supported.
- `Collection` and `CollectionItem`: user-defined lists and ordering.
- `EpisodeProgress`: episode ID, position, duration when known, watched state and last-played time.
- `PlaybackAggregate`: accumulated actual watch time and counts at useful aggregation levels.
- `ReleaseScheduleEntry`: anime/episode mapping, provider, timestamp, confidence and last-updated time.
- `DownloadTask`: independent episode task, source, state, byte counters, destination and error state.
- `UserPreferences`: settings in DataStore where appropriate; relational settings only when queryable.
- `PlaybackEvent`: optional bounded event data for accurate aggregation and recovery.

Do not duplicate the same personal progress in several competing stores.

## 3. Data ownership and conflict policy

- Local user state is authoritative.
- Remote metadata is enrichment, not authority over user preferences or progress.
- Provider IDs are aliases/mappings, not canonical personal identity.
- A failed provider response must not erase previously cached metadata.
- Conflicting metadata should retain provenance and update timestamps.
- Import must detect conflicts and offer merge/replace behavior.
- Use database transactions for multi-table changes and migrations.

## 4. Playback progress

- Persist episode progress on meaningful playback checkpoints, pause, seek completion, player release and lifecycle transitions.
- Throttle writes to avoid excessive database I/O while retaining acceptable resume accuracy.
- Guard against stale asynchronous writes overwriting newer progress.
- Treat unknown duration as unknown.
- Only mark watched when a configured threshold can be evaluated reliably.
- Store skip markers with provider/source, version and episode applicability.
- Auto-next must respect user settings and episode ordering confidence.

## 5. Discovery pipeline

Recommended flow:

1. Normalize query and selected filters.
2. Ask enabled source adapters with bounded concurrency.
3. Apply per-source timeout and cancellation.
4. Normalize metadata while retaining provider provenance.
5. Resolve canonical anime identity with confidence scoring.
6. Deduplicate only when identity confidence is sufficient.
7. Sort/filter and return partial results as providers finish.
8. Cache result with provider-aware expiry.

Do not let one slow or failed provider block all results. Avoid aggressive polling and unbounded retries.

## 6. Cache boundaries

Keep separate policies and quotas for:
- Metadata cache.
- Artwork/image cache.
- Temporary source-resolution cache.
- Player/media cache.
- Downloaded offline media.

A cleanup operation must explain what it will remove and must never silently delete completed user downloads. Respect user-configured storage limits.

## 7. Persistence choices

- Use Room for relational library, episode, mapping, progress, download and schedule data where the existing project uses it or where justified.
- Use DataStore for simple preferences and settings.
- Add indexes based on measured query patterns.
- Use pagination/lazy loading for large data sets where needed.
- Avoid premature schema complexity and unnecessary dependencies.
- Migrations must be tested from every supported prior schema version.

## 8. Transfer archive

Define a versioned manifest containing schema version, creation time, app version, included datasets and checksum metadata. Validate archive structure and integrity before showing import preview. Apply import transactionally where possible. Preserve unknown future fields when safe, and reject unsupported destructive migrations rather than guessing.

Never include secrets, cookies, authorization headers or temporary stream URLs. Downloads are excluded by default.

## 9. Security and observability

- Redact credentials and private URLs from logs.
- Keep diagnostics local by default.
- Avoid storing raw provider tokens in exported backups.
- Use encrypted storage for any genuinely sensitive local secret if required.
- Make diagnostics actionable and explain the evidence behind each warning.
