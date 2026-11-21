# Novay — Technical References & Repository Research

These projects are research references, not a list of dependencies to install. Before reusing code, verify the repository's current maintenance, release compatibility, license, transitive dependencies and relevant source files. Do not copy branding or assets.

## 1. Official Android and Jetpack references

| Topic | Reference |
|---|---|
| Compose performance | https://developer.android.com/develop/ui/compose/performance |
| Adaptive window size classes | https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes |
| Android low-memory insights | https://developer.android.com/topic/performance/issues/lmk |
| Macrobenchmark | https://developer.android.com/topic/performance/benchmarking/macrobenchmark-overview |
| WorkManager persistent work | https://developer.android.com/develop/background-work/background-tasks/persistent |
| Connectivity state | https://developer.android.com/develop/connectivity/network-ops/reading-network-state |
| ConnectivityManager API | https://developer.android.com/reference/android/net/ConnectivityManager |
| Room | https://developer.android.com/training/data-storage/room |
| DataStore | https://developer.android.com/topic/libraries/architecture/datastore |
| Android widgets | https://developer.android.com/develop/ui/views/appwidgets/overview |
| Media3 downloads | https://developer.android.com/media/media3/exoplayer/downloading-media |
| Media3 analytics | https://developer.android.com/media/media3/exoplayer/analytics |
| Media3 CastPlayer | https://developer.android.com/media/media3/cast/create-castplayer |
| AniList API | https://docs.anilist.co/ |
| AniList AiringSchedule | https://docs.anilist.co/reference/object/airingschedule |
| Android Auto Backup | https://developer.android.com/identity/data/autobackup |
| Coil documentation | https://coil-kt.github.io/coil/ |

## 2. Android and Compose repositories

- Android Compose Samples: https://github.com/android/compose-samples
  - Official examples for Compose architecture, UI, navigation and adaptive patterns.
- Jetcaster: https://github.com/android/compose-samples/tree/main/Jetcaster
  - Media-oriented app structure, persistence, state and theming patterns.
- Reply: https://github.com/android/compose-samples/tree/main/Reply
  - Adaptive layouts and responsive navigation.
- Jetsnack: https://github.com/android/compose-samples/tree/main/Jetsnack
  - Design-system, custom layout and Compose UI patterns.
- AndroidX Glance: https://github.com/androidx/androidx/tree/androidx-main/glance
  - Android home-screen widget implementation reference.
- Coil: https://github.com/coil-kt/coil
  - Image loading/caching option; do not add if the project already has an adequate image stack.
- AndroidX WorkManager: https://github.com/androidx/androidx/tree/androidx-main/work
  - Background work implementation reference.

## 3. Anime application references

- Nekoyomi: https://github.com/Seguaz/Nekoyomi
  - Anime/manga library, categories, customization and migration ideas. Reported Apache-2.0; verify current license in repository.
- Aniyomi: https://github.com/aniyomiorg/aniyomi
  - Anime/manga app, local watching, trackers, categories, backup and player concepts. Reported Apache-2.0; verify current license and dependencies.
- Animite: https://github.com/imashnake0/Animite
  - AniList client architecture using Kotlin, Compose, Apollo Kotlin and coroutines. Reported Apache-2.0; verify current state.
- AL-chan: https://github.com/zend10/AL-chan
  - AniList client with lists, schedule, seasonal chart, search and statistics. Reported GPL-3.0; treat as study reference unless license compatibility is reviewed.
- Anisu: https://github.com/Ansu216/Anisu
  - Native Android anime client/player and tracking concepts. Reported GPL-3.0; treat as study reference unless license compatibility is reviewed.
- Housha: https://github.com/delath/housha
  - Anime airing notifications and local subscriptions.
- NyanTV: https://github.com/NyanTV/NyanTV
  - Android TV anime tracker/player and D-pad navigation. Reported AGPL-3.0; study only unless compatibility is reviewed.
- Aniyomi-derived forks such as Animiru: inspect provenance and license chain carefully before reuse.

## 4. Episode skip and airing metadata

- AniSkip API: https://github.com/aniskip/aniskip-api
  - Opening/ending timestamp data and community voting. Reported MIT; verify current license and data reliability.
- AniList API: https://docs.anilist.co/
  - Metadata and airing schedule candidate. Treat provider coverage and future schedule guarantees carefully; show provenance and uncertainty.

## 5. Download-manager references

- Downpour: https://github.com/AlirezaJavan/Downpour
  - Candidate direct HTTP engine; verify current API, release, license and compatibility.
- XDM: https://github.com/itsolaph/xdm
  - Kotlin/Compose download-manager UX and queue concepts. Reported GPL-3.0-or-later; do not copy code without license review.
- Sibi Download Manager: https://github.com/espitman/sibi-download-manager
  - Native Android download manager concepts; verify license and maintenance.
- Fetch2: https://github.com/Kotlin/Fetch
  - Android download library candidate; verify repository identity, current maintenance and API before use.

## 6. Backup/transfer research

- Room Safe Archive: https://github.com/buxerr/room-safe-archive
  - Versioned/encrypted database archive concepts. Reported MIT but very new and with limited adoption; study the design, do not adopt blindly.

## 7. License policy

- Check the actual LICENSE file at the exact commit/tag being considered.
- Check transitive dependencies and bundled assets, not only the top-level license.
- GPL/AGPL code may impose obligations incompatible with the target project's distribution model. Obtain a compatibility review before reuse.
- Prefer official AndroidX documentation and permissively licensed references where suitable.
- Keep attribution and notices when required.
- Never copy distinctive assets, branding, screenshots or proprietary visual identity.

## 8. Research limitations

Repository activity, release compatibility, APIs and licenses can change. Re-check them at implementation time. The references above are starting points for engineering investigation, not proof that a dependency is production-ready.
