# Novay — Performance & Reliability Requirements

## 1. Performance process

Measure before optimizing. Record a baseline for startup, navigation, scrolling, image loading, player startup, memory and battery behavior. Repeat measurements on representative low-end and modern devices.

## 2. Compose and UI

- Use stable keys for lazy lists.
- Keep expensive work out of composition.
- Hoist state to the narrowest correct owner.
- Avoid unstable object churn and unnecessary recomposition.
- Use derived state for expensive UI calculations when appropriate.
- Keep animations short, interruptible and tied to meaningful state transitions.
- Preserve current animation behavior; do not remove existing motion to simplify implementation.
- Respect font scaling, reduced motion and accessibility semantics.

## 3. Smart cache

Use distinct caches for metadata, images, temporary source resolution and media. Define size limits, expiry, invalidation and eviction policy per cache. Display cache/storage information accurately. Do not confuse cached media bytes with final downloadable file size.

## 4. Image optimization

- Reuse the current image stack if it already supports efficient loading and caching.
- Consider Coil only after auditing existing dependencies and image behavior.
- Request appropriate image dimensions and decode sizes.
- Use placeholders and stable aspect ratios to reduce layout shifts.
- Avoid loading full-resolution artwork into small thumbnails.
- Cancel obsolete requests when items leave the screen.
- Avoid redundant transformations and duplicate cache layers.

## 5. Database optimization

- Profile slow queries before adding indexes.
- Use transactions for related writes.
- Avoid main-thread database work.
- Use pagination for genuinely large lists.
- Keep migrations deterministic and tested.
- Avoid writing playback progress on every rendering frame; use meaningful checkpoints and safe throttling.

## 6. Crash recovery

- Persist essential user state before risky lifecycle boundaries.
- Recover interrupted downloads and playback progress without inventing completion.
- Keep temporary files distinguishable from completed downloads.
- Use atomic rename/finalization where supported.
- Preserve error causes for diagnostics, with secrets redacted.
- A crash must not turn a partial download into a completed item.

## 7. Network monitoring and source health

- Use ConnectivityManager callbacks to observe network changes.
- Connectivity state is not proof that the Internet or a specific provider is reachable; verify actual requests.
- Track provider latency, timeout and recent failure categories.
- Use bounded retries, exponential backoff and cooldown.
- Avoid continuous polling loops.
- Keep source checks on-demand or scheduled conservatively.
- Show provider-specific failures without hiding results from healthy providers.

## 8. Background sync

- Use WorkManager for deferrable, persistent work with constraints.
- Do not treat WorkManager as a precise timer.
- Respect Android background execution and foreground-service restrictions.
- Use user-visible ongoing notifications only where platform policy requires them.
- Make tasks idempotent and safe to retry.
- Avoid duplicate scheduled jobs.

## 9. Battery optimization

- Batch non-urgent work.
- Pause or defer nonessential refreshes on constrained networks or low battery where appropriate.
- Avoid wake locks unless essential and correctly scoped.
- Let users control background behavior.
- Do not silently disable core download or playback functionality.

## 10. Memory management

- Profile allocations and leaks.
- Avoid holding large artwork, bitmaps, player instances or result sets longer than needed.
- Release player and decoder resources correctly.
- Use lifecycle-aware ownership.
- Use supported platform diagnostics such as ApplicationExitInfo where useful.
- Do not rely on deprecated trim callbacks as a universal signal of imminent process death; Android does not provide one universal pre-kill warning.

## 11. Validation

Use Android Macrobenchmark and Baseline Profiles where practical. Compare cold/warm startup, scrolling and navigation traces against baseline. Report device, OS, build variant and test conditions. Do not claim “smooth on all devices” without testing representative hardware.
