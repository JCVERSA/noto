# Minecraft Tools & Libraries Directory

A comprehensive compilation of server status monitors, Xbox Live identity mapping tools, and world seed mapping applications discussed during this session.

---

## 📊 1. Server Status & Monitoring Tools (Bedrock UDP / RakNet)

These libraries and utilities are used to query Minecraft Bedrock servers via the **UDP RakNet protocol** to check if a server is active, fetch current player counts, and retrieve the MOTD.

*   **[py-mine/mcstatus](https://github.com/py-mine/mcstatus)**: Highly robust Python library providing a CLI interface and API hooks to query Minecraft server parameters. Supports both Java and Bedrock.
*   **[thedrewen/MCBE-Server-Ping](https://github.com/thedrewen/MCBE-Server-Ping)**: A lightweight, specialized Python script optimized solely for Minecraft Bedrock (`ping_bedrock`).
*   **[minescope/mineping](https://github.com/minescope/mineping)**: Zero-dependency JavaScript implementation using asynchronous functions to return detailed player status, version arrays, and MOTD data.
*   **[itzg/mc-monitor](https://github.com/itzg/mc-monitor)**: A fast Go binary tool bundled with Docker and Prometheus exporter modules to actively track server metrics and uptime over time.
*   **[Lenni0451/MCPing](https://github.com/Lenni0451/MCPing)**: Advanced Java/Kotlin library supporting multiple low-level socket protocol variations, including Bedrock RakNet structures.
*   **[stkptr/Minecraft-LAN-Spoofer](https://gist.github.com/stkptr/712d3bdbd4d300bbfce13ad60b2cff17)**: A clever Python gist designed to broadcast mock LAN packets or perform fast automated server updates inside local subnets.

---

## 🆔 2. Xbox Live XUID & Profile Aggregators

Tools designed to perform Xbox Live **XUID lookups**, mapping player gamertags to their unique 64-bit integers and retrieving their profile pictures (`gamerpic`).

*   **[MrMicky-FR/XboxAPI-Workers](https://github.com/MrMicky-FR/XboxAPI-Workers)**: Cloudflare Workers REST framework yielding instantaneous endpoints (`/profiles/{xuid}`) that pull profile images and gamertags straight from Microsoft servers.
*   **[jcxldn/xbl-web-api](https://github.com/jcxldn/xbl-web-api)**: Minimalist Node.js/Express service providing clean routes to fetch official Xbox Live user states, avatar arrays, and identifiers.
*   **[itsdarrylnorris/xbox-xuid-grabber-api](https://github.com/itsdarrylnorris/xbox-xuid-grabber-api)**: Micro-backend engine tailored to quickly parse parameters linking Bedrock users to authentic Xbox accounts.
*   **[r-Fallout76Marketplace/GamerTagIDGrabber](https://github.com/r-Fallout76Marketplace/GamerTagIDGrabber)**: Python Discord bot framework facilitating automated conversions between XUIDs and user strings for gaming community management.
*   **[OpenSpartan/xuid-resolver](https://github.com/OpenSpartan/xuid-resolver)**: Enterprise-grade Python CLI utility designed to seamlessly access live Xbox Live graph nodes via Entra ID app registrations.
*   **[cxkes.me](https://www.cxkes.me/)**: Rapid public web UI providing bidirectional identity lookups along with connected Xbox Live metadata parameters.
*   **[CraftMC Player Lookup](https://www.craftmc.net/tools/player-lookup)**: Hybrid database search engine that maps player handles, custom client skins, and underlying Floodgate authorization links.
*   **[mc-api.io](https://mc-api.io/uuid-lookup)**: Dedicated backend helper transforming standard 64-bit integer values into specific Bedrock UUID formats required for local server white-lists.

---

## 🗺️ 3. World Seed Mapping & Web Deployments

Applications and engines that generate interactive, scrollable 2D biome maps from a raw world seed number, optimized for self-hosting or client-side rendering.

*   **[MC Seed View](https://mcseedview.com/)**: High-performance, browser-centric web panel matching the aesthetic of Chunkbase. Built using WebAssembly (WASM), its static front-end bundle can be hosted on a Linux Nginx server without drawing continuous CPU calculation power.
*   **[mcseedmap.net](https://mcseedmap.net/)**: Public utility site mapping biome layouts, regional configurations, and point-of-interest structures specifically targeted toward Bedrock coordinates.
*   **[MinecraftSearch Seed Map](https://minecraftsearch.com/tools/seed-map)**: Straightforward interactive site handling instant dimension transitions (Overworld, Nether, End) and layout parameters.
*   **[cubiomes-viewer](https://github.com/cubitect/cubiomes-viewer)**: Highly optimized desktop environment tool written in C++ providing blazing-fast biome map generation. Available natively on Linux via Flatpak or AUR.
*   **[Minemap](https://github.com/hube12/Minemap)**: Lightweight Java client providing coordinate mapping, concurrent seed evaluation tabs, and custom vector overlays.
*   **[cubiomes-bedrock / cubiomes](https://github.com/FragrantResult186/cubiomes-bedrock)**: A headless C-code library that compiles perfectly inside a Linux terminal via `gcc` for instant low-overhead generation or automated programmatic search wrappers via CLI.
*   **[Seed Atlas](https://github.com/DUzzL/Seed-Atlas)**: Self-hostable web application separating the algorithmic C engine from the desktop app and delivering an interactive, browser-accessible map panel over a Node.js/Nginx environment.
*   **[MinedMap](https://github.com/neocturne/MinedMap)**: Rust-based processing daemon that parses *actual pre-existing server map chunk files* into interactive Leaflet HTML pages instead of compiling raw seeds.