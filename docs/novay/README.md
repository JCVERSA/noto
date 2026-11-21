# Novay — Product Evolution & Engineering Pack

This directory contains the product scope, implementation instructions, architecture, performance requirements, download-manager specification, UI/motion guidance, research references, and acceptance checklist for the Novay Android application.

> **Important:** These documents are planning and implementation specifications for the separate Novay project. They do not modify the Linux workspace workflows or runtime configuration of this `noto` repository.

## Document map

| File | Purpose |
|---|---|
| [00_MASTER_IMPLEMENTATION_PROMPT.md](00_MASTER_IMPLEMENTATION_PROMPT.md) | The complete, copy-ready instruction for an engineering agent |
| [01_PRODUCT_SCOPE.md](01_PRODUCT_SCOPE.md) | All selected user-facing features and Novay branded systems |
| [02_ARCHITECTURE_AND_DATA.md](02_ARCHITECTURE_AND_DATA.md) | Architecture boundaries, data ownership, persistence and integrations |
| [03_PERFORMANCE_AND_RELIABILITY.md](03_PERFORMANCE_AND_RELIABILITY.md) | Cache, image, database, network, battery, memory and crash resilience |
| [04_DOWNLOAD_MANAGER.md](04_DOWNLOAD_MANAGER.md) | Batch downloads, per-episode controls, size reporting and offline playback |
| [05_UI_UX_ADAPTIVE_MOTION.md](05_UI_UX_ADAPTIVE_MOTION.md) | Hybrid visual direction, responsive layouts, motion and accessibility |
| [06_TECHNICAL_REFERENCES.md](06_TECHNICAL_REFERENCES.md) | Official Android docs and GitHub projects researched as references |
| [07_ACCEPTANCE_CHECKLIST.md](07_ACCEPTANCE_CHECKLIST.md) | Definition of done, safety checks and regression tests |

## Non-negotiable project rules

1. Audit the actual Novay repository and current branch before changing anything.
2. Preserve all existing features, local modifications, navigation, player behavior, source resolvers, assets, tests and animations.
3. Do not replace existing architecture or dependencies without evidence and a migration plan.
4. Do not copy code, assets, branding or distinctive designs from reference projects. Review each license before any reuse.
5. Never invent metadata, file sizes, download progress, playback position, release dates, availability or ETA.
6. Keep personal library and watch-history data local by default. No mandatory account or cloud service.
7. Implement incrementally, test each phase, and report exactly what changed and what remains incomplete.

## Suggested implementation order

1. Repository audit and baseline measurements.
2. Data model, migrations and local source of truth.
3. Library, episode progress and discovery foundations.
4. Downloads and offline playback integration.
5. Pulse, Studio, Circle, Sense, statistics and calendar.
6. Adaptive UI, casting, widgets and transfer.
7. Profiling, regression testing and release validation.

The master prompt governs the overall work. The other documents provide detailed requirements and can be handed to specialized implementation agents independently.
