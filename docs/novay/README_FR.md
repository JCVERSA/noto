# NOVAY — Implementation prompts by phase

Ce dossier contient **un prompt Markdown indépendant par phase** pour guider un agent IA dans l'évolution de Novay. Les prompts sont rédigés en anglais technique pour être directement exploitables par des agents de développement ; ce fichier README résume le parcours en français.

## Ordre recommandé

| Ordre | Fichier | Objectif | Règle de passage |
|---|---|---|---|
| 0 | `PHASE_0_REPOSITORY_AUDIT_AND_ARCHITECTURE.md` | Auditer le dépôt et produire le plan réel, sans toucher au code applicatif. | À terminer avant toute implémentation. |
| 1 | `PHASE_1_PERFORMANCE_RELIABILITY_FOUNDATION.md` | Cache, images, base de données, récupération, réseau, sources, tâches de fond, batterie et mémoire. | S'appuyer sur l'audit et mesurer les changements. |
| 2 | `PHASE_2_ANIME_CORE_EXPERIENCE.md` | Bibliothèque 2.0, épisodes intelligents et découverte multi-sources. | Réutiliser les fondations de données et de performance. |
| 3 | `PHASE_3_PERSONALIZATION_STUDIO_CIRCLE.md` | Centre de personnalisation, Novay Studio et Novay Circle (interface uniquement). | Ne pas créer de fonctionnalités sociales. |
| 4 | `PHASE_4_PULSE_SENSE_STATISTICS_CALENDAR.md` | Novay Pulse, Novay Sense, statistiques réelles et calendrier des sorties. | Réutiliser les identités, progressions, sources et préférences existantes. |
| 5 | `PHASE_5_ADAPTIVE_UI_CAST_EXTERNAL_PLAYBACK.md` | UI adaptative, Cast et lecture externe selon compatibilité réelle. | Tester plusieurs tailles de fenêtre et les destinations réellement disponibles. |
| 6 | `PHASE_6_WIDGETS_AND_TRANSFER.md` | Widgets Android et export/import local Novay Transfer. | Réutiliser les dépôts canoniques et protéger les données. |

## Comment les exécuter

1. Donner **un seul fichier de phase à la fois** à l'agent IA, avec accès au dépôt `JCVERSA/nva`.
2. Commencer obligatoirement par la Phase 0. Elle est en lecture seule : elle doit produire une cartographie et un plan fondés sur le code actuel.
3. Faire terminer, tester et relire la phase en cours avant de lancer la suivante.
4. Fournir à l'agent les rapports `docs/novay/phase-*.md` créés par les phases précédentes. Chaque prompt demande aussi de revérifier le dépôt, car le code réel reste la source de vérité.
5. Ne pas demander à l'agent d'exécuter toutes les phases en une seule opération. Cela augmente le risque de modifications trop larges, de migrations mal contrôlées et de régressions.

## Règles importantes déjà intégrées

- Préserver toutes les fonctionnalités, les animations, le lecteur, les sources et le gestionnaire de téléchargements déjà présents.
- Novay Circle est une zone d'interface uniquement : aucune communauté, messagerie, publication ou fonctionnalité sociale.
- Garder bibliothèque, historique de visionnage, statistiques et recommandations en local par défaut.
- Ne jamais inventer de progression, de métadonnées, de tailles ou d'horaires de diffusion.
- Ne pas introduire de dépendances ou de refontes architecturales sans justification vérifiée.
- Protéger les bases de données, migrations, téléchargements et données personnelles.
- Exiger des tests, des résultats vérifiés et un rapport honnête à la fin de chaque phase.

## Documentation technique de référence

Les liens ci-dessous sont des références officielles ou maintenues à vérifier au moment de l'implémentation. L'agent doit toujours confirmer que les APIs et versions correspondent au projet réellement ouvert.

- Jetpack Compose performance: https://developer.android.com/develop/ui/compose/performance
- Compose best practices: https://developer.android.com/develop/ui/compose/performance/bestpractices
- Macrobenchmark: https://developer.android.com/topic/performance/benchmarking/macrobenchmark-overview
- Adaptive window size classes: https://developer.android.com/develop/adaptive-apps/guides/use-window-size-classes
- Android low-memory diagnostics: https://developer.android.com/topic/performance/issues/lmk
- Connectivity and network state: https://developer.android.com/develop/connectivity/network-ops/reading-network-state
- WorkManager persistent work: https://developer.android.com/develop/background-work/background-tasks/persistent
- DataStore: https://developer.android.com/topic/libraries/architecture/datastore
- Room: https://developer.android.com/training/data-storage/room
- Coil image loader/cache documentation: https://github.com/coil-kt/coil/blob/main/docs/image_loaders.md
- Media3 analytics: https://developer.android.com/media/media3/exoplayer/analytics
- Media3 CastPlayer: https://developer.android.com/media/media3/cast/create-castplayer
- Jetpack Glance widgets: https://developer.android.com/develop/ui/compose/glance
- Storage Access Framework: https://developer.android.com/training/data-storage/shared/documents-files
- Android Auto Backup: https://developer.android.com/identity/data/autobackup
- AniList AiringSchedule: https://docs.anilist.co/reference/object/airingschedule
- Orion Store UI reference (visual quality only; do not copy): https://github.com/RookieEnough/Orion-Store

## Note sur les dépendances

Aucun numéro de version de bibliothèque n'est imposé par ces prompts. Les versions évoluent et doivent être choisies à partir du Gradle/version catalog du dépôt, de la compatibilité Kotlin/AGP/Compose/Media3, des notes de version officielles et de la stabilité au moment de l'implémentation.
