# Novay — Product Scope

## 1. Anime Library 2.0

A personal, local-first library.

### Required capabilities
- Add/remove anime from the personal library.
- Favorites and custom collections/lists.
- Statuses: Plan to Watch, Watching, Completed, On Hold, Dropped.
- Filtering and sorting by title, status, genre, year, studio, date added and progress.
- Duplicate detection across providers.
- Stable internal anime ID with provider ID mappings.
- Alternative titles and normalized metadata.
- Bulk actions with clear confirmation for destructive operations.

### Identity rules
A single anime may have several source/provider records. Keep one canonical personal library entry and associate all verified provider mappings with it. Ambiguous matches must be presented for user confirmation rather than merged automatically.

## 2. Smart Episode System

- Independent watched state and progress for every episode.
- Persist exact resume position and known duration.
- Resume from the saved position.
- Configurable auto-mark-as-watched threshold.
- Configurable auto-next behavior, including whether to wait for user confirmation.
- Opening/ending skip only when trusted timestamps exist for the correct anime/version/episode.
- Allow users to correct progress and watched state.
- Handle stream failure, seek failure and app process death without corrupting progress.

## 3. Advanced Discovery

- Search across multiple enabled sources.
- Search by title and alternative title.
- Filters for genre, year, studio, format, status and other available metadata.
- Deduplicate results while preserving source choices.
- Cache search results with expiry and provider-aware invalidation.
- Use bounded concurrency and per-provider timeouts.
- Continue showing successful provider results if another provider fails.
- Local recommendations based on locally stored preferences/library where feasible.
- Do not transmit personal watch history to remote recommendation services by default.

## 4. Personalization Center

Allow customization of:
- Theme and accent palette.
- Home/dashboard sections.
- Card density and layout.
- Player preferences.
- Animation intensity and reduced-motion behavior.
- Content preferences and discovery filters.

Persist preferences locally and apply them consistently. Provide reset-to-default controls.

## 5. Anime Statistics

Display useful, explainable statistics:
- Library and episode counts.
- Started and completed anime.
- Actual watch time.
- Monthly activity/trends.
- Genre patterns based on available metadata.
- Recent activity and progress.

Count actual playback, not time spent on a paused player screen. Prefer compact aggregates over retaining an unlimited raw playback-event history. Clearly distinguish estimated values from exact values.

## 6. Release Calendar

- Day, week and month views.
- Episode number and anime title.
- Conversion to the device's local time zone.
- Filters for all followed anime or library-only anime.
- Optional reminders with user-controlled notification permissions.
- Provider attribution and last-updated time.
- Unknown or conflicting dates must be shown as uncertain, not invented.

AniList AiringSchedule is a candidate metadata provider, not a guarantee that every title or source is covered. Keep schedule providers behind adapters.

## 7. Adaptive UI

Support:
- Compact phone layouts.
- Medium and expanded tablet layouts.
- Landscape orientation.
- Split-screen and resizable windows.
- Two-pane navigation where appropriate.
- Keyboard, mouse, touch and accessibility navigation.

Use Android Window Size Classes rather than hard-coding device models.

## 8. Casting and external playback

- Use Media3 CastPlayer where compatible and justified.
- Detect available playback capabilities before offering an external target.
- Use supported Android intents for external apps.
- Handle unsupported formats, missing apps, unavailable devices and expired streams gracefully.
- Do not leak authentication headers, cookies or private temporary URLs to external applications.

## 9. Novay branded systems

### Novay Pulse
A customizable intelligent dashboard containing sections such as Continue Watching, Recently Added, Your Library, Upcoming Episodes, Collections, Quick Actions, Statistics and Recommendations. Users can reorder, hide and restore sections. Prefer local data and cached metadata; avoid a full network refresh every time the dashboard opens.

### Novay Circle
An interface area, visual identity and reusable component/navigation hub only. **It is not a community feature.** Do not implement social profiles, messaging, comments, feeds, follows, social APIs or community backends.

### Novay Studio
An advanced visual customization center:
- Theme editor and palettes.
- Layout and card styles.
- Visual effects and animation options.
- Live preview.
- Reset and restore defaults.
Preserve existing animations and design behavior.

### Novay Sense
A local diagnostics and intelligence layer, not a chatbot. Monitor network state, source health, cache errors, storage, playback errors and progress inconsistencies. Offer explainable suggestions. Never automatically delete downloads, library entries or user data.

### Novay Widgets
Android home-screen widgets:
- Continue Watching.
- Download Center.
- My Library.
Widgets must resize, adapt to available space, show concise information and deep-link into the app. They are shortcuts, not miniature copies of the full application.

### Novay Transfer
Local-first export/import for library, favorites, collections, progress, history aggregates, preferences, themes and player settings.
- Versioned archive format.
- Integrity checksum.
- Preview before import.
- Duplicate detection.
- Merge or replace choice.
- Schema migrations.
- Protected sensitive data.
- Safe restore and rollback strategy.
- Android Storage Access Framework.
- Exclude media downloads by default; offer them as a separate explicit option.
- No mandatory cloud account.

## 10. Explicit non-goals

- No social network/community under Novay Circle.
- No mandatory cloud synchronization.
- No automatic deletion of user data.
- No fabricated schedule, size, progress, watch-time or source status.
- No DRM or access-control bypass.
- No forced redesign that removes existing animations or features.
