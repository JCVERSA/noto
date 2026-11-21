# Novay — Acceptance & Regression Checklist

Use this checklist throughout implementation. A feature is not complete because its screen exists; the underlying behavior must work and be tested.

## Repository safety
- [ ] Existing branch and Git status inspected before edits.
- [ ] Existing features, navigation, player, source resolver and animations inventoried.
- [ ] No unrelated user changes overwritten.
- [ ] Dependency and license review completed.
- [ ] Baseline build/tests recorded.

## Library and identity
- [ ] Library statuses work and persist.
- [ ] Favorites and custom collections work.
- [ ] Sorting and filters return correct results.
- [ ] Cross-source duplicates are detected without unsafe title-only merges.
- [ ] User data remains intact across app restart and migration.

## Episode progress and playback
- [ ] Each episode has independent watched state and resume position.
- [ ] Resume position survives process death.
- [ ] Progress writes cannot overwrite newer values with stale writes.
- [ ] Auto-watched threshold is configurable and tested.
- [ ] Auto-next respects settings and episode ordering.
- [ ] Skip markers are used only when reliable and applicable.
- [ ] Failed/paused playback does not create false watch-time statistics.

## Discovery
- [ ] Multi-source search is bounded and cancellable.
- [ ] Partial provider failures do not hide successful results.
- [ ] Metadata provenance is retained.
- [ ] Deduplication confidence is tested.
- [ ] Cached results expire and invalidate correctly.
- [ ] Personal watch history is not sent remotely by default.

## Personalization and branded systems
- [ ] Themes and preferences persist.
- [ ] Pulse sections can be reordered/hidden/restored.
- [ ] Circle contains no social/community functionality.
- [ ] Studio preview, reset and accessibility contrast work.
- [ ] Sense diagnostics are local, explainable and non-destructive.
- [ ] No automatic deletion of user data or completed downloads.

## Statistics and calendar
- [ ] Watch time derives from actual playback.
- [ ] Aggregates are consistent after restart.
- [ ] Calendar uses provider-attributed data.
- [ ] Time-zone conversion is correct.
- [ ] Unknown/conflicting schedules are shown as uncertain.
- [ ] Reminders respect notification permission and user settings.

## Downloads and offline
- [ ] Single, multi-select, season and multi-season selection work where supported.
- [ ] Every episode is an independent task.
- [ ] Pause/resume/cancel/retry/remove/delete semantics are distinct and correct.
- [ ] Size before/during/after is accurate or explicitly unknown.
- [ ] Unknown total size never produces fake percent or ETA.
- [ ] HLS/DASH estimate, transferred bytes, final size and cache footprint are not conflated.
- [ ] Partial files are never marked completed.
- [ ] Queue and batch operations preserve per-item state.
- [ ] Process death and storage exhaustion recover safely.
- [ ] Completed downloads play through the existing player.

## Adaptive UI and integrations
- [ ] Compact, medium and expanded window layouts work.
- [ ] Landscape, split-screen and resizing do not clip content.
- [ ] Cast availability and unsupported formats are handled.
- [ ] External playback does not leak credentials or private URLs.
- [ ] Widgets resize and deep-link correctly.
- [ ] Transfer archive validates checksum and schema before restore.
- [ ] Import preview offers merge/replace and handles duplicates.

## Performance, accessibility and reliability
- [ ] No main-thread I/O in critical paths.
- [ ] Lists use stable keys and appropriate lazy loading.
- [ ] Image decoding/caching is bounded.
- [ ] Cache categories are separate and cleanup is safe.
- [ ] Retries are bounded with backoff/cooldown.
- [ ] Background work respects Android restrictions.
- [ ] Memory and battery behavior are profiled on representative devices.
- [ ] Existing animations are preserved.
- [ ] Reduced-motion, font scaling, semantics and contrast are tested.
- [ ] Macrobenchmark or equivalent measurements compared to baseline where practical.

## Delivery
- [ ] Unit tests pass.
- [ ] Database migration tests pass.
- [ ] UI/instrumentation tests pass where environment permits.
- [ ] Build and lint results are reported honestly.
- [ ] Diff reviewed for accidental deletions.
- [ ] Known limitations and incomplete features are documented.
- [ ] Backup/rollback considerations are documented.
