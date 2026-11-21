# Novay — Batch Downloads & Download Manager

## 1. Core model

Every episode is an independent download task. A batch is only a grouping and bulk-control mechanism; it must never merge episode state or output files into one opaque task.

Supported selection:
- One episode.
- Multiple selected episodes.
- Entire season.
- Multiple seasons.
- Multiple anime where the UI/source supports it.

## 2. Per-episode controls

Each task must support the applicable operations independently:
- Pause and resume.
- Cancel.
- Retry.
- Remove from the manager list.
- Delete the downloaded file.
- Open/play offline when completed.
- Show state, progress, selected quality/format and destination.

Clearly distinguish **Remove** (remove the record/list item without necessarily deleting the media) from **Delete** (remove the actual downloaded file and its associated record). Confirm destructive deletion.

## 3. Manager interface

Provide clear sections such as:
- Active.
- Queued.
- Completed.
- Failed.
- Batches.

Include pause all/resume all, retry failed, reorder queue, priority controls and multi-select bulk actions where supported. Batch actions must preserve per-item results and errors.

## 4. File-size and progress truth

Show size:
- Before download, if the source provides a reliable content length or playlist estimate.
- During download, transferred bytes and a percentage only when a valid total is known.
- After completion, actual finalized file size.

Never invent a size, percentage or ETA. If total size is unknown, show transferred bytes and “size unknown” rather than a fake percentage.

For HLS/DASH, distinguish:
- Estimated network transfer.
- Bytes actually transferred.
- Final local file size, if a single finalized file exists.
- Retained media/cache footprint.

These values are not necessarily equal. Explain estimates and uncertainty in the UI.

## 5. Engine boundaries

- Direct HTTP/MP4: evaluate a maintained direct-download engine such as Downpour only after checking its current API, release activity, license, Android compatibility and behavior.
- HLS/DASH: use AndroidX Media3 download APIs/DownloadService where suitable.
- Keep engine implementations behind a common task interface.
- Preserve the existing Novay source resolver and player integration.
- Do not assume every provider supports direct downloadable URLs.
- Do not bypass DRM, authentication, paywalls or access restrictions.

## 6. Background execution

Use platform-compliant background work:
- Media3 DownloadService for supported media downloads.
- WorkManager for deferrable orchestration, cleanup metadata or recovery work.
- Use foreground execution only when justified and permitted by current Android rules.
- Persist task state and resume safely after process death/reboot where supported.
- Use constraints and user-visible notifications appropriately.

## 7. Reliability and storage

- Write to temporary/in-progress files and finalize only after successful completion.
- Validate final output before marking completed.
- Keep partial data distinct from completed downloads.
- Detect insufficient storage and report it before or during transfer.
- Handle duplicate destination names safely.
- Avoid deleting a completed file when a retry starts.
- Persist task state transactionally.
- Recover stale tasks after crashes.
- Keep concurrency bounded and user-configurable if appropriate.

## 8. Offline playback

Completed downloads must be discoverable by the existing Novay player. Reuse existing playback controls, progress tracking and episode identity. Do not create a second competing playback history store.

## 9. Testing

Test known and unknown content length, interrupted transfer, pause/resume, cancel, retry, disk-full, duplicate destination, app process death, queue recovery, batch independence, HLS/DASH handling, direct file handling and offline playback.

## 10. Reference candidates

- Downpour: https://github.com/AlirezaJavan/Downpour — candidate for direct HTTP only; verify current status and license.
- Media3 download guide: https://developer.android.com/media/media3/exoplayer/downloading-media
- XDM: https://github.com/itsolaph/xdm — UX/architecture reference; GPL-3.0-or-later review required before reuse.
- Sibi Download Manager: https://github.com/espitman/sibi-download-manager — inspect current license and maintenance before reuse.
- Fetch2: https://github.com/Kotlin/Fetch — verify exact maintained repository/API before considering adoption.

References are not automatic dependency recommendations. Audit compatibility and licensing first.
