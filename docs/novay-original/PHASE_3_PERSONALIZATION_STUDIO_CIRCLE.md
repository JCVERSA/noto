# NOVAY — PHASE 3: Personalization Center, Novay Studio & Novay Circle

## Mission

Make Novay's visual experience genuinely personal through stable preferences, theme customization, and a coherent Circle interface area. This phase is about user-controlled presentation—not a social product.

## Prerequisites

Read the Phase 0–2 documentation and inspect the current theme, navigation, component library, animation implementation, and settings persistence. Reuse the current systems wherever practical.

## Absolute scope boundary for Novay Circle

**Novay Circle is an interface concept/area only.** It may provide a visual hub, navigation surface, grouping of personal features, or reusable interface components. It must NOT become a community or social network.

Do not add:
- User profiles, follower/following systems, comments, posts, public feeds, chat, messaging, reactions, friend lists, public sharing, community servers, social APIs, or a social backend.
- Any online account requirement solely to use Circle.

Keep Circle local and interface-focused.

## A. Personalization Center

Create one coherent settings destination for appearance and personal experience preferences. Audit current settings first and consolidate only where this reduces duplication without breaking existing navigation or stored values.

### Personal settings

- Theme mode: system/light/dark, consistent with existing support.
- Accent color and curated palettes with appropriate contrast.
- Home layout preferences (section visibility/order may be implemented in Phase 4's Pulse; define shared preference contracts now, but do not duplicate Pulse's dashboard implementation).
- Card density and presentation preferences where supported.
- Player preferences: controls, skip behavior, resume/autoplay options, subtitles/audio preferences only where the current player exposes them.
- Animation/motion preferences: preserve current animation design by default; optionally offer a reduced-motion or lower-intensity preference that respects accessibility and does not delete animation assets/components.
- Content preferences for local recommendations/discovery, with transparent opt-in controls.

### Persistence

- Use the current preferences architecture if sound. DataStore is suitable for small typed preferences; do not put large/relational library data there.
- Persist typed, versionable settings with safe defaults and backward compatibility.
- Settings changes should apply predictably without requiring a restart unless technically unavoidable and clearly explained.
- A reset action must state its scope. Resetting appearance must not erase library, progress, downloads, history, or other user data.

## B. Novay Studio — visual customization editor

Build an advanced but understandable editor, not a collection of disconnected toggles.

### Theme editor

- Curated presets and custom accent/palette editing.
- Provide coordinated semantic tokens for background, surface, elevated surface, text, secondary text, borders, accent, success/warning/error, and player overlays.
- Validate contrast and text readability. Do not allow a custom palette to silently make primary actions or body text unreadable.
- Preview themes before applying; distinguish preview state from persisted state.
- Apply, cancel, reset current section, and restore default theme.

### Layout/card editor

- Where current screens support it, offer choices such as compact/comfortable density, poster/card shape, information density, and supported layout variations.
- Show a preview using real or representative app data; do not introduce a fake screen that differs from actual rendering.
- Persist choices in one preference model and reuse the same tokens across screens.

### Motion/visual effects

- Keep all existing animations and assets. Audit their call sites before modifying them.
- Add motion intensity or reduced-motion behavior only through existing animation abstractions where possible.
- Avoid simultaneous expensive blur, shader, infinite transition, and large image effects on low-end devices.
- Preserve the current default motion. Respect system animator settings and accessibility preferences.
- Ensure theme previews and transitions do not trigger repeated disk writes or excessive recomposition.

## C. Novay Circle — interface implementation

- Implement only the agreed visual/navigation area. Make its purpose clear from the interface.
- Circle may group personal destinations such as collections, saved items, custom organization, or personalization shortcuts only when this matches the existing navigation model.
- All displayed information must come from local Novay data or already-authorized app data.
- Do not invent accounts, remote profiles, followers, social activity, or community content.
- Do not add a backend or new network dependency for Circle.

## D. Design quality

- Respect Novay's hybrid visual direction: minimal functional hierarchy with selected cinematic accents.
- Use existing design tokens, typography, iconography and components. Avoid random per-screen colors and one-off styles.
- Preserve existing animations; additions must be purposeful, fast, interruptible, and lifecycle-aware.
- Make settings understandable with a short explanation of impactful controls.
- Support accessibility: content descriptions, contrast, scalable font, touch target size, and reduced motion.

## Required tests

- Preference defaults, persistence, migration/backward compatibility, reset scope, and restoration after process death.
- Theme preview/apply/cancel/reset and contrast validation.
- Settings propagation to every screen using the shared theme/preferences.
- Motion behavior with default, reduced-motion, and lower-intensity configurations.
- Circle navigation and local data rendering; assert no social endpoints, social data models, or social dependencies are introduced.
- Existing screens, animations, player, library, and downloads regressions.

## Acceptance criteria

- Personalization is centralized, typed, persisted, and backward-compatible.
- Theme preview is safe and does not modify saved settings until Apply.
- The visual editor changes real app tokens/layouts, not mock-only decoration.
- All existing animations remain in the project and existing default behavior is preserved.
- Circle is strictly an interface area with no community/social functionality or backend.
- Resetting visual preferences cannot delete personal media data.

## Deliverables

- `docs/novay/phase-3-personalization.md` documenting preference schema, token architecture, preview/apply lifecycle, Circle scope boundary, accessibility, and test evidence.

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