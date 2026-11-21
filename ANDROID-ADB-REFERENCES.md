# Android & ADB — Répertoire de références

> Catalogue de projets GitHub liés à Android, ADB, Fastboot, à la gestion d'appareils, à l'automatisation, au diagnostic et à la recherche en sécurité mobile.
>
> **Objectif :** servir de base de références pour l'étude et la conception de fonctionnalités Android, notamment pour Novay. Ce document classe les dépôts par usage, type de projet et langage principal indiqué ou identifiable sur GitHub.

- **Nombre de dépôts :** 46 dépôts uniques
- **Dernière organisation :** 21 novembre 2026
- **Langue :** le langage indiqué correspond au langage principal GitHub lorsqu'il est connu ; « non confirmé » signifie que la métadonnée n'était pas disponible ou suffisamment claire.
- **Statut :** les dépôts peuvent évoluer. Vérifier le README, les releases, les issues et la date du dernier commit avant toute intégration.

## Sommaire

1. [Gestion des appareils et contrôle ADB](#1-gestion-des-appareils-et-contrôle-adb)
2. [Installation et gestion des applications](#2-installation-et-gestion-des-applications)
3. [Debloating et optimisation](#3-debloating-et-optimisation)
4. [Automatisation, agents IA et MCP](#4-automatisation-agents-ia-et-mcp)
5. [Diagnostic, monitoring et utilitaires système](#5-diagnostic-monitoring-et-utilitaires-système)
6. [Forensique numérique Android (DFIR)](#6-forensique-numérique-android-dfir)
7. [Audit et recherche en sécurité mobile](#7-audit-et-recherche-en-sécurité-mobile)
8. [Outils sensibles et recherche offensive](#8-outils-sensibles-et-recherche-offensive)
9. [Documentation et listes de références](#9-documentation-et-listes-de-références)
10. [Boîtes à outils complémentaires](#10-boîtes-à-outils-complémentaires)
11. [Doublons, maintenance et précautions](#11-doublons-maintenance-et-précautions)
12. [Sélection recommandée pour Novay](#12-sélection-recommandée-pour-novay)
13. [Arborescence suggérée](#13-arborescence-suggérée)

---

## 1. Gestion des appareils et contrôle ADB

| Projet | Type | Langage principal | Utilité |
|---|---|---|---|
| [QADB](https://github.com/ludoven/QADB) | GUI multiplateforme | Kotlin | Interface graphique pour lancer rapidement des commandes ADB. |
| [ya-webadb](https://github.com/yume-chan/ya-webadb) | Bibliothèque / interface web | TypeScript | Utiliser ADB depuis un navigateur compatible. Référence intéressante pour une interface web. |
| [Adb-Device-Manager-2](https://github.com/Shrey113/Adb-Device-Manager-2) | Gestionnaire GUI | HTML (langage GitHub) | Gestion et contrôle d'appareils Android, avec plusieurs fonctions de gestion à distance. |
| [ByteADB-V1](https://github.com/AliXByte/ByteADB-V1) | CLI / dashboard | Python | Tableau de bord de contrôle d'appareils Android. |
| [ADB_Toolbox](https://github.com/Nahvine/ADB_Toolbox) | CLI / toolkit | Python | Regroupement de commandes et d'outils ADB pour simplifier les opérations courantes. |
| [epic-adb](https://github.com/mdnaimul22/epic-adb) | Dashboard / CLI | Python | Interface et commandes ADB, avec fonctions complémentaires de diagnostic et de sauvegarde/restauration. |
| [ADB-Toolkit](https://github.com/ASHWIN990/ADB-Toolkit) | Toolkit CLI | Shell | Collection de commandes et de fonctions ADB. |
| [ADBKit](https://github.com/Drenzzz/ADBKit) | GUI | TypeScript | Interface regroupant ADB, Fastboot et Scrcpy. |
| [MobyDroid](https://github.com/ibilux/MobyDroid) | Gestionnaire GUI | Java | Gestionnaire d'appareils Android pour Linux, Windows et macOS. |
| [Quest-ADB-Dashboard](https://github.com/dwgx/Quest-ADB-Dashboard) | Dashboard spécialisé | C# | Diagnostic d'appareils Meta Quest et export de rapports HTML. |

## 2. Installation et gestion des applications

| Projet | Type | Langage principal | Utilité |
|---|---|---|---|
| [uber-adb-tools](https://github.com/patrickfav/uber-adb-tools) | CLI / toolkit | Java | Opérations groupées sur les APK : installation, désinstallation et gestion de plusieurs appareils. |
| [AppManager](https://github.com/MuntashirAkon/AppManager) | Application Android | Java / Kotlin | Gestionnaire avancé de paquets et d'applications Android. |
| [apk-utilities](https://github.com/ViRb3/apk-utilities) | Toolkit | Python | Scripts et utilitaires destinés à travailler avec les fichiers APK. |
| [Latest-adb-fastboot-installer-for-windows](https://github.com/fawazahmed0/Latest-adb-fastboot-installer-for-windows) | Installateur Windows | Non confirmé | Facilite l'installation d'ADB et de Fastboot sous Windows. |

## 3. Debloating et optimisation

| Projet | Type | Langage principal | Utilité |
|---|---|---|---|
| [universal-android-debloater](https://github.com/0x192/universal-android-debloater) | GUI | Rust | Outil de debloating pour appareils Android non rootés. |
| [universal-android-debloater-next-generation](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation) | GUI | Rust | Nouvelle génération / continuation communautaire du projet Universal Android Debloater. |
| [samsung-debloat-adb](https://github.com/olivierluethy/samsung-debloat-adb) | Script interactif | PowerShell | Gestion de certaines applications préinstallées sur des appareils Samsung. |

## 4. Automatisation, agents IA et MCP

| Projet | Type | Langage principal | Utilité |
|---|---|---|---|
| [lamda](https://github.com/firerpa/lamda) | Plateforme d'automatisation | Python | Contrôle à distance, automatisation de l'interface, OCR, WebRTC et gestion de plusieurs appareils. |
| [agent-device](https://github.com/callstack/agent-device) | CLI / MCP / API | TypeScript | Permet à des agents d'interagir avec des applications et appareils mobiles, web et desktop. |
| [droidmind](https://github.com/hyperb1iss/droidmind) | Agent IA / MCP | Python | Expose des capacités de contrôle Android via ADB à des agents compatibles MCP. |
| [android-agent](https://github.com/ghost-in-the-droid/android-agent) | Agent IA / MCP | Python | Outils d'interaction avec Android via ADB et iOS via WebDriverAgent. |
| [phonedriver](https://github.com/hridaya423/phonedriver) | CLI / MCP | Rust | Outils permettant à des agents de piloter des appareils mobiles et de lire des informations à l'écran, avec étapes de validation. |

## 5. Diagnostic, monitoring et utilitaires système

| Projet | Type | Langage principal | Utilité |
|---|---|---|---|
| [android-dev-monitor](https://github.com/marko69420/android-dev-monitor) | Outil de monitoring GUI | C# | Surveillance de métriques telles que CPU, RAM, réseau, FPS, entrées/sorties et logs. |
| [Android-recovery](https://github.com/lutfizp/Android-recovery) | CLI / récupération | Python | Outil orienté récupération et examen de données Android accessibles ; les résultats dépendent de l'appareil et des données encore présentes. |
| [RebootNya](https://github.com/daisukiKaffuChino/RebootNya) | Application Android | Kotlin | Utilitaire de redémarrage utilisant des mécanismes tels que Root ou Shizuku. |
| [Genymotion_ARM_Translation](https://github.com/m9rco/Genymotion_ARM_Translation) | Outil de compatibilité | Python | Ressources liées à la compatibilité ARM dans Genymotion. |
| [Nightzuku](https://github.com/kerneldroid/Nightzuku) | Application Android / fork | Kotlin | Fork de Shizuku avec interface Material et mises à jour de compatibilité Android. |

## 6. Forensique numérique Android (DFIR)

Ces projets sont pertinents pour l'analyse défensive, l'audit autorisé et la préservation d'éléments techniques. Les collectes doivent respecter le consentement, la propriété de l'appareil et les règles applicables.

| Projet | Type | Langage principal | Utilité |
|---|---|---|---|
| [androidqf](https://github.com/mvt-project/androidqf) | CLI / collecte forensique | Go | Collecte d'informations et d'artefacts Android pour l'analyse de sécurité. |
| [AegisDroid](https://github.com/0xhroot/aegisdroid) | Framework DFIR | Python | Analyse de sécurité Android, chasse aux menaces, analyse APK et règles YARA. |
| [ADBExtractorAndAnalyzer](https://github.com/labcif/ADBExtractorAndAnalyzer) | Framework DFIR | Python | Acquisition et analyse d'artefacts via ADB, avec intégrations à des outils d'analyse. |
| [androidForensics](https://github.com/DouglasFreshHabian/androidForensics) | Collection de scripts | Shell | Collecte d'informations système et d'artefacts pour des examens autorisés. |
| [osaft](https://github.com/j-koenig/osaft) | Toolkit forensique | Java | Open Source Android Forensic Toolkit ; projet ancien à traiter comme référence historique. |

## 7. Audit et recherche en sécurité mobile

| Projet | Type | Langage principal | Utilité |
|---|---|---|---|
| [BridgeSimple](https://github.com/0u44/BridgeSimple) | Framework d'analyse | Python | Analyse d'appareils Android/iOS, recherche en sécurité mobile et examen technique. |
| [mobile-pentest-toolkit](https://github.com/ByteSnipers/mobile-pentest-toolkit) | Toolkit de test | Python | Regroupe des outils et workflows de test de sécurité mobile dans un cadre autorisé. |
| [Android-suite](https://github.com/Jaikumar3/Android-suite) | Suite d'analyse | Non confirmé | Ensemble d'outils et d'automatisations pour l'analyse et la recherche Android ; vérifier le périmètre réel dans le dépôt. |

## 8. Outils sensibles et recherche offensive

> **Attention :** cette section répertorie des dépôts à titre de repérage et de classification. Certains sont associés à l'accès distant, à l'exploitation ou au contournement de protections. Ils ne sont pas des composants à intégrer tels quels dans une application grand public. Ne les utiliser que dans un laboratoire contrôlé, sur des appareils possédés ou explicitement autorisés. Aucune procédure d'exploitation n'est documentée ici.

| Projet | Type | Langage principal | Description générale |
|---|---|---|---|
| [PhoneSploit-Pro](https://github.com/AzeemIdrisi/PhoneSploit-Pro) | Framework sensible | Python | Projet de recherche autour de l'accès et de l'administration Android via ADB. |
| [Ghost](https://github.com/EntySec/Ghost) | Framework offensif | Python | Framework associé à des fonctions post-exploitation via ADB. |
| [PhoneSploit](https://github.com/prbhtkumr/PhoneSploit) | Toolkit sensible | Python | Projet distinct de PhoneSploit-Pro, autour de scénarios d'accès Android via ADB. |
| [adbsploit](https://github.com/mesquidar/adbsploit) | Toolkit de recherche | Python | Ancien projet de recherche sur la sécurité ADB ; dépôt archivé. |
| [adbwebkit](https://github.com/jxroot/adbwebkit) | Toolkit de sécurité | JavaScript | Outils liés à ADB et à la sécurité mobile. |
| [AdbNet](https://github.com/0x1CA3/AdbNet) | Outil réseau sensible | Python | Le dépôt décrit des recherches de périphériques Android exposés et des scénarios d'exploitation ; ne pas l'utiliser hors environnement explicitement autorisé. |
| [Xteam](https://github.com/xploitstech/Xteam) | Suite de sécurité | Python | Suite regroupant plusieurs catégories d'outils de sécurité ; certaines fonctions sont sensibles. |
| [ADB-FRP-Bypass](https://github.com/quitehacker/ADB-FRP-Bypass) | Scripts / documentation | Non confirmé | Dépôt portant sur le sujet du verrouillage FRP et de son contournement. À ne pas considérer comme une méthode légitime de récupération de compte. |
| [unlock-Bootloader](https://github.com/BiltuDas1/unlock-Bootloader) | Scripts / toolkit | Non confirmé | Ressources autour du déverrouillage du bootloader ; dépôt archivé. |

## 9. Documentation et listes de références

| Projet | Type | Langage principal | Utilité |
|---|---|---|---|
| [awesome-adb](https://github.com/mzlogin/awesome-adb) | Collection de ressources | Markdown / documentation | Liste de commandes, astuces, outils et références ADB. |

## 10. Boîtes à outils complémentaires

| Projet | Type | Langage principal | Utilité |
|---|---|---|---|
| [nPhoneKIT](https://github.com/nlckysolutions/nPhoneKIT) | Toolkit Android | Python | Boîte à outils généraliste destinée aux appareils Android. |

## 11. Doublons, maintenance et précautions

### Doublons et projets distincts

- **PhoneSploit-Pro** apparaissait deux fois dans la liste d'origine ; il est conservé une seule fois.
- **universal-android-debloater** et **universal-android-debloater-next-generation** sont deux dépôts distincts.
- **PhoneSploit** et **PhoneSploit-Pro** sont deux dépôts distincts ; ils ne sont pas fusionnés.
- Le catalogue contient **46 dépôts uniques** après suppression du doublon exact.

### État de maintenance signalé lors du classement

Les états ci-dessous sont des avertissements issus du relevé précédent et doivent être revérifiés avant utilisation :

| Projet | État signalé |
|---|---|
| [adbsploit](https://github.com/mesquidar/adbsploit) | Archivé ; dernier push signalé : 12 mars 2023. |
| [unlock-Bootloader](https://github.com/BiltuDas1/unlock-Bootloader) | Archivé ; dernier push signalé : 26 juin 2025. |
| [osaft](https://github.com/j-koenig/osaft) | Très ancien ; dernier push signalé : 23 mai 2013. |
| [MobyDroid](https://github.com/ibilux/MobyDroid) | Dernier push signalé : 12 décembre 2024. |
| [ADB-FRP-Bypass](https://github.com/quitehacker/ADB-FRP-Bypass) | Dernier push signalé : 15 juin 2021. |

### Vérifications recommandées avant intégration

1. Lire le README et la licence du dépôt.
2. Vérifier les dernières releases, commits, issues et pull requests.
3. Vérifier les versions minimales d'Android, d'ADB, de Java, de Python ou de Node.js.
4. Examiner les permissions demandées et les commandes exécutées.
5. Tester dans un environnement isolé et sur un appareil de test.
6. Ne pas intégrer automatiquement un dépôt archivé ou un outil sensible.
7. Préférer les API Android documentées et les mécanismes d'autorisation explicites.

## 12. Sélection recommandée pour Novay

Cette sélection privilégie les interfaces, la gestion d'appareils, les opérations d'applications, l'automatisation et le diagnostic. Elle ne signifie pas que le code peut être repris directement : chaque licence, dépendance et architecture doit être vérifiée.

| Besoin Novay | Références à examiner | Pourquoi |
|---|---|---|
| Interface de gestion ADB | [QADB](https://github.com/ludoven/QADB), [ADBKit](https://github.com/Drenzzz/ADBKit), [MobyDroid](https://github.com/ibilux/MobyDroid) | Inspiration pour organiser les commandes et les outils dans une interface. |
| ADB depuis une interface web | [ya-webadb](https://github.com/yume-chan/ya-webadb) | Architecture web et intégration ADB côté navigateur. |
| Automatisation multi-appareils | [lamda](https://github.com/firerpa/lamda), [agent-device](https://github.com/callstack/agent-device) | Références pour l'automatisation et les interactions pilotées par outils. |
| Gestion des applications | [AppManager](https://github.com/MuntashirAkon/AppManager), [uber-adb-tools](https://github.com/patrickfav/uber-adb-tools) | Gestion des paquets et opérations groupées. |
| Debloating encadré | [Universal Android Debloater Next Generation](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation) | Référence pour présenter les applications système et leurs risques. |
| Diagnostic | [android-dev-monitor](https://github.com/marko69420/android-dev-monitor), [epic-adb](https://github.com/mdnaimul22/epic-adb) | Métriques, journaux et informations d'appareil. |

### Fonctionnalités Novay pouvant être inspirées de ces références

- Détection et sélection de plusieurs appareils.
- Vue d'ensemble de l'appareil : modèle, version Android, état de connexion et capacités disponibles.
- Gestion des applications et des fichiers APK.
- File d'opérations avec états clairs, progression, annulation lorsque techniquement possible et reprise lorsque prise en charge.
- Historique des opérations et journaux consultables.
- Diagnostic système et affichage des métriques disponibles.
- Automatisation avec aperçu de l'action et confirmation explicite pour les opérations sensibles.

## 13. Arborescence suggérée

Pour conserver les références dans un dossier dédié si le catalogue est ensuite réparti en plusieurs fichiers :

```text
ANDROID-ADB-REFERENCES/
├── 01-DEVICE-MANAGEMENT/
│   ├── GUI/
│   ├── CLI/
│   └── MULTI-DEVICE/
├── 02-APP-MANAGEMENT/
│   ├── APK/
│   ├── INSTALLATION/
│   └── PACKAGE-MANAGEMENT/
├── 03-DEBLOAT-OPTIMIZATION/
│   ├── UNIVERSAL/
│   └── MANUFACTURER-SPECIFIC/
├── 04-AUTOMATION-AI/
│   ├── AI-AGENTS/
│   ├── MCP/
│   ├── REMOTE-CONTROL/
│   └── UI-AUTOMATION/
├── 05-DIAGNOSTICS/
│   ├── MONITORING/
│   ├── SYSTEM-INFORMATION/
│   └── RECOVERY/
├── 06-DIGITAL-FORENSICS/
│   ├── ACQUISITION/
│   ├── ANALYSIS/
│   └── THREAT-DETECTION/
├── 07-SECURITY-RESEARCH/
│   ├── AUDITING/
│   ├── MOBILE-PENTEST/
│   └── SENSITIVE-TOOLS/
└── 08-DOCUMENTATION/
    ├── ADB/
    └── REFERENCES/
```

---

## Note de maintenance

Ce fichier est un catalogue de références, pas une validation de sécurité ou de qualité des projets listés. Les descriptions sont volontairement synthétiques. Avant toute réutilisation de code, confirmer l'activité du dépôt, sa licence, ses dépendances et son adéquation avec la version Android ciblée.
