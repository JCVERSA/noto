# Novay — UI, Adaptive Layout & Motion Direction

## 1. Visual direction

**Hybrid: modern minimalism with restrained cinematic detail.**

The interface should feel deliberate, premium and readable. Avoid excessive blur, glow, gradients, decorative borders or animation that competes with content. Use hierarchy, spacing, typography, imagery and consistent interaction states.

Orion Store is a quality reference for polish, layout clarity and motion restraint:
https://github.com/RookieEnough/Orion-Store

It is a reference only. Do not copy its code, assets, branding or exact screens.

## 2. Preserve existing work

Before redesigning, inventory all existing Novay components, animations, transitions, Lottie files, icon systems, player overlays and screen-specific behavior.

Preserve existing animations. New motion may be added where it improves feedback or continuity. Removing or replacing existing motion requires a demonstrated technical reason and explicit approval.

## 3. Motion principles

- Fast, fluid and purposeful.
- Avoid long transitions before a user can act.
- Prefer transform/alpha animation over expensive layout work when appropriate.
- Keep motion interruptible and state-driven.
- Avoid animation loops when the relevant UI is off-screen.
- Provide reduced-motion behavior.
- On low-end devices, reduce expensive effects without breaking layout or removing core feedback.
- Avoid excessive blur, real-time shadows and large animated surfaces.
- Keep player controls responsive during transitions.

## 4. Adaptive design

Use Android Window Size Classes and current Compose adaptive guidance. Adapt navigation and content based on available window size, not device brand/model.

- Compact: single-column navigation and content.
- Medium: wider cards and optional navigation rail.
- Expanded: rail/sidebar and two-pane layouts where useful.
- Landscape: prioritize player/content and avoid clipped controls.
- Split-screen/resizable: recompute layout safely when window dimensions change.

Test font scaling, display scaling, keyboard, mouse, touch, fold/unfold and window resizing where supported.

## 5. Design system

Centralize:
- Color roles and theme tokens.
- Typography scale.
- Spacing and shape tokens.
- Elevation/surface hierarchy.
- Icon sizes and stroke conventions.
- Motion durations and easing.
- Component states: default, focused, pressed, selected, disabled, loading, error and success.

Novay Studio may expose safe customization of palettes, card density, layouts and animation preferences without allowing unreadable contrast or broken navigation.

## 6. Accessibility

- Meaningful semantics and content descriptions.
- Sufficient contrast in every theme.
- Minimum practical touch target sizes.
- Support system font scaling.
- Keyboard focus order and visible focus states.
- Do not rely on color or animation alone to communicate state.
- Reduced-motion option and respect for system accessibility preferences.

## 7. Validation

Test on low-end and modern devices, compact and expanded windows, portrait and landscape. Check scrolling, image loading, player responsiveness, transition interruption, reduced motion, accessibility and recomposition behavior.
