# NOVAY --- ULTIMATE UI/UX, EXPRESSIVE MOTION & UNIVERSAL PERFORMANCE REFINEMENT

## PROJECT OBJECTIVE

Transform **Novay** into a polished, premium Android streaming
application, achieving the same level of visual quality, layout
consistency, interaction refinement and animation smoothness as **Orion
Store**.

Reference: https://github.com/RookieEnough/Orion-Store

Use Orion Store strictly as a design and engineering reference. Study
its layout principles, Material 3 Expressive implementation, motion
system, transitions, component hierarchy and visual polish.

**Do not copy its branding, assets, source code, or exact screens.**
Adapt its design principles to Novay's anime-streaming identity and
existing Hybrid/Cinematic direction.

The goal is to improve the entire application, not just its home screen.

------------------------------------------------------------------------

## 1. CRITICAL RULE --- PRESERVE EVERYTHING

Before modifying anything, thoroughly inspect the existing Novay
project.

**NEVER REMOVE, DISABLE, REPLACE, SIMPLIFY OR BREAK ANY EXISTING
FEATURE, ANIMATION, TRANSITION, INTERACTION OR BEHAVIOR.**

This includes:

-   Existing animations, Lottie assets and motion effects.
-   Navigation, gestures and screen transitions.
-   Player controls, mini-player and playback behavior.
-   Search, library, history and downloads.
-   Existing UI components and custom icons.
-   Loading states, dialogs, overlays and interactions.
-   Existing architecture, dependencies and integrations.

You may reorganize layouts and improve component implementations, but
preserve all existing functionality and behavior.

Reuse and enhance existing components whenever possible. Do not rebuild
the application from scratch.

**Preserve first. Enhance second.**

------------------------------------------------------------------------

## 2. PREMIUM DESIGN SYSTEM

Use Orion Store as inspiration for a professional, consistent design
language.

Implement or refine a cohesive **Material 3 Expressive-inspired design
system** adapted to Novay.

Focus on:

-   Strong visual hierarchy and clean spacing.
-   Consistent typography, shapes, corner radii and component
    proportions.
-   Balanced use of colors, surfaces, gradients and cinematic effects.
-   Premium cards, posters, banners and content sections.
-   Consistent icons and visual feedback.
-   Edge-to-edge layouts and polished system-bar integration.
-   Light and dark themes, preserving existing theme options.
-   Responsive layouts across supported screen sizes.

Avoid excessive decoration, visual clutter, inconsistent spacing and
unnecessary effects.

The result must feel modern, refined, coherent and purpose-built for an
anime-streaming application.

------------------------------------------------------------------------

## 3. APPLICATION-WIDE LAYOUT REFINEMENT

Review and improve every existing screen, including:

-   Home / Discovery.
-   Search and search results.
-   Anime details.
-   Episodes and episode lists.
-   Video player.
-   Library and favorites.
-   History and continue watching.
-   Downloads.
-   Settings and other existing screens.

Use appropriate layout patterns such as:

-   Editorial hero sections.
-   Horizontal content swimlanes.
-   Well-designed poster grids and lists.
-   Clear section headers.
-   Refined content cards.
-   Consistent navigation and action groups.
-   Contextual overlays and bottom sheets.

Improve information hierarchy, alignment, spacing, content density and
navigation clarity.

Do not force the same layout onto every screen. Each screen must have a
structure suited to its purpose.

------------------------------------------------------------------------

## 4. EXPRESSIVE MOTION & ANIMATION

Achieve Orion-level motion quality while maintaining Novay's own visual
identity.

Study and adapt techniques such as:

-   Natural spring-based transitions.
-   Subtle press squash and release animations.
-   Shape morphing.
-   Staggered entrance animations.
-   Shared-element transitions between posters and detail screens.
-   Smooth image crossfades.
-   Parallax effects where appropriate.
-   Animated navigation icons.
-   Tab and content transitions.
-   Refined progress indicators.
-   Smooth loading and skeleton animations.
-   Contextual transitions for dialogs and bottom sheets.

Improve existing animations rather than replacing them.

Create a reusable and centralized motion system with consistent timing,
easing and spring behavior.

Animations must feel intentional, fluid and responsive. Avoid excessive
movement and unnecessary animation.

------------------------------------------------------------------------

## 5. INTERACTION & MICRO-INTERACTION POLISH

Every interactive component should provide clear, consistent feedback.

Refine:

-   Buttons and clickable cards.
-   Poster selection.
-   Navigation and tabs.
-   Search interactions.
-   Player HUD and controls.
-   Mini-player interactions.
-   Download actions and progress.
-   Dialogs, menus and bottom sheets.
-   Focus, pressed, selected, disabled and loading states.

Preserve existing gestures and interaction behavior.

All interactions must remain responsive and predictable.

------------------------------------------------------------------------

## 6. UNIVERSAL ANDROID PERFORMANCE

Optimize Novay for a wide range of Android devices:

-   Low-end devices.
-   Mid-range devices.
-   Flagship devices.
-   Older supported Android versions.

The application must remain visually consistent across device
categories.

Optimize:

-   Jetpack Compose recompositions.
-   Lazy lists and grids.
-   Image loading, caching and decoding.
-   Memory allocations and garbage collection.
-   GPU rendering and overdraw.
-   Animation performance.
-   Background operations.
-   Navigation and screen lifecycle.
-   Startup time and resource usage.

Use appropriate tools and techniques such as Coil caching, stable
Compose state, Baseline Profiles, R8 and Macrobenchmark when relevant to
the existing project.

### Important performance rule

**Never improve performance by simply deleting animations or reducing
the visual quality.**

Prioritize rendering efficiency, smarter resource management, adaptive
workload and optimized implementations.

Keep the same visual identity and interaction experience wherever
possible.

------------------------------------------------------------------------

## 7. LOADING, EMPTY & ERROR STATES

Create a consistent visual language for all application states:

-   Initial loading.
-   Skeleton loading.
-   Empty content.
-   No search results.
-   Errors.
-   Offline mode.
-   Download progress.
-   Success feedback.
-   Partial loading.

Reuse existing animations and components wherever possible.

These states should feel like an integral part of Novay rather than
generic placeholders.

------------------------------------------------------------------------

## 8. ACCESSIBILITY & COMPATIBILITY

Ensure:

-   Readable typography and sufficient contrast.
-   Appropriate touch target sizes.
-   Accessible labels for interactive icons.
-   Respect for system animation preferences where appropriate.
-   Correct behavior across supported Android versions.
-   Stable layouts on different screen sizes.

Do not compromise the visual identity or remove essential interactions.

------------------------------------------------------------------------

## 9. IMPLEMENTATION WORKFLOW

Follow this workflow carefully:

### Phase 1 --- Audit

-   Inspect the complete project structure.
-   Review existing screens, components, themes and animations.
-   Identify existing dependencies and architecture.
-   Study Orion Store's relevant design and motion principles.
-   Identify performance bottlenecks and inconsistencies.

### Phase 2 --- Design system

-   Refine shared colors, typography, shapes, spacing and motion.
-   Establish reusable UI patterns.
-   Preserve existing Novay identity.

### Phase 3 --- Implementation

-   Improve layouts screen by screen.
-   Refine transitions and micro-interactions.
-   Enhance existing components.
-   Optimize rendering and resource usage.
-   Preserve every existing feature and behavior.

### Phase 4 --- Validation

-   Run relevant unit and UI tests.
-   Build the application.
-   Check navigation and interactions.
-   Verify existing animations and Lottie assets.
-   Measure performance before and after where possible.
-   Fix regressions introduced by the changes.

Never claim that physical-device tests were performed if only emulator
tests were available.

------------------------------------------------------------------------

## 10. STRICT DEVELOPMENT CONSTRAINTS

-   Work directly on the existing Novay project.
-   Do not reset, overwrite or discard existing work.
-   Do not introduce unnecessary dependencies.
-   Do not duplicate existing components.
-   Do not rewrite working systems without a clear technical reason.
-   Do not use placeholder implementations for existing features.
-   Do not remove existing animations to simplify implementation.
-   Do not sacrifice functionality for visual appearance.
-   Keep the code maintainable, modular and consistent with the current
    architecture.
-   Preserve unrelated local changes.

If a significant architectural change is necessary, explain why before
proceeding.

------------------------------------------------------------------------

## 11. FINAL ACCEPTANCE CRITERIA

The work is complete only when:

1.  The entire application has received a consistent visual refinement.
2.  Layout quality reaches a professional standard comparable to Orion
    Store.
3.  Existing Novay branding and identity remain recognizable.
4.  Existing features and interactions still work.
5.  All pre-existing animations remain present and functional.
6.  New animations are consistent and reusable.
7.  Performance is improved without unnecessarily sacrificing visual
    quality.
8.  Supported screen sizes and Android versions remain compatible.
9.  Tests and builds have been checked.
10. Any remaining limitations are clearly documented.

## FINAL PRINCIPLE

**ORION-LEVEL POLISH. NOVAY IDENTITY. ZERO FEATURE REGRESSIONS.**

**PRESERVE EVERYTHING. IMPROVE THE EXPERIENCE. OPTIMIZE EVERYWHERE.
VALIDATE EVERYTHING.**

Implement the improvements directly in the existing project. Do not stop
at an audit, design proposal or recommendations. Complete the work and
provide a concise report of changes, tests, build results and any
remaining issues.
