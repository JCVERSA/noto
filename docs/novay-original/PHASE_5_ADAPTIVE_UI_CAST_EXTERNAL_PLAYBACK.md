# NOVAY — PHASE 5: Adaptive UI, Casting & External Playback

## Mission

Make Novay behave like a well-designed Android app across phones, tablets, foldables, landscape, desktop-sized windows, and multi-window use. Extend playback destinations only where the format, source, device, and API genuinely support them.

## Prerequisites

Read Phase 0–4 reports and inspect the current navigation, player service/session, media item model, supported formats, source authentication, and window handling. Preserve current phone UI and player behavior as the baseline.

## A. Adaptive UI

### Window-aware layout

- Use Android Window Size Classes (or the current official equivalent compatible with the repository) rather than device-brand checks or hardcoded “tablet” booleans.
- Consider width and height classes separately. The available window can change at runtime due to rotation, resize, fold/unfold, split screen, or external display.
- Use current official breakpoints/library guidance and inspect the exact dependency version before coding. Typical width categories include compact, medium, expanded, large, and extra-large; do not hardcode stale values in multiple files.

### Layout expectations

- Compact: focused single-pane navigation and readable content.
- Medium: use available space for better list/detail balance, navigation rail, or a two-pane layout where it improves the task.
- Expanded/large: persistent navigation and useful master-detail or multi-column layouts; avoid stretching content edge-to-edge without max-width/readability control.
- Landscape/short-height: reorganize player controls and content so critical actions remain reachable without overlap.
- Foldables and resizable windows: respond to changing window size without requiring app restart or losing screen state.

### Screen-specific adaptation

Review home/Pulse, library, search/discovery, anime details, episode lists, player, downloads, calendar, settings, and Studio. Do not apply one generic grid count to every screen. Define reusable adaptive layout policies and keep screen logic maintainable.

### Navigation and state

- Choose navigation components appropriate to available width (bottom navigation, navigation rail, drawer/pane patterns) while preserving deep links/back behavior.
- Keep selection, scroll position, player state, and form edits stable during configuration/window changes.
- Avoid duplicate destinations or navigation stacks when switching layout modes.
- Respect accessibility, keyboard/focus navigation, and large text.

## B. Casting with AndroidX Media3

- First establish whether Media3 ExoPlayer and MediaSession/MediaLibrary services are already used and confirm their actual version.
- Evaluate the current official Media3 CastPlayer API. Use the current supported builder/API for the project's Media3 version; do not copy deprecated constructor examples from old tutorials.
- Where appropriate, manage local and remote playback through the app's existing media service/session architecture so playback can continue when an Activity is not visible.
- Support local-to-Cast and Cast-to-local transfer only if supported by the current player/session implementation and media format.
- Preserve playback position, play/pause, seek, queue/playlist semantics, metadata, notification controls, and state updates during route changes.
- Show accurate device connection and route status. Handle unavailable receiver, disconnect, network change, unsupported MIME/codec, authentication failure, and session termination.
- Do not claim every provider stream can be cast. Source headers, expiring links, DRM, and receiver compatibility may prevent playback; explain capability failures safely without exposing secrets.
- Do not expose tokens, auth headers, signed URLs, or sensitive source details to logs or public intents.
- Test with an actual compatible Cast receiver when available. If no hardware exists, state that end-to-end validation is still outstanding.

## C. External Playback

- Use Android intents/chooser and documented media hand-off paths appropriate to the supported format and destination.
- Check whether a capable target app exists and whether the URI/MIME type/permission grant is valid before presenting the action.
- Use content URIs and temporary grants when sharing local files; never expose private filesystem paths.
- Avoid leaking authorization headers, cookies, credentials, signed/temporary URLs, or source resolver internals to third-party apps.
- Do not claim external playback works for all streams. Provide clear unsupported/unavailable feedback and retain an in-app playback fallback.
- Handle target-app cancellation, missing app, failed launch, unsupported codec/container, and URI permission denial.

## D. Visual and motion requirements

- Preserve the existing Novay design system and animations. Do not remove or flatten existing transitions when switching layout mode.
- Make layout transitions stable and avoid visible jumps or accidental repeated animation on every recomposition.
- Ensure adaptive layout does not introduce expensive blur/effects on large displays or degrade low-end phones.

## Required tests

- Unit/UI tests for each window-size class, width/height changes, rotation, split screen/resizing, state retention, back stack, and deep links.
- Screenshot or Compose UI tests for compact/medium/expanded/landscape key screens where infrastructure allows.
- Accessibility/focus/large-text validation.
- Cast route state machine, playback transfer, route disconnect, unsupported media, source errors, queue continuity, session recreation, and notification controls.
- External intent availability, MIME/URI grants, cancellation, failed launch, no target app, and secret-redaction checks.
- Existing phone UI/player/download/animations regression tests.

## Acceptance criteria

- The app adapts to current available window size, not just device type.
- Compact phone UX remains intact while larger screens gain useful information density.
- Resizing/rotation does not lose playback or navigation state.
- Cast/external actions appear only when genuinely supported and report failures honestly.
- No secrets or private file paths are leaked to other apps.
- All existing animations and playback features remain intact.

## Deliverables

- `docs/novay/phase-5-adaptive-playback.md` with layout breakpoints/policies, screen matrix, Cast architecture/version, supported media limitations, external-intent security model, tests, and hardware validation status.

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